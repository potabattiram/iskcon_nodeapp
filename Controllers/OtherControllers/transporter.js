const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: "gmail",
  auth: {
    user:"potabattiram@gmail.com",
    pass:"CalculusmadeE@sY",
  },
}));

module.exports = transporter;
