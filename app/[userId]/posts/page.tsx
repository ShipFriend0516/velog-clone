"use client";
import { useParams } from "next/navigation";

type Params = {
  username: string;
};

const UserPostPage = () => {
  const params: Params = useParams();

  const { username } = params;
  return (
    <div>
      <h1>ㅇㅇ</h1>
      유저들의 개별 포스트 목록을 확인하는 페이지
    </div>
  );
};

export default UserPostPage;
