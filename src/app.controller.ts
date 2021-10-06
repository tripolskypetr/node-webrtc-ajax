import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('api')
export class AppController {

    constructor(
        readonly appService: AppService,
    ) { }

    @Get('user-list')
    getUsersInRoom() {
        return this.appService.getUsersInRoom();
    };

    @Get('join-room')
    joinRoom() {
        return this.appService.joinRoom();
    };

    @Get('read-sdp')
    readSdp(@Param('currentUserId') currentUserId: number) {
        return this.appService.readPendingSdp(currentUserId);
    };

    @Get('read-ice')
    readIce(@Param('currentUserId') currentUserId: number) {
        return this.appService.readPendingIce(currentUserId);
    };

    @Get('mark-sdp')
    markSdp(@Param('currentUserId') currentUserId: number, @Param('fromUserId') fromUserId: number) {
        return this.appService.markSdp(currentUserId, fromUserId);
    };

    @Get('mark-ice')
    markIce(@Param('currentUserId') currentUserId: number, @Param('fromUserId') fromUserId: number) {
        return this.appService.markIce(currentUserId, fromUserId);
    };

    @Get('create-sdp')
    createSdp(@Param('currentUserId') currentUserId: number, @Param('toUserId') toUserId: number, data: string) {
        return this.appService.createSdp(currentUserId, toUserId, data);
    };

    @Get('create-ice')
    createIce(@Param('currentUserId') currentUserId: number, @Param('toUserId') toUserId: number, data: string) {
        return this.appService.createIce(currentUserId, toUserId, data);
    };
}
