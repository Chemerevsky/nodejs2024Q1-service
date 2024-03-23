import { Entity, Column, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @VersionColumn()
  version: number;

  @Column({ type: 'bigint', nullable: false })
  createdAt: number;

  @Column({ type: 'bigint', nullable: false })
  updatedAt: number;
}
