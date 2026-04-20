# Design System Editor

A comprehensive visual editor for the Themeable design system. Create and customize themes, families, color palettes, and component variants with live preview.

## Features

### 🎨 Theme Editor

- **Create Custom Themes**: Design themes with custom hue and saturation
- **Light/Dark Mode**: Toggle between light and dark mode variations
- **Monochromatic Color System**: Automatic generation of primary, secondary, and tertiary color levels
- **Live Preview**: See color changes in real-time
- **Export Code**: Copy TypeScript code for your theme

**Key Controls:**

- **Hue Slider**: Adjust the base color hue (0-360°)
- **Saturation Slider**: Control color intensity (0-100%)
- **Mode Toggle**: Switch between light and dark mode
- **Preview**: View generated primary, secondary, and tertiary colors

### 🏗️ Family Editor

- **Customize Design Families**: Edit existing design families (flat, material, glass, etc.)
- **Geometry Settings**: Adjust border radius for different sizes (sm, md, lg, pill)
- **Border Properties**: Configure width, style, color, and emphasis
- **Focus Ring**: Customize focus indicator appearance
- **Motion**: Define transition timings
- **Live Preview**: See family changes applied to sample elements

**Available Properties:**

- **Radius**: Small, Medium, Large, Pill
- **Border**: Width, Style (none/solid/dashed/double), Color
- **Emphasize**: Choose between border, fill, or shadow emphasis
- **Focus**: Ring width and offset
- **Transition**: CSS transition string

### 🎭 Variant Editor

- **Button Variants**: Customize all 9 button variants (filled, outlined, text, etc.)
- **Tone System**: Configure 7 semantic tones (primary, secondary, success, etc.)
- **State Management**: Edit appearance for idle, hover, pressed, and disabled states
- **Color Pickers**: Visual and hex input for precise color control
- **Interactive Preview**: Test different states in real-time

**Editable States:**

- **Default**: Background, text color, border
- **Hover**: Hover background and text color
- **Pressed**: Active state colors
- **Disabled**: Disabled appearance

### 🌈 Color Editor

#### Single Color Picker

- Pick any color with visual color picker
- Hex input for precise values
- Large preview display

#### Gradient Editor

- **Linear/Radial Gradients**: Choose gradient type
- **Angle Control**: Adjust linear gradient direction (0-360°)
- **Color Stops**: Add, edit, and remove gradient stops
- **Position Control**: Fine-tune stop positions
- **Live Preview**: See gradient updates in real-time
- **CSS Export**: Copy gradient CSS code

#### Color Ramp Generator

- **12-Step Color Ramps**: Generate harmonized color scales
- **Hue Control**: Select base hue with rainbow slider
- **Saturation Control**: Adjust color intensity
- **Light/Dark Mode**: Optimized lightness for each mode
- **Grid Preview**: View all 12 steps with hex values
- **Export**: Copy TypeScript code for the ramp

**Ramp Features:**

- Harmonized lightness progression
- Consistent perceived brightness
- Saturation adjustments at extremes
- Ready for theme integration

## Usage

### Accessing the Editor

Click the **⚙️ Editor** button in the top-right corner to open the editor. Click **🎨 Demo** to return to the showcase.

### Creating a New Theme

1. Go to **Themes** tab
2. Click **+ New** button
3. Adjust **Hue** and **Saturation** sliders
4. Choose **Light** or **Dark** mode
5. Preview the generated colors
6. Click **Export Code** to copy the theme definition

### Editing a Design Family

1. Go to **Families** tab
2. Select a family from the sidebar
3. Adjust properties:
   - Geometry (radius values)
   - Border (width, style, color)
   - Focus ring settings
   - Motion transitions
4. See changes in the preview box
5. Click **Export Code** to copy the configuration

### Customizing Button Variants

1. Go to **Variants** tab
2. Select **Variant Type** (filled, outlined, etc.)
3. Select **Tone** (primary, secondary, etc.)
4. Edit colors for each state:
   - Default state
   - Hover state
   - Pressed state
   - Disabled state
5. Use **State Preview** buttons to test each state
6. Click **Export Styles** to copy the CSS

### Working with Colors

#### For Single Colors

1. Go to **Colors** tab
2. Select **🎨 Single Color**
3. Use color picker or enter hex value
4. Click **Export Code**

#### For Gradients

1. Select **🌈 Gradient**
2. Choose Linear or Radial type
3. Adjust angle (for linear)
4. Add/remove color stops
5. Set stop colors and positions
6. Click **Export Code** for CSS

#### For Color Ramps

1. Select **📊 Color Ramp**
2. Adjust **Hue** slider (rainbow preview)
3. Adjust **Saturation** slider
4. Choose **Light** or **Dark** mode
5. View all 12 generated colors
6. Click **Export Code** for TypeScript

## Integration

### Using Exported Theme Code

```typescript
// Paste exported code into src/themes/
import { makeTheme } from "./builders";
import { createMonochromaticLevels } from "../foundations/color";
import type { Theme } from "./types";

const levels = createMonochromaticLevels(
    180,  // Hue
    85,   // Saturation
    "light"
);

export const myTheme: Theme = makeTheme("myTheme", "light", {
    primary: levels.primary,
    secondary: levels.secondary,
    tertiary: levels.tertiary,
});
```

### Using Exported Family Code

```typescript
// Paste exported code into src/families/families/
export const myFamily: DesignFamily = {
  id: "myFamily",
  description: "My custom design family",
  geometry: { /* ... */ },
  border: { /* ... */ },
  // ... rest of configuration
};
```

### Using Exported Variant Styles

```css
/* Apply exported styles in your CSS modules */
.customButton {
  background: #667eea;
  color: #ffffff;
  border: 2px solid #667eea;
}

.customButton:hover {
  background: #5568d3;
  color: #ffffff;
}
```

### Using Exported Color Ramp

```typescript
// Use in theme definitions
import { harmonizedRamp } from './foundations/color';

const successRamp = harmonizedRamp(140, 75, "light");
```

## Tips

- **Start with Themes**: Create your color palette first
- **Test Families**: Try different families with your theme
- **Preview States**: Always test hover, pressed, and disabled states
- **Export Often**: Copy code as you work to avoid losing changes
- **Use Ramps**: Generate 12-step color ramps for consistent scales

## Keyboard Shortcuts

- **Tab**: Switch between editor sections
- **Enter**: Confirm input changes
- **Esc**: Close color pickers

## Browser Support

The editor uses modern CSS features:

- CSS Custom Properties
- Backdrop Filter (for glassmorphism)
- Color Inputs
- Range Inputs

Recommended browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
