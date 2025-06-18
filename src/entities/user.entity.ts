import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  AUTHOR = "author",
  VIEWER = "viewer",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  phone: string

  @Column({
    type: "varchar",
    enum: UserRole,
    default: UserRole.VIEWER,
  })
  role: UserRole

  @Column({
    type: "varchar",
    enum: UserStatus,
    default: UserStatus.PENDING,
  })
  status: UserStatus

  @Column({ nullable: true })
  unit: string

  @Column({ nullable: true })
  avatar: string

  @Column({ type: "datetime", nullable: true })
  lastLogin: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
