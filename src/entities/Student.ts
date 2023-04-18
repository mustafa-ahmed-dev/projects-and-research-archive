import { Entity, ManyToOne, Generated, Column, PrimaryColumn } from "typeorm";

import { Person } from "./Person";
import { StudyLevel } from "./StudyLevel";
import { Project } from "./Project";
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

  @ManyToOne((type) => StudyLevel, (studyLevel) => studyLevel.students)
  studyLevel: StudyLevel;

  @ManyToOne((type) => Project, (project) => project.students)
  project: Project;
}
