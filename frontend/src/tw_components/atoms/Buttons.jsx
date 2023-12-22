// import { ButtonHTMLAttributes, Children, FC } from "react";
import { cva } from "class-variance-authority"; // VariantProps
import { cn } from "../../utils/cn";
import { useRecoilValue } from "recoil";
import { darkModeState } from "../../recoil/darkmode";

export const ButtonVariants = cva(
  `
    flex justify-around items-center active:scale-95 rounded-xl 
    text-sm transition-all shadow-md hover:scale-105 duration-200
    `, //font-bold text-slate-100
  {
    variants: {
      variant: {
        default: " shadow-none active:scale-100 ",
        grey: " bg-slate-buttongrey ",
        blue: " bg-accent-blue text-white",
        red: " bg-white text-red-300 border border-red-300",
        white: "bg-white border border-accent-blue text-accent-blue",
      },
      size: {
        default: "",
        sm: "inline-flex w-[4rem] h-[1.33rem] text-[0.75rem] rounded-md",
        md: " w-[6.875rem] h-[2.375rem] text-[1rem] rounded-md",
        lg: "w-[21.875rem] h-[7.5rem] text-[3rem] rounded-3xl",
        wlg: "w-[24rem] h-[5.25rem] text-[2rem]",
        social: "w-[30rem] h-[3.5rem] text-[1rem] justify-around border m-2",
        sign: " m-4 w-[30rem] h-[3rem] text-[1rem] rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// interface ButtonProps
//   extends ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof ButtonVariants> {
//   label?: string;
//   children?: React.ReactElement;
// }

const Button = ({ variant, size, children, label, ...props }) => {
  const darkMode = useRecoilValue(darkModeState);
  return (
    <button
      className={cn(ButtonVariants({ variant, size }), {
        "dark:bg-accent-blue dark:text-white": darkMode,
      })}
      {...props}
    >
      {children && children}
      {label && label}
    </button>
  );
};

export default Button;
