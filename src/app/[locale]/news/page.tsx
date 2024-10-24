import { PageLayout } from "@/layouts/PageLayout";
import { Footer } from "@/components/Footer/Footer";
import { NewsContent } from "@/[locale]/news/content/NewsContent";
import { type TLocale } from "@/interface";
import { useLocale } from "next-intl";

export default function News() {
  const locale: TLocale = useLocale() as TLocale;

  return (
    <PageLayout>
      <NewsContent locale={locale} />
      <Footer />
    </PageLayout>
  );
}
