import { ReactBaseProps } from "@/interface";

export function CarouselItem({ children }: ReactBaseProps) {
  return <div className="carousel-item">{children}</div>;
}
