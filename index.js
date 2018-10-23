// движок Twitter'а
const twitter = require('./core/twitter');

try {
  // отображение информации
  console.info('Запуск приложения...');

  // запуск движка для работы с Twitter
  twitter.startTask();
} catch (error) {
  console.error(`Ошибка запуска приложения: ${error.message}`);
}
