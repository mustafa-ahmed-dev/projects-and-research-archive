import { CreateDateColumn,UpdateDateColumn, Entity, Generated, Column, PrimaryColumn, OneToMany } from "typeorm";

import { Person } from "./Person";
import { Permission } from "./Permission";

@Entity()
export class Admin extends Person {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 30,
    unique: true,
  })
  username: string;

  @Column({
    type: "char",
    length: 90,
  })
  password: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  token: string;

  @Column("boolean")
  isActive: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  public created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  public updated_at: Date;

  @OneToMany((type) => Permission, (permission) => permission.admin)
  permissions: Permission[];
}
