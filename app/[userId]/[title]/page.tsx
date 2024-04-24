"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../../types/PostType.d";
import NotFound from "@/app/not-found";

type Params = {
  params: {
    title: string;
    userId: string;
  };
};

const PostPage = ({ params }: Params) => {
  const router = useRouter();
  const { userId, title } = params;

  // 글 상태
  const [post, setPost] = useState<Post>();
  const [postLoading, setPostLoading] = useState(true);
  // 유저의 모든 글 모아보기
  // const getPost = async () => {
  //   const response = await axios.get(`/api/posts/${userId}?title=${title}`);
  //   console.log(response);
  // };

  const getPost = async () => {
    try {
      const response = await axios.post(`/api/posts/${userId}`, {
        title,
      });
      setPost(response.data.post);
      console.log(response.data.post);
    } catch (err) {
      // 에러처리
      if (axios.isAxiosError(err) && err.response!.status === 404) {
        console.error("해당하는 포스트를 찾을 수 없습니다!");
      }
    } finally {
      setPostLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, [title, userId]);

  // 업로드 시간 계산 함수
  const calculateCreatedTime = (uploadTime: number) => {
    const now = new Date().getTime();
    const ago = Math.abs(uploadTime - now);
    let difference = Math.floor(ago / 1000 / 60);
    let postfix = "분 전";
    if (difference >= 60) {
      difference /= 60;
      postfix = "시간 전";
      if (difference >= 24) {
        difference /= 24;
        postfix = "일 전";
        if (difference >= 30) {
          difference /= 30;
          postfix = "달 전";
          if (difference >= 12) {
            difference /= 12;
            postfix = "년 전";
          }
        }
      }
    }

    return `${Math.floor(difference)}${postfix}`;
  };

  return (
    !postLoading &&
    (post !== undefined ? (
      <section className="overflow-y-scroll flex flex-col mx-auto max-w-3xl p-4 gap-6">
        <h1 className="text-4xl font-bold">{decodeURIComponent(post.title)}</h1>
        <div className="authorOptionsWrapper">
          <button>통계</button>
          <button>수정</button>
          <button>삭제</button>
        </div>
        <div className="postInfoWrapper">
          <div>
            <span className="font-bold">{decodeURIComponent(post.author.username)}</span> •{" "}
            <span>{calculateCreatedTime(new Date(post.createdAt).getTime())}</span>
          </div>
          <button>
            좋아요<span>{post.likes}</span>
          </button>
        </div>
        <div className="tagsWrapper">
          {post.tags!.map((tag) => {
            return <div key={tag}>{tag}</div>;
          })}
        </div>
        <div className="seriesWrapper">
          <h2 className="text-2xl">시리즈 타이틀</h2>
          <div>목록 보기</div>
        </div>
        <article>{post.content}</article>
        <div className="profileWrapper">
          <div className="profile w-20 h-20 rounded-full bg-gray-100"></div>
          <div>{decodeURIComponent(post.author.username)}</div>
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
    ) : (
      <NotFound />
    ))
  );
};

export default PostPage;
