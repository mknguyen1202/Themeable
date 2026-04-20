import React, { useState } from 'react';
import { FamilyEditor } from './FamilyEditor/FamilyEditor';
import { VariantEditor } from './VariantEditor/VariantEditor';
import { ColorPanel } from './ColorPanel/ColorPanel';
import { ThemeEditor } from './ThemeEditor/ThemeEditor';
import './Editor.css';

export type EditorTab = 'themes' | 'families' | 'variants' | 'colors';

export const Editor: React.FC = () => {
    const [activeTab, setActiveTab] = useState<EditorTab>('themes');

    return (
        <div className="editor-root">
            <div className="editor-header">
                <h1 className="editor-title">Design System Editor</h1>
                <div className="editor-tabs">
                    <button
                        className={`editor-tab ${activeTab === 'themes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('themes')}
                    >
                        Themes
                    </button>
                    <button
                        className={`editor-tab ${activeTab === 'families' ? 'active' : ''}`}
                        onClick={() => setActiveTab('families')}
                    >
                        Families
                    </button>
                    <button
                        className={`editor-tab ${activeTab === 'variants' ? 'active' : ''}`}
                        onClick={() => setActiveTab('variants')}
                    >
                        Variants
                    </button>
                    <button
                        className={`editor-tab ${activeTab === 'colors' ? 'active' : ''}`}
                        onClick={() => setActiveTab('colors')}
                    >
                        Colors
                    </button>
                </div>
            </div>

            <div className="editor-content">
                {activeTab === 'themes' && <ThemeEditor />}
                {activeTab === 'families' && <FamilyEditor />}
                {activeTab === 'variants' && <VariantEditor />}
                {activeTab === 'colors' && <ColorPanel />}
            </div>
        </div>
    );
};
