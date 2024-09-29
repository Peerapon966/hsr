"use client";

import dynamic from "next/dynamic";
import { PageLayout } from "@/layouts/PageLayout";
import { enableScrollWithKeyDown } from "@/utils/disableScroll";
import { useEffect, useState } from "react";

export default function News() {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  useEffect(() => {
    setComponentDidMount(true);
    enableScrollWithKeyDown();
  }, []);

  return (
    <PageLayout>
      <div style={{ width: "100px", height: "5000px", backgroundColor: "red" }}>
        <h1>News</h1>
      </div>
    </PageLayout>
  );
}
