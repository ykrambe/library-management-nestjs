import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { BooksModule } from '../books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Book } from '../entities/book.entity';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/redis/redis.module';
import { BorrowModule } from '../borrow/borrow.module';
import { Borrow } from 'src/entities/borrow.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Book, Borrow],
      synchronize: true,
    }),
    AuthModule, BooksModule, UsersModule, BorrowModule, RedisModule ],


  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
