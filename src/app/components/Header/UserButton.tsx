import "@/assets/css/header.css";
import { signOut } from "next-auth/react";

type UserButtonProps = {
  username: string;
  setIsAuth: Function;
};

export default function UserButton(props: UserButtonProps) {
  return (
    <>
      <div className="user-button-wrapper flex items-center">
        <div className="relative w-[.12rem] h-[.12rem] mr-[.2rem] mt-[.13rem] border-[.12rem] border-transparent border-t-[#c9c9c9]">
          <div className="user-options-wrapper items-center absolute w-20 h-8 -translate-x-3/7 z-20 ">
            <div className="flex items-center h-[.82rem] bg-[#212121] bg-opacity-70 mt-[.1rem] leading-snug">
              <div className="mr-[.2rem] px-[.3rem] text-center">
                <a href="" target="_blank" rel="noopener noreferrer">
                  HoYoverse Account
                </a>
              </div>
              <div className="text-[#c9c9c9]">|</div>
              <div className="ml-[.2rem] px-[.3rem] text-center text-[#c9c9c9]">
                <span onClick={() => signOut({ redirect: false })}>
                  Log Out
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#c9c9c9]">{props.username}</div>
      </div>
    </>
  );
}
