import { Entity, Generated, Column, PrimaryColumn, OneToMany } from "typeorm";

import { Person } from "./../abstracts/Person";
import { Permission } from "./Permission";

@Entity()
export class User extends Person {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 30,
    unique: true,
  })
  username: string;

  @Column({
    type: "char",
    length: 90,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  token: string;

  @OneToMany((type) => Permission, (permission) => permission.user)
  permissions: Permission[];
}
