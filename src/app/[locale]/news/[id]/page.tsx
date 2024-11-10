import { Footer } from "@/components/Footer/Footer";
import { PageLayout } from "@/layouts/PageLayout";
import { NewsDetailContent } from "@/[locale]/news/[id]/content/NewsDetailContent";
import { type TLocale } from "@/interface";
import { notFound } from "next/navigation";

export default function NewsDetails({
  params,
}: {
  params: { locale: TLocale; id: string };
}) {
  const { locale, id } = params;

  if (isNaN(Number(id))) notFound();

  return (
    <PageLayout>
      <NewsDetailContent locale={locale} newsId={Number(id)} />
      <Footer />
    </PageLayout>
  );
}
