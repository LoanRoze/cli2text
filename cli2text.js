import chalk from "chalk";
import fs from "node:fs/promises";
import path from "node:path";


const IGNORE = [
    "node_modules",
    ".git",
    "package.json",
    "package-lock.json",
    "output.txt",
    // Add more files/directories here
];

function getFileType(fileName) {
    const regex = /\.([a-zA-Z0-9]+)$/;
    const match = fileName.match(regex);

    if (match) return match[1]
    else return null
}

async function listOfFiles(dir, indent="", list_of_files = []) {
    const dirFiles = await fs.readdir(dir, {withFileTypes : true})
    for (const file of dirFiles) {
        const fileInfo = {
            parent : file.parentPath,
            path : path.join(dir, file.name),
            name : file.name,
        }
        if (IGNORE.includes(file.name)) {
            continue;
        }
        if (file.isDirectory()) {
            list_of_files.push(`${indent}📁 ${file.name}/`)
            await listOfFiles(fileInfo.path, indent + "  ", list_of_files)
        } else {
            list_of_files.push(`${indent}📄 ${file.name}`)
        }
    }
    return list_of_files
}

const tree = await listOfFiles("./");
let output = "Extracting file datas in progress... \n"
for (const el of tree) {
    output += '\n' + el
}
output += "\n\nEnd of file extraction !\n"
console.log(output);


// async function createTree(dir) {
//     const tree = {};
//     const fileList = await listOfFiles(dir)

//     for (const file of fileList) {
//         const parts = file.path.split('\\');
//         let current = tree;

//         parts.forEach((part, depth) => {
//             if (!current[part]) {
//                 current[part] = {
//                     isFile: depth === parts.length - 1,
//                     children: {},
//                 };
//             }
//             current = current[part].children;
//         });
//     }

//     return tree;
// }

// async function printTree(tree, depth = 0, output = "") {
    
//     const indentation = '    '.repeat(depth);
//     const treeNodes = Object.keys(tree)
    
//     for (const key of treeNodes) {
//         const node = tree[key];

//         if (node.isFile) {
//             output += `\n${indentation}📄 ${key}`
//         } else {
//             output += `\n${indentation}📁 ${key}`
//             await printTree(node.children, depth + 1, output);
//         }
//     }
//     console.log(output)
//     return output
// }

// console.log(
// await printTree(await createTree("./"))
// )
