function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}

// notifications unmarked count
function setBadge(notifications) {
  if (chrome.browserAction) {
    const list = notifications || [];
    const count = list.filter(notification => notification.unread).length;
    chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
  }
}

export default function() {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
      setBadge(state.notification.notifications);
    });
    return store;
  };
}
