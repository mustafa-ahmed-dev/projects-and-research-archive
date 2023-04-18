import {
  Entity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Generated,
  Column,
  PrimaryColumn,
  OneToMany,
} from "typeorm";

import { StudyLevel } from "./StudyLevel";
import { Supervisor } from "./Supervisor";
import { Field } from "./Field";
import { Student } from "./Student";
import { Document } from "./Document";

@Entity()
export class Project {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  name: string;

  @Column("simple-array")
  keywords: string[];

  @ManyToOne((type) => StudyLevel, (studyLevel) => studyLevel.projects)
  studyLevel: StudyLevel;

  @ManyToOne((type) => Supervisor, (supervisor) => supervisor.projects)
  supervisor: Supervisor;

  @ManyToMany((type) => Field, (field) => field.projects)
  @JoinTable()
  fields: Field[];

  @OneToMany((type) => Student, (students) => students.project)
  students: Student[];

  @OneToMany((type) => Document, (document) => document.project)
  documents: Document[];
}
