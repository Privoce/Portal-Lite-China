import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaGithubAlt } from 'react-icons/fa';
import StyledWrapper from './styled';
import getToken from './github';
const APPs = {
  github: { name: 'Github OAuth', logo: <FaGithubAlt /> }
};
let intervalId = null;
export default function OAuth() {
  let { app } = useParams();
  const [pending, setPending] = useState(true);
  const [tip, setTip] = useState(null);
  let [countDown, setCountDown] = useState(null);
  useEffect(() => {
    // return early
    if (countDown === null) {
      return;
    }
    if (countDown === 0) {
      console.log('TIME LEFT IS 0');
      window.close();
      return;
    }

    // save intervalId to clear the interval when the
    // component re-renders
    intervalId = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [countDown]);
  useEffect(() => {
    let code = new URLSearchParams(location.search).get('code');
    if (code) {
      getToken(code).then((resp) => {
        console.log({ resp });
        setPending(true);
        const { code, data } = resp;
        if (code == 0 && data.access_token) {
          setPending(false);
          setTip('授权成功');
          localStorage.setItem('GITHUB_OAUTH_TOKEN', data.access_token);
          setCountDown(3);
        } else {
          setTip('授权失败');
        }
      });
    }
  }, []);

  const handleCloseClick = () => {
    window.close();
  };
  console.log({ app });
  return (
    <StyledWrapper>
      <div className="app">
        <div className="name">{APPs[app].name}</div>
        <div className="logo">{APPs[app].logo}</div>
      </div>
      <div className="status">{pending ? '授权中...' : tip}</div>
      {!pending && (
        <>
          <div className="tip">{countDown}秒后将关闭页面</div>
          <button onClick={handleCloseClick} className="close_btn">
            立即关闭
          </button>
        </>
      )}
    </StyledWrapper>
  );
}
