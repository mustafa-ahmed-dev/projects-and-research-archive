import {
  Entity,
  OneToMany,
  ManyToOne,
  Generated,
  Column,
  PrimaryColumn,
} from "typeorm";

import { Person } from "./Person";
import { Department } from "./Department";
import { Project } from "./Project";

@Entity()
export class Supervisor extends Person {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  email: string;

  @ManyToOne((type) => Department, (department) => department.studyLevels)
  department: Department;

  @OneToMany((type) => Project, (project) => project.studyLevel)
  projects: Project[];
}
