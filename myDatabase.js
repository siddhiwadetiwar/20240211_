/**The requirement is to design a file system where a database
 *  is represented as a folder, a table is akin to a file in JSON 
 * format, and records are lines within that file, also in JSON format.
 *  The system should facilitate CRUD operations, including creating,
 *  reading, updating, and deleting databases, tables, and records. 
 * In total, there should be 12 operations, covering the creation, reading,
 *  updating, and deletion of folders (databases), files (tables), 
 * and individual lines within files (records).
 */


//Importing the 'fs' module, for interacting with the file system.
const fs = require('fs');

//Importing the 'path' module, for working with file and directory paths.
const path = require('path');

//Importing the 'readline' module, for reading lines from a readable stream..
const readline = require('readline');

//Defining variable 'baseDir' and assigning it path to the desktop directory.
const baseDir = '/Users/siddhiwadetiwar/Desktop/';

//Creating interface for reading lines from the standard input (stdin) and 
//writing to the standard output (stdout).
const rl = readline.createInterface({
    //Setting the input stream to be the standard input (keyboard input).
    input: process.stdin,
    //Setting the input stream to be the standard output (keyboard output.)
    output: process.stdout
});


//Defining a function named 'displayMenu' using arrow function syntax.
const displayMenu = () => {
    //Logging a formatted menu to the console using template literals.
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

//Defining a function named 'createFolder'.
const createFolder = () => {

    //Prompting the user to enter a folder name using the readline interface.
    rl.question('Enter folder name: ', (folderName) => {

        //Constructing the absolute path for the new folder using 'path.join'.
        const folderPath = path.join(baseDir, folderName);

        //Checking if the folder already exists.
        if (!fs.existsSync(folderPath)) {

            //Creating the folder synchronously if it doesn't exist.
            fs.mkdirSync(folderPath);
            console.log(`Folder ${folderName} created successfully.`);
        } 
        else {
            
            //Displaying a message if the folder already exists.
            console.log(`Folder ${folderName} already exists.`);
        }

        //Displaying the menu again after creating the folder 
        //or providing a message about its existence.
        displayMenu();
    });

};

//Defining a function named 'readFolder'.
const readFolder = () => {

    //Prompting the user to enter a folder name using the readline interface.
    rl.question('Enter folder name: ', (folderName) => {

        //Constructing the absolute path for the specified folder using 'path.join'.
        const folderPath = path.join(baseDir, folderName);

        //Checking if the folder exists.
        if (fs.existsSync(folderPath)) {

            //Reading the files in the folder synchronously using 'fs.readdirSync'.
            const files = fs.readdirSync(folderPath);

            //Displaying the list of files in the folder.
            console.log(`Files in folder ${folderName}:`);
            files.forEach(file => console.log(file));
        } else {

            //Displaying a message if the specified folder does not exist.
            console.log(`Folder ${folderName} does not exist.`);
        }

        //Displaying the menu again after reading the folder 
        //or providing a message about its non-existence.
        displayMenu();
    });
};

//Function to update the name of an existing folder.
const updateFolder = () => {

    //Prompt the user for the current folder name.
    rl.question('Enter current folder name: ', (oldFolderName) => {

        //Prompt the user for the new folder name.
        rl.question('Enter new folder name: ', (newFolderName) => {

            //Construct the absolute paths for the old and new folders.
            const oldFolderPath = path.join(baseDir, oldFolderName);
            const newFolderPath = path.join(baseDir, newFolderName);

            //Check if the old folder exists.
            if (fs.existsSync(oldFolderPath)) {

                //Rename the old folder to the new folder.
                fs.renameSync(oldFolderPath, newFolderPath);
                console.log(`Folder ${oldFolderName} renamed to ${newFolderName}.`);
            } 
            else {

                // Display an error message if the old folder does not exist
                console.log(`Folder ${oldFolderName} does not exist.`);
            }

            // Display the main menu
            displayMenu();
        });
    });
};

//Function to delete an existing folder.
const deleteFolder = () => {

    //Prompt the user for the folder name.
    rl.question('Enter folder name: ', (folderName) => {

        //Construct the absolute path for the specified folder.
        const folderPath = path.join(baseDir, folderName);

        //Check if the folder exists.
        if (fs.existsSync(folderPath)) {

            //Delete the folder recursively.
            fs.rmdirSync(folderPath, { recursive: true });
            console.log(`Folder ${folderName} deleted successfully.`);
        } 
        else {

            //Display an error message if the folder does not exist.
            console.log(`Folder ${folderName} does not exist.`);
        }

        //Display the main menu.
        displayMenu();
    });
};

//Function to create a new file with an empty JSON array.
const createFile = () => {

    //Prompt the user for the folder name and file name.
    rl.question('Enter folder name: ', (folderName) => {

        rl.question('Enter file name: ', (fileName) => {

            //Construct the absolute path for the new file.
            const filePath = path.join(baseDir, folderName, `${fileName}.json`);

            //Check if the file does not exist.
            if (!fs.existsSync(filePath)) {

                //Create a new file with an empty JSON array.
                fs.writeFileSync(filePath, '[]');
                console.log(`File ${fileName} created successfully in folder ${folderName}.`);
            } 
            else {

                //Display an error message if the file already exists.
                console.log(`File ${fileName} already exists in folder ${folderName}.`);
            }

            //Display the main menu.
            displayMenu();
        });
    });
};

//Function to read and display the content of a file.
const readFile = () => {

    //Prompt the user for the folder name and file name.
    rl.question('Enter folder name: ', (folderName) => {

        rl.question('Enter file name: ', (fileName) => {

            //Construct the absolute path for the specified file.
            const filePath = path.join(baseDir, folderName, `${fileName}.json`);

            //Check if the file exists.
            if (fs.existsSync(filePath)) {

                //Read the content of the file and parse it as JSON.
                const content = fs.readFileSync(filePath, 'utf8');
                console.log(`Records in file ${fileName} in folder ${folderName}:`);
                console.log(JSON.parse(content));
            } 
            else {

                //Display an error message if the file does not exist.
                console.log(`File ${fileName} does not exist in folder ${folderName}.`);
            }

            //Display the main menu.
            displayMenu();
        });
    });
};

//Function to update the content of a file.
const updateFile = () => {

    //Prompt the user for the folder name and file name.
    rl.question('Enter folder name: ', (folderName) => {
        rl.question('Enter file name: ', (fileName) => {

            //Construct the absolute path for the specified file.
            const filePath = path.join(baseDir, folderName, `${fileName}.json`);

            //Check if the file exists.
            if (fs.existsSync(filePath)) {

                //Read the current content of the file and parse it as JSON.
                const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                console.log('Current content:', content);

                //Prompt the user for new content.
                rl.question('Enter new content: ', (newContent) => {

                    //Write the new content to the file.
                    fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2));
                    console.log(`File ${fileName} in folder ${folderName} updated successfully.`);
                    
                    //Display the main menu.
                    displayMenu();
                });
            } 
            else {

                //Display an error message if the file does not exist.
                console.log(`File ${fileName} does not exist in folder ${folderName}.`);
                
                //Display the main menu.
                displayMenu();
            }
        });
    });
};

