import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SessionDescriptionProtocol as Sdp } from './sdp.schema';

@Injectable()
export class SdpService {

    constructor(
        @InjectRepository(Sdp) private iceRepository: Repository<Sdp>,
    ) { }

    async create(sdp: Sdp): Promise<Sdp> {
        const target = this.iceRepository.create(sdp);
        return this.iceRepository.save(target);
    };

    async readPending(roomId: number, toUserId: number): Promise<Sdp[]> {
        const target = await this.iceRepository.find({
            roomId,
            toUserId,
            recieved: false,
        });
        return target;
    };

    async mark(roomId: number, fromUserId: number, toUserId: number): Promise<Sdp> {
        const target = await this.iceRepository.preload({
            recieved: true,
            roomId,
            fromUserId,
            toUserId,
        });
        return target;
    };

};
