import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { User } from "./user.entity"

export enum DocumentType {
  DIRECTIVE = "directive",
  NOTIFICATION = "notification",
  PLAN = "plan",
  REGULATION = "regulation",
  REPORT = "report",
}

export enum DocumentStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
}

@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({
    type: "varchar",
    enum: DocumentType,
  })
  type: DocumentType

  @Column()
  unit: string

  @Column()
  fileUrl: string

  @Column()
  fileSize: number

  @Column({ default: 0 })
  downloads: number

  @Column({
    type: "varchar",
    enum: DocumentStatus,
    default: DocumentStatus.ACTIVE,
  })
  status: DocumentStatus

  @ManyToOne(() => User)
  @JoinColumn({ name: "authorId" })
  author: User

  @Column()
  authorId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ type: "datetime", nullable: true })
  publishedAt: Date
}
