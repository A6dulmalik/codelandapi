import { Injectable } from '@nestjs/common';
import { GetPostParamDto } from 'src/dto/postParam.dto';

@Injectable()
export class PostService {
    posts = [
        {
            "title":"The Originals",
            "postType":"post",
            "postStatus":"scheduled",
            "content":"The origins of vampires, the firs family",
            "tags":["thriller","crime","romance"]
        },
        {
            "title":"Into The Wormhole",
            "postType":"post",
            "postStatus":"published",
            "content":"Taking a deep dive into the cosmos",
            "tags":["cosmology","astronomy","space"]
        }
    ]
    public findAllPost() {
        return this.posts;
    };

    public findSinglePost(getpostparamdto: GetPostParamDto) {
        return this.posts[1];
    }
}
