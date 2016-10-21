export class ImageBoard {
    private readonly adminBarSelector = '.adminbar, #adminbar, .boardlist, .menu, .board-list';
    private readonly postSelector = 'td.reply[id], div.reply[id], td.post[id], div.post[id], div.thread_OP[id], div.thread_reply[id]';
    private readonly postBodySelector = 'blockquote, .body, .postbody, .post_body';
    private readonly nameSelector = '.postername, .name, .commentpostername, .poster-name';
    private readonly tripSelector = '.postertrip, .trip, .tripcode';

    public getAdminBar(): JQuery {
        return $(this.adminBarSelector).first();
    }

    public getPosts(): JQuery {
        return $(this.postSelector);
    }

    public getName(post: JQuery): string {
        return post.find(this.nameSelector).text();
    }

    public getTripcode(post: JQuery): string {
        return post.find(this.tripSelector).text();
    }

    public getPostBody(posts: JQuery): JQuery {
        return posts.find(this.postBodySelector);
    }

    public getPostBodyText(post: JQuery): string {
        return this.getPostBody(post).text();
    }

    public getPostBodyLinks(posts: JQuery): JQuery {
        return this.getPostBody(posts).find('a');
    }
}
