"use client";
import { LiaSun } from "react-icons/lia";
import { PiMoonBold } from "react-icons/pi";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

interface UserType {
  _id: string;
  snsId: string;
  username: string;
  email: string;
  profileThumbnailUrl: string;
  introduction: string;
}

const SettingPage = () => {
  const [userdata, setUserdata] = useState<UserType>();
  const [userLoading, setUserLoading] = useState(true);

  const getUserData = async () => {
    try {
      const response = await axios.get("/auth/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response);
      setUserdata(response.data.userdata);
      setUserLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return userLoading ? (
    <LoadingSpinner />
  ) : (
    <section className="flex flex-col gap-10 max-w-4xl mx-auto w-screen h-screen p-10">
      <div className="flex justify-stretch">
        <div className="border-r p-5 flex flex-col gap-5 justify-center items-stretch">
          <div className="rounded-full bg-gray-300 w-32 h-32"></div>
          <button className="px-5 py-1 font-bold bg-emerald-500 hover:bg-emerald-400 text-white rounded-md">
            이미지 업로드
          </button>
          <button className="px-5 py-1 text-emerald-500 font-bold hover:bg-gray-200 rounded-md">
            이미지 제거
          </button>
        </div>
        <div className="flex-grow p-5 ">
          <h2 className="text-3xl font-bold mb-3">{userdata!.username}</h2>
          <p className="mb-3 text-gray-400">간단소개</p>
          <button className="underline text-emerald-400">수정</button>
        </div>
      </div>

      <div className="settingDetail flex flex-col gap-6 ">
        <div>
          <div>
            <span className="font-bold">블로그 이름</span>
            <div>
              <span>{`${userdata!.email.split("@")[0]}.log`}</span>
              <button className="underline text-emerald-400">수정</button>
            </div>
          </div>
          <p>개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다.</p>
        </div>
        <div>
          <div>
            <span className="font-bold">소셜 정보</span>
            <div>
              <span>소셜 정보가 들어가겠죠</span>
              <button className="underline text-emerald-400">수정</button>
            </div>
          </div>
          <p>포스트 및 블로그에서 보여지는 프로필에 공개되는 소셜 정보입니다.</p>
        </div>
        <div>
          <div>
            <span className="font-bold">이메일 주소</span>
            <div>
              <span>{userdata!.email}</span>
              <button className="underline text-emerald-400">수정</button>
            </div>
          </div>
          <p>회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다.</p>
        </div>
        <div>
          <div>
            <span className="font-bold">이메일 수신 설정</span>

            <ul>
              <li>댓글 알림</li>
              <li>벨로그 업데이트 소식</li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <span className="font-bold">테마</span>
            <div>
              <button className="w-32 h-16 border border-emerald-400 rounded-sm flex justify-center items-center">
                <LiaSun size={1.75 + "em"} />
              </button>
              <button className="w-32 h-16 border bg-black rounded-sm flex justify-center items-center">
                <PiMoonBold color="white" size={1.75 + "em"} />
              </button>
              <button className="w-32 h-16 border border-gray-200 inline-flex rounded-sm">
                <div className="bg-white w-1/2 h-full flex justify-center items-center">
                  <LiaSun size={1.75 + "em"} />
                </div>
                <div className="bg-black w-1/2 h-full flex justify-center items-center">
                  <PiMoonBold color="white" size={1.75 + "em"} />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div>
          <div>
            <span className="font-bold">회원 탈퇴</span>
            <div>
              <button className="py-1 px-4 rounded-md bg-red-400 text-white">회원 탈퇴</button>
            </div>
          </div>
          <p>탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
        </div>
      </div>
    </section>
  );
};

export default SettingPage;
