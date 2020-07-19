const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vivek:domadia@url-shortner.xvyno.mongodb.net/url-shortner",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
