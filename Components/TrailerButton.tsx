"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import TrailerModal from "./TrailerModal";

type TrailerButtonProps = {
  trailerKey: string;
  title: string;
};

export default function TrailerButton({ trailerKey, title }: TrailerButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-black/30 transition hover:bg-ember-bright active:scale-95"
      >
        <Play className="h-4 w-4 fill-ink" strokeWidth={0} />
        Watch Trailer
      </button>

      <TrailerModal
        trailerKey={trailerKey}
        title={title}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
