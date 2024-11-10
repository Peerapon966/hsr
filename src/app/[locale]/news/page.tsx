import { PageLayout } from "@/layouts/PageLayout";
import { Footer } from "@/components/Footer/Footer";
import { NewsContent } from "@/[locale]/news/content/NewsContent";

export default function News() {
  return (
    <PageLayout>
      <NewsContent />
      <Footer />
    </PageLayout>
  );
}
