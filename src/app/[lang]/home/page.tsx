import "@/assets/css/home.css";
import { PageLayout } from "@/layouts/PageLayout";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer/Footer";
import { Preview } from "./Preview";
import { Content } from "./Content";
import { Swiper } from "./Swiper";

export default function Home() {
  return (
    <PageLayout>
      <Sidebar />
      <Swiper>
        <Preview />
        <Content />
        <Footer />
      </Swiper>
    </PageLayout>
  );
}
