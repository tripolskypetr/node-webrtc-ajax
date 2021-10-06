import { Column, Entity, Index } from "typeorm";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate/toJSON
 */
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

  /**
   * @see https://doc-kurento.readthedocs.io/en/stable/tutorials/java/tutorial-recorder.html
   * @description null
   */
  @Column({
    type: "number",
    nullable: true,
  })
  toUserId: number | null;


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
    type: "number",
    nullable: true,
  })
  sdpMLineIndex: number;

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
