"use client"

import dynamic from "next/dynamic";
import { PageLayout } from "@/layouts";

// const Header = dynamic(() => import('@/components/Header').then((module) => ({ default: module.Header })));

export default function News() {
    return (
        <PageLayout>
            <h1>News</h1>
        </PageLayout>
    )
}