import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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
    type: "text",
    nullable: true,
  })
  candidate: string;

  @Column({
    type: "text",
    nullable: true,
  })
  sdpMid: string;

  @Column({
    type: "int",
    nullable: true,
  })
  sdpMLineIndex: number;

  @Column({
    type: "text",
    nullable: true,
  })
  usernameFragment: string;


  @Column({
    type: "bool",
  })
  recieved: boolean;

}
