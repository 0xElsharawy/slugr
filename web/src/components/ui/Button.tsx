import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, ...props }: Props) {
  return (
    <button
      type="button"
      {...props}
      className="
        w-full rounded-2xl
        bg-[#f5f5f5]
        px-4 py-4
        text-sm font-medium
        text-black
        transition-all

        hover:bg-white
        active:scale-[0.99]
      "
    >
      {children}
    </button>
  );
}
