import Title from "@/components/Title";
import { ReactBaseProps } from "@/interface";

export function Content({ children }: ReactBaseProps) {
  return (
    <div>
      {/* <Title title={"Voice of the Galaxy"} />
        <Title title={"Characters"} /> */}
      <div
        style={{ width: "100%", height: "500px", backgroundColor: "black" }}
      ></div>
      <div
        style={{ width: "100%", height: "500px", backgroundColor: "blue" }}
      ></div>
    </div>
  );
}
