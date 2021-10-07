import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InformationConnectivityEstablishment as Ice } from './ice.schema';

@Injectable()
export class IceService {

    constructor(
        @InjectRepository(Ice) private iceRepository: Repository<Ice>,
    ) { }

    async create(sdp: Ice): Promise<Ice> {
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
        const target = await this.iceRepository.preload({
            recieved: true,
            roomId,
            fromUserId,
            toUserId,
        });
        return target;
    };

    async cleanAll() {
        /*try {
            await this.iceRepository.query(`TRUNCATE TABLE \`ice\`;`);
        } catch (err) {
            console.log(`ice.service cleanAll truncate failure`);
            throw err;
        }*/
    };

};
