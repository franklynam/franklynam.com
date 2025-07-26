"use client";

import Link from "next/link";
import { useGoogleAnalytics } from "@/hooks/useGoogleAnalytics";

export default function ResumeDownloadButton() {
  const { trackDownload } = useGoogleAnalytics();

  return (
    <Link
      href="/franklynam-resume-may2025-v1.pdf"
      className="main-button bg-paletteRed text-white text-sm md:text-base"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackDownload("resume")}
    >
      Download Resume
    </Link>
  );
}
