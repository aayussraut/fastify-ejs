import nodemailer from "nodemailer";
import fp from "fastify-plugin";
import dotenv from "dotenv";
dotenv.config();

export default fp(async function (fastify, opts) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  transporter.verify().then(() => {
    console.log("Ready for send emails");
  });

  fastify.decorate("transporter", transporter);
});
