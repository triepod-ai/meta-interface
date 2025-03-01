export interface Script {
  id: string;
  name: string;
  description: string;
  command: string;
  category: string;
}

export interface ScriptOutput {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  isRunning: boolean;
  startTime?: Date;
  endTime?: Date;
}

export interface ScriptCategory {
  id: string;
  name: string;
}