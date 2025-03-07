# Python Script Administrator

A web-based application for managing and executing Python scripts. This tool allows you to organize scripts by category, execute them, and view their output in real-time.

![Python Script Administrator](https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)

## Features

- Create, edit, and delete Python scripts
- Organize scripts by categories
- Execute scripts and view real-time output
- Display stdout and stderr separately
- Track execution time and status

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)
- React Syntax Highlighter

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/python-script-admin.git
   cd python-script-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

## Usage

### Adding a Script

1. Click the "Add Script" button in the header
2. Fill in the script details:
   - Name: A descriptive name for your script
   - Description: What the script does
   - Command: The Python command to execute
   - Category: Select from existing categories

### Running a Script

1. Find the script you want to run in the script list
2. Click the "Play" button next to the script
3. View the output in the right panel

### Managing Scripts

- Edit: Click the "Edit" button next to a script
- Delete: Click the "Delete" button next to a script

## Development

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Future Enhancements

- Backend integration for actual script execution
- User authentication and permissions
- Script scheduling
- Script parameter inputs
- Script history and logs
- File upload for script execution

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)