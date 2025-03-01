# Backend Implementation Guide for Python Script Administrator

To make this application fully functional with real Python script execution, you'll need to implement a backend server. Here's a guide on how to do that.

## Option 1: Express.js Backend (Node.js)

### Setup

1. Create a new directory for your backend:

```bash
mkdir python-script-admin-backend
cd python-script-admin-backend
npm init -y
npm install express cors body-parser child_process
```

2. Create a basic server file (`server.js`):

```javascript
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/api/run-script', (req, res) => {
  const { command } = req.body;
  
  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }
  
  const startTime = new Date();
  
  exec(command, (error, stdout, stderr) => {
    const endTime = new Date();
    
    res.json({
      stdout: stdout || '',
      stderr: stderr || '',
      exitCode: error ? error.code || 1 : 0,
      isRunning: false,
      startTime,
      endTime,
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

3. Update your frontend `scriptService.ts` to call this API:

```typescript
import { Script, ScriptOutput } from '../types';

const API_URL = 'http://localhost:3001/api';

export const runScript = async (script: Script): Promise<ScriptOutput> => {
  console.log(`Running script: ${script.name} (${script.command})`);
  
  try {
    const response = await fetch(`${API_URL}/run-script`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command: script.command }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return {
      ...result,
      startTime: new Date(result.startTime),
      endTime: new Date(result.endTime),
    };
  } catch (error) {
    return {
      stdout: '',
      stderr: error instanceof Error ? error.message : 'An unknown error occurred',
      exitCode: 1,
      isRunning: false,
      startTime: new Date(),
      endTime: new Date(),
    };
  }
};

// Implement other methods similarly
```

## Option 2: Flask Backend (Python)

### Setup

1. Create a new directory for your backend:

```bash
mkdir python-script-admin-backend
cd python-script-admin-backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install flask flask-cors
```

2. Create a basic server file (`app.py`):

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import datetime
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/run-script', methods=['POST'])
def run_script():
    data = request.json
    command = data.get('command')
    
    if not command:
        return jsonify({'error': 'Command is required'}), 400
    
    start_time = datetime.datetime.now()
    
    try:
        # Run the command and capture output
        process = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True
        )
        
        end_time = datetime.datetime.now()
        
        return jsonify({
            'stdout': process.stdout,
            'stderr': process.stderr,
            'exitCode': process.returncode,
            'isRunning': False,
            'startTime': start_time.isoformat(),
            'endTime': end_time.isoformat()
        })
    except Exception as e:
        end_time = datetime.datetime.now()
        return jsonify({
            'stdout': '',
            'stderr': str(e),
            'exitCode': 1,
            'isRunning': False,
            'startTime': start_time.isoformat(),
            'endTime': end_time.isoformat()
        })

if __name__ == '__main__':
    app.run(debug=True, port=3001)
```

3. Update your frontend `scriptService.ts` to call this API (same as in the Express.js example).

## Security Considerations

Running arbitrary commands from user input is extremely dangerous. In a production environment, you should:

1. Validate and sanitize all input
2. Run commands in a sandboxed environment
3. Implement user authentication and authorization
4. Set timeouts for long-running scripts
5. Limit resource usage
6. Consider using a more secure approach like running scripts in containers

## Data Persistence

To save scripts permanently, you can:

1. Use a database like MongoDB, PostgreSQL, or SQLite
2. Store scripts in JSON files
3. Implement a proper API for CRUD operations

## Deployment Considerations

When deploying:

1. Use HTTPS for all communication
2. Set up proper CORS headers
3. Consider using a reverse proxy like Nginx
4. Implement rate limiting
5. Set up monitoring and logging