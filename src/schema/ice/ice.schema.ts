import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate/toJSON
 */
@Index([
  'roomId',
  'fromUserId',
  'toUserId',
  'timestamp',
], {
  unique: true,
})
@Entity('ice')
export class InformationConnectivityEstablishment {

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

  /**
   * @deprecated
   * @see roomId
   */
  @Column({
    type: "bigint",
  })
  timestamp: number;


  @Column({
    type: "text",
    nullable: true,
  })
  candidate: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  sdpMid: string | null;

  @Column({
    type: "int",
    nullable: true,
  })
  sdpMLineIndex: number | null;

  @Column({
    type: "text",
    nullable: true,
  })
  usernameFragment: string | null;


  @Column({
    type: "bool",
  })
  recieved: boolean;

}
