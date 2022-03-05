import { NoPrintException } from './exceptions/NoPrintException';
import { BadCodeException } from './exceptions/BadCodeException';
import { BadResultException } from './exceptions/BadResultException';
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
    console.log('cc');
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
      const output = execSync(`${executable} ${filePath}`).toString();

      if(!body.code.includes('console.log')) {
        throw new NoPrintException('N\oubliez pas le console.log ! ;)');
      }

      if(output.trim() != body.expectedResult) {
        throw new BadResultException;
      }

      body.expectedCode.forEach(code => {
        if(!body.code.includes(code)) {
          throw new BadCodeException;
        }
      });

      result = {
        output: output.trim()
      };
    } catch(err) {
      result = {
        output: err.stderr ? err.stderr.toString() : null,
        error: err.stderr ? 'Oups ! On dirait qu\'il y a une erreur :(' : err.message
      }
    }
    fs.unlinkSync(filePath);

    return result;
  }
}
