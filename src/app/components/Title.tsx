import "@/assets/css/title.css";

type Title = {
  title: string;
};

export function Title(props: Title) {
  return <div className="title-container flex font-yahei">{props.title}</div>;
}
