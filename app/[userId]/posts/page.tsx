"use client";
import { useParams } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import PostPreviewInBlog from "@/app/components/PostPreviewInBlog";
import axios from "axios";
import { useEffect, useState } from "react";
import PostType from "@/types/PostType";
import LoadingSpinner from "@/app/components/LoadingSpinner";

type Params = {
  userId: string;
};

const UserPostPage = () => {
  const params: Params = useParams();

  const { userId } = params;

  const [posts, setPosts] = useState<PostType[]>();
  const [postsLoading, setPostsLoading] = useState(true);

  const getUserPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/${userId}`);

      console.log(response);
      setPosts(response.data.posts);
      setPostsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const renderPosts = () => {
    if (posts) {
      return posts.map((post) => (
        <PostPreviewInBlog
          key={post._id}
          title={post.title}
          content={post.content}
          tags={post.tags}
          uploadTime={post.createdAt}
          likes={post.likes || 0}
          comments={post.comments || 0}
          thumbnailUrl={post.thumbnailUrl}
        />
      ));
    }
  };

  const preRenderPosts = () => {
    return Array(5)
      .fill(0)
      .map((v, i) => {
        return (
          <PostPreviewInBlog
            key={i}
            title={""}
            content={""}
            tags={["", ""]}
            uploadTime={0}
            likes={0}
            comments={0}
            thumbnailUrl={""}
          />
        );
      });
  };

  return (
    <section className="blogWrapper">
      <div className="profileWrapper flex items-center gap-4">
        <div className="rounded-full w-32 h-32 overflow-hidden bg-gray-300"></div>
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
        <input
          type="search"
          className="w-1/4 border border-gray-400 text-gray-400 px-3 py-2 text-nowrap text-sm"
          placeholder="검색어를 입력하세요"
        ></input>
      </div>
      <div className="tagCloud tagsWrapper">
        <div className="tag">태그1</div>
      </div>
      {postsLoading ? preRenderPosts() : renderPosts()}
    </section>
  );
};

export default UserPostPage;
