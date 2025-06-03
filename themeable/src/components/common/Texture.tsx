export type TextureRenderFunction = (config?: TextureConfig) => string;

export interface TextureConfig {
    type: string; // e.g., 'blur', 'glassmorphism', 'grain'
    intensity?: number; // e.g., for blur, shine, grain amount
    colorHint?: string; // optional hint (used in glass/metallic)
};

// export interface TextureConfig {
//   type: TextureType;
//   intensity?: number; // e.g., for blur, shine, grain amount
//   colorHint?: string; // optional hint (used in glass/metallic)
// }

export interface TextureDefinition {
    name: string;
    displayName?: string;
    render: TextureRenderFunction;
};

const textureRegistry = new Map<string, TextureDefinition>();

textureRegistry.set("flat", {
    name: "flat",
    render: () => "" //TODO:
});

textureRegistry.set('glassmorphism', {
    name: 'glassmorphism',
    render: () => 'backdrop-blur-md bg-white/20 border border-white/30',
});

// Default fallback
textureRegistry.set('plain', {
    name: 'plain',
    render: () => '',
});

export function registerTexture(def: TextureDefinition): void {
    if (!def.name || typeof def.render !== 'function') {
        throw new Error('Invalid texture definition');
    }

    textureRegistry.set(def.name, def);
}


registerTexture({
    name: 'blur',
    displayName: 'Blur',
    render: (config?: TextureConfig) => {
        // const blurAmount = config?.width ? `${config.width}px` : '10px';
        return `backdrop-blur()`;
    }
});



// apply texture
interface TextureWrapperProps {
    textureName: string;
    config?: TextureConfig;
    children: React.ReactNode;
    className?: string;
}

export const TextureWrapper: React.FC<TextureWrapperProps> = ({
    textureName = 'plain',
    config,
    children,
    className
}) => {
    const def = textureRegistry.get(textureName) ?? textureRegistry.get('plain')!;
    const textureClass = def.render(config);

    return <div
        className={`${textureClass} ${className || ''}`}>
        {children}
    </div>
}