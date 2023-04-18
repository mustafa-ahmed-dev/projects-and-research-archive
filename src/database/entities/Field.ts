import { Entity, ManyToMany, Generated, Column, PrimaryColumn } from "typeorm";

import { Project } from "./Project";

@Entity()
export class Field {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  name: string;

  @ManyToMany((type) => Project, (project) => project.fields)
  projects: Project[];
}
