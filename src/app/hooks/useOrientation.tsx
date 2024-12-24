import { useState, useEffect } from "react";
import { TOrientation } from "@/interface";

// return optimal orientation for displaying
export function useOrientation(): [
  TOrientation,
  (window: Window) => TOrientation
] {
  const [optimalOrientation, setOptimalOrientation] =
    useState<TOrientation>("landscape");

  const getCurrentOrientation = (window: Window) => {
    const height = window.screen.height;
    const width = window.screen.width;

    return width > height ? "landscape" : "portrait";
  };

  useEffect(() => {
    const getOptimalOrientation = (): TOrientation => {
      const height = window.screen.height;
      const width = window.screen.width;

      if (width / height < 16 / 9) return "portrait";

      return width > height ? "landscape" : "portrait";
    };
    setOptimalOrientation(getOptimalOrientation());
  }, []);

  return [optimalOrientation, getCurrentOrientation];
}
