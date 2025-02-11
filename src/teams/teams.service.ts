import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamsService {
  db: PrismaService;

  constructor(db: PrismaService) {
    this.db = db;
  }

  create(createTeamDto: CreateTeamDto) {
    return this.db.team.create({
      data: createTeamDto
    });
  }

  findAll() {
    return this.db.team.findMany();
  }

  async findOne(id: number) {
    return await this.db.team.findUnique({
      where: {
        id: id
      }
    });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    return await this.db.team.update({
      where: {
        id: id
      },
      data: updateTeamDto
    });
  }

  remove(id: number) {
    return this.db.team.delete({
      where: {
        id: id
      }
    });
  }
}
