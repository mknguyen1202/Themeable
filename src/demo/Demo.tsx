import { useState } from 'react';
import { ThemeProvider } from '../system/ThemeProvider/ThemeProvider';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ComponentMenu } from './ComponentMenu';
import { ComponentShowcase } from './ComponentShowcase';
import { solar, lunar, aurora, highContrast } from '../themes';
import type { FamilyId } from '../families';
import type { Theme } from '../themes/types';
import './Demo.css';

type ThemeName = 'solar' | 'lunar' | 'aurora' | 'highContrast';

const themes: Record<ThemeName, Theme> = {
    solar,
    lunar,
    aurora,
    highContrast,
};

const familyIds: FamilyId[] = [
    'flat',
    'material',
    'neumorphism',
    'glass',
    'brutalist',
    'auroraNeon',
    'wireframe',
];

export function Demo() {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>('solar');
    const [currentFamily, setCurrentFamily] = useState<FamilyId>('flat');
    const [selectedComponent, setSelectedComponent] = useState<string | null>('button');

    const selectedTheme = themes[currentTheme];

    return (
        <div className={`demo-root ${selectedTheme.mode}`} data-theme={currentTheme} data-family={currentFamily}>
            <ThemeProvider theme={selectedTheme} family={currentFamily}>
                <div className="demo-container">
                    <ThemeSwitcher
                        themes={themes}
                        currentTheme={currentTheme}
                        onThemeChange={(name) => setCurrentTheme(name as ThemeName)}
                        families={familyIds}
                        currentFamily={currentFamily}
                        onFamilyChange={setCurrentFamily}
                    />

                    <div className="demo-content">
                        <ComponentMenu
                            selectedComponent={selectedComponent}
                            onComponentSelect={setSelectedComponent}
                        />

                        {selectedComponent && (
                            <ComponentShowcase
                                componentId={selectedComponent}
                                onOpenEditor={() => {
                                    // This will be handled by App.tsx
                                    window.dispatchEvent(new CustomEvent('openEditor'));
                                }}
                            />
                        )}
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}
