// import { ButtonHTMLAttributes, Children, FC } from "react";
import { cva } from "class-variance-authority"; // VariantProps
import { cn } from "../../utils/cn";

export const InfoBoxVariants = cva(
  `
  rounded-md m-5 p-5 shadow-md w-[100%] bg-indigo-100 dark:bg-gray-600 dark:bg-opacity-30
    `,
  {
    variants: {
      variant: {
        userinfo:
          "m-0 w-7/12 flex flex-col justify-around items-center gap-y-5",
      },
      size: {
        default: "",
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
//     VariantProps<typeof InputVariants> {
//   label?: string;
//   children?: React.ReactElement;
// }

const InfoBox = ({ variant, size, children, label, className, ...props }) => {
  return (
    <div
      className={cn(InfoBoxVariants({ variant, size }), className)}
      {...props}
    >
      {children && children}
      {label && label}
    </div>
  );
};

export default InfoBox;
