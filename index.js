const config = require('./config.js');
const links = require('./links.js');
const twitter = require('./twitter.js');

try {
  // отображение информации
  console.info('Запуск приложения...');
  console.info(`Минимальное количество лайков для уведомления: ${config.twitter.posts.likes}.`);
  console.info(`Ссылки для обработки Twitter: ${links.twitter}.`);

  // запуск выполнения задачи для Twitter'а
  twitter(config.twitter, links.twitter);
} catch (error) {
  console.error(`Ошибка запуска приложения: ${error.message}`);
}
