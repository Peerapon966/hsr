import "@/assets/css/title.css";

type Title = {
  title: string;
};

export default function Title(props: Title) {
  return (
    <div data-flex className="title-container font-yahei">
      {props.title}
    </div>
  );
}
