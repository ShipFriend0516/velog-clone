import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col absolute top-0 gap-10">
      <h2 className="text-8xl text-emerald-500 text-shadow">
        4<span className="text-black">0</span>4
      </h2>
      <div className="shadow-custom"></div>
      <p className="text-3xl">아무것도 없네요!</p>
      <Link className="p-2 px-4 bg-emerald-500 rounded-md text-white" href="/">
        홈으로
      </Link>
    </div>
  );
}
