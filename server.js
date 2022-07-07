import Express from "express";
import mongoose from "mongoose";
import ShortUrl from "./models/shortUrl.js";

const app = Express();

mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create views/ directory to host template files
// Sets the template engine to use
app.set("view engine", "ejs");

// A middleware that parses request object as strings or arrays
app.use(Express.urlencoded({ extended: false }));

app.get("/", async (_, res) => {
  // Gets all documents in the database
  const shortUrls = await ShortUrl.find();

  // Pass shortUrls to the view
  res.render("index", { shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  // Creates a document in a database
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  // Find the document given the short property
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  // Handle case where document is not found
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 5000);
