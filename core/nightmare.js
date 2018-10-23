// эмулятор браузера
const nightmare = require('nightmare');

// настройки
const { nightmareConfig } = require('../config.js');

// функция запуска окна браузера
module.exports.create = (config = nightmareConfig) => {
  try {
    return nightmare(config);
  } catch (error) {
    throw new Error(`Ошибка запуска работы эмулятора браузера: ${error.message}`);
  }
};

// функция завершения окна браузера
module.exports.end = (app) => {
  try {
    return app.end().then(null);
  } catch (error) {
    throw new Error(`Ошибка завершения работы эмулятора браузера: ${error.message}`);
  }
};
