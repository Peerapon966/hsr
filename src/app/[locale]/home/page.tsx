import "@/assets/css/home.css";
import { PageLayout } from "@/layouts/PageLayout";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer/Footer";
import { Preview } from "@/[locale]/home/preview/Preview";
import { Content } from "@/[locale]/home/content/Content";
import { Swiper } from "@/[locale]/home/Swiper";
import { Scroller } from "@/[locale]/home/Scroller";

export default function Home() {
  return (
    <PageLayout page="home">
      <Sidebar />
      <Swiper>
        <Preview />
        <Scroller>
          <Content />
          <Footer />
        </Scroller>
      </Swiper>
    </PageLayout>
  );
}
