"use client";

import { useEffect, useState } from "react";

export default function ShadowWarpper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [showShadow, setShowShadow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${showShadow ? "drop-shadow-lg" : ""} ${className} duration-200`}
    >
      {children}
    </nav>
  );
}
