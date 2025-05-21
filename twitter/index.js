require('dotenv').config();
const axios = require('axios');
const cron = require('node-cron');

const BEARER_TOKEN = process.env.BEARER_TOKEN;
const USER_ID = process.env.USER_ID;
const headers = {
    'Authorization': `Bearer ${BEARER_TOKEN}`
};

let latestTweetId = null;

async function checkNewTweets() {
    try {
        const url = `https://api.twitter.com/2/users/${USER_ID}/tweets?max_results=5&tweet.fields=created_at`;
        const res = await axios.get(url, { headers });
        const tweets = res.data.data;

        if (!tweets || tweets.length === 0) {
            console.log('没有找到推文。');
            return;
        }

        const newest = tweets[0];

        if (newest.id !== latestTweetId) {
            console.log(`🆕 新推文：${newest.text} \n链接：https://twitter.com/${USER_ID}/status/${newest.id}`);
            latestTweetId = newest.id;
            // 可以在这里发 webhook、发邮箱等操作
        } else {
            console.log(`[${new Date().toISOString()}] 没有新推文。`);
        }
    } catch (error) {
        console.error('获取推文失败:', error.message);
    }
}

// 每 5 分钟执行一次
cron.schedule('*/5 * * * *', checkNewTweets);

// 初始化执行
checkNewTweets();
