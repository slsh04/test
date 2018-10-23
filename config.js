// параметры работы сервера
module.exports.serverConfig = {
  // время повторной выполнении задачи в секундах
  cronTwitter: 60,
};

// параметры эмуляции браузера
module.exports.nightmareConfig = {
  // показ работающего окна
  show: true,
  webPreferences: {
    webSecurity: false,
    // отображение изображений (выключить для скорости)
    images: false,
  },
};

// параметры скреппера для Twitter'а
module.exports.twitterConfig = {
  auth: {
    url: 'https://twitter.com/login?lang=ru',
    data: {
      login: '',
      password: '',
      telephone: ,
    },
    elements: {
      inputLogin: '.js-username-field',
      inputPassword: '.js-password-field',
      loginButton: '.clearfix .submit',
      nextPageClass: '.logged-in',
      challengeClass: '#challenge_response',
      challengeButton: '#email_challenge_submit',
    },
  },

  tweets: {
    configChannel: {
      elements: {
        content: '.tweet',
        id: 'data-item-id',
      },
    },
    configTweet: {
      key: '/status/',
      elements: {
        likes: '.stream-item-footer .ProfileTweet-actionCount',
        likesAttr: 'data-tweet-stat-count',
      },
    },
    configRetweet: {
      elements: {
        retweetButton: '.ProfileTweet-actionButton',
        nextFrameClass: '.modal-content',
        retweetFrameButton: '.tweet-button .EdgeButton',
      },
    },
  },
};
