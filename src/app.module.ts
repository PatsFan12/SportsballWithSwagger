import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { TeamsModule } from './teams/teams.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [PlayersModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
