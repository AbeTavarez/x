const express = require("express");
const morgan = require('morgan');
require("dotenv").config();
const connectDB = require("./util/db");
const Tweet = require("./models/Tweet");
const tweetsData = require("./models/tweetsData");
const jsxEngine = require('jsx-view-engine')

// Variables
const app = express();
const PORT = 3000;

// config
app.set('view engine', 'jsx');
app.engine('jsx', jsxEngine());

//middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.static('public'));

//* Routes
/**
 * Landing Page
 */
app.get("/", (req, res) => {
  res.render('Landing')
});

//* ======== View Routes

/**
 * * Index
 */
app.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find({});
    res.send(tweets);
  } catch (e) {
    console.log(e);
  }
});


/**
 * * Show
 */
app.get("/tweets/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const tweet = await Tweet.findById(id);
      res.send(tweet);
    } catch (e) {
      console.log(e);
    }
  });



// * ============ API Routes ==========================

/**
 * * Post Create
 */
app.post("/api/tweets", async (req, res) => {
  try {
    console.log(req.body);
    const createdTweet = await Tweet.create(req.body);
    res.send(createdTweet);
    // res.redirect('/tweets');
  } catch (e) {
    console.log(e);
  }
});


/**
 * * Update Tweet
 */
app.put('/api/tweets/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const updatedTweet = await Tweet.findByIdAndUpdate(id, req.body, {new: true});
        res.send(updatedTweet);
    } catch (e) {
        console.log(e);
    }
});


/**
 * * Delete Tweet
 */
app.delete('/api/tweets/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const deletedTweet = await Tweet.findByIdAndRemove(id);
        console.log(deletedTweet);
        res.send('Tweet deleted!');
    } catch (e) {
        console.log(e);
    }
});

/**
 * * Increase Likes
 */
app.get('/api/tweets/add-likes/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const tweetToUpdate = await Tweet.findById(id);
        tweetToUpdate.likes++;
        const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate, {new: true});
        res.send(updatedTweet);
    } catch (e) {
        console.log(e);
    }
});

/**
 * * Add comment
 */
app.put('/api/tweets/add-comment/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const tweetToUpdate = await Tweet.findById(id);
        tweetToUpdate.comments.push(req.body);
        const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate, {new: true});
        res.send(updatedTweet);
    } catch (e) {
        console.log(e);
    }
});




/**
 * ===================    Seed Route =======================
 */
app.get("/api/tweets/seed", async (req, res) => {
  try {
    await Tweet.insertMany(tweetsData);
    res.send("Tweets Created");
  } catch (e) {
    console.log(e);
  }
});

// Connection
connectDB();
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
