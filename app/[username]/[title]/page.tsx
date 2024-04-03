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
    <section className="flex flex-col mx-auto max-w-3xl gap-6">
      <h1 className="text-4xl font-bold">{decodeURIComponent(title)}</h1>
      <div className="authorOptionsWrapper">
        <button>통계</button>
        <button>수정</button>
        <button>삭제</button>
      </div>
      <div className="postInfoWrapper">
        <div>
          <span className="font-bold">{decodeURIComponent(username).slice(1)}</span> •{" "}
          <span>작성일</span>
        </div>
        <button>
          좋아요<span>0</span>
        </button>
      </div>
      <div className="tagsWrapper">
        <div>태그1</div>
        <div>태그2</div>
      </div>
      <div className="seriesWrapper">
        <h2 className="text-2xl">시리즈 타이틀</h2>
        <div>목록 보기</div>
      </div>
      <article>글의 컨텐츠가 들어갑니다.</article>
    </section>
  );
};

export default PostPage;
