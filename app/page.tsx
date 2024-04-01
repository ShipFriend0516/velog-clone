"use client";
import Image from "next/image";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { MdRssFeed } from "react-icons/md";
import { useState } from "react";
import ArticlePreview from "./components/ArticlePreview";

export default function Home() {
  const sort = ["trend", "recent", "feed"];
  const [selected, setSelected] = useState("trend");
  const sortOnClick = (e: Event) => {
    // const kind = e.target!.value;
  };
  return (
    <main className="max-w-5xl mx-auto pb-10">
      <div className="p-5">
        <ul className="list-none inline-flex gap-3">
          <li value={"trend"} className={`selected`}>
            <FaArrowTrendUp />
            트렌딩
          </li>
          <li value={"recent"} className={`${selected}`}>
            <FaRegClock />
            최신
          </li>
          <li value={"feed"} className={`${selected}`}>
            <MdRssFeed />
            피드
          </li>
        </ul>
      </div>
      <div className=" article-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 p-4 lg:p-2">
        <ArticlePreview
          title={"글 제목"}
          content={"글의 내용이 이렇게 보입니다."}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          likes={10}
        />
        <ArticlePreview
          title={"사진이 있는 글 제목"}
          content={"사진이 있으면 이렇게 보여요"}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          likes={10}
          thumbnailURL={
            "https://velog.velcdn.com/images/shipfriend/profile/dc545353-6808-4b90-a1f2-dabc58272f49/image.jpg"
          }
        />
        <ArticlePreview
          title={"벨로그 클론코딩"}
          content={"도전"}
          uploadTime={1711694241133}
          comments={0}
          userName={"수상한 누군가"}
          likes={10}
        />
        <ArticlePreview
          title={"엘든링"}
          content={"좀 재밌네요."}
          uploadTime={1711694241133}
          comments={0}
          userName={"수상한 누군가"}
          likes={-1}
        />
        <ArticlePreview
          title={"피라미드의 비밀"}
          content={"피라미드는...."}
          uploadTime={1711694241133}
          comments={0}
          thumbnailURL="https://images.unsplash.com/photo-1684457718740-190e844d5cb2?q=80&w=1320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          userName={"멧도요"}
          likes={10}
        />
        <ArticlePreview
          title={"글래스모피즘"}
          content={"신기하다"}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          likes={10}
          thumbnailURL="https://img.freepik.com/premium-psd/3d-render-glassy-background-modern-glass-morphism-style_125452-3202.jpg?w=900"
        />
        <ArticlePreview
          title={"글 제목"}
          content={"글의 내용이 이렇게 보입니다."}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          likes={10}
        />
        <ArticlePreview
          title={"글 제목"}
          content={"글의 내용이 이렇게 보입니다."}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          likes={10}
        />
        <ArticlePreview
          title={"글 제목"}
          content={"글의 내용이 이렇게 보입니다."}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          likes={10}
        />
        <ArticlePreview
          title={"글 제목"}
          content={"글의 내용이 이렇게 보입니다."}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          likes={10}
        />
        <ArticlePreview
          title={"글 제목"}
          content={"글의 내용이 이렇게 보입니다."}
          uploadTime={1711694241133}
          comments={0}
          userName={"멧도요"}
          likes={10}
        />
      </div>
    </main>
  );
}
