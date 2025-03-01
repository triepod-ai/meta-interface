import { Script, ScriptCategory } from '../types';

export const scriptCategories: ScriptCategory[] = [
  { id: 'system', name: 'System' },
  { id: 'web', name: 'Web Development' },
  { id: 'data', name: 'Data Processing' },
  { id: 'utility', name: 'Utilities' },
];

export const sampleScripts: Script[] = [
  {
    id: 'python-version',
    name: 'Python Version',
    description: 'Display the installed Python version',
    command: 'python --version',
    category: 'system',
  },
  {
    id: 'list-files',
    name: 'List Files',
    description: 'List files in the current directory',
    command: 'python -c "import os; print(os.listdir(\'.\'))"',
    category: 'system',
  },
  {
    id: 'hello-world',
    name: 'Hello World',
    description: 'Simple Hello World script',
    command: 'python -c "print(\'Hello, World!\')"',
    category: 'utility',
  },
  {
    id: 'system-info',
    name: 'System Info',
    description: 'Display system information',
    command: 'python -c "import platform; print(platform.uname())"',
    category: 'system',
  },
  {
    id: 'current-time',
    name: 'Current Time',
    description: 'Display the current date and time',
    command: 'python -c "import datetime; print(datetime.datetime.now())"',
    category: 'utility',
  },
];