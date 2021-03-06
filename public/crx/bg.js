console.log('bg script ready~');
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create(
    {
      active: true,
      url: 'index.html'
    },
    null
  );
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('bg msg event fire', { request });
  const { action, data } = request;
  if (action === 'UPDATE_TOKEN') {
    console.log('update oath');
    const { key, value } = data;
    localStorage.setItem(key, value);
  }
  if (action === 'OPEN_HOME') {
    console.log('open home page in ext');
    chrome.tabs.create(
      {
        active: true,
        url: 'index.html'
      },
      null
    );
  }
  if (action === 'LOGIN') {
    console.log('open login in ext');
    chrome.tabs.create(
      {
        openerTabId: sender.tab.id,
        active: true,
        url: `crx/login/index.html?tid=${sender.tab.id}`
      },
      null
    );
  }
});
// chrome.runtime.onInstalled.addListener(function (details) {
//   // 扩展环境，则注入安装标识
//   chrome.storage.local.set({ installed: true }, function () {
//     console.log('installed ');
//   });
// });
