import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiExcludeEndpoint()
  @Redirect('/swagger', 301)
  getSwagger(): void {}

  @Get('health')
  @ApiOperation({
    summary: 'Check health of application',
    description: 'This endpoint will help us to check health of application.'
  })
  getHealth(): string {
    return this.appService.getHealth();
  }
}
