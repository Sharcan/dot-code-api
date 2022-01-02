import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { execSync } from 'child_process';
import {v4 as uuidv4} from 'uuid';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('editor')
  launchScript(@Body() body) 
  {
    let extension = '';
    let executable = ''; 
    switch(body.language) {
      case 'php':
        extension = 'php'
        executable = 'php'
        break

      case 'javascript':
        extension = 'js'
        executable = 'node'
        break

      case 'python':
        extension = 'py'
        executable = 'python3'
        break

      default:
        return 'Invalid language'
    }

    let fileName: string = uuidv4() + '.' + extension;
    let filePath: string = 'uploads/temp/' + fileName;
    fs.appendFileSync(filePath, body.code);

    let result = {};
    try {
      result = {
        result: execSync(`${executable} ${filePath} ?>&1`).toString()
      };
    } catch(err) {
      result = {
        error: err.stderr.toString()
      }
    }
    fs.unlinkSync(filePath);

    return result;
  }
}
