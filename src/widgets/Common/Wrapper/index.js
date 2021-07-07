import { useState, Children, useCallback, cloneElement, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from 'uselanguage';
import { BsThreeDots } from 'react-icons/bs';
import ErrorBoundary from './ErrorBoundary';
import StyledWrapper from './styled';
import Skeleton from 'react-loading-skeleton';
import Share from '../Share';
import IconClose from '../Icons/Close';

import { useWidgetSettings } from '../../../hooks';
// import IconClose from './Icons/CircleClose';
export default function WidgetWrapper({
  data = null,
  readonly = false,
  type = 'widget',
  enableSetting = false,
  standalone = false,
  name,
  disableScroll = false,
  removeWidget,
  title = '组件标题',
  compact,
  defaultSize = 'middle',
  sizes = null,
  children = null
}) {
  const {
    language: {
      words: { widget: lang, widgets }
    }
  } = useLanguage();
  const { opts: settingLang } = lang;
  const { getWidgetSetting, updateWidgetSetting } = useWidgetSettings();
  const [currSize, setCurrSize] = useState(getWidgetSetting({ name, key: 'size' }) || defaultSize);
  const [settingVisible, setSettingVisible] = useState(false);
  const [shareVisibile, setShareVisibile] = useState(false);
  const [widgetSettingVisible, setWidgetSettingVisible] = useState(false);
  // const wrapperRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const updateCurrSize = (key, { size }) => {
    console.log({ key, size, ref });
    setCurrSize(size);
    // if (size == 'fullscreen') {
    //   wrapperRef.current.requestFullscreen();
    //   return;
    // }
    updateWidgetSetting({ name: key, key: 'size', data: size });
  };
  const handleRemove = (name) => {
    let confirmed = confirm(`${lang.removing}：${widgets[name]?.title || title}？`);
    if (confirmed) {
      removeWidget();
    }
  };
  const handleShare = () => {
    toggleShareVisible();
  };
  // console.log({ compact });
  const toggleShareVisible = () => {
    setShareVisibile((prev) => !prev);
  };
  const toggleSettingListVisible = () => {
    setSettingVisible((prev) => !prev);
  };
  const toggleWidgetSettingVisible = useCallback(() => {
    setWidgetSettingVisible((prev) => {
      return !prev;
    });
  }, []);
  // 只有一个size选择也不显示
  const hasSizes = sizes && sizes.length > 1;
  console.log('lang', widgets[name]);
  return (
    <StyledWrapper
      className={`widget ${compact ? 'compact' : ''} ${disableScroll ? 'noscroll' : ''
        }  ${currSize} ${hasSizes && sizes.includes('large') ? 'largable' : ''} ${settingVisible ? 'setting' : ''
        }`}
      type={type}
    >
      <div className="container" ref={ref}>
        <ErrorBoundary lang={{ error: lang.error, reload: lang.reload }}>
          <>
            {inView ? (
              <Suspense fallback={<Skeleton count={4} />}>
                {Children.map(children, (child) =>
                  cloneElement(child, {
                    readonly,
                    data,
                    lang: widgets[name],
                    name,
                    toggleWidgetSettingVisible
                  })
                )}
              </Suspense>
            ) : null}
            <div
              className={`widget_setting_wrapper ${widgetSettingVisible ? 'visible' : 'hidden'}`}
            >
              <IconClose className="close" onClick={toggleWidgetSettingVisible} />
              <div className="setting" id={`widget-${name}-setting`}></div>
            </div>
          </>
        </ErrorBoundary>
        {shareVisibile && (
          <Share name={name} lang={settingLang.shareModal} closeModal={toggleShareVisible} />
        )}
      </div>
      {/* 小组件内部设置可见判断,避免和其他按钮的UI冲突 */}
      {!widgetSettingVisible && !shareVisibile && !readonly && (
        <div className="setting" onClick={toggleSettingListVisible}>
          <BsThreeDots />
        </div>
      )}

      {settingVisible && (
        <ul className="setting_list" onMouseLeave={toggleSettingListVisible}>
          {enableSetting && (
            <li className="item" onClick={toggleWidgetSettingVisible}>
              {settingLang.setting}
            </li>
          )}
          {!standalone && (
            <li className="item" onClick={handleRemove.bind(null, name)}>
              {settingLang.remove}
            </li>
          )}
          {!standalone && (
            <li className="item">
              <a
                href={`/widgets/${name}?from=home`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {settingLang.open.newTab}
              </a>
            </li>
          )}
          <li className="item" onClick={handleShare}>
            {settingLang.share}
          </li>
          {hasSizes && (
            <li className="item sizes">
              {sizes.map((key) => {
                return (
                  <span
                    onClick={updateCurrSize.bind(null, name, { size: key })}
                    className={`size ${currSize == key ? 'curr' : ''}`}
                    key={key}
                  >
                    {lang.opts.sizes[key]}
                  </span>
                );
              })}
            </li>
          )}
        </ul>
      )}
      {type == 'widget' && <h2 className="title">{widgets[name]?.title || title}</h2>}
    </StyledWrapper>
  );
}
