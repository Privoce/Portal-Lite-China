const getDefaultIcon = (url) => {
  let iconPrefix = '';
  try {
    let urlObj = new URL(url.startsWith('//') ? `http:${url}` : url);
    iconPrefix = urlObj.origin;
  } catch (error) {
    console.log({ error });
  }
  // console.log({ iconPrefix });
  return `${iconPrefix}/favicon.ico`;
};
const highlightWord = (list, keyWord = '') => {
  if (!keyWord) return list;
  return list.map((w) => {
    return w.replace(new RegExp(keyWord, 'g'), `<mark>${keyWord}</mark>`);
  });
};
const formatNumber = (n, base = 10000) => {
  let tmp = 0;
  if (n >= base) {
    console.log('bingo');
    let border = Number(`10${new Array(String(base).length - 2).fill(9)}`);
    tmp = parseFloat(n / base).toFixed(n >= border ? 1 : 0);
  }
  const token = { 10000: 'W', 1000: 'K', 100: 'B' };
  const result = n > base ? `${tmp}${token[base]}` : n;
  console.log({ result });
  return result;
};
const splitToChunks = (array, parts = 15) => {
  let tmpArr = [...array];
  let loopCount = Math.ceil(tmpArr.length / parts);
  let result = [];
  for (let i = loopCount; i > 0; i--) {
    result.push(tmpArr.splice(0, parts));
  }
  return result;
};

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

const checkExtensionInstalled = (extid) => {
  extid = extid || 'ccegbnlnelhgaefimiaklaindffpfcmh';
  const checkUrl = `chrome-extension://${extid}/assets/icon/logo.png`;
  return new Promise((resolve) => {
    let img = document.createElement('img');
    img.src = checkUrl;
    img.onload = () => {
      resolve(true);
    };
    img.onerror = () => {
      resolve(false);
    };
  });
};

export {
  checkExtensionInstalled,
  getDefaultIcon,
  splitToChunks,
  formatNumber,
  highlightWord,
  validateUrl
};
