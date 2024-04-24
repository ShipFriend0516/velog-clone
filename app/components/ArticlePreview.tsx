import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type ArticlePreview = {
  key: string;
  title: string;
  content: string;
  uploadTime: number;
  comments: number;
  userProfile?: string;
  userName: string;
  userId: string;
  likes: number;
  thumbnailURL?: string;
};
const ArticlePreview = ({
  key,
  title,
  content,
  uploadTime,
  comments,
  userProfile,
  userName,
  userId,
  likes,
  thumbnailURL,
}: ArticlePreview) => {
  const router = useRouter();

  let difference = calculateCreatedTime(uploadTime);

  const postClick = () => {
    router.push(`@${userId.split("@")[0]}/${title}`);
  };

  return (
    <div className="article-preview w-full flex-nowrap shadow-xl rounded-sm flex flex-col justify-between hover:translate-y-0 md:hover:-translate-y-3  md:hover:shadow-2xl transition cursor-pointer">
      <div className="flex flex-col justify-between flex-grow overflow-hidden" onClick={postClick}>
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
            <p>{content.length > 50 ? `${content.slice(0, 50)}...` : content}</p>
          </div>
          <div className="p-5 text-gray-500 font-light text-sm">
            <span>{difference}</span> • <span>{comments}개의 댓글</span>
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
          <FaHeart size={0.75 + "em"} />
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

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

export default ArticlePreview;
