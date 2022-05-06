import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Users'})
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    username:string;
    @Column()
    password:string;
}