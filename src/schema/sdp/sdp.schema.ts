import { Column, Entity, Index } from "typeorm";

import { SdpType } from "./sdp-type.enum";

@Index([
  'roomId',
  'fromUserId',
  'toUserId',
  "type",
], {
  unique: true,
})
@Entity('sdp')
export class SessionDescriptionProtocol {

  @Column({
    type: "number",
  })
  roomId: number;

  @Column({
    type: "number",
  })
  fromUserId: number;

  @Column({
    type: "number",
  })
  toUserId: number;

  @Column({
    type: "enum",
    enum: SdpType,
    nullable: true,
  })
  type: string;

  @Column({
    type: "string",
  })
  sdp: string;

  @Column({
    type: "boolean",
  })
  recieved: boolean;

}
