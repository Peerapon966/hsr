import { Footer } from "@/components/Footer/Footer";
import { PageLayout } from "@/layouts/PageLayout";
import { NewsDetailContent } from "@/[locale]/news/[id]/NewsDetailContent";
import { useLocale } from "next-intl";
import { type TLocale } from "@/interface";

export default function NewsDetails() {
  const locale: TLocale = useLocale() as TLocale;

  return (
    <PageLayout>
      <NewsDetailContent locale={locale} />
      <Footer />
    </PageLayout>
  );
}
