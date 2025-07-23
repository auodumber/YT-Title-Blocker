const toggle = document.getElementById("toggle");
const icon = document.getElementById("status-icon");
const label = document.getElementById("toggle-label");

function updateIcon(enabled) {
  icon.src = enabled ? "icons/icon-on.png" : "icons/icon-off.png";
  label.innerText = enabled ? "Enabled" : "Disabled";
}

chrome.storage.sync.get("enabled", (data) => {
  toggle.checked = data.enabled ?? true;
  updateIcon(toggle.checked);
});

toggle.addEventListener("change", () => {
  const enabled = toggle.checked;

  chrome.storage.sync.set({ enabled }, () => {
    updateIcon(enabled);
    chrome.tabs.query({ url: "*://*.youtube.com/*", active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.url.includes("youtube.com")) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
});
