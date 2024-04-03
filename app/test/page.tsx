import Image from "next/image";
import LoginModal from "../components/LoginModal";

const TestPage = () => {
  return (
    <div className="flex justify-center items-center">
      <Image
        className="absolute "
        src={
          "https://images.unsplash.com/photo-1711861982584-b7493627213c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="dd"
        width={100}
        height={100}
      ></Image>
    </div>
  );
};
export default TestPage;
