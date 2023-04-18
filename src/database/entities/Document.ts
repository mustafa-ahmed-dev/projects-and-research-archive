import { Entity, ManyToOne, Generated, Column, PrimaryColumn } from "typeorm";

import { Project } from "./Project";

@Entity()
export class Document {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  caption: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  originalName: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  path: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  mimetype: string;

  @Column("integer")
  size: number;

  @ManyToOne((type) => Project, (project) => project.documents)
  project: Project;
}
