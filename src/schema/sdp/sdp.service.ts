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

    async readPending(roomId: number, toUserId: number): Promise<Sdp[]> {
        const target = await this.sdpRepository.find({
            roomId,
            toUserId,
            recieved: false,
        });
        return target;
    };

    async mark(roomId: number, fromUserId: number, toUserId: number): Promise<Sdp> {
        const target = await this.sdpRepository.preload({
            recieved: true,
            roomId,
            fromUserId,
            toUserId,
        });
        return target;
    };


    async cleanAll() {
        /*try {
            await this.sdpRepository.query(`TRUNCATE TABLE \`sdp\`;`);
        } catch (err) {
            console.log(`sdp.service cleanAll truncate failure`);
            throw err;
        }*/
    };

};
