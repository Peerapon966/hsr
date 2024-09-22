import { useState, useEffect } from "react";
import { TOrientation } from "@/interface";

// return optimal orientation for displaying
export function useOrientation(): [
  TOrientation,
  (window: Window) => TOrientation
] {
  const [optimalOrientation, setOptimalOrientation] =
    useState<TOrientation>("landscape");

  useEffect(() => {
    const innerWidth = window.innerWidth;
    setOptimalOrientation(innerWidth >= 1920 ? "landscape" : "portrait");
  }, []);
  const getCurrentOrientation = (window: Window) => {
    return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  };

  return [optimalOrientation, getCurrentOrientation];
}
