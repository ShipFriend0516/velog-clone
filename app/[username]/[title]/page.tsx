"use client";
import { useRouter } from "next/navigation";

type Params = {
  params: {
    title: string;
    username: string;
  };
};

const PostPage = ({ params }: Params) => {
  const router = useRouter();
  const { username, title } = params;

  return (
    <div>{`${decodeURIComponent(title)} 글은 ${decodeURIComponent(username)}님의 글입니다.`}</div>
  );
};

export default PostPage;
