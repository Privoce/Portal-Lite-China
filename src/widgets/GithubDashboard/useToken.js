import { useState, useEffect } from 'react';

// GitHub Token
const StorageGithubKey = 'GITHUB_OAUTH_TOKEN';
let interVal = 0;
const useToken = () => {
  const [token, setToken] = useState(localStorage.getItem(StorageGithubKey) || '');
  useEffect(() => {
    const storageEvent = (evt) => {
      const { newValue, oldValue, key } = evt;
      console.log({ evt });
      if (key == StorageGithubKey) {
        if (newValue != oldValue) {
          setToken(newValue);
        }
      }
    };
    window.addEventListener('storage', storageEvent);
    return () => {
      window.removeEventListener('storage', storageEvent);
      clearInterval(interVal);
    };
  }, []);
  return { token, setToken };
};

export default useToken;
