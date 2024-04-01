"use client";
import { useState } from "react";

export default function NotificationPage() {
  const [filter, setFilter] = useState("all");
  return (
    <section className="max-w-xl lg:max-w-3xl mx-auto py-32">
      <div className="text-3xl font-bold">알림</div>
      <div className="w-full inline-flex justify-between items-center">
        <div className="inline-flex gap-2 mt-7 mb-5">
          <button
            className={`py-1 px-5 rounded-3xl bg-gray-100 text-gray-500 ${
              filter === "all" && "bg-emerald-100 text-green-500"
            }`}
          >
            전체
          </button>
          <button
            className={`py-1 px-5 rounded-3xl bg-gray-100 text-gray-500 ${
              filter === "not read" && "bg-emerald-100 text-green-500"
            }`}
          >
            읽지 않음
          </button>
        </div>
        <div className="inline-flex gap-2 text-xs">
          <button>모두 읽음</button>
          <button>모두 삭제</button>
        </div>
      </div>
      <div className="text-3xl text-center min-h-64 flex justify-center items-center">
        새로운 알림이 없습니다.
      </div>
    </section>
  );
}
