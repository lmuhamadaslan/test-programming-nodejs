import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const { DataTypes } = Sequelize;

const FavMovieSchema = sequelize.define(
  "favorite_movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true }
);

FavMovieSchema.associations = (models) => {
  FavMovieSchema.belongsTo(models.UserSchema, {
    foreignKey: "user_id",
  });
};
export default FavMovieSchema;
