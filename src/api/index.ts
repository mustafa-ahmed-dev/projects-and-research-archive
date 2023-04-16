import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

import express from "express";
import cors from "cors";
import helmet from "helmet";

import apiLimiter from "./middleware/apiLimiter.middleware";
import Controller from "./../abstracts/Controller";
import errorMiddleware from "./middleware/errorHandler.middleware";
import notFoundMiddleware from "./middleware/notFound.middleware";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.app.use(notFoundMiddleware);
  }

  private initializeMiddleware() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // Apply the rate limiting middleware to API calls only
    this.app.use(apiLimiter);

    // put all middleware here
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private async connectDB() {
    AppDataSource.initialize()
      .then(async () => {
        console.log("Inserting a new user into the database...");
        const user = new User();
        user.name = "Timber Saw";
        user.dateOfBirth = new Date("1999-01-01");
        await AppDataSource.manager.save(user);
        console.log("Saved a new user with id: " + user.id);

        console.log("Loading users from the database...");
        const users = await AppDataSource.manager.find(User);
        console.log("Loaded users: ", users);

        console.log(
          "Here you can setup and run express / fastify / any other framework."
        );
      })
      .catch((error) => console.log(error));
  }

  public async listen() {
    try {
      await this.connectDB();

      console.log("Database connected successfully");
    } catch (error) {
      console.error(error);
      process.exit(1);
    }

    this.app.listen(this.port, () => {
      console.log(`App is listening on port ${this.port}`);
    });
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use(controller.mainRoute, controller.router);
    });
  }
}

export default App;
