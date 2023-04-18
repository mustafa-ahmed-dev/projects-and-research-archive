import { Entity, Generated, Column, PrimaryColumn } from "typeorm";

import { Person } from "./Person";

@Entity()
export class Student extends Person {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  email: string;
}
