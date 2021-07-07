import { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useLanguage } from 'uselanguage';
import { useAuthing } from '@authing/react-ui-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { IoMdClose } from 'react-icons/io';

import { appId, appHost } from '../../InitialConfig';
const modalRoot = document.querySelector('#modal-root');
const StyledWrapper = styled.section`
  z-index: 999;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    position: relative;
    border-radius: 0.05rem;
    background-color: var(--modal-bg-color, #fff);
    padding: 0.3rem 0.4rem;
    .title {
      font-size: 0.22rem;
      font-weight: 800;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .body {
      margin-top: 0.2rem;
      color: #333;
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
        overflow: scroll;
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
        background-color: #fff;
        font-size: 0.18rem;
        padding: 0.08rem 0.12rem;
        color: #7e65c8;
        margin-right: 0.2rem;
        &.copy {
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
// let other_params = {};
let prefix = location.origin;
export default function Modal({ closeModal }) {
  const {
    language: {
      words: {
        modal: { share: lang }
      }
    }
  } = useLanguage();

  const modal = useRef(null);
  const { authClient } = useAuthing({
    appId,
    appHost
  });
  const [username, setUsername] = useState(null);
  const [link, setLink] = useState('Generating link...');
  const [copied, setCopied] = useState(false);
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
      setLink(`${prefix}/p/${username}`);
    }
  }, [username]);
  return (
    <ModalWrapper ref={modal}>
      <StyledWrapper>
        <div className="modal">
          <h3 className="title">{lang.title}</h3>
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
              <button className="btn copy">{copied ? lang.copied : lang.copy}</button>
            </CopyToClipboard>
            <button className="btn done" onClick={closeModal}>
              {lang.done}
            </button>
          </div>
          <IoMdClose className="close" onClick={closeModal} />
        </div>
      </StyledWrapper>
    </ModalWrapper>
  );
}

const ModalWrapper = ({ children }) => {
  return createPortal(children, modalRoot);
};
