"use client";

import dynamic from "next/dynamic";
import { PageLayout } from "@/layouts/PageLayout";
import { enableScrollWithKeyDown } from "@/utils/disableScroll";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer/Footer";

export default function News() {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  useEffect(() => {
    setComponentDidMount(true);
    enableScrollWithKeyDown();
  }, []);

  return (
    <PageLayout page="news">
      <div style={{ width: "100px", height: "500px", backgroundColor: "red" }}>
        <h1>News</h1>
      </div>
      <Footer />
    </PageLayout>
  );
}
