import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
type ArticlePreview = {
  title: string;
  content: string;
  uploadTime: number;
  comments: number;
  userProfile?: string;
  userName: string;
  likes: number;
  thumbnailURL?: string;
};
const ArticlePreview = ({
  title,
  content,
  uploadTime,
  comments,
  userProfile,
  userName,
  likes,
  thumbnailURL,
}: ArticlePreview) => {
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
  difference = Math.floor(difference);

  return (
    <div className="w-full h-96 shadow-xl rounded-sm flex flex-col justify-between hover:-translate-y-3  hover:shadow-2xl transition">
      <div className="flex flex-col justify-between flex-grow overflow-hidden">
        {thumbnailURL && (
          <Image
            className="object-cover"
            src={thumbnailURL}
            alt={title}
            width={1000}
            height={600}
            style={{ height: "50%" }}
          />
        )}
        <div className={`${thumbnailURL ? "h-1/2" : "h-full"} flex flex-col justify-between`}>
          <div className="p-5">
            <div className="font-bold">{title}</div>
            <p>{content}</p>
          </div>
          <div className="p-5 text-gray-500 font-light text-sm">
            <span>{difference + postfix}</span> • <span>{comments}개의 댓글</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 border-t flex justify-between">
        <div className="inline-flex items-center gap-1">
          <span className="rounded-full overflow-hidden">
            {userProfile ? <Image src={userProfile} alt="author" /> : <FaUserCircle />}
          </span>
          <span className="font-light">by {userName}</span>
        </div>
        <div className="inline-flex items-center gap-1">
          <FaHeart />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
