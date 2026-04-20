# Demo Structure

This folder contains the organized demo application for the Themeable design system.

## Structure

```
demo/
├── Demo.tsx              # Main demo component with theme state management
├── Demo.css              # Theme-aware background styles
├── ThemeSwitcher.tsx     # Theme and family switcher controls
├── ThemeSwitcher.css     # Switcher styling
├── ThemeShowcase.tsx     # Component showcase sections
├── ThemeShowcase.css     # Showcase styling
└── index.ts              # Barrel export
```

## Features

### 🎨 Theme-Aware Backgrounds

The demo automatically adjusts the background based on the selected theme:

- **Solar (Light)**: Warm gradient from white to soft orange
- **Lunar (Dark)**: Cool gradient with deep blue tones
- **Aurora (Dark)**: Purple/magenta gradient for dramatic effect
- **High Contrast (Dark)**: Pure black background

### ✨ Design Family Showcase

Switch between 7 design families to see how they affect the visual rendering:

- **flat** - Clean, minimal with subtle borders
- **material** - Material Design 3 inspired
- **neumorphOverlay** - Soft shadows and depth
- **glass** - Glassmorphism with blur effects
- **brutalist** - Bold, harsh geometric
- **auroraNeon** - Glowing neon aesthetics
- **wireframe** - Minimal for prototyping

### 🔘 Component Showcase Sections

1. **All Variants by Tone**
   - Shows all 6 button variants across 7 tones
   - Demonstrates monochromatic hierarchy

2. **Size Variants**
   - Small, Medium, Large comparisons

3. **Interactive States**
   - Normal, Hover (debug), Pressed (debug), Disabled

4. **Special Variants**
   - FAB, FAB Extended, Elevated, Icon buttons

5. **Real-World Example**
   - Practical dialog with mixed button types

## Usage

### Basic Usage

```tsx
import { Demo } from './demo';

function App() {
    return <Demo />;
}
```

### Using Individual Components

```tsx
import { ThemeShowcase, ThemeSwitcher } from './demo';
import { ThemeProvider } from '../system/ThemeProvider/ThemeProvider';
import { solar } from '../themes';

function CustomDemo() {
    return (
        <ThemeProvider theme={solar} family="flat">
            <ThemeSwitcher {...props} />
            <ThemeShowcase />
        </ThemeProvider>
    );
}
```

## Customization

### Adding Theme-Specific Backgrounds

Edit `Demo.css` to add custom gradients for your themes:

```css
.demo-root.light[data-theme="myTheme"] {
    background: linear-gradient(180deg, #start 0%, #end 100%);
}
```

### Adding Showcase Sections

Edit `ThemeShowcase.tsx` to add new sections demonstrating additional features.

## Best Practices

1. **Theme Backgrounds**: Use gradients that complement your theme's primary color
2. **Responsive Design**: All sections are mobile-friendly
3. **Performance**: Theme switching uses CSS transitions for smooth changes
4. **Accessibility**: Proper color contrast maintained across all themes

## Future Enhancements

- [ ] Add code snippet display for each example
- [ ] Export current configuration as JSON
- [ ] Add color blindness simulation mode
- [ ] Include accessibility contrast checker
- [ ] Add theme preview thumbnails
