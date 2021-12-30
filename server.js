const express = require("express")
const cors = require("cors")
const session = require("express-session")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))

// app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //   sameSite: "none",
    //   secure: true,
    //   maxAge: 1000 * 60 * 60 * 24 * 7 // One Week
    // }
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  // serialize the user id and not complete user object
  return done(null, user)
})

passport.deserializeUser((user, done) => {
  // get the user from the received id and return the user
  return done(null, user)
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    // find the user in the database
    // if found
    // then return the database user object in the `cb`
    // else
    // create a user in the database and then return the created user
    console.log(profile)
    cb(null, profile)
  }
));

app.get("/", (req, res) => {
  res.send("hello world")
})


app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000', failureMessage: true, session: true }),
  function (req, res) {
    res.redirect('http://localhost:3000');
  }
);

app.get("/getuser", (req, res) => {
  if (req.user) {
    res.send(req.user)
    return
  }

  res.status(404).json({
    err: "no user found"
  })

})

app.get("/auth/logout", (req, res) => {
  if (req.user) {
    req.logout()
    res.status(200).json({
      msg: "logout successful"
    })
  }
})



const PORT = process.env.PORT || 4000
mongoose
  .connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, {}
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
