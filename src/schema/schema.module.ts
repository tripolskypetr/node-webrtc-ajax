import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SdpService } from './sdp/sdp.service';
import { IceService } from './ice/ice.service';

import { SessionDescriptionProtocol as Sdp } from './sdp/sdp.schema';
import { InformationConnectivityEstablishment as Ice } from './ice/ice.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sdp,
      Ice,
    ]),
  ],
  providers: [
    SdpService,
    IceService,
  ],
  exports: [
    SdpService,
    IceService,
  ],
})
export class SchemaModule { }
