import { Column, Entity, Index } from "typeorm";

import { SdpType } from "./sdp-type.enum";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription/toJSON
 */
@Index([
  'roomId',
  'fromUserId',
  'toUserId',
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
    type: "enum",
    enum: SdpType,
    nullable: true,
  })
  type: string | null;

  @Column({
    type: "string",
    nullable: true,
  })
  sdp: string | null;


  @Column({
    type: "boolean",
  })
  recieved: boolean;

}
