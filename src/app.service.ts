import { Injectable, OnModuleInit } from '@nestjs/common';

import { IceService } from './schema/ice/ice.service';
import { SdpService } from './schema/sdp/sdp.service';

/**
 * @todo check currentUserId
 */
@Injectable()
export class AppService implements OnModuleInit {

    userIds: number[] = [];

    getUsersInRoom(/*roomId: number*/) {
        return this.userIds.slice(0);
    };

    joinRoom() {
        const newId = Math.max(...this.userIds, -1) + 1;
        this.userIds.push(newId);
        return newId;
    };

    constructor(
        readonly iceService: IceService,
        readonly sdpService: SdpService,
    ) { }

    async onModuleInit() {
        await this.iceService.cleanAll();
        await this.sdpService.cleanAll();
    }

    readPendingSdp(currentUserId: number, roomId = 1) {
        return this.sdpService.readPending(roomId, currentUserId);
    };

    readPendingIce(currentUserId: number, roomId = 1) {
        return this.iceService.readPending(roomId, currentUserId);
    };

    markSdp(currentUserId: number, fromUserId: number, roomId = 1) {
        return this.sdpService.mark(roomId, fromUserId, currentUserId);
    };

    markIce(currentUserId: number, fromUserId: number, roomId = 1) {
        return this.iceService.mark(roomId, fromUserId, currentUserId);
    };

    createIce(currentUserId: number, toUserId: number, ice: string, roomId = 1) {
        return this.iceService.create({
            ice,
            fromUserId: currentUserId,
            toUserId,
            roomId,
            recieved: false,
            timestamp: Date.now(),
        });
    };

    createSdp(currentUserId: number, toUserId: number, sdp: string, roomId = 1) {
        return this.sdpService.create({
            sdp,
            fromUserId: currentUserId,
            toUserId,
            roomId,
            recieved: false,
            timestamp: Date.now(),
        });
    };
}
