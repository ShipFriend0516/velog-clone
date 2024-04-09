"use client";
import Image from "next/image";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";
import { MdRssFeed } from "react-icons/md";
import { useState } from "react";
import ArticlePreview from "./components/ArticlePreview";

interface FilterStyle {
  "--selectedFilter": number;
}

export default function Home() {
  const sort = ["trend", "recent", "feed"];
  const [selected, setSelected] = useState(0);
  const sortOnClick = (filter: number) => {
    // const kind = e.target!.value;
    setSelected(filter);
  };

  const filterStyle: FilterStyle = {
    "--selectedFilter": selected,
  };

  return (
    <main className="mainpage mx-auto pb-1 p-4 lg:p-2">
      <div className="p-5">
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
      </div>
      <div className="article-grid p-4 lg:p-2">
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
