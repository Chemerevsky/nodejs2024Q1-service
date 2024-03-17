import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum EntityType {
    ALBUM = "album",
    ARTIST = "artist",
    TRACK = "track",
}

@Entity()
export class Fav {
  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: EntityType,
  })
  entityType: EntityType;

  @Column()
  entityId: string;
}