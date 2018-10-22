// параметры работы сервера
module.exports.server = {
  // время повторной выполнении задачи в секундах
  cron: 60,
};

// параметры эмуляции браузера
module.exports.nightmare = {
  // показ работающего окна
  show: true,
  webPreferences: {
    webSecurity: false,
    // отображение изображений (выключить для скорости)
    images: false,
  },
};

// параметры скреппера для Twitter'а
module.exports.twitter = {
  content: '.content',
  channel: '.stream-item-header .FullNameGroup .fullname',
  text: '.js-tweet-text-container .TweetTextSize',
  likes: '.stream-item-footer .ProfileTweet-action--favorite .ProfileTweet-actionCount',
  likesAttr: 'data-tweet-stat-count',
};
