const tokens = {
    "meta": { "version": 1 },
    "modes": { "theme": "solar", "contrast": "standard", "density": "cozy", "rtl": false },
    "color": {
        "bg": { "surface": "#0B0B0C", "raised": "#111214" },
        "fg": { "primary": "#EDEDF0", "muted": "#A6A8AD" },
        "accent": { "primary": "#7AA2FF", "secondary": "#FF7AD9" },
        "status": { "success": "#3CCB6C", "warning": "#F5C451", "danger": "#E05353", "info": "#5BC0EB" },
        "border": { "subtle": "#2A2D31", "strong": "#3A3D42", "focus": "#9CC2FF" }
    },
    "elevation": { "0": "none", "1": "0 1px 2px rgba(0,0,0,.2)", "2": "0 4px 12px rgba(0,0,0,.28)" },
    "radius": { "sm": 6, "md": 10, "lg": 14, "pill": 999 },
    "focus": { "ring": { "width": 2, "offset": 2, "color": "{color.border.focus}" } },
    "motion": { "duration": { "fast": 120, "base": 200, "slow": 320 }, "easing": { "standard": "cubic-bezier(.2,.0,.2,1)" } },
    "density": { "cozy": { "controlHeight": 40, "paddingX": 12 } },
    "component": {
        "Button": {
            "variants": ["filled", "tonal", "outlined", "text", "elevated", "ghost", "gradient"],
            "states": ["rest", "hover", "focus", "active", "disabled", "loading"],
            "style": {
                "filled": { "bg": "{color.accent.primary}", "fg": "{color.bg.surface}", "shadow": "{elevation.1}" },
                "outlined": { "bg": "transparent", "fg": "{color.fg.primary}", "border": "{color.border.strong}" }
            }
        },
        "Input": {
            "variants": ["outlined", "filled", "underlined"],
            "states": ["rest", "hover", "focus", "disabled", "error", "success"]
        }
    }
}
