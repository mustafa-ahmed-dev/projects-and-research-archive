import {
  Entity,
  Unique,
  OneToMany,
  ManyToOne,
  Generated,
  Column,
  PrimaryColumn,
} from "typeorm";

import { Department } from "./Department";
import { Project } from "./Project";
import { Student } from "./Student";

@Entity()
export class StudyLevel {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  name: string;

  @ManyToOne((type) => Department, (department) => department.studyLevels)
  department: Department;

  @OneToMany((type) => Project, (project) => project.studyLevel)
  projects: Project[];

  @OneToMany((type) => Student, (student) => student.studyLevel)
  students: Student[];
}
