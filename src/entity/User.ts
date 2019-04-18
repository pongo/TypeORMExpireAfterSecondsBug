import {Entity, ObjectIdColumn, ObjectID, Column, Index} from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Index({ unique: true })
    @Column()
    login: string;
}
