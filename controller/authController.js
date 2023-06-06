export const signUpHandler = async (req, reply) => {
  try {
    const user = await req.server.user.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    reply.view("/templates/register", { message: "Something went wrong" });
  } catch (err) {
    await reply.view("/templates/register.ejs", {
      message: err.message || "Something went wrong",
    });
  }
};

export const signInHandler = async (req, reply) => {
  try {
    const user = await req.server.user.findOne({
      where: { username: req.body.username },
    });
    if (user.password === req.body.password) {
      reply.redirect("/blogs");
      req.session.set("user", user.username);
    } else {
      res.render("login", { message: "Invalid username or password" });
    }
  } catch (err) {
    await reply.view("/templates/login.ejs", {
      message: "Invalid username or password",
    });
  }
};
