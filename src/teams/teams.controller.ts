import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Team } from './entities/team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /**
   * 
   * Add a new team for the database
   * 
   * @param createTeamDto 
   * @returns 
   */
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The team has been succesfully created.',
    type: Team,
    example: {
      country: "Hungary"
    }
  })
  @ApiBadRequestResponse({
    description: 'Validation error'
  })
  @ApiBearerAuth()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }


  /**
   * 
   * Returns all team from the database.
   * 
   * @returns 
   */
  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  /**
   * 
   * Returns the data of a team with the given id
   * 
   * @param id 
   * @returns 
   */
   @ApiParam({
      name: 'id',
      description: 'The ID of the team',
      type: 'number'
   })

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const team = await this.teamsService.findOne(+id);
    if (team == null) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }
    return team;
  }


  /**
   * 
   * Updates the data of a player with the given id
   * 
   * @param id 
   * @param updateTeamDto 
   * @returns 
   */
  @ApiResponse({
    status:200,
    description: "The team update succesfully",
    type: Team,
    example: {
      id: 1,
      country: "Hungary"
    }
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  /**
   * 
   * Delete the team witha  given id
   * 
   * @param id 
   * @returns 
   */
   @ApiResponse({
    status: 200,
    description: "The team has been deleted from the database",
    type: Team
   })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
