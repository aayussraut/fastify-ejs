import {
  signUpHandler,
  signInHandler,
} from "../../controller/authController.js";
export default async function (fastify, opts) {
  const signUpOptns = {
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          email: {
            type: "string",
          },
          password: { type: "string" },
        },
      },
    },
    handler: signUpHandler,
  };
  const signInOptns = {
    schema: {
      body: {
        type: "object",
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
    handler: signInHandler,
  };

  fastify.get(
    "/login",
    { preHandler: fastify.authenticateUser },
    async function (request, reply) {
      await reply.view("/templates/login.ejs", {
        message: "",
      });
    }
  );

  fastify.get(
    "/register",
    { preHandler: fastify.authenticateUser },
    async function (request, reply) {
      await reply.view("/templates/register.ejs", {
        message: "",
      });
    }
  );

  fastify.post("/login", signInOptns);

  fastify.post("/register", signUpOptns);

  fastify.get("/logout", async function (request, reply) {
    request.session.delete();
    await reply.redirect("/users/login");
  });
}
