# Running the Python Script Administrator Locally

This guide will walk you through the steps to run the Python Script Administrator application on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Python** (v3.6 or higher) - [Download from python.org](https://python.org/)

## Step 1: Clone or Download the Project

### Option 1: If you've exported to GitHub

```bash
# Clone the repository
git clone https://github.com/your-username/python-script-admin.git

# Navigate to the project directory
cd python-script-admin
```

### Option 2: If you're downloading directly from StackBlitz

1. In StackBlitz, click on the "Project" tab in the left sidebar
2. Click "Download Project" (or use Ctrl+S / Cmd+S)
3. Extract the ZIP file to a folder on your computer
4. Open a terminal and navigate to the extracted folder

## Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn
```

## Step 3: Start the Development Server

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

This will start the development server, typically at http://localhost:5173 (the exact URL will be shown in your terminal).

## Step 4: View the Application

Open your web browser and navigate to the URL shown in your terminal (usually http://localhost:5173).

## Making the Python Scripts Work Locally

Currently, the application simulates running Python scripts. To make it actually execute Python scripts on your local machine, you'll need to modify the `scriptService.ts` file to use Node.js's child_process module.

Here's how to update it:

1. Open `src/services/scriptService.ts`
2. Replace its contents with the following code:

```typescript
import { Script, ScriptOutput } from '../types';
import { exec } from 'child_process';

export const runScript = async (script: Script): Promise<ScriptOutput> => {
  console.log(`Running script: ${script.name} (${script.command})`);
  
  const startTime = new Date();
  
  return new Promise((resolve) => {
    exec(script.command, (error, stdout, stderr) => {
      const endTime = new Date();
      
      resolve({
        stdout: stdout || '',
        stderr: stderr || '',
        exitCode: error ? error.code || 1 : 0,
        isRunning: false,
        startTime,
        endTime,
      });
    });
  });
};

export const saveScript = async (script: Script): Promise<Script> => {
  console.log('Saving script:', script);
  // In a real application, you would save this to a database or file
  // For now, it just returns the script object
  return script;
};

export const deleteScript = async (scriptId: string): Promise<boolean> => {
  console.log('Deleting script:', scriptId);
  // In a real application, you would delete from a database or file
  return true;
};
```

## Building for Production

If you want to build the application for production:

```bash
# Using npm
npm run build

# OR using yarn
yarn build
```

This will create a `dist` folder with optimized production files.

To preview the production build locally:

```bash
# Using npm
npm run preview

# OR using yarn
yarn preview
```

## Troubleshooting

### Python Script Execution Issues

- Make sure Python is installed and available in your PATH
- For Windows users, you might need to use `python` or `py` instead of just `python` in your commands
- For complex scripts, consider creating .py files and executing them with `python script.py`

### Node.js Permissions for Running System Commands

- On some systems, you might need elevated permissions to run system commands
- If you're getting permission errors, try running the development server with administrator privileges

### CORS Issues

- If you're planning to separate the frontend and backend, you might encounter CORS issues
- You'll need to set up proper CORS headers on your backend server

## Next Steps for a Production Environment

For a more robust solution:

1. Create a proper backend API (using Express.js, Flask, etc.)
2. Implement user authentication
3. Set up a database to store scripts
4. Add proper error handling and logging
5. Implement security measures for script execution