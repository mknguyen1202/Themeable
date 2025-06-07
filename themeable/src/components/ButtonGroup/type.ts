
import { HTMLAttributes, ReactNode } from "react";
import { Intent } from "../common/types";

export type NativeButtonGroupProps = HTMLAttributes<HTMLDivElement>;
export type CustomButtonGroupProps = {
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    vertical?: boolean; // Whether the buttons are arranged vertically
    size?: 'small' | 'medium' | 'large'; // Size of the buttons
    intent?: Intent; // Intent of the button group, e.g., primary, secondary
};

export type ButtonGroupProps = CustomButtonGroupProps & NativeButtonGroupProps;