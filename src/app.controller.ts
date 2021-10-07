import { Controller, Get, Query } from '@nestjs/common';

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
    readSdp(@Query('currentUserId') currentUserId: number) {
        return this.appService.readPendingSdp(currentUserId);
    };

    @Get('read-ice')
    readIce(@Query('currentUserId') currentUserId: number) {
        return this.appService.readPendingIce(currentUserId);
    };

    @Get('mark-sdp')
    markSdp(@Query('currentUserId') currentUserId: number, @Query('fromUserId') fromUserId: number) {
        return this.appService.markSdp(currentUserId, fromUserId);
    };

    @Get('mark-ice')
    markIce(@Query('currentUserId') currentUserId: number, @Query('fromUserId') fromUserId: number) {
        return this.appService.markIce(currentUserId, fromUserId);
    };

    @Get('create-sdp')
    createSdp(@Query('currentUserId') currentUserId: number, @Query('toUserId') toUserId: number, @Query('sdp') sdp: string) {
        return this.appService.createSdp(currentUserId, toUserId, sdp);
    };

    @Get('create-ice')
    createIce(@Query('currentUserId') currentUserId: number, @Query('toUserId') toUserId: number, @Query('ice') ice: string) {
        return this.appService.createIce(currentUserId, toUserId, ice);
    };
}
