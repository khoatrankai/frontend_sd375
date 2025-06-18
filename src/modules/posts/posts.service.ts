import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import type { Repository } from "typeorm"

import { Post, PostStatus } from "../../entities/post.entity"
import type { CreatePostDto } from "./dto/create-post.dto"
import type { UpdatePostDto } from "./dto/update-post.dto"
import type { PaginationDto } from "../../common/dto/pagination.dto"

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, authorId: number) {
    const post = this.postsRepository.create({
      ...createPostDto,
      authorId,
      publishedAt: createPostDto.status === PostStatus.PUBLISHED ? new Date() : null,
    })

    const savedPost = await this.postsRepository.save(post)

    return {
      success: true,
      message: "Tạo bài viết thành công",
      data: savedPost,
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 10, search, category, status } = paginationDto

    const queryBuilder = this.postsRepository
      .createQueryBuilder("post")
      .leftJoinAndSelect("post.author", "author")
      .orderBy("post.createdAt", "DESC")

    if (search) {
      queryBuilder.andWhere("(post.title LIKE :search OR post.content LIKE :search)", { search: `%${search}%` })
    }

    if (category && category !== "all") {
      queryBuilder.andWhere("post.category = :category", { category })
    }

    if (status && status !== "all") {
      queryBuilder.andWhere("post.status = :status", { status })
    }

    const [posts, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()

    return {
      success: true,
      data: {
        posts: posts.map((post) => ({
          ...post,
          author: post.author.name,
        })),
        total,
        page,
        limit,
      },
    }
  }

  async findFeatured() {
    const posts = await this.postsRepository.find({
      where: {
        featured: true,
        status: PostStatus.PUBLISHED,
      },
      relations: ["author"],
      order: { createdAt: "DESC" },
      take: 6,
    })

    return {
      success: true,
      data: posts.map((post) => ({
        ...post,
        author: post.author.name,
      })),
    }
  }

  async findByCategory(category: string, paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto

    const [posts, total] = await this.postsRepository.findAndCount({
      where: {
        category: category as any,
        status: PostStatus.PUBLISHED,
      },
      relations: ["author"],
      order: { createdAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    })

    return {
      success: true,
      data: {
        posts: posts.map((post) => ({
          ...post,
          author: post.author.name,
        })),
        total,
        page,
        limit,
      },
    }
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ["author"],
    })

    if (!post) {
      throw new NotFoundException("Không tìm thấy bài viết")
    }

    // Increment views
    await this.postsRepository.increment({ id }, "views", 1)

    return {
      success: true,
      data: {
        ...post,
        author: post.author.name,
      },
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne({ where: { id } })

    if (!post) {
      throw new NotFoundException("Không tìm thấy bài viết")
    }

    const updateData = {
      ...updatePostDto,
      publishedAt: updatePostDto.status === PostStatus.PUBLISHED && !post.publishedAt ? new Date() : post.publishedAt,
    }

    await this.postsRepository.update(id, updateData)

    const updatedPost = await this.postsRepository.findOne({
      where: { id },
      relations: ["author"],
    })

    return {
      success: true,
      message: "Cập nhật bài viết thành công",
      data: {
        ...updatedPost,
        author: updatedPost.author.name,
      },
    }
  }

  async remove(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } })

    if (!post) {
      throw new NotFoundException("Không tìm thấy bài viết")
    }

    await this.postsRepository.remove(post)

    return {
      success: true,
      message: "Xóa bài viết thành công",
    }
  }
}
