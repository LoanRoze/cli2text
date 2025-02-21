# 🛠️ Projet `Node.js`

## 🌟 How It Works

1. **Scan the Current Directory**: The tool scans the directory from where the script is executed.
2. **Skip Ignored Items**: Excluded files and directories are skipped based on the `IGNORE` array.
3. **Log and Save**: Outputs the directory structure to the console and writes it to `output.txt` in the current directory.

## ✨ Features

- **Recursive Directory Traversal**: Efficiently processes all files and subdirectories in the current directory.
- **Exclusion Rules**: Skips predefined files and directories like `node_modules` and `.git` to focus on relevant content.
- **Human-Readable File Sizes**: Converts raw byte sizes into readable units (e.g., KB, MB).
- **Automated Output**: Always generates the output in an `output.txt` file in the current directory.
- **Colorized CLI Output**: Uses `chalk` to display directory and file names in a visually appealing manner.

## 🛠️ Prerequisites

Before using this tool, ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   Or, if using Yarn:

   ```bash
   yarn install
   ```

## 🎯 Usage

### Running the Tool

Execute the script with Node.js. No arguments are required; the tool processes the current directory and automatically generates an `output.txt` file.

```bash
node cli2text.js
```

### Example Output *

- **Directories** are displayed with a `📂` icon in green.
- **Files** include their names and sizes, formatted for readability, displayed in green with a `📄` icon.
- **Indented Structure** reflects the hierarchy of the directory tree.

```text
File and folder tree for : ./

📄 cli2output.js
📂 demo
   📄 data.txt
   📂 data_1
      📄 data_1.csv
📄 index.html
📄 index.js

Compilation completed. Content saved in "output.txt"
```

\* Colors are not displayed in README.md example

### Exclusion Rules

By default, the following files and directories are ignored:

- `node_modules`
- `.git`
- `package.json`
- `package-lock.json`
- `output.txt`

To exclude additional files or directories, update the `IGNORE` array in `cli2text.js`:

```javascript
const IGNORE = [
  "node_modules",
  ".git",
  "package.json",
  "package-lock.json",
  "output.txt",
  // Add more files/directories here
];
```

## 📄 Code Overview

### Key Functions

#### `formatSize(bytes)`

Converts a byte value into human-readable units (e.g., KB, MB).

#### `processTree(directory, indent, compiledContent)`

Traverses the directory structure recursively:
- Logs directories and files to the console.
- Appends structured data to `compiledContent`.
- Writes the final output to `output.txt` in the current directory.

### Dependencies

- **`fs/promises`**: Handles asynchronous file system operations.
- **`path`**: Constructs file and directory paths.
- **`chalk` (vendor)**: Adds colorized output for better readability.
