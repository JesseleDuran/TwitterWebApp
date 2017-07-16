import fetch from 'isomorphic-fetch';

const baseUrl = 'http://127.0.0.1:8000/api';

const api = {
  tweets: {
    async sumarRt(tweetId = 1) {
      const response = await fetch(`${baseUrl}/aumentarFav/${tweetId}`);
      const data = await response.json();
      return data;
    },
    async sumarFav(tweetId = 1) {
      const response = await fetch(`${baseUrl}/aumentarRt/${tweetId}`);
      const data = await response.json();
      return data;
    },
  },
  users: {
    async getTimeline(page = 1) {
      const response = await fetch(`${baseUrl}/mostrarTimeline/?page=${page}`);
      const data = await response.json();
      console.log('DATA', data);
      return data.success ? data.tweets.data : [];
    },
    async getMyTweets(page = 1) {
      const response = await fetch(`${baseUrl}/mostrarMisTweets/${page}`);
      const data = await response.json();
      return data;
    },
  },
};

export default api;
