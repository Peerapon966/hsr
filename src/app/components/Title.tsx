import "@/assets/css/title.css";

type Title = {
  title: string;
};

export default function Title(props: Title) {
  return (
    <div data-flex className="title-container">
      {props.title}
    </div>
  );
}
