const express = require("express");
const Url = require("./url");
const shortid = require("shortid");
const validUrl = require("valid-url");
const router = new express.Router();

router.get("", (req, res) => {
  res.send({
    "": "GET - Docs",
    "/": "POST - Create short url",
    "/code": "GET - Redirect to original url",
  });
});

router.post("", async (req, res) => {
  const longUrl = req.body.url;

  try {
    if (validUrl.isUri(longUrl)) {
      const url = await Url.findOne({ longUrl });
      if (url) {
        return res.send(url);
      }

      const code = shortid.generate();

      newUrl = new Url({
        longUrl,
        code,
      });

      await newUrl.save();

      res.status(201).send(newUrl);
    }
    res.status(404).send({ error: "invalid url!" });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/:code", async (req, res) => {
  const code = req.params.code;

  try {
    const url = await Url.findOne({ code });
    if (!url) {
      res.status(404).send({ error: "invalid url!" });
    }
    res.redirect(url.longUrl);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
