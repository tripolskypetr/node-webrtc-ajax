import { Column, Entity, Index } from "typeorm";

@Index([
  'roomId',
  'fromUserId',
  'toUserId',
], {
  unique: true,
})
@Entity('ice')
export class InformationConnectivityEstablishment {

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
    type: "string",
    nullable: true,
  })
  candidate: string;

  @Column({
    type: "string",
    nullable: true,
  })
  sdpMid: string;

  @Column({
    type: "string",
    nullable: true,
  })
  sdpMLineIndex: string;

  @Column({
    type: "string",
    nullable: true,
  })
  usernameFragment: string;


  @Column({
    type: "boolean",
  })
  recieved: boolean;

}
