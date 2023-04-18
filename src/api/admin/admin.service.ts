// entity
import { Admin } from "../../entities/Admin";

// enums
import { Doctype } from "../../entities/Permission";

// service
import Service from "../../abstracts/Service";

// utils
import asyncHandler from "../helpers/asyncHandler.helper";

// errors
import InternalServerError from "../../errors/InternalServerError";

// schemas
import { AdminData } from "./admin.validation";

class AdminService extends Service {
  constructor(private docType: Doctype) {
    super();
  }

  public async findAll() {}

  public async findOneById(id: string) {}

  public async findByName(name: string) {}

  public async findOneByAdminname(adminname: string) {}

  public async findByEmail(email: string) {}

  public async createOne(adminData: AdminData) {}

  public async updateOne(id: string, data: AdminData) {}

  public async deleteOne(id: string) {}

  public async login(id: string, token: string) {}

  public async logout(id: string, token: string) {}

  public async refreshToken(id: string, token: string) {}
}

export default AdminService;
