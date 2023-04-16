import {
  Entity,
  Column,
  Generated,
  PrimaryColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { User } from "./User";

export enum Action {
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}

export enum Doctype {
  USER = "user",
  PERMISSION = "permission",
}

@Entity()
@Unique(["doctype", "action", "user"])
export class Permission {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: Doctype,
  })
  doctype: Doctype;

  @Column({
    type: "enum",
    enum: Action,
  })
  action: Action;

  @ManyToOne((type) => User, (user) => user.permissions)
  user: User;
}
