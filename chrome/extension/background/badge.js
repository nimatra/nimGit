chrome.storage.local.get('state', (obj) => {
  let notifications = obj.notifications;
  debugger;
  if (notifications) {
    notifications = JSON.parse(notifications);
    const len = notifications.filter(notification => !notification.marked).length;
    if (len > 0) {
      chrome.browserAction.setBadgeText({ text: len.toString() });
    }
  } else {
    // Initial
    chrome.browserAction.setBadgeText({ text: '1' });
  }
});
