module.exports.validate = (tweets, links, key) => {
  try {
    const urls = [];

    for (let countTweetFirst = 0; countTweetFirst < tweets.length; countTweetFirst += 1) {
      for (
        let countTweetSecond = 0;
        countTweetSecond < tweets[countTweetFirst].length;
        countTweetSecond += 1
      ) {
        for (let countLink = 0; countLink < links.length; countLink += 1) {
          const tweet = tweets[countTweetFirst][countTweetSecond];
          const link = links[countLink];
          if (tweet.url === link.url && tweet.likes >= link.needLikes) {
            urls.push(tweet.url + key + tweet.id);
          }
        }
      }
    }
    return urls;
  } catch (error) {
    throw new Error(`Ошибка валидации твитов: ${error.message}`);
  }
};
