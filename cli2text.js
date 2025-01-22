import chalk from "chalk";
import fs from "node:fs/promises";
import path, { sep } from "node:path";


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
            indentation : indent,
            isFolder : file.isDirectory()
        }
        if (IGNORE.includes(file.name)) {
            continue;
        }
        if (file.isDirectory()) {
            list_of_files.push(fileInfo)
            await listOfFiles(fileInfo.path, indent + "  ", list_of_files)
        } else {
            list_of_files.push(fileInfo)
        }
    }
    return list_of_files
}

async function extractInfos(dir, output_path = "./output.txt") {
    const filesList = await listOfFiles(dir)
    let tree = "\nArchitecture des fichiers : \n\n";
    const separator = "\n|------------------------------------------------------------------------|\n"
    let fileContent = "Voici le contenu de votre dossier " + dir + separator;

    for (const file of filesList) {
        if (file.isFolder) {
            tree += `${file.indentation}📁 ${chalk.hex('#bf7a21')(file.name)}/\n`
            fileContent += '\n'
            fileContent += `Directory : ${file.name}/\n`
            fileContent += `Path : .\\${file.path}\n`
            fileContent += separator
        }
        else {
            tree += `${file.indentation}📄 ${chalk.green(file.name)}\n`

            fileContent += '\n'
            fileContent += `File : ${file.name}\n`
            fileContent += `Path : .\\${file.path}\n`
            fileContent += `Weight : ${Math.round( ((await fs.stat(file.path)).size / 1024) * 100) / 100}ko\n`
            fileContent += '\n'
            fileContent += await fs.readFile(file.path, "utf-8") 
            fileContent += separator

        }
    }
    fs.writeFile(output_path, fileContent)
    console.log(tree)
}

await extractInfos("./")

// const tree = await listOfFiles("./");
// let output = "Extracting file datas in progress... \n"
// for (const el of tree) {
//     output += '\n' + el
// }
// output += "\n\nEnd of file extraction !\n"
// console.log(output);


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
