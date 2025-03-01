import React from 'react';
import { ScriptOutput as ScriptOutputType } from '../types';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ScriptOutputProps {
  output: ScriptOutputType | null;
  scriptName?: string;
}

const ScriptOutput: React.FC<ScriptOutputProps> = ({ output, scriptName }) => {
  if (!output) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 h-full">
        <h2 className="text-lg font-semibold mb-2">Output</h2>
        <div className="p-4 text-center text-gray-500">
          <p>Run a script to see output here</p>
        </div>
      </div>
    );
  }

  const formatTime = (date?: Date) => {
    return date ? new Date(date).toLocaleTimeString() : 'N/A';
  };

  const executionTime = output.startTime && output.endTime
    ? ((new Date(output.endTime).getTime() - new Date(output.startTime).getTime()) / 1000).toFixed(2)
    : 'N/A';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">
          {scriptName ? `Output: ${scriptName}` : 'Output'}
        </h2>
        <div className="flex items-center space-x-2">
          {output.isRunning ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <Clock size={14} className="mr-1" /> Running...
            </span>
          ) : output.exitCode === 0 ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <CheckCircle size={14} className="mr-1" /> Success
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <AlertCircle size={14} className="mr-1" /> Error (Code: {output.exitCode})
            </span>
          )}
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-2 flex flex-wrap gap-x-4">
        <span className="inline-flex items-center">
          Start: {formatTime(output.startTime)}
        </span>
        <span className="inline-flex items-center">
          End: {formatTime(output.endTime)}
        </span>
        <span className="inline-flex items-center">
          Duration: {executionTime}s
        </span>
      </div>

      <div className="code-output">
        {output.stdout && (
          <div className="mb-2">
            <div className="text-xs font-medium text-gray-500 mb-1">STDOUT:</div>
            <SyntaxHighlighter
              language="plaintext"
              style={tomorrow}
              customStyle={{ fontSize: '0.9rem' }}
            >
              {output.stdout}
            </SyntaxHighlighter>
          </div>
        )}

        {output.stderr && (
          <div>
            <div className="text-xs font-medium text-red-500 mb-1">STDERR:</div>
            <SyntaxHighlighter
              language="plaintext"
              style={tomorrow}
              customStyle={{ fontSize: '0.9rem', backgroundColor: '#FEF2F2' }}
            >
              {output.stderr}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptOutput;