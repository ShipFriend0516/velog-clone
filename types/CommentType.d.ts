export default interface CommentType {
  _id: string;
  post_id: string;
  content: string;
  commentAuthor: {
    _id: string;
    username: string;
    thumbnailUrl?: string;
  };
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
