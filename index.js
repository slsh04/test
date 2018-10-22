// настройки
const config = require('./config.js');
// ссылки для обработки
const links = require('./links.js');
// движок Twitter'а
const twitter = require('./twitter.js');

try {
  // отображение информации
  console.info('Запуск приложения...');

  // запуск выполнения задачи для Twitter'а
  (async () => {
    await twitter(config.nightmare, config.twitter, links.twitter);
    console.info('Проход завершён. Ожидайте следующего выполнения...');
  })();

  setInterval(async () => {
    await twitter(config.nightmare, config.twitter, links.twitter);
    console.info('Проход завершён. Ожидайте следующего выполнения...');
  }, config.server.cron * 1000);
} catch (error) {
  console.error(`Ошибка запуска приложения: ${error.message}`);
}
