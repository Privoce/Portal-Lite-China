import { useRef, useEffect, useState } from 'react';
import { format, isAfter, isSameDay } from 'date-fns';
import { RiRefreshLine } from 'react-icons/ri';
import { useWidgetSettings } from '../../hooks';
import { formatDistanceToNowStrict } from 'date-fns';
import GoAuth from '../Common/GoAuth';
import StyledWrapper from './styled';
import useGoogleAuth from './useGoogleAuth';
import Event from './Event';
import AddEvent from './AddEvent';
import Setting from './Setting';
const googleAuthHook = useGoogleAuth;
const filterOutPassed = (groupEvents) => {
  if (!groupEvents) return null;
  let evts = [];
  Object.entries(groupEvents).forEach(([, list]) => {
    evts.push(...list);
  });
  evts = evts.filter((evt) => {
    return (
      (evt.isAllDay && isSameDay(new Date(evt.start), new Date())) ||
      isAfter(new Date(evt.end), new Date())
    );
  });
  let group = {};
  evts.forEach((evt) => {
    let { start } = evt;
    let dateKey = null;
    try {
      dateKey = format(new Date(start), 'P');
    } catch (error) {
      dateKey = 'Not Yet Classified';
    }
    let tmp = group[dateKey];
    group[dateKey] = tmp ? [...tmp, evt] : [evt];
  });
  return group;
};
export default function MyAgenda({ data, readonly, name, lang }) {
  const { getWidgetSetting, updateWidgetSetting } = useWidgetSettings();
  // 此处很关键
  let localEvents = readonly ? data?.groupEvents : getWidgetSetting({ name, key: 'groupEvents' });
  const listEle = useRef(null);
  const [fromLocal, setFromLocal] = useState(!!localEvents);
  console.log({ localEvents, fromLocal });
  const [latestEvent, setLatestEvent] = useState(undefined);

  const {
    auth,
    signedIn,
    loading,
    reloading,
    error,
    groupEvents,
    calendars,
    syncData,
    addEvent,
    removeEvent,
    updateCalendars
  } = googleAuthHook(localEvents, readonly);
  // 去授权
  const getGoogleAuth = () => {
    auth.signIn();
  };
  const handleSyncData = () => {
    setFromLocal(false);
    syncData();
  };
  const handleAddEvent = (input) => {
    setFromLocal(false);
    return addEvent(input);
  };
  const handleHighlightClick = () => {
    let hlBlock = listEle.current.querySelector('.highlight');
    hlBlock?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  // 同步一份到本地
  useEffect(() => {
    if (!fromLocal) {
      // console.log('update data to cloud', { groupEvents });
      updateWidgetSetting({ name, key: 'groupEvents', data: groupEvents });
    }
    // 设置最新事件
    if (groupEvents) {
      const sortedArr = Object.entries(groupEvents).sort(([a], [b]) => {
        return new Date(a) - new Date(b);
      });
      const [firstArr = [null, null]] = sortedArr;
      const [, events] = firstArr;
      if (events) {
        setLatestEvent(events[0]);
        console.log('wtfff', sortedArr, events[0]);
      } else {
        setLatestEvent(null);
      }
    }
  }, [groupEvents, fromLocal]);
  // 抛错
  if (error) {
    throw new Error(error);
  }
  if (!signedIn && !readonly) return <GoAuth disabled={!auth} auth={getGoogleAuth} />;
  console.log({ localEvents, groupEvents, loading });
  return (
    <>
      {!readonly && <Setting calendars={calendars} updateCalendars={updateCalendars} name={name} />}
      <StyledWrapper>
        <div className="topbar">
          <div className="today">
            <button disabled={loading || readonly} onClick={handleHighlightClick} className="btn">
              {latestEvent && formatDistanceToNowStrict(new Date(latestEvent.start))}
            </button>
            <span className="date">{new Date().toLocaleDateString(lang.locale)}</span>
            {!readonly && (
              <>
                <button disabled={loading || readonly} onClick={handleSyncData} className="update">
                  <RiRefreshLine
                    className={reloading ? 'reloading' : ''}
                    color={loading ? '#aaa' : '#5c4ddf'}
                  />
                </button>
                <AddEvent
                  lang={lang.addEvent}
                  calendar={calendars.find((c) => c.primary == true)}
                  addEvent={handleAddEvent}
                />
              </>
            )}
          </div>
        </div>
        {loading && !groupEvents ? (
          <div className="loading">{lang.fetching}</div>
        ) : groupEvents == null ? (
          <div className="empty">{lang.empty}</div>
        ) : (
          <ul className="list" ref={listEle}>
            {Object.entries(filterOutPassed(groupEvents) || {})
              .sort(([a], [b]) => {
                return new Date(a) - new Date(b);
              })
              .map(([dateKey, events]) => {
                return (
                  <li className="item" key={dateKey}>
                    <h3 className="title">{new Date(dateKey).toLocaleDateString(lang.locale)}</h3>
                    <ul className="evts">
                      {events.map((evt) => {
                        return (
                          <Event
                            readonly={readonly}
                            highlight={latestEvent?.id == evt.id}
                            key={evt.summary}
                            data={evt}
                            deleteEvent={removeEvent}
                          />
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
          </ul>
        )}
      </StyledWrapper>
    </>
  );
}
