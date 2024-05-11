"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import PostType from "../../types/PostType";
import PostPreviewInBlog from "../components/PostPreviewInBlog";

const ListPage = () => {
  const [likedPosts, setLikedPosts] = useState<PostType[]>();
  const [postsLoading, setPostsLoading] = useState(true);
  const getLikedPosts = async () => {
    try {
      const response = await axios.get(`/api/posts/${localStorage.getItem("userId")}/likes`);
      console.log(response);

      setLikedPosts(response.data.likedPosts);
    } catch (err) {
      console.error(err);
    }
  };

  const renderPosts = () => {
    if (likedPosts) {
      return likedPosts.map((post) => (
        <PostPreviewInBlog
          key={post._id}
          userId={localStorage.getItem("userId") || ""}
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

  useEffect(() => {
    getLikedPosts();
  }, []);

  return (
    <section className="w-screen h-screen absolute bg-gray-50">
      <h2 className={"text-2xl"}>좋아요 누른 포스트</h2>
      {renderPosts()}
    </section>
  );
};

export default ListPage;
