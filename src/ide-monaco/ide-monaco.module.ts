import { Module } from '@nestjs/common';
import { IdeMonacoController } from './controller/ide-monaco.controller';

@Module({
  controllers: [IdeMonacoController]
})
export class IdeMonacoModule {}
