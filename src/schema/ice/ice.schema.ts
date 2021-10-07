import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate/toJSON
 * @description Генерируется на каждый вариант подключения, тоесть, много
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
  })
  ice: string;

  @Column({
    type: "bool",
  })
  recieved: boolean;

}
