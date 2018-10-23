// скрейпер
const cheerio = require('cheerio');

// ссылки для обработки
const { twitterLinks } = require('../links');

// функция очистки элементов
const clearElement = (string) => {
  try {
    return string.replace(/[^a-zA-Z0-9/: ]/g, '');
  } catch (error) {
    throw new Error(`Ошибка очистки строки: ${error.message}`);
  }
};

// функция очистки массива твитов
const clearTweets = (tweets) => {
  try {
    const cleanedTweets = [];

    for (let count = 0; count < tweets.length; count += 1) {
      const { channel, text, likes } = tweets[count];

      if (String(channel) !== '' || String(text) !== '' || String(likes) !== '') {
        cleanedTweets.push({ channel, text, likes });
      }
    }

    return cleanedTweets;
  } catch (error) {
    throw new Error(`Ошибка очистки массива твитов: ${error.message}`);
  }
};

// функция проверки массива твитов
const checkTweets = (tweets, needLikes) => {
  try {
    const checkedTweets = [];

    for (let count = 0; count < tweets.length; count += 1) {
      const { channel, text, likes } = tweets[count];

      if (likes >= needLikes) {
        checkedTweets.push({ channel, text, likes });
      }
    }

    return checkedTweets;
  } catch (error) {
    throw new Error(`Ошибка проверки массива твитов: ${error.message}`);
  }
};

// функция создания эмулятора с необходимыми настройками
const createEmulator = (config) => {
  try {
    return nightmare(config);
  } catch (error) {
    throw new Error(`Ошибка создания эмулятора: ${error.message}`);
  }
};

// функция работы с твитом
const parseTweets = async (configTwitter, html, needLikes) => {
  try {
    // отправка страницы в модуль для обработки
    let $ = cheerio.load(html);

    // получение тел твитов
    const domTweets = await $(configTwitter.content);

    // формирование структоры твита
    const jsonTweets = [];
    for (let count = 0; count < domTweets.length; count += 1) {
      $ = cheerio.load(domTweets[count]);

      jsonTweets.push({
        channel: clearElement($(configTwitter.channel).text() || ''),
        text: clearElement($(configTwitter.text).text() || ''),
        likes: clearElement($(configTwitter.likes).attr(configTwitter.likesAttr) || ''),
      });
    }

    // очистка твитов, а так же проверка твитов по параметрам
    return checkTweets(clearTweets(jsonTweets || []) || [], needLikes);
  } catch (error) {
    throw new Error(`Ошибка работы с твитами: ${error.message}`);
  }
};

// функция парсинга страницы с твитами
const parsePage = async (emulator, configTwitter, link, needLikes) => {
  try {
    console.info(`Начата работа со ссылкой: ${link}, необх. лайков: ${needLikes}`);

    // переход по ссылке для получения страницы и её обработка
    return emulator
      .goto(link)
      .evaluate(() => document.body.innerHTML)
      .then(html => parseTweets(configTwitter, html, needLikes));
  } catch (error) {
    throw new Error(`Ошибка парсинга страницы с твитами: ${error.message}`);
  }
};

// основная функция выполнения
module.exports.getTweets = async (configNightmare, configTwitter, linksTwitter) => {
  try {
    const tweets = [];

    // создание эмулятора
    const emulator = createEmulator(configNightmare);

    // обработка каждой страницы из списка
    for (let count = 0; count < linksTwitter.length; count += 1) {
      const { link, needLikes } = linksTwitter[count];
      tweets.push(await parsePage(emulator, configTwitter, link, needLikes));
    }

    // закрытие эмулятора
    await emulator.end().then(null);

    console.log(tweets);
  } catch (error) {
    throw new Error(`Ошибка открытия страниц с твитами: ${error.message}`);
  }
};
