import { Check, Copy } from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  shortenedUrl: string;
};

export function ShortenedPopup({ open, onClose, shortenedUrl }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(shortenedUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-[92%] max-w-md
          rounded-3xl
          border border-white/10
          bg-[#111111]
          p-6
          shadow-2xl
        "
      >
        <div className="mb-5">
          <h2 className="text-xl font-semibold">URL Shortened</h2>

          <p className="mt-1 text-sm text-[#9e9e9e]">
            Your shortened URL is ready.
          </p>
        </div>

        <div
          className="
            flex items-center gap-3
            rounded-2xl
            border border-white/10
            bg-[#171717]
            p-3
          "
        >
          <input
            readOnly
            value={shortenedUrl}
            className="
              flex-1 bg-transparent
              text-sm text-[#f5f5f5]
              outline-none
            "
          />

          <button
            type="button"
            onClick={handleCopy}
            className="
              flex items-center gap-2
              rounded-xl
              border border-white/10
              bg-[#202020]
              px-3 py-2
              text-sm
              transition-all

              hover:bg-[#2a2a2a]
            "
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            mt-5 w-full rounded-2xl
            border border-white/10
            bg-[#1a1a1a]
            py-3 text-sm
            transition-all

            hover:bg-[#222222]
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}
