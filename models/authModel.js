import fp from "fastify-plugin";
import { DataTypes } from "sequelize";
export default fp(async (fastify, opts) => {
  const user = fastify.sequelize.define("user", {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  await user.sync({ alter: true });
  fastify.decorate("user", user);
});
