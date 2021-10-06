import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

  @PrimaryGeneratedColumn()
  id: number; // required by TypeORM


  @Column({
    type: "int",
  })
  roomId: number;

  @Column({
    type: "int",
  })
  fromUserId: number;

  /**
   * @see https://doc-kurento.readthedocs.io/en/stable/tutorials/java/tutorial-recorder.html
   * @description null
   */
  @Column({
    type: "int",
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
    type: "text",
    nullable: true,
  })
  sdp: string | null;


  @Column({
    type: "bool",
  })
  recieved: boolean;

}