//Function to delete an existing file.
const deleteFile = () => {

    //Prompt the user for the folder name and file name.
    rl.question('Enter folder name: ', (folderName) => {
        rl.question('Enter file name: ', (fileName) => {

            //Construct the absolute path for the specified file.
            const filePath = path.join(baseDir, folderName, `${fileName}.json`);

            //Check if the file exists.
            if (fs.existsSync(filePath)) {

                //Delete the file.
                fs.unlinkSync(filePath);
                console.log(`File ${fileName} in folder ${folderName} deleted successfully.`);
            } 
            else {

                //Display an error message if the file does not exist.
                console.log(`File ${fileName} does not exist in folder ${folderName}.`);
            }

            //Display the main menu.
            displayMenu();
        });
    });
};

//Function to create a new record in a file.
const createRecord = () => {

    //Prompt the user for the folder name, file name, and record in JSON format.
    rl.question('Enter folder name: ', (folderName) => {

        rl.question('Enter file name: ', (fileName) => {

            rl.question('Enter record (JSON format): ', (record) => {

                //Construct the absolute path for the specified file.
                const filePath = path.join(baseDir, folderName, `${fileName}.json`);

                //Check if the file exists.
                if (fs.existsSync(filePath)) {

                    //Read the current content of the file and parse it as JSON.
                    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

                    //Add the new record to the content.
                    content.push(JSON.parse(record));

                    //Write the updated content to the file.
                    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
                    console.log(`Record added to file ${fileName} in folder ${folderName}.`);
                } 
                else {

                    //Display an error message if the file does not exist.
                    console.log(`File ${fileName} does not exist in folder ${folderName}.`);
                }

                //Display the main menu.
                displayMenu();
            });
        });
    });
};

//Function to handle user menu choice and invoke corresponding operations.
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
            //Close the readline interface and exit the program.
            rl.close();
            break;
        default:
            //Display an error message for an invalid choice.
            console.log('Invalid choice. Please try again.');
            displayMenu();
            break;
    }
};

//Event listener for the 'close' event of the readline interface.
rl.on('close', () => {

    // Display an exit message and exit the program
    console.log('Exiting program.');
    process.exit(0);
});

//Event listener for the 'line' event of the readline interface.
rl.on('line', (input) => {

    //Handle the user's input (menu choice).
    handleMenuChoice(input.trim());
});

//Display the initial menu to the user.
displayMenu();