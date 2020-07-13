const express = require("express");
const Url = require("./url");
const shortid = require("shortid");
const validUrl = require("valid-url");
const router = new express.Router();

const baseUrl = process.env.BASE_URL;

router.post("/createShortLink", async (req, res) => {
  const longUrl = req.body.longUrl;
  try {
    if (!validUrl.isUri(longUrl)) {
      return res.status(403).send({ error: "Your url is invalid!" });
    }

    const url = await Url.findOne({ longUrl });
    if (url) {
      return res.send(url);
    }

    const code = shortid.generate();
    const shortUrl = baseUrl + code;

    newUrl = new Url({
      longUrl,
      code,
      shortUrl,
    });

    await newUrl.save();

    res.status(201).send(newUrl);
  } catch (e) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

router.get("/:code", async (req, res) => {
  const code = req.params.code;

  try {
    const url = await Url.findOne({ code });
    if (!url) {
      return res.status(404).send({ error: "Your url is invilid!" });
    }
    res.redirect(url.longUrl);
  } catch (e) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

module.exports = router;
