import "@/assets/css/home.css";
import { PageLayout } from "@/layouts/PageLayout";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer/Footer";
import { Preview } from "@/[locale]/home/preview/Preview";
import { HomeContent } from "@/[locale]/home/content/HomeContent";
import { Swiper } from "@/[locale]/home/Swiper";
import { Scroller } from "@/[locale]/home/Scroller";
import { SpLine } from "@/[locale]/home/content/SpLine";

export default function Home() {
  return (
    <PageLayout>
      <Sidebar />
      <SpLine />
      <Swiper>
        <Preview />
        <Scroller>
          <HomeContent />
          <Footer />
        </Scroller>
      </Swiper>
    </PageLayout>
  );
}
