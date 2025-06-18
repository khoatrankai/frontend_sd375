import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./user.entity"

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  DOCUMENT = "document",
}

@Entity("media")
export class Media {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  originalName: string

  @Column({
    type: "varchar",
    enum: MediaType,
  })
  type: MediaType

  @Column()
  mimeType: string

  @Column()
  size: number

  @Column()
  url: string

  @Column({ nullable: true })
  description: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "uploadedById" })
  uploadedBy: User

  @Column()
  uploadedById: number

  @CreateDateColumn()
  uploadedAt: Date
}
