import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

import config from "../config";

import { Admin } from "./entities/Admin";
import { Permission } from "./entities/Permission";
import { College } from "./entities/College";
import { Department } from "./entities/Department";
import { StudyLevel } from "./entities/StudyLevel";
import { Supervisor } from "./entities/Supervisor";
import { Project } from "./entities/Project";
import { Student } from "./entities/Student";
import { Field } from "./entities/Field";
import { Document } from "./entities/Document";

const dbConfig = {
  type: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.userPassword,
  database: config.database.name,
  synchronize: true,
  logging: true,
  entities: [
    Admin,
    Permission,
    College,
    Department,
    StudyLevel,
    Supervisor,
    Project,
    Student,
    Field,
    Document,
  ],
  migrations: [`${__dirname}/**/migrations/*.ts`],
  subscribers: [],
} as DataSourceOptions;

const AppDataSource = new DataSource(dbConfig);

AppDataSource.initialize();

export default AppDataSource;
