const Twitter = require('twitter');

const authorize = (config) => {
  try {
    return new Twitter(config);
  } catch (error) {
    throw new Error(`Ошибка авторизации: ${error.message}`);
  }
};

const searchTweets = async (client) => {
  try {
    const result = await client.get('search/tweets', { q: 'node.js' });
    return result;
  } catch (error) {
    throw new Error(`Ошибка поиска твитов: ${error.message}`);
  }
};

module.exports = async (config, links) => {
  const client = authorize(config.authorize);
  console.log(await searchTweets(client));
};
