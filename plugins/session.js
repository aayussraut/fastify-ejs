import fp from "fastify-plugin";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
export default fp(async (fastify, opts) => {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret: "mysecretkeywhichhaslengthof32characters",
    cookie: {
      secure: false,
      maxAge: 360000,
    },
    cookieName: "sessionId",
  });

  fastify.authenticate = async function (req, reply) {
    try {
      console.log("authenticate\n\n\n\n", req.session.get("user"));
      const user = await req.session.get("user");
      if (!user) throw new Error("User not authenticated");
    } catch (err) {
      reply.redirect("/users/login");
    }
  };

  fastify.authenticateUser = async function (req, reply) {
    try {
      const user = await req.session.get("user");
      if (user) reply.redirect("/blogs");
    } catch (err) {
      reply.redirect("/users/login");
    }
  };
});
