const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { app } = require('../app')
const { User } = require('./postgresql.config')
const {
    findUserPerEmailQuery,
    findUserPerIdQuery,
    findUserPerGoogleIdQuery,
} = require('../queries/users.queries')

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await findUserPerIdQuery(id)

        done(null, user)
    } catch (err) {
        done(err)
    }
})

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                const user = await findUserPerEmailQuery(email)

                if (user) {
                    const match = await user.comparePassword(password)

                    if (match) {
                        done(null, user)
                    } else {
                        done(null, false, { message: 'Wrong password' })
                    }
                } else {
                    done(null, false, { message: 'User not found' })
                }
            } catch (err) {
                done(err)
            }
        }
    )
)

passport.use(
    'google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/cb',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await findUserPerGoogleIdQuery(profile.id)

                if (user) {
                    done(null, user)
                } else {
                    // find method for force user to write an username after confirm google auth

                    const username =
                        `${profile.name.givenName} ${profile.name.familyName}`.trim()

                    const newUser = await User.create({
                        id: profile.id,
                        username: username,
                        local: {
                            email: profile.emails[0].verified
                                ? profile.emails[0].value
                                : done(null, false, {
                                      message: 'Email not verified',
                                  }),
                        },
                    })

                    done(null, newUser)
                }
            } catch (err) {
                console.log('Error : ', err)

                done(err)
            }
        }
    )
)
