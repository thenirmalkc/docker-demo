require("dotenv").config();
const express = require("express");
const { cacheService } = require("./cache.service");
const app = express();
const PORT = +process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.status(200).json({ statusCode: 200, data: "Welcome to docker demo." });
});

app.get("/set", async (req, res, next) => {
  const keys = Object.keys(req.query);
  for (const k of keys) {
    await cacheService.set(k, req.query[k]);
  }
  res.status(200).json({ statusCode: 200, data: "Ok." });
});

app.get("/get/:key", async (req, res, next) => {
  const { key } = req.params;
  const value = await cacheService.get(key);
  res.status(200).json({ statusCode: 200, data: value });
});

async function main() {
  try {
    console.log(process.env);
    await cacheService.cacheInit();
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
