// эмулятор браузера
const nightmare = require('./nightmare');
// модуль авторизации Twitter'а
const twitterAuth = require('./twitterAuth');
// модуль трекинга Twitter'а
const twitterChannel = require('./twitterChannel');
// модуль валидации Twitter'а
const twitterValid = require('./twitterValid');
// модуль ретвита записей Twitter'а
const twitterRetweet = require('./twitterRetweet');

// настройки
const { twitterConfig, nightmareConfig } = require('../config');
// ссылки для обработки
const { twitterLinks } = require('../links');

// основная функция выполнения задачи Twitter
module.exports.startTask = async () => {
  try {
    // создание окна браузера
    const app = nightmare.create(nightmareConfig);

    // авторизация в Twitter'е
    await twitterAuth.authorize(app, twitterConfig.auth);

    // получение твитов Twitter'а
    const noValidTweets = await twitterChannel.getTweets(app, twitterLinks, twitterConfig);

    // формирование валидных ссылок на твиты (соответствующие требованиям)
    const validTweetLinks = twitterValid.validate(
      noValidTweets,
      twitterLinks,
      twitterConfig.tweets.configTweet.key,
    );

    // формирование валидных ссылок на твиты (соответствующие требованиям)
    await twitterRetweet(app, validTweetLinks, twitterConfig.tweets.configRetweet);

    console.log(validTweetLinks);

    // завершение работы окна браузера
    await nightmare.end(app);
  } catch (error) {
    throw new Error(`Невозможно запустить выполнение задачи: ${error.message}`);
  }
};
