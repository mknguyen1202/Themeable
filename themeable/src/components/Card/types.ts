import { Placement, State, Size, Intent } from '../common/types';


export type NativeCardProps = React.HTMLAttributes<HTMLDivElement>;
export type CustomCardProps = {
    texture?: string; // e.g., 'glassmorphism', 'blur', 'grain'
    textureConfig?: Record<string, any>; // Additional config for the texture

    state?: State;
    size?: Size;
    intent?: Intent;

    className?: string;
    children?: React.ReactNode;
};
export type CardProps = CustomCardProps & NativeCardProps;