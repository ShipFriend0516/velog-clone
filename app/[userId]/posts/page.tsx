"use client";
import { useParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import PostPreviewInBlog from "@/app/components/PostPreviewInBlog";
import axios from "axios";

type Params = {
  username: string;
};

const UserPostPage = () => {
  const params: Params = useParams();

  const { username } = params;

  const getUserPost = async () => {
    const response = await axios.get(`/api/posts/${userId}`);
  };
  return (
    <section className="blogWrapper">
      <div className="profileWrapper flex items-center gap-4">
        <div className="rounded-full w-32 h-32 overflow-hidden bg-gray-300">프로필 사진</div>
        <div>
          <div className="text-2xl">유저이름</div>
          <div>한마디</div>
        </div>
      </div>
      <hr />
      <div className="flex justify-end p-2 gap-3">
        <span>{0} 팔로워</span>
        <span>{0} 팔로잉</span>
      </div>
      <div>
        <button className="text-3xl mr-1">
          <FaGithub />
        </button>
        <button className="text-3xl ml-1">
          <CiMail />
        </button>
      </div>
      <div className="blogTabWrapper">
        <div className="selected">글</div>
        <div>시리즈</div>
        <div>소개</div>
      </div>
      <div className="flex justify-end">
        <div className="w-1/5 border border-gray-400 text-gray-400 px-3 py-2 text-nowrap text-sm">
          검색어를 입력하세요
        </div>
      </div>

      <div className="tagCloud tagsWrapper">
        <div className="tag">태그1</div>
      </div>
      <PostPreviewInBlog />
    </section>
  );
};

export default UserPostPage;
