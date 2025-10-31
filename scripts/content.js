const titleSelector = "h1.style-scope.ytd-watch-metadata > .style-scope.ytd-watch-metadata";
const ytPlayerTitleSelector = "h2.ytPlayerOverlayVideoDetailsRendererTitle.ytPlayerOverlayVideoDetailsRendererSingleLineTitle > span.yt-core-attributed-string.yt-core-attributed-string--white-space-pre-wrap";

function clearTitle() {
  if (document.title && document.title.trim() !== "") {
    document.title = "";
  }

  let ytPlayerVideoTitle = document.querySelector(titleSelector);
  if (ytPlayerVideoTitle != null) {
    ytPlayerVideoTitle.style.display = "none";
  }
}

function hideFullscreenTitle() {
  const titleElement = document.querySelector(ytPlayerTitleSelector);

  if (titleElement) {
    titleElement.textContent = "";
    titleElement.style.display = "none";
  } else {
    console.log("Fullscreen video title not found.");
  }
}

chrome.storage.sync.get("enabled", (data) => {
  if (data.enabled ?? true) {
    clearTitle();
    hideFullscreenTitle();

    const titleObserver = new MutationObserver(() => {
      clearTitle();
      hideFullscreenTitle();
    });

    titleObserver.observe(document.querySelector("title") || document.head, {
      subtree: true,
      characterData: true,
      childList: true,
    });
  }
});
