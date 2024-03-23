import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Artist } from './artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @OneToOne(() => Artist, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: Artist;
}
