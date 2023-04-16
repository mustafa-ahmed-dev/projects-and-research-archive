import { Column } from "typeorm";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

export abstract class Person {
  @Column({
    type: "varchar",
    length: 45,
  })
  name: string;

  @Column("date")
  dateOfBirth: Date;

  @Column({
    type: "enum",
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;
}
