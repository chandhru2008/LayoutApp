import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { usePanel } from '../context/PanelContext';
import { Menu, File, Upload, Trash2, Undo, Redo,   FileText, ImageDown, ChevronDown, Grid, Plus, Sun, Moon } from 'lucide-react';
import usePanelIO from '../context/PanelIOContext';
import { useCanvasSettings } from '../context/CanvasSettingsContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { panels, clearPanels, undo, redo, canRedo, canUndo, addPanel} = usePanel();
  const { importConfig, exportConfig, exportToPNG } = usePanelIO();
  const { showCanvasSettings, showGrid, setShowCanvasSettings, setShowGrid } = useCanvasSettings();
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isShapeMenuOpen, setIsShapeMenuOpen] = useState(false);

  const shapes = ['circle', 'square', 'triangle',  'diamond', 'star', 'text'];

  const toggleFileMenu = () => setIsFileMenuOpen(!isFileMenuOpen);
  const toggleShapeMenu = () => setIsShapeMenuOpen(!isShapeMenuOpen);


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-2 h-14 ${theme === 'dark'
        ? 'bg-gray-900 text-gray-100 border-gray-700'
        : 'bg-white text-gray-800 border-gray-200'
        } border-b shadow-sm`}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        {/* App Logo/Menu */}
        <div className="p-1 rounded-md hover:bg-opacity-20 hover:bg-gray-500 transition-colors" onClick={() => setShowCanvasSettings(!showCanvasSettings)}>
          <Menu size={20} className="text-gray-500" />
        </div>

        {/* File Menu */}
        <div className="relative">
          <button
            onClick={toggleFileMenu}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-colors`}
          >
            <File size={16} />
            <span>File</span>
            <ChevronDown size={14} className="mt-0.5" />
          </button>

          {isFileMenuOpen && (
            <div
              className={`absolute top-10 left-0 w-56 rounded-md shadow-lg py-1 z-50 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border`}
              onMouseLeave={() => setIsFileMenuOpen(false)}
            >
              <label className={`flex items-center px-4 py-2 text-sm cursor-pointer ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                <Upload size={16} className="mr-3" />
                Import JSON
                <input type="file" accept=".json" onChange={importConfig} className="hidden" />
              </label>

              <button onClick={exportConfig} className={`flex items-center w-full px-4 py-2 text-sm ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                <FileText size={16} className="mr-3" />
                Export JSON
              </button>

              <button onClick={exportToPNG} className={`flex items-center w-full px-4 py-2 text-sm ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}>
                <ImageDown size={16} className="mr-3" />
                Export PNG
              </button>
            </div>
          )}
        </div>

        {/* Edit Actions */}
        <div className="flex items-center space-x-1 border-r pr-3 h-8 border-gray-300 dark:border-gray-600">
          <button
            onClick={() => undo()}
            className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } ${canUndo ? 'hover: cursor-pointer' : 'cursor-not-allowed'} `}
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={() => redo()}
            className={`p-1.5 rounded-md ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } ${canRedo ? 'hover: cursor-pointer' : 'cursor-not-allowed'}`}
            title="Redo"
          >
            <Redo size={18} />
          </button>
        </div>

        {/* Shape Menu */}
        <div className="relative">
          <button
            onClick={toggleShapeMenu}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
          >
            <Plus size={16} />
            <span>Add Shape</span>
            <ChevronDown size={14} className="mt-0.5" />
          </button>

          {isShapeMenuOpen && (
            <div
              className={`absolute top-10 left-0 w-40 rounded-md shadow-lg py-1 z-50 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border`}
              onMouseLeave={() => setIsShapeMenuOpen(false)}
            >
              {shapes.map((shape) => (
                <button
                  onClick={() => { addPanel(shape.toLocaleLowerCase()); setIsShapeMenuOpen(false) }}
                  key={shape}
                  className={`flex items-center w-full px-4 py-2 text-sm capitalize ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Utility Buttons */}
        <button
          onClick={clearPanels}
          className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm font-medium ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            } ${panels.length == 0 ? 'hover:cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <Trash2 size={16} />
          <span>Clear</span>
        </button>

        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-1.5 rounded-md ${showGrid
            ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-100 text-blue-700')
            : (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100')
            }`}
          title="Toggle Grid"
        >
          <Grid size={18} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center gap-3">
          {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
          <span className="text-sm">Dark Mode</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={theme == "dark"}
            onChange={() => toggleTheme()}
            className="sr-only peer"
          />
          <div className={`w-9 h-5 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600
                                    ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}></div>
        </label>
      </div>
    </header>
  );
}