import fp from "fastify-plugin";
import fasitfyView from "@fastify/view";
import ejs from "ejs";

export default fp(async (fastify, opts) => {
  fastify.register(fasitfyView, {
    engine: {
      ejs: ejs,
    },
  });
});
