// entity
import { User } from "./../../entities/User";

// enums
import { Doctype } from "./../../entities/Permission";

// service
import Service from "../../abstracts/Service";

// utils
import asyncHandler from "../helpers/asyncHandler.helper";

// errors
import InternalServerError from "../../errors/InternalServerError";

// schemas
import { UserData } from "./user.validation";

class UserService extends Service {
  constructor(private docType: Doctype) {
    super();
  }

  public async findAll() {}

  public async findOneById(id: string) {}

  public async findByName(name: string) {}

  public async findOneByUsername(username: string) {}

  public async findByEmail(email: string) {}

  public async createOne(userData: UserData) {}

  public async updateOne(id: string, data: UserData) {}

  public async deleteOne(id: string) {}

  public async login(id: string, token: string) {}

  public async logout(id: string, token: string) {}

  public async refreshToken(id: string, token: string) {}
}

export default UserService;
