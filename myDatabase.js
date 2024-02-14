const fs = require('fs');
const path = require('path');
const readline = require('readline');

const baseDir = '/Users/siddhiwadetiwar/Desktop/';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const displayMenu = () => {
    console.log(`
        Menu:
        1. Create Folder
        2. Read Folder
        3. Update Folder
        4. Delete Folder
        5. Create File
        6. Read File
        7. Update File
        8. Delete File
        9. Create Record
        10. Read Record
        11. Update Record
        12. Delete Record
        13. Exit
    `);
};

const createFolder = () => {
    rl.question('Enter folder name: ', (folderName) => {
        const folderPath = path.join(baseDir, folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log(`Folder ${folderName} created successfully.`);
        } else {
            console.log(`Folder ${folderName} already exists.`);
        }
        displayMenu();
    });
};

const readFolder = () => {
    rl.question('Enter folder name: ', (folderName) => {
        const folderPath = path.join(baseDir, folderName);
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);
            console.log(`Files in folder ${folderName}:`);
            files.forEach(file => console.log(file));
        } else {
            console.log(`Folder ${folderName} does not exist.`);
        }
        displayMenu();
    });
};

const updateFolder = () => {
    rl.question('Enter current folder name: ', (oldFolderName) => {
        rl.question('Enter new folder name: ', (newFolderName) => {
            const oldFolderPath = path.join(baseDir, oldFolderName);
            const newFolderPath = path.join(baseDir, newFolderName);
            if (fs.existsSync(oldFolderPath)) {
                fs.renameSync(oldFolderPath, newFolderPath);
                console.log(`Folder ${oldFolderName} renamed to ${newFolderName}.`);
            } else {
                console.log(`Folder ${oldFolderName} does not exist.`);
            }
            displayMenu();
        });
    });
};

const deleteFolder = () => {
    rl.question('Enter folder name: ', (folderName) => {
        const folderPath = path.join(baseDir, folderName);
        if (fs.existsSync(folderPath)) {
            fs.rmdirSync(folderPath, { recursive: true });
            console.log(`Folder ${folderName} deleted successfully.`);
        } else {
            console.log(`Folder ${folderName} does not exist.`);
        }
        displayMenu();
    });
};

const createFile = () => {
    rl.question('Enter folder name: ', (folderName) => {
        rl.question('Enter file name: ', (fileName) => {
            const filePath = path.join(baseDir, folderName, `${fileName}.json`);
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, '[]');
                console.log(`File ${fileName} created successfully in folder ${folderName}.`);
            } else {
                console.log(`File ${fileName} already exists in folder ${folderName}.`);
            }
            displayMenu();
        });
    });
};

const readFile = () => {
    rl.question('Enter folder name: ', (folderName) => {
        rl.question('Enter file name: ', (fileName) => {
            const filePath = path.join(baseDir, folderName, `${fileName}.json`);
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                console.log(`Records in file ${fileName} in folder ${folderName}:`);
                console.log(JSON.parse(content));
            } else {
                console.log(`File ${fileName} does not exist in folder ${folderName}.`);
            }
            displayMenu();
        });
    });
};

const updateFile = () => {
    rl.question('Enter folder name: ', (folderName) => {
        rl.question('Enter file name: ', (fileName) => {
            const filePath = path.join(baseDir, folderName, `${fileName}.json`);
            if (fs.existsSync(filePath)) {
                const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                console.log('Current content:', content);
                rl.question('Enter new content: ', (newContent) => {
                    fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2));
                    console.log(`File ${fileName} in folder ${folderName} updated successfully.`);
                    displayMenu();
                });
            } else {
                console.log(`File ${fileName} does not exist in folder ${folderName}.`);
                displayMenu();
            }
        });
    });
};

const deleteFile = () => {
    rl.question('Enter folder name: ', (folderName) => {
        rl.question('Enter file name: ', (fileName) => {
            const filePath = path.join(baseDir, folderName, `${fileName}.json`);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log(`File ${fileName} in folder ${folderName} deleted successfully.`);
            } else {
                console.log(`File ${fileName} does not exist in folder ${folderName}.`);
            }
            displayMenu();
        });
    });
};

