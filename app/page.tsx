"use client";
import Image from "next/image";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { MdRssFeed } from "react-icons/md";
import { useEffect, useState } from "react";
import ArticlePreview from "./components/ArticlePreview";
import axios from "axios";
import Post from "../types/PostType.d";

interface FilterStyle {
  "--selectedFilter": number;
}

export default function Home() {
  const sort = ["trend", "recent", "feed"];
  const [posts, setPosts] = useState<Post[]>();
  const [postLoading, setPostLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const sortOnClick = (filter: number) => {
    setSelected(filter);
  };

  const filterStyle: FilterStyle = {
    "--selectedFilter": selected,
  };

  const getPosts = async () => {
    try {
      const response = await axios.get("/api/posts");
      setPosts(response.data.posts);
      setPostLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const renderPosts = () => {
    if (posts) {
      return posts.map((post) => {
        return (
          <ArticlePreview
            key={post._id}
            title={post.title}
            content={post.content}
            uploadTime={new Date(post.updatedAt).getTime()}
            comments={0}
            userName={post.author.username}
            userId={post.author.email}
            likes={post.likes || 0}
            thumbnailURL={post.thumbnailUrl}
          />
        );
      });
    }
  };

  const preRenderPosts = () => {
    // 로딩 전 미리보기
    return Array(20)
      .fill(0)
      .map((post, index) => {
        return (
          <ArticlePreview
            key={index + ""}
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

  return (
    <main className="mainpage mx-auto pb-1 p-4 lg:p-2">
      <div className="p-5 flex justify-between">
        <ul className="filterWrapper list-none inline-flex">
          <li className={`${selected === 0 && "selected"}`} onClick={() => sortOnClick(0)}>
            <FaArrowTrendUp width={24} height={24} />
            <span>트렌딩</span>
          </li>
          <li className={`${selected === 1 && "selected"}`} onClick={() => sortOnClick(1)}>
            <FaRegClock width={24} height={24} />
            <span>최신</span>
          </li>
          <li className={`${selected === 2 && "selected"}`} onClick={() => sortOnClick(2)}>
            <MdRssFeed width={24} height={24} />
            <span>피드</span>
          </li>
          <li style={filterStyle as React.CSSProperties} className="underbar"></li>
        </ul>
        <div className="periodFilter flex items-center">
          <div className="selecter w-20 lg:w-28 h-8 rounded flex justify-between items-center px-2 mr-2.5 bg-gray-50 text-black cursor-pointer select-none text-nowrap hover:opacity-75">
            <span>이번 주</span>
            <svg
              className="text-2xl"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M7 10l5 5 5-5z"></path>
            </svg>
          </div>
          <div className="periodDropdown"></div>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            className="HomeTab_extra__x0Vmq"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
          </svg>
        </div>
      </div>
      <div className="article-grid p-4 lg:p-2">
        {postLoading ? preRenderPosts() : renderPosts()}
        {/* <ArticlePreview
          key="1"
          title={"글 제목"}
          content={"글의 내용이 이렇게 보입니다."}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          userId={"멧도요"}
          likes={10}
        />
        <ArticlePreview
          key="2"
          title={"사진이 있는 글 제목"}
          content={"사진이 있으면 이렇게 보여요"}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          userId={"멧도요"}
          likes={10}
          thumbnailURL={
            "https://velog.velcdn.com/images/shipfriend/profile/dc545353-6808-4b90-a1f2-dabc58272f49/image.jpg"
          }
        />
        <ArticlePreview
          key="3"
          title={"벨로그 클론코딩"}
          content={"도전"}
          uploadTime={1711694241133}
          comments={0}
          userName={"수상한 누군가"}
          userId={"멧도요"}
          likes={10}
        />
        <ArticlePreview
          key="4"
          title={"엘든링"}
          content={"좀 재밌네요."}
          uploadTime={1711694241133}
          comments={0}
          userName={"수상한 누군가"}
          userId={"멧도요"}
          likes={-1}
        />
        <ArticlePreview
          key="5"
          title={"피라미드의 비밀"}
          content={"피라미드는...."}
          uploadTime={1711694241133}
          comments={0}
          thumbnailURL="https://images.unsplash.com/photo-1684457718740-190e844d5cb2?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          userName={"멧도요"}
          userId={"멧도요"}
          likes={10}
        />
        <ArticlePreview
          key="6"
          title={"글래스모피즘"}
          content={"신기하다"}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          userId={"멧도요"}
          likes={10}
          thumbnailURL="https://img.freepik.com/premium-psd/3d-render-glassy-background-modern-glass-morphism-style_125452-3202.jpg?w=900"
        /> */}
      </div>
    </main>
  );
}
