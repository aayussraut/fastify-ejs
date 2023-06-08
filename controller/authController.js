export const signUpHandler = async (req, reply) => {
  try {
    const user = await req.server.user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.server.transporter.sendMail({
      from: "0fakeiush0@gmail.com",
      to: user.email,
      subject: "Welcome to My Blog",
      html: `<html>
      
      <body>
      <p>Hi ${user.username},</p>
        <h2>Sign In Successful!</h2>
        <p> Welcome to my blog.Thanks for signing up.</p>
      </body>
      </html>
      `,
    });
    await reply.view("/templates/register", {
      message: "User created successfully.Please login to continue.",
    });
  } catch (err) {
    await reply.view("/templates/register.ejs", {
      message: err.message || "Something went wrong",
    });
  }
};

export const signInHandler = async (req, reply) => {
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  console.log(otp);
  reply.locals.otp = otp;

  try {
    const user = await req.server.user.findOne({
      where: { username: req.body.username },
    });
    user.update({ otp: otp });
    if (user.password === req.body.password) {
      req.session.userId = user.userId;
      var mailOptions = {
        from: "0fakeiush0",
        to: user.email,
        subject: "OTP for your account login",
        html: `<html>
          <h3>OTP for account verification is </h3>
          <h1 style="font-weight:bold;">${otp}</h1>
          <h4>OTP is confidential. Do not share it with anyone.</h4>
          <p>If you did not request this, please ignore this email.</p>
          </html>`,
      };

      req.server.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          reply.send("error");
        }
      });
      reply.redirect("/otp/send");
    } else {
      res.render("login", { message: "Invalid username or password" });
    }
  } catch (err) {
    await reply.view("/templates/login.ejs", {
      message: "Invalid username or password",
    });
  }
};
