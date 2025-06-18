import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger"

import type { PostsService } from "./posts.service"
import type { CreatePostDto } from "./dto/create-post.dto"
import type { UpdatePostDto } from "./dto/update-post.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import type { PaginationDto } from "../../common/dto/pagination.dto"

@ApiTags("Posts")
@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: "Create new post" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Request() req) {
    return this.postsService.create(createPostDto, req.user.id)
  }

  @ApiOperation({ summary: 'Get all posts' })
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  @ApiOperation({ summary: "Get featured posts" })
  @Get("featured")
  findFeatured() {
    return this.postsService.findFeatured()
  }

  @ApiOperation({ summary: "Get posts by category" })
  @Get("category/:category")
  findByCategory(@Param('category') category: string, @Query() paginationDto: PaginationDto) {
    return this.postsService.findByCategory(category, paginationDto)
  }

  @ApiOperation({ summary: 'Get post by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update post" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto)
  }

  @ApiOperation({ summary: 'Delete post' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
