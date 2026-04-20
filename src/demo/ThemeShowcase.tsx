import { Button } from '../components/Button/Button';
import type { ButtonVariant, ButtonTone } from '../components/Button/Button.types';
import './ThemeShowcase.css';

export function ThemeShowcase() {
    const variants: ButtonVariant[] = ['filled', 'filledTonal', 'outlined', 'text', 'elevated', 'fab'];
    const tones: ButtonTone[] = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'neutral'];

    return (
        <div className="theme-showcase">
            {/* Hero Section */}
            <section className="showcase-hero">
                <h1 className="showcase-title">Themeable Design System</h1>
                <p className="showcase-subtitle">
                    A flexible, multi-theme component library with monochromatic color hierarchies
                </p>
            </section>

            {/* Variants by Tone Section */}
            <section className="showcase-section">
                <h2 className="section-title">All Variants by Tone</h2>
                <p className="section-description">
                    Each tone (Primary, Secondary, Tertiary) uses the same hue but different shades to convey hierarchy
                </p>

                {tones.map((tone) => (
                    <div key={tone} className="tone-group">
                        <h3 className="tone-label">{tone}</h3>
                        <div className="button-grid">
                            {variants.map((variant) => (
                                <Button
                                    key={`${tone}-${variant}`}
                                    variant={variant}
                                    tone={tone}
                                    size="md"
                                >
                                    {variant}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Size Comparison */}
            <section className="showcase-section">
                <h2 className="section-title">Size Variants</h2>
                <div className="size-showcase">
                    <Button variant="filled" tone="primary" size="sm">
                        Small
                    </Button>
                    <Button variant="filled" tone="primary" size="md">
                        Medium
                    </Button>
                    <Button variant="filled" tone="primary" size="lg">
                        Large
                    </Button>
                </div>
            </section>

            {/* Interactive States */}
            <section className="showcase-section">
                <h2 className="section-title">Interactive States</h2>
                <div className="states-grid">
                    <div className="state-example">
                        <label className="state-label">Normal</label>
                        <Button variant="filled" tone="primary">Click Me</Button>
                    </div>
                    <div className="state-example">
                        <label className="state-label">Hover (Debug)</label>
                        <Button variant="filled" tone="primary" debugState="hover">Hover</Button>
                    </div>
                    <div className="state-example">
                        <label className="state-label">Pressed (Debug)</label>
                        <Button variant="filled" tone="primary" debugState="pressed">Pressed</Button>
                    </div>
                    <div className="state-example">
                        <label className="state-label">Disabled</label>
                        <Button variant="filled" tone="primary" disabled>Disabled</Button>
                    </div>
                </div>
            </section>

            {/* Special Variants */}
            <section className="showcase-section">
                <h2 className="section-title">Special Variants</h2>
                <div className="special-grid">
                    <Button variant="fab" tone="primary" size="lg">+</Button>
                    <Button variant="fabExtended" tone="primary" size="lg">
                        Create New
                    </Button>
                    <Button variant="elevated" tone="success" size="lg">
                        Elevated
                    </Button>
                    <Button variant="icon" tone="warning" size="md">
                        ⭐
                    </Button>
                </div>
            </section>

            {/* Real-World Example */}
            <section className="showcase-section">
                <h2 className="section-title">Real-World Example</h2>
                <div className="example-card">
                    <h3 className="card-title">Confirm Deletion</h3>
                    <p className="card-text">
                        Are you sure you want to delete this item? This action cannot be undone.
                    </p>
                    <div className="card-actions">
                        <Button variant="filled" tone="danger" size="md">
                            Delete Forever
                        </Button>
                        <Button variant="outlined" tone="neutral" size="md">
                            Cancel
                        </Button>
                        <Button variant="text" tone="primary" size="md">
                            Learn More
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
