export default {
  jwt: {
    secret: <string>process.env.APP_SECRET,
    expiresIn: '1d',
  },
};
