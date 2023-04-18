import { Entity, OneToMany, Generated, Column, PrimaryColumn } from "typeorm";

import { Department } from "./Department";

@Entity()
export class College {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  name: string;

  @OneToMany((type) => Department, (department) => department.college)
  departments: Department[];
}
