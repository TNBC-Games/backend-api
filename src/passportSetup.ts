import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth20');
const DiscordStrategy = require('passport-discord');
import User from './app/models/schemas/user.schema';
import config from './config';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user));
});

passport.use(
    new GoogleStrategy(
        {
            callbackURL: config.GOOGLE_CALLBACK_URL,
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET
        },
        (accessToken: string, refreshToken: string, profile: any, email: any, done: any) => {
            User.findOne({ googleId: email.id }).then((user) => {
                if (user) {
                    done(null, user);
                } else {
                    new User({
                        email: email._json.email,
                        username: email.name,
                        googleId: email.id,
                        oauth: true
                    })
                        .save()
                        .then((newUser) => {
                            done(null, newUser);
                        });
                }
            });
        }
    )
);

passport.use(
    new DiscordStrategy(
        {
            clientID: config.DISCORD_CLIENT_ID,
            clientSecret: config.DISCORD_CLIENT_SECRET,
            callbackURL: config.DISCORD_CALLBACK_URL,
            scope: ['identify', 'email']
        },
        (accessToken: string, refreshToken: string, profile: any, done: any) => {
            User.findOne({ discordId: profile.id }).then((user) => {
                if (user) {
                    done(null, user);
                } else {
                    new User({
                        email: profile.email,
                        discordId: profile.id,
                        username: profile.username,
                        oauth: true
                    })
                        .save()
                        .then((newUser) => {
                            done(null, newUser);
                        });
                }
            });
        }
    )
);
