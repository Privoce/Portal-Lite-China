import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuthing } from '@authing/react-ui-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoMdClose } from 'react-icons/io';
import { BiLink } from 'react-icons/bi';

import { useWidgetSettings } from '../../hooks';
import { appId, appHost } from '../../InitialConfig';

const StyledWrapper = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(2, 2, 2, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    position: relative;
    border-radius: 0.05rem;
    color: var(--modal-font-color, #333);
    background-color: var(--modal-bg-color, #fff);
    padding: 0.3rem 0.4rem;
    .title {
      font-size: 0.22rem;
      font-weight: 800;
      display: flex;
      justify-content: space-between;
      width: 100%;

      .toggle {
        cursor: pointer;
        display: inline-block;
        .toggle-switch {
          display: inline-block;
          background: #ccc;
          border-radius: 16px;
          width: 0.52rem;
          height: 0.26rem;
          position: relative;
          vertical-align: middle;
          transition: background 0.25s;
          &:before,
          &:after {
            content: '';
          }
          &:before {
            display: block;
            background: linear-gradient(to bottom, #fff 0%, #eee 100%);
            border-radius: 50%;
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
            width: 0.18rem;
            height: 0.18rem;
            position: absolute;
            top: 0.035rem;
            left: 0.06rem;
            transition: left 0.25s;
          }
        }
        .toggle-checkbox {
          position: absolute;
          visibility: hidden;
          &:checked + .toggle-switch {
            background: #56c080;
            &:before {
              left: 0.28rem;
            }
          }
        }
        &:hover &:before {
          background: linear-gradient(to bottom, #fff 0%, #fff 100%);
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        }
      }
    }
    .body {
      margin-top: 0.2rem;
      font-size: 0.18rem;
      .tip {
        color: #666;
        line-height: 1.2;
        margin-bottom: 0.05rem;
      }
      .link {
        font-size: 0.12rem;
        user-select: text;
        white-space: nowrap;
        overflow-y: hidden;
        overflow-x: scroll;
        max-width: 3.5rem;
        line-height: 2;
        border: 1px solid #eee;
        padding: 0 0.05rem;
        &::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
      }
    }
    .btns {
      margin-top: 0.2rem;
      display: flex;
      .btn {
        border-radius: 0.5rem;
        border: 1px solid #7a3cf0;
        font-size: 0.18rem;
        padding: 0.08rem 0.12rem;
        color: #7e65c8;
        margin-right: 0.2rem;

        &.copy,
        &.login {
          align-items: center;
          display: flex;
          background-color: #7a3cf0;
          color: #fff;
          &[disabled] {
            border-color: #ddd;
            background-color: #ccc;
          }
        }
        /* &.done {
          background-color: #fff;
        } */
      }
    }
    > .close {
      cursor: pointer;
      position: absolute;
      top: 0.05rem;
      right: 0.05rem;
      width: 0.2rem;
      height: 0.2rem;
    }
  }
`;
let prefix = location.origin;
export default function Share({ name, lang, closeModal }) {
  const { authClient } = useAuthing({
    appId,
    appHost
  });
  const { getWidgetSetting, updateWidgetSetting } = useWidgetSettings();
  const [username, setUsername] = useState(null);
  const [link, setLink] = useState('Generating link...');
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(getWidgetSetting({ name, key: 'share' }));
  const toggleShare = ({ target: { checked } }) => {
    setCanShare((prev) => {
      console.log({ prev });
      return !prev;
    });
    console.log({ checked });
    updateWidgetSetting({ name, key: 'share', data: checked });
  };
  const handleLoginClick = () => {
    closeModal();
    let toggleEle = document.querySelector('.settings .toggle');
    let loginEle = document.querySelector('.settings .setting .icon.profile');
    toggleEle.click();
    if (loginEle) {
      loginEle.click();
    }
  };
  useEffect(() => {
    const getUsername = async () => {
      let { status } = await authClient.checkLoginStatus();
      if (!status) {
        setLink('Please login first.');
        return;
      }
      let user = await authClient.getCurrentUser();
      setUsername(user.username);
    };
    getUsername();
  }, [authClient]);
  useEffect(() => {
    if (username) {
      setLink(`${prefix}/p/${username}/${name}`);
    }
  }, [username, name]);
  return (
    <StyledWrapper>
      <div className="modal">
        <h3 className="title">
          <span className="txt">{lang.title}</span>
          <label className="toggle">
            <input
              className="toggle-checkbox"
              type="checkbox"
              defaultChecked={canShare}
              onChange={toggleShare}
            />
            <div className="toggle-switch"></div>
            {/* <span className="toggle-label">Wi-fi</span> */}
          </label>
        </h3>
        <div className="body">
          <p className="tip">{lang.tip}</p>
          <div className="link">{link}</div>
        </div>
        <div className="btns">
          <CopyToClipboard
            text={link}
            onCopy={() => {
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            {username ? (
              <button disabled={!canShare} className="btn copy">
                <BiLink />
                {copied ? lang.copied : lang.copy}
              </button>
            ) : (
              <button className="btn login" onClick={handleLoginClick}>
                Login/Reg
              </button>
            )}
          </CopyToClipboard>
          <button className="btn done" onClick={closeModal}>
            {lang.done}
          </button>
        </div>
        <IoMdClose className="close" onClick={closeModal} />
      </div>
    </StyledWrapper>
  );
}
