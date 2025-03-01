import React from 'react';
import { Play, Edit, Trash2 } from 'lucide-react';
import { Script, ScriptCategory } from '../types';

interface ScriptListProps {
  scripts: Script[];
  categories: ScriptCategory[];
  onRunScript: (script: Script) => void;
  onEditScript: (script: Script) => void;
  onDeleteScript: (scriptId: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const ScriptList: React.FC<ScriptListProps> = ({
  scripts,
  categories,
  onRunScript,
  onEditScript,
  onDeleteScript,
  selectedCategory,
  onSelectCategory,
}) => {
  const filteredScripts = selectedCategory
    ? scripts.filter((script) => script.category === selectedCategory)
    : scripts;

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onSelectCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => onSelectCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2">Available Scripts</h2>
      {filteredScripts.length === 0 ? (
        <p className="text-gray-500 italic">No scripts available in this category.</p>
      ) : (
        <div className="space-y-2">
          {filteredScripts.map((script) => (
            <div
              key={script.id}
              className="border border-gray-200 rounded-md p-3 hover:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{script.name}</h3>
                  <p className="text-sm text-gray-600">{script.description}</p>
                  <p className="text-xs text-gray-500 mt-1 font-mono">{script.command}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onRunScript(script)}
                    className="p-1 rounded-md text-green-600 hover:bg-green-100"
                    title="Run Script"
                  >
                    <Play size={18} />
                  </button>
                  <button
                    onClick={() => onEditScript(script)}
                    className="p-1 rounded-md text-blue-600 hover:bg-blue-100"
                    title="Edit Script"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteScript(script.id)}
                    className="p-1 rounded-md text-red-600 hover:bg-red-100"
                    title="Delete Script"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-1">
                <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
                  {categories.find((c) => c.id === script.category)?.name || script.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScriptList;