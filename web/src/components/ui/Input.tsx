import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
  return (
    <input
      {...props}
      className="
        w-full rounded-2xl border border-white/10
        bg-[#171717] px-4 py-3
        text-sm text-white
        outline-none transition-all

        placeholder:text-[#737373]

        focus:border-white/20
        focus:bg-[#1c1c1c]
        focus:ring-2
        focus:ring-white/5
      "
    />
  );
}
