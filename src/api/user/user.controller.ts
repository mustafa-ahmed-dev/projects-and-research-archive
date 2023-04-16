import { Router, Request, Response, NextFunction } from "express";

import Controller from "../../abstracts/Controller";
import { User } from "./../../entities/User";

// User functionality
import UserService from "./user.service";
import { Id, UserData, IdSchema, UserSchema } from "./user.validation";

// Enums
import { Gender } from "./../../abstracts/Person";
import { Action, Doctype } from "./../../entities/Permission";

// Middleware
import validationMiddleware from "../middleware/validation.middleware";
import authMiddleware from "../middleware/auth.middleware";
// import permissionsMiddleware from "../middleware/permissions.middleware";

// Helpers
import asyncHandler from "../helpers/asyncHandler.helper";
import { hashPassword, verifyPassword } from "../helpers/hashPassword.helper";
import { signToken } from "../helpers/jwt.helper";
import logger from "../helpers/logger.helper";

// Errors
import NotFoundError from "../../errors/NotFoundError";
import ConflictError from "../../errors/ConflictError";
import InternalServerError from "../../errors/InternalServerError";
import UnauthorizedError from "../../errors/UnauthorizedError";

class UserController extends Controller {
  public routes = {
    getAll: "",
    getOne: "/:id",
    getPermissions: "/:id/permissions",
    createOne: "",
    updateOne: "/:id",
    deleteOne: "/:id",
    logout: "/:id/logout",
    login: "/login",
    refreshToken: "/:id/refreshtoken",
  };
  public router: Router;

  private service: UserService;

  constructor() {
    super("/users", Doctype.USER);

    this.router = Router();
    this.service = new UserService(this.doctype);

    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(
      this.routes.getAll,
      authMiddleware,
      // permissionsMiddleware(Action.READ, this.doctype),
      this.getAll_route
    );

    this.router.get(
      this.routes.getOne,
      authMiddleware,
      // permissionsMiddleware(Action.READ, this.doctype),
      validationMiddleware(IdSchema),
      this.getOne_route
    );

    this.router.get(
      this.routes.getPermissions,
      authMiddleware,
      // permissionsMiddleware(Action.READ, this.doctype),
      validationMiddleware(IdSchema),
      this.getUserPermissions_route
    );

    this.router.post(
      this.routes.createOne,
      authMiddleware,
      // permissionsMiddleware(Action.CREATE, this.doctype),
      validationMiddleware(UserSchema),
      this.createOne_route
    );

    this.router.delete(
      this.routes.deleteOne,
      authMiddleware,
      // permissionsMiddleware(Action.DELETE, this.doctype),
      validationMiddleware(IdSchema),
      this.deleteOne_route
    );

    this.router.put(
      this.routes.updateOne,
      authMiddleware,
      // permissionsMiddleware(Action.UPDATE, this.doctype),
      validationMiddleware(UserSchema),
      this.updateOne_route
    );

    // this.router.post(
    //   this.routes.login,
    //   validationMiddleware(LoginSchema),
    //   this.login_route
    // );

    this.router.post(
      this.routes.logout,
      authMiddleware,
      validationMiddleware(IdSchema),
      this.logout_route
    );

    this.router.post(
      this.routes.refreshToken,
      authMiddleware,
      validationMiddleware(IdSchema),
      this.refreshToken
    );
  }

  /**
   * @desc        Gets all users
   * @method      GET
   * @path        /users
   * @access      private
   */
  private getAll_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    response.json({ success: true });
  };

  /**
   * @desc        Gets one user by id
   * @method      GET
   * @path        /users
   * @access      private
   */
  private getOne_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Creates a user
   * @method      GET
   * @path        /users/:id/permissions
   * @access      private
   */
  private getUserPermissions_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Creates a user
   * @method      POST
   * @path        /users
   * @access      private
   */
  private createOne_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Deletes a user
   * @method      DELETE
   * @path        /users/:id
   * @access      private
   */
  private deleteOne_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Updates a user
   * @method      PUT
   * @path        /users/:id
   * @access      private
   */
  private updateOne_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Logins a user
   * @method      POST
   * @path        /users/login
   * @access      public
   */
  private login_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Gets all users
   * @method      POST
   * @path        /users/logout
   * @access      private
   * @note        The user will waits a second and will be logged out
   */
  private logout_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Refreshes an access token
   * @method      POST
   * @path        /users/:id/refreshtoken
   * @access      private
   */
  private refreshToken = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};
}

export default UserController;
