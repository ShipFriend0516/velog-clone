"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../../types/PostType.d";
import CommentType from "@/types/CommentType";
import NotFound from "@/app/not-found";
import Comment from "@/app/components/Comment";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { FaGithub } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

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

  // 댓글 상태
  const [comments, setComments] = useState<CommentType[]>();
  const [commentLoading, setCommentLoading] = useState(true);
  const [comment, setComment] = useState("");

  // 유저 상태
  const [isOwner, setIsOwner] = useState(false);

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
      setIsOwner(response.data.post.author._id === localStorage.getItem("userId"));
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

  // 글 삭제 요청
  const deletePost = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.delete(`/api/posts/${userId}?title=${title}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.data.success) {
        router.push("/");
      } else {
        // 삭제 불가능일 때
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 댓글 관련
  const postComment = async () => {
    try {
      if (post) {
        const response = await axios.post(
          "/api/comments",
          {
            post_id: post._id,
            content: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setComment("");

        console.log("댓글 작성 결과", response);
      }
    } catch (err) {
      console.error(err);
    } finally {
      getComments();
    }
  };

  const getComments = async () => {
    try {
      if (post) {
        const response = await axios.get(`/api/comments/${post._id}`);
        setComments(response.data.comments);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderComments = () => {
    if (comments) {
      return comments.map((comment) => (
        <Comment
          key={comment._id}
          _id={comment._id}
          username={comment.commentAuthor.username}
          comment={comment.content}
          createdAt={new Date(comment.createdAt).getTime()}
          deleteComment={deleteComment}
        />
      ));
    }
  };

  const deleteComment = async (id: string) => {
    try {
      const response = await axios.delete(`/api/comments?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response);
    } catch (err) {
    } finally {
      getComments();
    }
  };

  useEffect(() => {
    getComments();
    setCommentLoading(false);
  }, [title, post]);

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

        <div className="postInfoWrapper mt-4">
          <div>
            <span className="font-bold">{decodeURIComponent(post.author.username)}</span> •{" "}
            <span>{calculateCreatedTime(new Date(post.createdAt).getTime())}</span>
          </div>
          <div className="authorOptionsWrapper">
            {isOwner ? (
              <>
                <button>통계</button>
                <button>수정</button>
                <button onClick={() => deletePost()}>삭제</button>
              </>
            ) : (
              <div>
                <button>팔로우</button>
              </div>
            )}
          </div>
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
        <article className="py-5">{post.content}</article>
        <div className="profileWrapper">
          <div className="flex items-center gap-3">
            <div className="profile w-20 h-20 rounded-full bg-gray-100"></div>
            <div>
              <div className="text-xl">{decodeURIComponent(post.author.username)}</div>
              <p>유저의 소개</p>
            </div>
          </div>

          <hr className="my-3" />
          <button className="text-3xl mr-1">
            <FaGithub />
          </button>
          <button className="text-3xl ml-1">
            <CiMail />
          </button>
        </div>
        <div className="commentsWrapper flex flex-col gap-3">
          <div>{comments?.length || 0}개의 댓글</div>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border p-4 w-full"
              placeholder="댓글을 작성하세요."
            />
          </div>
          <div className="flex justify-end">
            <button className="greenBtn" onClick={postComment}>
              댓글 작성
            </button>
          </div>
          {commentLoading ? <LoadingSpinner /> : renderComments()}
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

// 업로드 시간 계산 함수
export const calculateCreatedTime = (uploadTime: number) => {
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

export default PostPage;
