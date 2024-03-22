import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Artist } from "./artist.entity"
import { Album } from "./album.entity"

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  artistId: string | null;

  @OneToOne(() => Artist, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  artist: Artist;

  @Column({nullable: true})
  albumId: string | null;
  
  @OneToOne(() => Album, {
    onDelete: 'SET NULL'
  })
  @JoinColumn()
  album: Album;

  @Column()
  duration: number;
}