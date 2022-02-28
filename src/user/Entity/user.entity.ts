import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    slug: string;

    // TODO: Ajouter les relations

    @Column()
    socket_id: string;

    @Column()
    pseudo: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    is_guest: boolean;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}