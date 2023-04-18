import { Router, Request, Response, NextFunction } from "express";

import Controller from "../../abstracts/Controller";
import { Admin } from "../../database/entities/Admin";

// Admin functionality
import AdminService from "./admin.service";
import { Id, AdminData, IdSchema, AdminSchema } from "./admin.validation";

// Enums
import { Gender } from "../../database/entities/Person";
import { Action, Doctype } from "../../database/entities/Permission";

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

class AdminController extends Controller {
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

  private service: AdminService;

  constructor() {
    super("/admins", Doctype.USER);

    this.router = Router();
    this.service = new AdminService(this.doctype);

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
      this.getAdminPermissions_route
    );

    this.router.post(
      this.routes.createOne,
      authMiddleware,
      // permissionsMiddleware(Action.CREATE, this.doctype),
      validationMiddleware(AdminSchema),
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
      validationMiddleware(AdminSchema),
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
   * @desc        Gets all admins
   * @method      GET
   * @path        /admins
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
   * @desc        Gets one admin by id
   * @method      GET
   * @path        /admins
   * @access      private
   */
  private getOne_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Creates a admin
   * @method      GET
   * @path        /admins/:id/permissions
   * @access      private
   */
  private getAdminPermissions_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Creates a admin
   * @method      POST
   * @path        /admins
   * @access      private
   */
  private createOne_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Deletes a admin
   * @method      DELETE
   * @path        /admins/:id
   * @access      private
   */
  private deleteOne_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Updates a admin
   * @method      PUT
   * @path        /admins/:id
   * @access      private
   */
  private updateOne_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Logins a admin
   * @method      POST
   * @path        /admins/login
   * @access      public
   */
  private login_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Gets all admins
   * @method      POST
   * @path        /admins/logout
   * @access      private
   * @note        The admin will waits a second and will be logged out
   */
  private logout_route = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};

  /**
   * @desc        Refreshes an access token
   * @method      POST
   * @path        /admins/:id/refreshtoken
   * @access      private
   */
  private refreshToken = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {};
}

export default AdminController;
