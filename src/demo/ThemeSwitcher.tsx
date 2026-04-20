import type { Theme } from '../themes/types';
import type { FamilyId } from '../families';
import './ThemeSwitcher.css';

interface ThemeSwitcherProps {
    themes: Record<string, Theme>;
    currentTheme: string;
    onThemeChange: (themeName: string) => void;
    families: FamilyId[];
    currentFamily: FamilyId;
    onFamilyChange: (familyId: FamilyId) => void;
}

export function ThemeSwitcher({
    themes,
    currentTheme,
    onThemeChange,
    families,
    currentFamily,
    onFamilyChange,
}: ThemeSwitcherProps) {
    return (
        <div className="theme-switcher">
            <div className="switcher-group">
                <span className="switcher-label">Theme</span>
                <div className="switcher-pills">
                    {Object.entries(themes).map(([name, theme]) => (
                        <button
                            key={name}
                            onClick={() => onThemeChange(name)}
                            className={`switcher-pill ${currentTheme === name ? 'active' : ''}`}
                            data-mode={theme.mode}
                        >
                            <span className="pill-dot" data-mode={theme.mode} />
                            {theme.label ?? name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="switcher-divider" />

            <div className="switcher-group">
                <span className="switcher-label">Family</span>
                <div className="switcher-pills">
                    {families.map((family) => (
                        <button
                            key={family}
                            onClick={() => onFamilyChange(family)}
                            className={`switcher-pill ${currentFamily === family ? 'active' : ''}`}
                        >
                            {family}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
