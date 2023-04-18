import {
  Entity,
  Unique,
  ManyToOne,
  Generated,
  Column,
  PrimaryColumn,
  OneToMany,
} from "typeorm";

import { College } from "./College";
import { StudyLevel } from "./StudyLevel";
import { Supervisor } from "./Supervisor";

@Entity()
@Unique(["name", "college"])
export class Department {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  name: string;

  @ManyToOne((type) => College, (college) => college.departments)
  college: College;

  @OneToMany((type) => StudyLevel, (studyLevel) => studyLevel.department)
  studyLevels: StudyLevel;

  @OneToMany((type) => Supervisor, (supervisor) => supervisor.department)
  supervisor: Supervisor;
}
