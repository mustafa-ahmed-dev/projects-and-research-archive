import "reflect-metadata";
import { DataSource } from "typeorm";
import { Admin } from "./entities/Admin";
import { Permission } from "./entities/Permission";

import config from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.userPassword,
  database: config.database.name,
  synchronize: true,
  logging: false,
  entities: [Admin, Permission],
  migrations: [],
  subscribers: [],
});
