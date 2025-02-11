import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Player } from './entities/player.entity';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  /**
   * 
   * Add a new player to the database
   * 
   * @param createPlayerDto The data of the new player
   * @returns All of the data, inculuding the generated fields
   */

  @Post()
  @ApiResponse({
    status:201,
    description: 'The player has been succesfully created.',
    type: Player,
    example: {
      id: 5,
      name: 'Lionel Messi',
      goalCount: 65,
      birthDate: '2000-01-23'
    }
  })
  @ApiBadRequestResponse({
    description:'Validation error'
  })
  @ApiBearerAuth()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  /**
   * 
   * Returns all player data from the database.
   * 
   * @returns 
   */
  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  /**
   * 
   * Returns the data of a player with the given id
   * 
   * @param id 
   * @returns 
   */
    @ApiParam({
      name: 'id',
      description: 'The ID of the player',
      type: 'number'
    })
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    const player = this.playersService.findOne(+id);
    if (player == null) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }

  /**
   * 
   * Updates the data of a player with the given id
   * 
   * @param id 
   * @param updatePlayerDto 
   * @returns 
   */
  @ApiResponse({
    status: 200,
    description: "The player update succesfully",
    type: Player,
    example:{
      id: 1,
      name: 'Updated Lionel Messi',
      goalCount: 67,
      birthDate: '2000-01-23'      
    }
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(+id, updatePlayerDto);
  }

  /**
   * 
   * Delete a player with the given id
   * 
   * @param id 
   * @returns 
   */
  @ApiResponse({
    status:200,
    description: "The player has been succesfully deleted.",
    type:Player
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(+id);
  }
}