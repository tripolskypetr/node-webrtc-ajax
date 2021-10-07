import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InformationConnectivityEstablishment as Ice } from './ice.schema';

@Injectable()
export class IceService {

    constructor(
        @InjectRepository(Ice) private iceRepository: Repository<Ice>,
    ) { }

    /**
     * @description TypeORM has not support of multiple key index 
     * @todo refactor
     */
    async findOne(roomId: number, fromUserId: number, toUserId: number,) {
        const other = await this.iceRepository.find({
            roomId,
            fromUserId,
            toUserId,
        });
        const timestamp = await Math.max(...other.map(({timestamp}) => timestamp), -1);
        const target = await this.iceRepository.findOne({
            roomId,
            fromUserId,
            toUserId,
            timestamp,
        });
        return target;
    };

    async create(sdp: Partial<Ice>): Promise<Ice> {
        const target = this.iceRepository.create(sdp);
        return this.iceRepository.save(target);
    };

    async readPending(roomId: number, toUserId: number): Promise<Ice[]> {
        const target = await this.iceRepository.find({
            roomId,
            toUserId,
            recieved: false,
        });
        return target;
    };

    async mark(roomId: number, fromUserId: number, toUserId: number): Promise<Ice> {
        const target = await this.findOne(roomId, fromUserId, toUserId);
        target.recieved = true;
        await this.iceRepository.save(target);
        return target;
    };

    async cleanAll() {
        try {
            const all = await this.iceRepository.find({});
            await Promise.all(all.map((target) => this.iceRepository.delete(target)));
        } catch (err) {
            console.log(`ice.service cleanAll truncate failure`);
            throw err;
        }
    };

};
