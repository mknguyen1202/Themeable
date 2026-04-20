export const progressTokens = {
    // track (background)
    trackColor: 'var(--progress-track, color-mix(in srgb, var(--text-muted, #94a3b8) 20%, transparent))',

    // fill colours mapped to intents
    colorPrimary: 'var(--intent-primary)',
    colorSuccess: 'var(--intent-success)',
    colorWarning: 'var(--intent-warning)',
    colorDanger: 'var(--intent-danger)',

    // bar heights
    heightSm: '4px',
    heightMd: '8px',
    heightLg: '12px',

    // circle diameters
    circleSm: '40px',
    circleMd: '64px',
    circleLg: '96px',

    // circle stroke width (relative — overridden by size)
    strokeSm: '4',
    strokeMd: '5',
    strokeLg: '6',

    // label font sizes
    fontSizeSm: 'var(--font-size-xs, 0.75rem)',
    fontSizeMd: 'var(--font-size-sm, 0.875rem)',
    fontSizeLg: 'var(--font-size-md, 1rem)',
} as const;
