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

  fastify.get("/login", async function (request, reply) {
    await reply.view("/templates/login.ejs");
  });

  fastify.get("/register", async function (request, reply) {
    await reply.view("/templates/register.ejs");
  });

  fastify.post("/login", signInOptns);

  fastify.post("/register", signUpOptns);
}
