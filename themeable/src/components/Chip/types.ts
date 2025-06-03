import { Placement, State, Size, Intent } from '../common/types';


export type Icon = 'none' | Placement;

export type NativeChipProps = React.HTMLAttributes<HTMLSpanElement>;

export type CustomChipProps = {
    texture?: string; // e.g., 'glassmorphism', 'blur', 'grain'
    textureConfig?: Record<string, any>; // Additional config for the texture

    state?: State;
    size?: Size;
    intent?: Intent;
    icon?: Icon;

    className?: string;
    children?: React.ReactNode;
};

export type ChipProps = CustomChipProps & NativeChipProps;