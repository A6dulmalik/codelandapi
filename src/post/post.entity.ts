import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enums/postType.enum";
import { PostStatus } from "./enums/postStatus.enum";
import { CreatePostDto } from "./dto/createPost.dto";
import { MetaOption } from "src/meta-options/meta-option.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    title: string;

    @Column({type: 'enum', enum: PostType, default: PostType.STORY})
    postType: PostType;

    @Column({type: 'enum', enum:PostStatus, default: PostStatus.DRAFT})
    postStatus: PostStatus;

    @Column('varchar')
    content:string;

    @Column({nullable: true})
    imageUrl: string;

    @Column({type: 'date'}) //Explicit date column
    publishedDate: Date;

    @OneToOne(() => MetaOption)
    @JoinColumn()
    metaOptions?: MetaOption;

    // @Column('text', {array: true, nullable: true})
    // tags: string[];
}