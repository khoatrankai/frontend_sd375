import { Injectable } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"

import type { UsersService } from "../users/users.service"
import type { User } from "../../entities/user.entity"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username)

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    }

    // Update last login
    await this.usersService.updateLastLogin(user.id)

    return {
      success: true,
      message: "Đăng nhập thành công",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        roleName: this.getRoleName(user.role),
        status: user.status,
        statusName: this.getStatusName(user.status),
        unit: user.unit,
        lastLogin: new Date().toLocaleDateString("vi-VN"),
        avatar: user.avatar,
      },
      token: this.jwtService.sign(payload),
    }
  }

  private getRoleName(role: string): string {
    const roleNames = {
      admin: "Quản trị viên",
      editor: "Biên tập viên",
      author: "Tác giả",
      viewer: "Người xem",
    }
    return roleNames[role] || role
  }

  private getStatusName(status: string): string {
    const statusNames = {
      active: "Hoạt động",
      inactive: "Không hoạt động",
      pending: "Chờ duyệt",
    }
    return statusNames[status] || status
  }
}
