"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import PostType from "../../types/PostType";
import ArticlePreview from "../components/ArticlePreview";

const ListPage = () => {
  const [likedPosts, setLikedPosts] = useState<PostType[]>();
  const [postsLoading, setPostsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"like" | "recent">("like");

  // HTTP
  const getLikedPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/${localStorage.getItem("userId")}/likes`);
      console.log(response);

      setLikedPosts(response.data.likedPosts);
      setPostsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getReadPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/${localStorage.getItem("userId")}/read`);
      console.log(response);

      setLikedPosts(response.data.likedPosts);
      setPostsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const renderPosts = () => {
    if (likedPosts) {
      return likedPosts.map((post) => (
        <ArticlePreview
          key={post._id}
          userName={post.author.username}
          userId={localStorage.getItem("userId") || ""}
          title={post.title}
          content={post.content}
          uploadTime={post.createdAt}
          likes={post.likes || 0}
          comments={post.comments || 0}
          thumbnailURL={post.thumbnailUrl}
        />
      ));
    }
  };

  const preRenderPosts = () => {
    // 로딩 전 미리보기
    return Array(20)
      .fill(0)
      .map((post, index) => {
        return (
          <ArticlePreview
            key={index.toString()}
            title={""}
            content={""}
            uploadTime={0}
            comments={0}
            userName={""}
            userId={""}
            likes={post.likes || 0}
            thumbnailURL={""}
          />
        );
      });
  };

  useEffect(() => {
    getLikedPosts();
  }, []);

  return (
    <section className="mainpage mx-auto p-4">
      <div className="listTabs flex gap-3 mb-4">
        <button
          onClick={() => {
            setSelectedTab("like");
          }}
          className={`text-2xl px-2.5  ${selectedTab === "like" ? "selected" : ""}`}
        >
          좋아한 포스트
        </button>
        <button
          onClick={() => setSelectedTab("recent")}
          className={` text-2xl px-2.5 ${selectedTab === `recent` ? "selected" : ""} `}
        >
          최근 읽은 포스트
        </button>
      </div>
      <div className="article-grid p-4 lg:p-2">
        {postsLoading ? preRenderPosts() : renderPosts()}
      </div>
    </section>
  );
};

export default ListPage;
