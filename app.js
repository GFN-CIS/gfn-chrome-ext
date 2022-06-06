// fetch supported games
async function fetchGames() {
  return fetch('https://storage.yandexcloud.net/gfn-games/results.json').then(
    (response) => response.json()
  );
}

// check game supported
function isGameSupported(array) {
  const locationSteamUrl = window.location.href.split('/')[4];

  const found = array.filter(
    (item) => item.steamUrl.split('/')[4] === locationSteamUrl
  );

  return found.length === 1;
}

// inject
function inject() {
  console.log('inject function');

  const appHubAppName = document.getElementById('appHubAppName');
  const logo = chrome.runtime.getURL('assets/img/btn.svg');

  const injectHtml = `
    <div class="gfnr">
      <a href="https://gfn.ru/games.html" target="_blank" class="gfnr__link">
        <img src="${logo}" alt="Geforce NOW Russia" width="128" height="28" class="gfnr__btn" />
      </a>  
    </div>
  `;

  appHubAppName.insertAdjacentHTML('afterend', injectHtml);
}

// init
async function init() {
  const games = await fetchGames();
  const found = isGameSupported(games);

  found ? inject() : false;
}

init();
