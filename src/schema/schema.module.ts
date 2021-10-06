import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SdpService } from './sdp/sdp.service';
// ...

import { SessionDescriptionProtocol as Sdp } from './sdp/sdp.schema';
// ...

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sdp,
    ]),
  ],
  providers: [ SdpService ],
  exports: [ SdpService ]
})
export class SchemaModule { }
