const redis = require("redis");
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

let redisClient;

const cacheInit = async () => {
  redisClient = await redis
    .createClient({
      socket: {
        host: REDIS_HOST,
        port: +REDIS_PORT,
      },
      password: REDIS_PASSWORD,
    })
    .connect();
};

const set = async (key, value) => {
  value = JSON.stringify(value);
  await redisClient.set(key, value);
  return true;
};

const get = async (key) => {
  const value = await redisClient.get(key);
  return JSON.parse(value);
};

module.exports.cacheService = {
  cacheInit,
  set,
  get,
};
