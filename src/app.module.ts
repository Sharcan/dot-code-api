import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeMonacoModule } from './ide-monaco/ide-monaco.module';
import { EventGateway } from './gateways/event.gateway';

@Module({
  imports: [IdeMonacoModule],
  controllers: [AppController],
  providers: [AppService, EventGateway],
})
export class AppModule {}
