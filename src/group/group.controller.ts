import { Controller, Post, Body, Get } from '@nestjs/common';

import { GroupService } from './group.service';
import { GroupModule } from './group.module';

@Controller('groups')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
  ) {}

  @Post('create')
  async createGroup(
    @Body('name') name: string,
    @Body('trainer') trainer: number,
    @Body('participants') participants: number[],
  ): Promise<GroupModule> {
    return this.groupService.createGroup(name, trainer, participants);
  }

  @Get('find')
  async getGroupsByUser(
    @Body('userId') userId: number,
    @Body('userRole') userRole: number,
  ): Promise<GroupModule[]> {
    return this.groupService.getGroupsByUser(userId, userRole)
  }
}
