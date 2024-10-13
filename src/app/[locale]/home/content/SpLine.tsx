import Image from "next/image";

export function SpLine() {
  return (
    <div className="absolute h-[80vh] bottom-0 left-[2.6rem]">
      <Image
        src="/home/content/sp_line.png"
        alt="seperation line"
        width={87}
        height={1210}
        className="w-auto h-full"
      ></Image>
    </div>
  );
}
