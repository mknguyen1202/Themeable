import fs from 'fs';

const json = JSON.parse(fs.readFileSync('./src/components/ThemeProvider/theme.json', 'utf-8'));

const convertToSCSSMap = (obj: Record<string, any>, prefix = ''): string => {

    const spaces = ' '.repeat(4); // 4 spaces for indentation
    return Object.entries(obj)
        .map(([key, value]) => {
            const newKey = prefix ? `${prefix}-${key}` : key;
            if (typeof value === 'object' && !Array.isArray(value)) {
                return convertToSCSSMap(value, newKey);
            }
            return `$${newKey}: ${value};`;
        })
        .join('\n');
}

// function applyTheme(json: ThemeConfig) {
//     Object.entries(json.schemes.primary.button).forEach(([key, value]) => {
//         document.documentElement.style.setProperty(`--primary-button-${key}`, value);
//     });
// }


const scss = convertToSCSSMap(json);
fs.writeFileSync('./src/components/ThemeProvider/_user-defined-theme.scss', scss, 'utf-8');



const scheme = JSON.parse(fs.readFileSync('./src/components/ThemeProvider/scheme.json', 'utf-8'));