import React from "react";
import cls from "./Button.module.scss";
import { useResolvedButtonTokens } from "./Button.resolve";
import type { ButtonProps } from "./Button.types";

export function Button({
    children,
    variant = "filled",
    tone = "primary",
    size = "md",
    disabled = false,
    debugState,
    className,
    ...rest
}: ButtonProps) {
    const { cssVars, dataAttrs } = useResolvedButtonTokens({
        variant,
        tone,
        size,
        disabled,
        debugState,
    });

    return (
        <button
            type="button"
            aria-disabled={disabled || undefined}
            disabled={disabled}
            className={[cls.buttonRoot, className].filter(Boolean).join(" ")}
            style={cssVars}
            {...dataAttrs}
            {...rest}
        >
            {children}
        </button>
    );
}
