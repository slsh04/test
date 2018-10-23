// настройки
const { twitterConfig } = require('../config.js');

// функция ретвита записи Twitter'а
const retweet = async (app, url, { elements }) => {
  try {
    return await app
      .goto(url)
      .wait(elements.retweetButton)
      .click(elements.retweetButton)
      .wait(elements.nextFrameClass)
      .click(elements.retweetFrameButton)
      .wait(5000);
  } catch (error) {
    throw new Error(`Ошибка ретвита записи в Twitter'е: ${error.message}`);
  }
};

// функция ретвита записей Twitter'а
module.exports = async (app, links, config = twitterConfig.tweets.configRetweet) => {
  try {
    // ретвит каждой записи на страницу
    for (let count = 0; count < links.length; count += 1) {
      await retweet(app, links[count], config);
    }
  } catch (error) {
    throw new Error(`Ошибка ретвита записи в Twitter'е: ${error.message}`);
  }
};
