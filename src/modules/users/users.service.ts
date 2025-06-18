import { Injectable, NotFoundException, ConflictException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"
import * as bcrypt from "bcryptjs"

import { User, UserRole, UserStatus } from "../../entities/user.entity"
import type { CreateUserDto } from "./dto/create-user.dto"
import type { UpdateUserDto } from "./dto/update-user.dto"
import type { PaginationDto } from "../../common/dto/pagination.dto"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    // Create default admin user if not exists
    await this.createDefaultAdmin()
  }

  private async createDefaultAdmin() {
    const adminExists = await this.usersRepository.findOne({
      where: { username: "admin" },
    })

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10)

      const admin = this.usersRepository.create({
        username: "admin",
        password: hashedPassword,
        name: "Quản trị viên",
        email: "admin@f375.mil.vn",
        phone: "777322",
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        unit: "Chỉ huy sư đoàn",
      })

      await this.usersRepository.save(admin)
      console.log("✅ Default admin user created")
    }
  }

  async create(createUserDto: CreateUserDto) {
    // Check if username or email already exists
    const existingUser = await this.usersRepository.findOne({
      where: [{ username: createUserDto.username }, { email: createUserDto.email }],
    })

    if (existingUser) {
      throw new ConflictException("Tên đăng nhập hoặc email đã tồn tại")
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })

    const savedUser = await this.usersRepository.save(user)
    const { password, ...result } = savedUser

    return {
      success: true,
      message: "Tạo người dùng thành công",
      data: result,
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, search, status } = paginationDto

    const queryBuilder = this.usersRepository
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.username",
        "user.name",
        "user.email",
        "user.phone",
        "user.role",
        "user.status",
        "user.unit",
        "user.avatar",
        "user.lastLogin",
        "user.createdAt",
      ])
      .orderBy("user.createdAt", "DESC")

    if (search) {
      queryBuilder.andWhere("(user.name LIKE :search OR user.email LIKE :search OR user.username LIKE :search)", {
        search: `%${search}%`,
      })
    }

    if (status && status !== "all") {
      queryBuilder.andWhere("user.status = :status", { status })
    }

    const [users, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()

    return {
      success: true,
      data: {
        users,
        total,
        page,
        limit,
      },
    }
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: [
        "id",
        "username",
        "name",
        "email",
        "phone",
        "role",
        "status",
        "unit",
        "avatar",
        "lastLogin",
        "createdAt",
        "updatedAt",
      ],
    })

    if (!user) {
      throw new NotFoundException("Không tìm thấy người dùng")
    }

    return {
      success: true,
      data: user,
    }
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } })
  }

  async updateLastLogin(id: number) {
    await this.usersRepository.update(id, { lastLogin: new Date() })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException("Không tìm thấy người dùng")
    }

    const updateData = { ...updateUserDto }

    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    await this.usersRepository.update(id, updateData)

    const updatedUser = await this.usersRepository.findOne({
      where: { id },
      select: [
        "id",
        "username",
        "name",
        "email",
        "phone",
        "role",
        "status",
        "unit",
        "avatar",
        "lastLogin",
        "createdAt",
        "updatedAt",
      ],
    })

    return {
      success: true,
      message: "Cập nhật người dùng thành công",
      data: updatedUser,
    }
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException("Không tìm thấy người dùng")
    }

    if (user.role === UserRole.ADMIN) {
      throw new ConflictException("Không thể xóa tài khoản quản trị viên")
    }

    await this.usersRepository.remove(user)

    return {
      success: true,
      message: "Xóa người dùng thành công",
    }
  }

  async changeStatus(id: number, status: UserStatus) {
    const user = await this.usersRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException("Không tìm thấy người dùng")
    }

    await this.usersRepository.update(id, { status })

    return {
      success: true,
      message: "Cập nhật trạng thái thành công",
    }
  }
}
