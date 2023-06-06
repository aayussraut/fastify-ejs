export default async function (fastify, opts) {
  fastify.get(
    "/",
    { preHandler: fastify.authenticateUser },
    async function (request, reply) {
      await reply.view("/templates/index.ejs");
    }
  );
}
