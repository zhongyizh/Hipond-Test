class Post {
    postId;
    userId;
    title;
    body;
    location;
    postDate;
    postType;
    viewCount;

    constructor({ post_id, user_id, text, body, location, post_date, post_type, view_count }) {
        this.postId = post_id ?? "0000000-0000-0000-0000-000000000000";
        this.userId = user_id ?? "ortx2500000000000000000000000";
        this.title = text ?? "获取标题失败";
        this.body = body ?? "获取正文失败";
        this.location = location ?? "";
        this.postDate = post_date ?? "1712110754814";
        this.postType = post_type ?? "life";
        this.viewCount = view_count ?? 0;
    }
}