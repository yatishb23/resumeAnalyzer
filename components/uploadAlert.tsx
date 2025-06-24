"use client";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

export default function UploadAlert({ visible }: { visible: boolean }) {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    setShow(visible);
    if (visible) {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
      <CheckCircle className="w-4 h-4" />
      <span>File uploaded successfully!</span>
    </div>
  );
}
