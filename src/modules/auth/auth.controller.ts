import { Controller, Post, UseGuards, Get, Request, HttpCode, HttpStatus } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"

import type { AuthService } from "./auth.service"
import { LocalAuthGuard } from "./guards/local-auth.guard"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return {
      success: true,
      data: req.user,
    };
  }

  @ApiOperation({ summary: "User logout" })
  @ApiResponse({ status: 200, description: "Logout successful" })
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout() {
    return {
      success: true,
      message: "Đăng xuất thành công",
    }
  }
}
