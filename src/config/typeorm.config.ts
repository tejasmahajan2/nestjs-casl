import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const baseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
    extra: {
      timezone: 'UTC', // Ensures the timezone is set to UTC
    },
  };

  // Add SSL configuration for production
  if (process.env.NODE_ENV === 'production') {
    return {
      ...baseConfig,
      ssl: { rejectUnauthorized: false }, // Explicitly set SSL
    };
  }

  return baseConfig;
};
