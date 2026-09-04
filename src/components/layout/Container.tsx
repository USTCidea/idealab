import React from "react";
import clsx from "clsx";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  center?: boolean;
  noPadding?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = "xl",
      center = true,
      noPadding = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = clsx(
      "w-full",
      center && "mx-auto",
      !noPadding && "px-4 sm:px-6 lg:px-8"
    );

    const sizes = {
      sm: "max-w-screen-sm", // 640px
      md: "max-w-screen-md", // 768px
      lg: "max-w-screen-lg", // 1024px
      xl: "max-w-screen-xl", // 1280px
      "2xl": "max-w-screen-2xl", // 1536px
      full: "max-w-full",
    };

    return (
      <div
        className={clsx(baseStyles, sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;
