import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { Content} from "./Content";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;


  @OneToMany(() => Content, (content) => content.created_by, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  contents: Content[];
}