const createRecord = () => {
    rl.question('Enter folder name: ', (folderName) => {
        rl.question('Enter file name: ', (fileName) => {
            rl.question('Enter record (JSON format): ', (record) => {
                const filePath = path.join(baseDir, folderName, `${fileName}.json`);
                if (fs.existsSync(filePath)) {
                    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    content.push(JSON.parse(record));
                    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
                    console.log(`Record added to file ${fileName} in folder ${folderName}.`);
                } else {
                    console.log(`File ${fileName} does not exist in folder ${folderName}.`);
                }
                displayMenu();
            });
        });
    });
};

const readRecord = () => {
    rl.question('Enter folder name: ', (folderName) => {
        rl.question('Enter file name: ', (fileName) => {
            rl.question('Enter record index: ', (recordIndex) => {
                const filePath = path.join(baseDir, folderName, `${fileName}.json`);
                if (fs.existsSync(filePath)) {
                    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    if (recordIndex >= 0 && recordIndex < content.length) {
                        console.log(`Record ${recordIndex} in file ${fileName} in folder ${folderName}:`);
                        console.log(content[recordIndex]);
                    } else {
                        console.log(`Record ${recordIndex} does not exist in file ${fileName} in folder ${folderName}.`);
                    }
                } else {
                    console.log(`File ${fileName} does not exist in folder ${folderName}.`);
                }
                displayMenu();
            });
        });
    });
};

const updateRecord = () => {
    rl.question('Enter folder name: ', (folderName) => {
        rl.question('Enter file name: ', (fileName) => {
            rl.question('Enter record index: ', (recordIndex) => {
                rl.question('Enter new record (JSON format): ', (newRecord) => {
                    const filePath = path.join(baseDir, folderName, `${fileName}.json`);
                    if (fs.existsSync(filePath)) {
                        const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                        if (recordIndex >= 0 && recordIndex < content.length) {
                            content[recordIndex] = JSON.parse(newRecord);
                            fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
                            console.log(`Record ${recordIndex} in file ${fileName} in folder ${folderName} updated successfully.`);
                        } else {
                            console.log(`Record ${recordIndex} does not exist in file ${fileName} in folder ${folderName}.`);
                        }
                    } else {
                        console.log(`File ${fileName} does not exist in folder ${folderName}.`);
                    }
                    displayMenu();
                });
            });
        });
    });
};

const deleteRecord = () => {
    rl.question('Enter folder name: ', (folderName) => {
        rl.question('Enter file name: ', (fileName) => {
            rl.question('Enter record index: ', (recordIndex) => {
                const filePath = path.join(baseDir, folderName, `${fileName}.json`);
                if (fs.existsSync(filePath)) {
                    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    if (recordIndex >= 0 && recordIndex < content.length) {
                        content.splice(recordIndex, 1);
                        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
                        console.log(`Record ${recordIndex} in file ${fileName} in folder ${folderName} deleted successfully.`);
                    } else {
                        console.log(`Record ${recordIndex} does not exist in file ${fileName} in folder ${folderName}.`);
                    }
                } else {
                    console.log(`File ${fileName} does not exist in folder ${folderName}.`);
                }
                displayMenu();
            });
        });
    });
};

const handleMenuChoice = (choice) => {
    switch (choice) {
        case '1':
            createFolder();
            break;
        case '2':
            readFolder();
            break;
        case '3':
            updateFolder();
            break;
        case '4':
            deleteFolder();
            break;
        case '5':
            createFile();
            break;
        case '6':
            readFile();
            break;
        case '7':
            updateFile();
            break;
        case '8':
            deleteFile();
            break;
        case '9':
            createRecord();
            break;
        case '10':
            readRecord();
            break;
        case '11':
            updateRecord();
            break;
        case '12':
            deleteRecord();
            break;
        case '13':
            rl.close();
            break;
        default:
            console.log('Invalid choice. Please try again.');
            displayMenu();
            break;
    }
};

rl.on('close', () => {
    console.log('Exiting program.');
    process.exit(0);
});

rl.on('line', (input) => {
    handleMenuChoice(input.trim());
});

displayMenu();