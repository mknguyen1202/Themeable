import { useState, useEffect } from 'react';
import { Demo } from './demo';
import { Editor } from './editor/Editor';
import { ToastProvider } from './components';
import './App.css';

function App() {
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    useEffect(() => {
        const handleOpenEditor = () => {
            setIsEditorOpen(true);
        };

        window.addEventListener('openEditor', handleOpenEditor);
        return () => window.removeEventListener('openEditor', handleOpenEditor);
    }, []);

    return (
        <ToastProvider>
            <div className="app-root">
                <button
                    className="editor-toggle-btn"
                    onClick={() => setIsEditorOpen(!isEditorOpen)}
                    aria-label="Toggle editor"
                >
                    {isEditorOpen ? '✕' : '⚙️'}
                </button>

                <div className="app-main">
                    <Demo />
                </div>

                <div className={`editor-drawer ${isEditorOpen ? 'open' : ''}`}>
                    <Editor />
                </div>

                {isEditorOpen && (
                    <div
                        className="editor-overlay"
                        onClick={() => setIsEditorOpen(false)}
                    />
                )}
            </div>
        </ToastProvider>
    );
}

export default App;

