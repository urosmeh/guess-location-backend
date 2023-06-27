import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  //   migrationsTableName: 'migrations',
  //   migrations: ['dist/migrations/*.js'],
};

export default typeOrmModuleOptions;
