import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from "typeorm"

@Entity("settings")
export class Settings {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: "Sư đoàn phòng không 375" })
  siteName: string

  @Column({ default: "Cổng thông tin điện tử Sư đoàn phòng không 375" })
  siteDescription: string

  @Column({ default: "banthongtin.f375@mail.bqp" })
  contactEmail: string

  @Column({ default: "777322" })
  contactPhone: string

  @Column({ default: "Trạm CNTT F375" })
  address: string

  @Column({ default: true })
  enableComments: boolean

  @Column({ default: false })
  enableRegistration: boolean

  @Column({ default: true })
  enableNotifications: boolean

  @Column({ default: false })
  maintenanceMode: boolean

  @Column({ default: "10MB" })
  maxFileSize: string

  @Column({ default: "jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx,ppt,pptx" })
  allowedFileTypes: string

  @Column({ default: "daily" })
  backupFrequency: string

  @Column({ default: true })
  emailNotifications: boolean

  @Column({ default: false })
  smsNotifications: boolean

  @UpdateDateColumn()
  updatedAt: Date
}
