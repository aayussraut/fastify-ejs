import fp from "fastify-plugin";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
export default fp(async (fastify, opts) => {
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    cookieName: "cookieId",
    secret: "mysecretkeywhichhaslengthof32characters",
    cookie: {
      secure: false,
      maxAge: 360000,
      httpOnly: true,
      expires: Date.now() + 360000,
    },
    saveUninitialized: false,
    cookieName: "sessionId",
  });

  fastify.authenticate = async function (req, reply) {
    try {
      console.log("authenticate\n\n\n\n", req.session.get("username"));
      const user = await req.session.get("username");
      if (!user) throw new Error("User not authenticated");
    } catch (err) {
      reply.redirect("/users/login");
    }
  };

  fastify.authenticateUser = async function (req, reply) {
    try {
      const user = await req.session.get("username");
      if (user) reply.redirect("/blogs");
    } catch (err) {
      reply.redirect("/users/login");
    }
  };
});
