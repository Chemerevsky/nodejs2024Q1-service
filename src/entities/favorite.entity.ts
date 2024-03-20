import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Album } from "./album.entity"
import { Artist } from "./artist.entity"
import { Track } from "./track.entity"

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Album, (album) => album.id, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Artist, (artist) => artist.id, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  artists: Artist[]

  @ManyToMany(() => Track, (track) => track.id, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  tracks: Track[]
}