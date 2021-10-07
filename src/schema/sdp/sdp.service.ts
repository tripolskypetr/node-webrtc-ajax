import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { SessionDescriptionProtocol as Sdp } from './sdp.schema';

@Injectable()
export class SdpService {

    constructor(
        @InjectRepository(Sdp) private sdpRepository: Repository<Sdp>,
    ) { }

    /**
     * @description TypeORM has not support of multiple key index 
     * @todo refactor
     */
    async findOne(roomId: number, fromUserId: number, toUserId: number,) {
        const other = await this.sdpRepository.find({
            roomId,
            fromUserId,
            toUserId,
        });
        const timestamp = await Math.max(...other.map(({timestamp}) => timestamp), -1);
        const target = await this.sdpRepository.findOne({
            roomId,
            fromUserId,
            toUserId,
            timestamp,
        });
        return target;
    };

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
        const target = await this.findOne(roomId, fromUserId, toUserId);
        target.recieved = true;
        this.sdpRepository.save(target);
        return target;
    };


    async cleanAll() {
        try {
            const all = await this.sdpRepository.find({});
            await Promise.all(all.map((target) => this.sdpRepository.delete(target)));
        } catch (err) {
            console.log(`sdp.service cleanAll truncate failure`);
            throw err;
        }
    };

};
