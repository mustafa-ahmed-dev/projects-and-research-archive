import { Router } from "express";

import { Doctype } from "./../api/types/enums";

abstract class Controller {
  public router: Router;
  public mainRoute: string;
  public initializeRoutes() {}
  public doctype: Doctype;

  constructor(mainRoute: string, doctype: Doctype) {
    this.mainRoute = mainRoute;
    this.router = Router();
    this.doctype = doctype;
  }
}

export default Controller;
