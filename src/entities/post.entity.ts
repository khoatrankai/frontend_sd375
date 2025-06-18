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

export enum PostStatus {
  PUBLISHED = "published",
  DRAFT = "draft",
  PENDING = "pending",
}

export enum PostCategory {
  SU_DOAN = "su-doan",
  QUAN_SU = "quan-su",
  TRONG_NUOC = "trong-nuoc",
  QUOC_TE = "quoc-te",
}

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column("text")
  content: string

  @Column("text", { nullable: true })
  excerpt: string

  @Column({
    type: "varchar",
    enum: PostCategory,
  })
  category: PostCategory

  @Column({
    type: "varchar",
    enum: PostStatus,
    default: PostStatus.DRAFT,
  })
  status: PostStatus

  @Column({ nullable: true })
  image: string

  @Column("simple-array", { nullable: true })
  tags: string[]

  @Column({ default: 0 })
  views: number

  @Column({ default: false })
  featured: boolean

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
