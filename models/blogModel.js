import fp from "fastify-plugin";
import { DataTypes } from "sequelize";

export default fp(async (fastify, opts) => {
  const blogs = fastify.sequelize.define("blogs", {
    blogId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  try {
    await blogs.sync();
    fastify.decorate("blog", blogs);
  } catch (err) {
    console.log(err);
  }
});
