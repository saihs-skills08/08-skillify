"use client";
import { ReactNode } from "react";
import NextNprogress from "nextjs-progressbar";

export const ProgressBar = () => {
  return (
    <div className="z-[100] top-0 fixed w-full">
      <NextNprogress />
    </div>
  );
};
