// эмулятор браузера
const nightmare = require('nightmare');
// скрейпер
const cheerio = require('cheerio');

// функция очистки элементов
const clearElement = string => string.replace(/[^a-zA-Z0-9/: ]/g, '');

// функция очистки массива твитов
const clearTweets = (tweets) => {
  const cleanedTweets = [];

  for (let count = 0; count < tweets.length; count += 1) {
    const { channel, text, likes } = tweets[count];

    if (String(channel) !== '' || String(text) !== '' || String(likes) !== '') {
      cleanedTweets.push({ channel, text, likes });
    }
  }

  return cleanedTweets;
};

// функция проверки твитов по параметрам
const checkTweets = (tweets, needLikes) => {
  const checkedTweets = [];

  for (let count = 0; count < tweets.length; count += 1) {
    const { channel, text, likes } = tweets[count];

    if (likes >= needLikes) {
      checkedTweets.push({ channel, text, likes });
    }
  }

  return checkedTweets;
};

// функция создания эмулятора с необходимыми настройками
const createEmulator = config => nightmare(config);

// функция работы с твитом
const parseTweets = async (configTwitter, html, needLikes) => {
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
};

// функция парсинга страницы с твитами
const parsePage = async (emulator, configTwitter, link, needLikes) => {
  console.info(`Начата работа со ссылкой: ${link}, необх. лайков: ${needLikes}`);

  // переход по ссылке для получения страницы и её обработка
  return emulator
    .goto(link)
    .evaluate(() => document.body.innerHTML)
    .then(html => parseTweets(configTwitter, html, needLikes));
};

// основная функция выполнения
module.exports = async (configNightmare, configTwitter, linksTwitter) => {
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
