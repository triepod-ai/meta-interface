import React, { useState } from 'react';
import { Terminal, Plus, Code2 } from 'lucide-react';
import ScriptList from './components/ScriptList';
import ScriptOutput from './components/ScriptOutput';
import ScriptForm from './components/ScriptForm';
import { Script, ScriptOutput as ScriptOutputType } from './types';
import { sampleScripts, scriptCategories } from './data/sampleScripts';
import { runScript, saveScript, deleteScript } from './services/scriptService';

function App() {
  const [scripts, setScripts] = useState<Script[]>(sampleScripts);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [scriptOutput, setScriptOutput] = useState<ScriptOutputType | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingScript, setEditingScript] = useState<Script | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunScript = async (script: Script) => {
    setSelectedScript(script);
    setIsRunning(true);
    setScriptOutput({
      stdout: '',
      stderr: '',
      exitCode: null,
      isRunning: true,
      startTime: new Date(),
    });

    try {
      const result = await runScript(script);
      setScriptOutput(result);
    } catch (error) {
      setScriptOutput({
        stdout: '',
        stderr: error instanceof Error ? error.message : 'An unknown error occurred',
        exitCode: 1,
        isRunning: false,
        startTime: new Date(),
        endTime: new Date(),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveScript = async (script: Script) => {
    try {
      await saveScript(script);
      
      if (editingScript) {
        // Update existing script
        setScripts(scripts.map(s => s.id === script.id ? script : s));
      } else {
        // Add new script
        setScripts([...scripts, script]);
      }
      
      setShowForm(false);
      setEditingScript(undefined);
    } catch (error) {
      console.error('Failed to save script:', error);
      // Handle error (could show an error message to the user)
    }
  };

  const handleDeleteScript = async (scriptId: string) => {
    if (window.confirm('Are you sure you want to delete this script?')) {
      try {
        await deleteScript(scriptId);
        setScripts(scripts.filter(s => s.id !== scriptId));
        
        if (selectedScript?.id === scriptId) {
          setSelectedScript(null);
          setScriptOutput(null);
        }
      } catch (error) {
        console.error('Failed to delete script:', error);
        // Handle error
      }
    }
  };

  const handleAddNewScript = () => {
    setEditingScript(undefined);
    setShowForm(true);
  };

  const handleEditScript = (script: Script) => {
    setEditingScript(script);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Terminal className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-xl font-bold text-gray-900">Python Script Administrator</h1>
            </div>
            <button
              onClick={handleAddNewScript}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Script
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {showForm ? (
          <div className="mb-6">
            <ScriptForm
              script={editingScript}
              categories={scriptCategories}
              onSave={handleSaveScript}
              onCancel={() => {
                setShowForm(false);
                setEditingScript(undefined);
              }}
            />
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ScriptList
              scripts={scripts}
              categories={scriptCategories}
              onRunScript={handleRunScript}
              onEditScript={handleEditScript}
              onDeleteScript={handleDeleteScript}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>
          <div>
            <ScriptOutput
              output={scriptOutput}
              scriptName={selectedScript?.name}
            />
          </div>
        </div>

        {!showForm && !selectedScript && scripts.length === 0 && (
          <div className="mt-10 text-center">
            <Code2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No scripts</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new script.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleAddNewScript}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Script
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white mt-auto py-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Python Script Administrator - Development Version
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;