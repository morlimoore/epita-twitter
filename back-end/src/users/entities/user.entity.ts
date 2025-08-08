import { Column, Entity, PrimaryGeneratedColumn, Unique, CreateDateColumn } from 'typeorm';

@Entity('users')
@Unique("UQ_Username", ['username'])
@Unique("UQ_Email", ['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // Profile fields
    @Column({ nullable: true })
    displayName: string;

    @Column({ nullable: true, length: 160 })
    bio: string;

    @Column({ nullable: true })
    location: string;

    @Column({ nullable: true })
    website: string;

    @Column({ nullable: true })
    dateOfBirth: Date;

    @Column({ nullable: true })
    profileImageUrl: string;

    @Column({ nullable: true })
    coverImageUrl: string;

    @CreateDateColumn()
    dateJoined: Date;

    @Column({ default: 0 })
    followersCount: number;

    @Column({ default: 0 })
    followingCount: number;
}