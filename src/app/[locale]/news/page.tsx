"use client";

import dynamic from "next/dynamic";
import { PageLayout } from "@/layouts/PageLayout";
import { enableScrollWithKeyDown } from "@/utils/disableScroll";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer/Footer";
import { Title } from "@/components/Title";

export default function News() {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  useEffect(() => {
    setComponentDidMount(true);
    enableScrollWithKeyDown();
  }, []);

  return (
    <PageLayout page="news">
      <div className="pt-[1.6rem]">
        <div className="flex justity-center">
          <div>
            <Title title="Voice of the Galaxy" />
          </div>
        </div>
      </div>
      <Footer />
    </PageLayout>
  );
}
