export default (accessToken, refreshToken, profile, cb) => {
  // skiped profileUrl fb provide downloadable url
  const user = {
    username: profile.displayName,
    email: profile.emails[0].value,
    isverified: true
  };
  return cb(null, user);
};
