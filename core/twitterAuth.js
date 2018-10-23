// настройки
const { twitterConfig } = require('../config.js');

// функция авторизации в Twitter
module.exports.authorize = async (app, { url, data, elements } = twitterConfig.auth) => {
  try {
    // авторизация
    await app
      .goto(url)
      .type(elements.inputLogin, data.login)
      .type(elements.inputPassword, data.password)
      .click(elements.loginButton);

    // проверка необходимости подтверждения личности
    if (await app.exists(elements.challengeClass)) {
      await app.type(elements.challengeClass, data.telephone).click(elements.challengeButton);
    }

    // ожидание перехода на следующую страницу
    return await app.wait(elements.nextPageClass);
  } catch (error) {
    throw new Error(`Ошибка авторизации в Twitter'е: ${error.message}`);
  }
};
