import { Injectable } from "@nestjs/common"
import type { ConfigService } from "@nestjs/config"
import type { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm"

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mssql",
      host: this.configService.get("DB_HOST", "localhost"),
      port: this.configService.get("DB_PORT", 1433),
      username: this.configService.get("DB_USERNAME"),
      password: this.configService.get("DB_PASSWORD"),
      database: this.configService.get("DB_DATABASE"),
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      synchronize: this.configService.get("NODE_ENV") !== "production",
      logging: this.configService.get("NODE_ENV") === "development",
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }
  }
}
