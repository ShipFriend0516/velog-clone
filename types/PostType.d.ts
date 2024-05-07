export default interface PostType {
  _id: string;
  title: string;
  content: string;
  author: {
    username: string;
    email: string;
  };
  likes: number;
  comments?: number;
  tags?: string[];
  thumbnailUrl?: string;
  createdAt: number;
  updatedAt: number;
}
