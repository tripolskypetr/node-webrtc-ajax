import { Injectable } from '@nestjs/common';

import { IceService } from './schema/ice/ice.service';
import { SdpService } from './schema/sdp/sdp.service';

/**
 * @todo check currentUserId
 */
@Injectable()
export class AppService {

    userIds: number[] = [];

    getUsersInRoom(/*roomId: number*/) {
        return this.userIds.slice(0);
    };

    joinRoom() {
        const newId = Math.max(...this.userIds) + 1;
        this.userIds.push(newId);
        return newId;
    };

    constructor(
        readonly iceService: IceService,
        readonly sdpService: SdpService,
    ) { }

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

    createIce(currentUserId: number, toUserId: number, data: string, roomId = 1) {
        return this.iceService.create({
            ...JSON.parse(data),
            fromUserId: currentUserId,
            toUserId,
            roomId,
        });
    };

    createSdp(currentUserId: number, toUserId: number, data: string, roomId = 1) {
        return this.sdpService.create({
            ...JSON.parse(data),
            fromUserId: currentUserId,
            toUserId,
            roomId,
        });
    };
}
