# Themeable Color System

## Monochromatic Hierarchy

The Themeable design system uses a **monochromatic color hierarchy** where Primary, Secondary, and Tertiary colors share the **same hue** but use **different shades (lightness levels)** to convey their importance and hierarchy.

## Why Monochromatic Levels?

Using the same hue with different shades:

- ✅ Creates clear visual hierarchy (Primary → Secondary → Tertiary)
- ✅ Maintains color consistency across the interface
- ✅ Looks professional and cohesive
- ✅ Reduces visual complexity and clutter
- ✅ Easy to understand semantic relationships
- ✅ Works beautifully with any design family

## The Hierarchy

### Primary (Strongest)

- **Full saturation** at 100% of base
- **Standard lightness** progression
- Used for: Main actions, primary buttons, key highlights

### Secondary (Softer)

- **85% saturation** (slightly desaturated)
- **+6 to +8 lightness** (lighter than primary)
- Used for: Supporting actions, secondary buttons, less emphasis

### Tertiary (Subtle)

- **70% saturation** (more desaturated)
- **+10 to +15 lightness** (much lighter than primary)
- Used for: Backgrounds, subtle accents, tertiary actions

## Visual Example

```
Same Hue (e.g., 25° Orange):
┌─────────────┬─────────────┬─────────────┐
│  PRIMARY    │  SECONDARY  │  TERTIARY   │
│  ████████   │  ████████   │  ████████   │
│  Full Bold  │   Softer    │   Subtle    │
│  L: 50%     │   L: 58%    │   L: 65%    │
│  S: 88%     │   S: 75%    │   S: 62%    │
└─────────────┴─────────────┴─────────────┘
```

## The Formula

### Base Lightness Steps (12-Step Ramp)

**Light Mode:**

```typescript
[97, 92, 85, 75, 62, 50, 42, 35, 28, 22, 16, 12]
```

**Dark Mode:**

```typescript
[95, 90, 83, 72, 60, 48, 40, 33, 27, 21, 16, 12]
```

These values represent the lightness (L) in HSL color space for the PRIMARY level:

- Step 0: Very light (97% or 95%)
- Step 5: Medium (50% or 48%) - typically used for buttons
- Step 11: Very dark (12%)

### Lightness Adjustments by Level

**Secondary:** Base + 6-8% lightness (lighter/softer)
**Tertiary:** Base + 10-15% lightness (most subtle)

### Saturation Adjustments

To create hierarchy and prevent harsh colors:

**Primary:**

- Steps 2-10: 100% of base saturation
- Step 0: 30% of base saturation
- Step 1: 50% of base saturation  
- Step 11: 80% of base saturation

**Secondary:** 85% of primary saturation across all steps
**Tertiary:** 70% of primary saturation across all steps

## Usage

### Creating Monochromatic Themes

```typescript
import { createMonochromaticLevels } from "../foundations/color";

const levels = createMonochromaticLevels(
    25,   // Base hue (orange)
    88,   // Base saturation (88%)
    "light" // or "dark"
);

// Use in theme:
export const myTheme = makeTheme("myTheme", "light", {
    primary: levels.primary,      // Full strength
    secondary: levels.secondary,  // Softer
    tertiary: levels.tertiary,    // Most subtle
});
```

### Hue Recommendations

Choose a hue that represents your brand identity:

**Warm (0-60°):**

- Red: 0° (bold, urgent)
- Orange: 25° (energetic, friendly)
- Yellow: 50° (optimistic, cheerful)

**Cool (180-280°):**

- Blue: 220° (trustworthy, calm)
- Purple: 280° (creative, luxurious)
- Cyan: 190° (modern, tech)

**Natural (60-160°):**

- Green: 120° (growth, eco)
- Teal: 160° (sophisticated, balanced)

### Saturation Guidelines

**Light themes:** 80-90% for vibrant, energetic feel
**Dark themes:** 70-80% to avoid eye strain
**Professional/corporate:** 60-75% for subtlety
**High contrast:** 50-60% for accessibility

## Current Themes

### Solar (Light)

```typescript
Hue: 25° (Warm Orange - like sun)
Saturation: 88%
Primary: Full strength orange
Secondary: Lighter, softer orange
Tertiary: Very light, subtle orange
```

### Lunar (Dark)

```typescript
Hue: 220° (Cool Blue - like moonlight)
Saturation: 75%
Primary: Full strength blue
Secondary: Lighter, softer blue
Tertiary: Very light, subtle blue
```

### Aurora (Dark Vibrant)

```typescript
Hue: 280° (Purple/Magenta - like aurora borealis)
Saturation: 90% (extra vivid)
Primary: Bold purple
Secondary: Softer purple
Tertiary: Subtle purple
```

### High Contrast (Dark)

Uses grayscale only - all three levels are the same (white to gray).

## Technical Details

### Color Functions

**`createMonochromaticLevels(hue, saturation, mode)`**

- Generates Primary/Secondary/Tertiary ramps from one hue
- Parameters:
  - `hue`: 0-360 (color wheel position)
  - `saturation`: 0-100 (base saturation for primary)
  - `mode`: "light" | "dark" (determines lightness progression)
- Returns: Object with `primary`, `secondary`, `tertiary` ramps

**`harmonizedRamp(hue, saturation, mode)`**

- Generates a single 12-step ramp with fixed lightness values
- Used internally by `createMonochromaticLevels()`

### Legacy Support

**`createHarmonizedPalette()`** - Different hues with matching lightness

- Still available if you want each level to be a completely different color
- Example: Primary=Orange, Secondary=Teal, Tertiary=Blue

**`rampFromEndpoints()`** - Custom start/end colors

- For Success, Warning, Danger colors (which must be specific colors)
- For custom ramps that need specific start/end points

## Best Practices

1. **Use monochromatic for Primary/Secondary/Tertiary** - Creates clear hierarchy
2. **Keep one base hue per theme** - Maintains visual consistency
3. **Success/Warning/Danger stay semantic** - Green/Yellow/Red for universal recognition
4. **Test across families** - Different design families may render colors differently
5. **Check accessibility** - Ensure proper contrast ratios at all levels
6. **Consider brand identity** - Pick a hue that represents your brand

## When to Use What

**Monochromatic (Recommended):**

- ✅ Most UI applications
- ✅ Professional, cohesive look
- ✅ Clear hierarchy
- ✅ Easier to maintain

**Multi-Hue (createHarmonizedPalette):**

- ✅ Playful, colorful applications
- ✅ Marketing/creative sites
- ✅ When you need distinct visual separation

**Custom Ramps:**

- ✅ Semantic colors (success/warning/danger)
- ✅ Special requirements
- ✅ Matching existing brand guidelines

## Future Enhancements

- [ ] Perceptual lightness (CIELAB instead of HSL)
- [ ] Automatic complementary hue calculation
- [ ] Color contrast checker integration
- [ ] Theme preview generator
