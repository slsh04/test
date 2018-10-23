// скрейпер
const cheerio = require('cheerio');

// ссылки для обработки
const { twitterLinks } = require('../links');
// настройки
const { twitterConfig } = require('../config');

// функция сбора твитов с канала
const parseChannel = async (app, url, { configChannel, configTweet }) => {
  try {
    return app
      .goto(url)
      .evaluate(() => document.body.innerHTML)
      .then(async (html) => {
        // отправка страницы в модуль для обработки
        let $ = cheerio.load(html);

        // разделение канала на твиты
        const domTweets = $(configChannel.elements.content);
        // получение идентификаторов твитов
        const tweets = [];
        for (let count = 0; count < domTweets.length; count += 1) {
          const domTweet = domTweets[count];
          $ = cheerio.load(domTweet);

          if ($(domTweet).attr(configChannel.elements.id)) {
            tweets.push({
              url: String(url),
              id: Number($(domTweet).attr(configChannel.elements.id)),
              likes: Number($(configTweet.elements.likes).val()),
            });
          }
        }
        console.log(tweets);
        return tweets;
      });
  } catch (error) {
    throw new Error(`Ошибка разбора канала на твиты: ${error.message}`);
  }
};

const parseChannels = async (app, links, { configChannel, configTweet }) => {
  try {
    const tweetLinks = [];

    // разбор каждого канала на твиты
    for (let count = 0; count < links.length; count += 1) {
      const { url } = links[count];
      tweetLinks.push(await parseChannel(app, url, { configChannel, configTweet }));
    }
    return tweetLinks;
  } catch (error) {
    throw new Error(`Ошибка разбора каналов на каналы: ${error.message}`);
  }
};

// функция получения твитов по ссылкам
module.exports.getTweets = async (app, links = twitterLinks, config = twitterConfig) => {
  try {
    return parseChannels(app, links, config.tweets);
  } catch (error) {
    throw new Error(`Ошибка открытия страниц с твитами: ${error.message}`);
  }
};
