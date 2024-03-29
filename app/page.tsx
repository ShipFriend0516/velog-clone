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
    <main className="max-w-5xl mx-auto ">
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
      <div className=" article-grid grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
          thumbnailURL={
            "https://velog.velcdn.com/images/shipfriend/profile/dc545353-6808-4b90-a1f2-dabc58272f49/image.jpg"
          }
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
