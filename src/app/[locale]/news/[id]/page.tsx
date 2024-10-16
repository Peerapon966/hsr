import { Footer } from "@/components/Footer/Footer";
import { PageLayout } from "@/layouts/PageLayout";

export default function NewsContent() {
  return (
    <PageLayout page="news">
      <div>
        <h1>This is News</h1>
      </div>
      <div className="h-[100px]"></div>
      <Footer />
    </PageLayout>
  );
}
