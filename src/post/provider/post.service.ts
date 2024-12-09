import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
    public findAllPost() {
        return 'All posts';
    };
}
