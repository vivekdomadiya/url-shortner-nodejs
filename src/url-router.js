const express = require("express");
const Url = require("./url");
const shortid = require("shortid");
const validUrl = require("valid-url");
const router = new express.Router();

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

    newUrl = new Url({
      longUrl,
      code,
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
      return res.redirect("/404.html");
    }
    res.redirect(url.longUrl);
  } catch (e) {
    res.status(500).send({ error: "Something went wrong!" });
  }
});

module.exports = router;
