const speakeasy = require("speakeasy");

const generate = () => {
  return speakeasy.totp({
    secret: process.env.SHARED_SECRET_KEY,
    encoding: 'base32'
  });
};


module.exports = {
  generate
};