import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InformationConnectivityEstablishment as Ice } from './ice.schema';

@Injectable()
export class IceService {

    constructor(
        @InjectRepository(Ice) private sdpRepository: Repository<Ice>,
    ) { }

    async create(sdp: Ice): Promise<Ice> {
        const target = this.sdpRepository.create(sdp);
        return this.sdpRepository.save(target);
    };

    async readPending(roomId: number, toUserId: number): Promise<Ice[]> {
        const target = await this.sdpRepository.find({
            roomId,
            toUserId,
            recieved: false,
        });
        return target;
    };

    async mark(roomId: number, fromUserId: number, toUserId: number): Promise<Ice> {
        const target = await this.sdpRepository.preload({
            recieved: true,
            roomId,
            fromUserId,
            toUserId,
        });
        return target;
    };

};
