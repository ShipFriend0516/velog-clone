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
    <section className="overflow-y-scroll flex flex-col mx-auto max-w-3xl p-4 gap-6">
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
      <div className="profileWrapper">
        <div className="profile w-20 h-20 rounded-full bg-gray-100"></div>
        <div>{decodeURIComponent(username)}</div>
        <div>
          <p>유저의 소개</p>
        </div>
        <hr />
        <button>깃허브</button>
        <button>이메일</button>
      </div>
      <div className="commentsWrapper flex flex-col gap-3">
        <div>{0}개의 댓글</div>
        <div>
          <textarea className="border p-4 w-full" placeholder="댓글을 작성하세요." />
        </div>
        <div className="flex justify-end">
          <button className="greenBtn">댓글 작성</button>
        </div>
      </div>
      <div className="relateWrapper">
        <div className="flex justify-center">
          <h3>관심 있을 만한 포스트</h3>
        </div>
      </div>
    </section>
  );
};

export default PostPage;
