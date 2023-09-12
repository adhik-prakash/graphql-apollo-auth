import { dbConfig } from "./index";
import { Dialect, Sequelize } from "sequelize";

const { username, password, host, database, dialect } = dbConfig.development;

const sequelize = new Sequelize(database!, username!, password, {
  host: host,
  dialect: dialect as Dialect,
});

export default sequelize;
