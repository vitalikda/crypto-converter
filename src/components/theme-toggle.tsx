"use client";

import { Button } from "@/components/ui/button";
import { ContrastIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
      variant="ghost"
      size="icon"
    >
      <ContrastIcon className="size-[1.2rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
