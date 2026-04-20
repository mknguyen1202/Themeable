import { useState } from 'react';
import './ComponentMenu.css';

export type ComponentCategory =
    | 'form'
    | 'navigation'
    | 'overlay'
    | 'utility'
    | 'composite';

export interface ComponentMenuItem {
    id: string;
    name: string;
    category: ComponentCategory;
}

const components: ComponentMenuItem[] = [
    // Form
    { id: 'button', name: 'Button', category: 'form' },
    { id: 'button-group', name: 'Button Group', category: 'form' },
    { id: 'input', name: 'Input', category: 'form' },
    { id: 'textarea', name: 'Text Area', category: 'form' },
    { id: 'select', name: 'Select', category: 'form' },
    { id: 'checkbox', name: 'Checkbox', category: 'form' },
    { id: 'radio', name: 'Radio', category: 'form' },
    { id: 'switch', name: 'Switch', category: 'form' },
    { id: 'slider', name: 'Slider', category: 'form' },
    { id: 'datepicker', name: 'Date Picker', category: 'form' },
    { id: 'timepicker', name: 'Time Picker', category: 'form' },

    // Navigation
    { id: 'tabs', name: 'Tabs', category: 'navigation' },
    { id: 'accordion', name: 'Accordion', category: 'navigation' },
    { id: 'breadcrumb', name: 'Breadcrumb', category: 'navigation' },
    { id: 'pagination', name: 'Pagination', category: 'navigation' },
    { id: 'stepper', name: 'Stepper', category: 'navigation' },

    // Overlay
    { id: 'dialog', name: 'Dialog', category: 'overlay' },
    { id: 'drawer', name: 'Drawer', category: 'overlay' },
    { id: 'popover', name: 'Popover', category: 'overlay' },
    { id: 'tooltip', name: 'Tooltip', category: 'overlay' },
    { id: 'toast', name: 'Toast', category: 'overlay' },

    // Utility
    { id: 'icon', name: 'Icon', category: 'utility' },
    { id: 'avatar', name: 'Avatar', category: 'utility' },
    { id: 'badge', name: 'Badge', category: 'utility' },
    { id: 'spinner', name: 'Spinner', category: 'utility' },
    { id: 'progress', name: 'Progress', category: 'utility' },
    { id: 'divider', name: 'Divider', category: 'utility' },
    { id: 'stack', name: 'Stack', category: 'utility' },
    { id: 'grid', name: 'Grid', category: 'utility' },
    { id: 'container', name: 'Container', category: 'utility' },

    // Composite
    { id: 'card', name: 'Card', category: 'composite' },
    { id: 'menu', name: 'Menu', category: 'composite' },
    { id: 'table', name: 'Table', category: 'composite' },
    { id: 'lightbox', name: 'Lightbox', category: 'composite' },
    { id: 'carousel', name: 'Carousel', category: 'composite' },
];

const categoryLabels: Record<ComponentCategory, string> = {
    form: 'Form',
    navigation: 'Navigation',
    overlay: 'Overlay',
    utility: 'Utility',
    composite: 'Composite',
};

const allCategories: ComponentCategory[] = ['form', 'navigation', 'overlay', 'utility', 'composite'];

interface ComponentMenuProps {
    selectedComponent: string | null;
    onComponentSelect: (componentId: string) => void;
}

export function ComponentMenu({ selectedComponent, onComponentSelect }: ComponentMenuProps) {
    const [open, setOpen] = useState<Set<ComponentCategory>>(
        () => new Set(allCategories)
    );

    function toggleCategory(cat: ComponentCategory) {
        setOpen(prev => {
            const next = new Set(prev);
            next.has(cat) ? next.delete(cat) : next.add(cat);
            return next;
        });
    }

    return (
        <div className="component-menu">
            <div className="component-menu-header">
                <h2>Components</h2>
            </div>

            <div className="component-menu-content">
                {allCategories.map((category) => {
                    const items = components.filter(c => c.category === category);
                    const isOpen = open.has(category);

                    return (
                        <div key={category} className="component-category">
                            <button
                                className="category-toggle"
                                onClick={() => toggleCategory(category)}
                                aria-expanded={isOpen}
                            >
                                <span className="category-label-text">{categoryLabels[category]}</span>
                                <svg
                                    className={`category-chevron${isOpen ? ' open' : ''}`}
                                    width="12" height="12" viewBox="0 0 12 12"
                                    fill="none" aria-hidden="true"
                                >
                                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
                                        strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {isOpen && (
                                <div className="category-items">
                                    {items.map((component) => (
                                        <button
                                            key={component.id}
                                            className={`component-item${selectedComponent === component.id ? ' active' : ''}`}
                                            onClick={() => onComponentSelect(component.id)}
                                        >
                                            {component.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
