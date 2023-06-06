import {
  getBlogsHandler,
  postBlogsHandler,
  deleteBlogsHandler,
} from "../../controller/blogController.js";
export default async function (fastify, opts) {
  const getBlogsOptns = {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              content: { type: "string" },
            },
          },
        },
      },
    },
    preHandler: fastify.authenticate,
    handler: getBlogsHandler,
  };

  const postBlogsOptns = {
    schema: {
      body: {
        type: "object",
        required: ["title", "content"],
        properties: {
          title: { type: "string" },
          content: { type: "string" },
        },
      },
    },
    preHandler: fastify.authenticate,
    handler: postBlogsHandler,
  };

  const deleteBlogsOptns = {
    schema: {
      params: {
        type: "object",
        required: ["blogId"],
        properties: {
          blogId: { type: "integer" },
        },
      },
    },
    preHandler: fastify.authenticate,
    handler: deleteBlogsHandler,
  };

  fastify.get("/", getBlogsOptns);
  fastify.post("/", postBlogsOptns);
  fastify.delete("/:blogId", deleteBlogsOptns);
}
