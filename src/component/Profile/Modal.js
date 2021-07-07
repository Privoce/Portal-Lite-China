import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useAuthing } from '@authing/react-ui-components';
import { useLanguage } from 'uselanguage';
import { useWidgetSettings } from '../../hooks';

import { appId, appHost } from '../../InitialConfig';
import IconClose from '../../asset/img/icon.close.png';
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
    background: var(--modal-bg-color);
    color: var(--modal-font-color);
    border-radius: 0.04rem;
    padding: 0.3rem 0.5rem;
    /* padding: 0.7rem 0.25rem 0.35rem 0.25rem; */
    width: fit-content;
    .loading {
      font-size: 0.22rem;
    }
    .info {
      font-size: 0.2rem;
      img {
        width: 0.8rem;
        border-radius: 50%;
        border: 2px solid #ccc;
      }
      tr {
        display: flex;
        align-items: center;
        padding: 0.2rem 0;
        td:first-child {
          padding-right: 0.1rem;
          width: 1rem;
          color: #555;
          text-align: right;
          &:after {
            content: ':';
          }
        }
        td:last-child {
          font-weight: 800;
        }
      }
    }
    .opts {
      font-size: 0.2rem;
      margin-top: 0.2rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .logout_btn {
        display: flex;
        background-color: #f88070;
        color: #fff;
        font-size: 0.18rem;
        border-radius: 4px;
        border: 1px solid #fff;
        padding: 0.1rem 0.15rem;
        align-items: center;
      }
    }
    .close {
      cursor: pointer;
      position: absolute;
      top: 0.16rem;
      right: 0.16rem;
      width: 0.16rem;
      height: 0.16rem;
    }
    @media screen and (max-width: 414px) {
      width: 5rem;
    }
  }
`;
export default function Modal({ closeModal }) {
  const { clearWidgetSettings } = useWidgetSettings();
  const [currUser, setCurrUser] = useState(null);
  const {
    language: {
      words: { profile }
    }
  } = useLanguage();
  const { authClient } = useAuthing({
    appId,
    appHost
  });
  console.log({ currUser });
  useEffect(() => {
    const init = async () => {
      let user = await authClient.getCurrentUser();
      setCurrUser(user);
    };
    const visibleChange = () => {
      if (document.visibilityState === 'visible') {
        init();
      }
    };
    init();

    document.addEventListener('visibilitychange', visibleChange);
    return () => {
      document.removeEventListener('visibilitychange', visibleChange);
    };
  }, []);
  const handleLogout = () => {
    if (confirm('确定退出？')) {
      authClient.logout();
      closeModal();
      clearWidgetSettings();
      location.reload();
    }
  };
  if (!currUser)
    return (
      <ModalWrapper>
        <StyledWrapper>
          <div className="modal">
            <div className="loading">loading</div>
          </div>
        </StyledWrapper>
      </ModalWrapper>
    );
  const { username, phone, email, photo } = currUser;

  return (
    <ModalWrapper>
      <StyledWrapper>
        <div className="modal">
          <table className="info">
            <tbody>
              <tr>
                <td>{profile.avatar}</td>
                <td>
                  <img src={photo} alt="头像" />
                </td>
              </tr>
              <tr>
                <td>{profile.name}</td>
                <td>{username || '暂未设置'}</td>
              </tr>
              {phone && (
                <tr>
                  <td>{profile.mobile}</td>
                  <td>{phone}</td>
                </tr>
              )}
              {email && (
                <tr>
                  <td>{profile.email}</td>
                  <td>{email}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="opts">
            <a target="_blank" href="https://portal-lite-china.authing.cn/u">
              {profile.edit}
            </a>
            <button className="logout_btn" onClick={handleLogout}>
              {profile.logout}
            </button>
          </div>
          <img src={IconClose} onClick={closeModal} className="close" />
        </div>
      </StyledWrapper>
    </ModalWrapper>
  );
}

const ModalWrapper = ({ children }) => {
  return createPortal(children, modalRoot);
};
