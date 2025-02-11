import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayersService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }

  create(createPlayerDto: CreatePlayerDto) {
    return this.db.player.create({ 
      data: createPlayerDto
    });
  }

  findAll() {
    return this.db.player.findMany();
  }

  async findOne(id: number) {
    return await this.db.player.findUnique({
      where: {
        id: id
      }
  });

  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return await this.db.player.update({
      where: {
        id: id
      },
      data: updatePlayerDto
    });
  }

  remove(id: number) {
    return this.db.player.delete({
      where: {
        id: id
      }
    });
  }
}

