import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ServeStaticModule } from "@nestjs/serve-static"
import { join } from "path"

import { DatabaseConfig } from "./database/database.config"
import { AuthModule } from "./modules/auth/auth.module"
import { UsersModule } from "./modules/users/users.module"
import { PostsModule } from "./modules/posts/posts.module"
import { MediaModule } from "./modules/media/media.module"
import { DocumentsModule } from "./modules/documents/documents.module"
import { SettingsModule } from "./modules/settings/settings.module"
import { NewsModule } from "./modules/news/news.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
      serveRoot: "/uploads",
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    MediaModule,
    DocumentsModule,
    SettingsModule,
    NewsModule,
  ],
})
export class AppModule {}
