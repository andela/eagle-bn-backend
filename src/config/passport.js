
import FacebookTokenStrategy from 'passport-facebook-token';
import GoogleStrategy from 'passport-google-oauth20';
import passport from 'passport';
import config from './auth';
import OAuthCallback from '../utils/OAuthCallback';

passport.use('facebook-token', new FacebookTokenStrategy({
  name: 'facebook',
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  profileFields: ['id', 'displayName', 'photos', 'email']
}, OAuthCallback));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(
  new GoogleStrategy.Strategy({
    name: 'google',
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: '/api/v1/users/auth/google/callback'
  }, OAuthCallback)
);

export default passport;
