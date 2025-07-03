"use client";

import { Input } from "@/components/ui/input";
import { format, unformat, useNumberFormat } from "@react-input/number-format";
import { useEffect, useMemo, useState } from "react";

export const InputFormat = ({
  value: defaultValue,
  onChange,
  decimals = 2,
  ...props
}: {
  value?: string;
  onChange?: (value: string) => void;
  decimals?: number;
} & Omit<React.ComponentProps<"input">, "ref" | "value" | "onChange">) => {
  const options = useMemo(
    () => ({
      locales: "en",
      maximumFractionDigits: decimals,
    }),
    [decimals]
  );

  const inputRef = useNumberFormat(options);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!defaultValue) return setValue("");
    setValue(format(defaultValue, options));
  }, [defaultValue, options]);

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange?.(unformat(e.target.value, options.locales));
      }}
      {...props}
    />
  );
};
