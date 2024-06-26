import axios from "axios";
import Link from "next/link";

interface Params {
  _id: string;
  email: string;
  username: string;
  comment: string;
  thumbnailUrl?: string;
  createdAt: number;
  deleteComment: (id: string) => void;
}

const Comment = ({
  _id,
  email,
  username,
  comment,
  thumbnailUrl,
  createdAt,
  deleteComment,
}: Params) => {
  return (
    <div className="w-full flex flex-col justify-center gap-3 border-b p-3">
      <div className="flex flex-row items-center gap-3">
        <Link href={`/@${email}/posts`}>
          <div className="rounded-full w-12 h-12 bg-gray-300"></div>
        </Link>
        <div className="flex flex-col flex-grow">
          <Link href={`/@${email}/posts`} className="font-bold">
            {username}
          </Link>
          <div className="font-light text-sm">{new Date(createdAt).toLocaleDateString()}</div>
        </div>
        {username === localStorage.getItem("username") && (
          <div className="text-sm text-gray-500">
            <button className="mr-1">수정</button>
            <button className="" onClick={() => deleteComment(_id)}>
              삭제
            </button>
          </div>
        )}
      </div>
      <div className="content">{comment}</div>
      <div className="text-emerald-500">{0}개의 답글</div>
    </div>
  );
};

export default Comment;
