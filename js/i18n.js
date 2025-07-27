i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'en',
    debug: false,
    backend: {
      loadPath: 'locales/{{lng}}/translation.json'
    }
  }, function(err, t) {
    updateContent();
  });

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(elem => {
    const key = elem.getAttribute('data-i18n');
    elem.innerHTML = i18next.t(key);
  });
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng, () => {
    updateContent();
  });
}

// делаем доступным глобально
window.changeLanguage = changeLanguage;
