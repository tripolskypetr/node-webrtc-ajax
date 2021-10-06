import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SessionDescriptionProtocol as Sdp } from './sdp.schema';

@Injectable()
export class SdpService {

    constructor(
        @InjectRepository(Sdp) private sdpRepository: Repository<Sdp>,
    ) { }

    async create(sdp: Sdp): Promise<Sdp> {
        const target = this.sdpRepository.create(sdp);
        return this.sdpRepository.save(target);
    };

    async update(roomId: number, fromUserId: number, toUserId: number): Promise<Sdp> {
        const target = await this.sdpRepository.preload({
            recieved: true,
            roomId,
            fromUserId,
            toUserId,
        });
        return target;
    };

};
