const express = require("express")
const cors = require("cors")
const session = require("express-session")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { GraphQLSchema } = require("graphql")
const expressGraphQl = require("express-graphql")

const RootQueryType = require("./schemas/rootQueryType");
const RootMutationType = require("./schemas/rootMutationType")

const User = require("./models/user")

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
  return done(null, user._id)
})

passport.deserializeUser((id, done) => {
  // get the user from the received id and return the user
  User.findById(id, (err, doc) => {
    return done(null, doc)
  })
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOne({ googleId: profile.id }, async (err, doc) => {
      if (err) {
        return cb(err, null)
      }

      if (!doc) {
        const newUser = new User({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: (profile.name.middleName || "") + (profile.name.familyName || ""),
          photoUrl: profile._json.picture || null
        })

        await newUser.save()
        cb(null, newUser)
      }else {
        cb(null, doc)
      }

    })
  }
));

app.get("/", (req, res) => {
  res.send("hello world")
})


app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000', failureMessage: true, session: true }),
  function (req, res) {
    res.redirect('http://localhost:3000/login');
    // res.redirect('/graphql');
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
    console.log("request received")
    req.logout()
    res.status(200).json({
      msg: "logout successful"
    })
  }
})


const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
})

// add a middleware to prohibit request that does not have a request.user
app.use("/graphql", expressGraphQl.graphqlHTTP((req) => ({
  schema: schema,
  graphiql: {
    headerEditorEnabled: true
  },
  context: { user: req.user }
})))


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
