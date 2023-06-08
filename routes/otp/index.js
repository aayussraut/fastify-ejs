export default async function (fastify, opts) {
  fastify.get("/send", async function (request, reply) {
    await reply.view("/templates/otp.ejs", { message: "" });
  });

  fastify.post("/send", async function (request, reply) {
    const userId = request.session.userId;
    console.log(userId);
    const user = await fastify.user.findByPk(userId);
    console.log(user);
    if (request.body.otp == user.otp) {
      request.session.username = user.username;
      await reply.redirect("/blogs");
    } else {
      await reply.view("/templates/otp.ejs", {
        message: "Invalid OTP",
      });
    }
  });
}
