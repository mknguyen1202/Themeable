export interface LightboxImage {
    src: string;
    alt?: string;
    caption?: string;
    thumbnail?: string;
}

export interface LightboxProps {
    images: LightboxImage[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
    showThumbnails?: boolean;
    showCounter?: boolean;
    showCaptions?: boolean;
    loop?: boolean;
}
