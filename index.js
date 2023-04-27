#!/usr/bin/env node

import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";

const argv = {
    0: process.argv[1],
    1: process.argv[3],
    2: process.argv[4],
    3: process.argv[5],
    4: process.argv[6],
};

if (!argv[1] || argv[1] === "help") {
    console.log(`
cp cli

This is a command-line interface (CLI) tool for competitive programming (CP) enthusiasts. The tool provides several functionalities that can help with CP tasks.

Commands:
---------
'<file name>': ------------------------------------------------------ Create a file with ~/.cp-cpi/template.cpp contents.
'set <file name>': -------------------------------------------------- Copy the template file to ~/.cp-cpi/template.cpp.
'cf_status <numeric series> <alphabetical series>': ----------------- Open the problem submission status page for the given problem on the Codeforces website in the default web browser.
'cf_rename <file name> <problem numeric series> <dir name rate>': --- Rename the specified file with a specific formatting for Codeforces problems.
'done <file name>': ------------------------------------------------- Add the current time to the end of the specified file.
'help': ------------------------------------------------------------- Show the list of available commands and their descriptions.

Usage:
---------
To create a file with ~/.cp-cpi/template.cpp contents:
$ cp-cli2 <file name>
Replace <file name> with the name of the file you want to create.

To copy the template file to ~/.cp-cpi/template.cpp:
$ cp cli set <file name>
Replace <file name> with the name of the file you want to set the template for.
`);
    process.exit(0);
}

// set the template
if (argv[1] === "set") {
    exec(`rm -rf ~/.cp-cpi`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        exec(`mkdir ~/.cp-cpi`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            exec(`cp ${argv[2]} ~/.cp-cpi/template.cpp`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                process.exit(0);
            });
        });
    });
}

if (argv[1] === "cf_status") {
    const numeric_series = argv[2];
    const alphabetical_series = argv[3];
    const browser = "google-chrome";
    exec(
        `${browser} "https://codeforces.com/problemset/status/${numeric_series}/problem/${alphabetical_series}?friends=on" &`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            process.exit(0);
        }
    );
}

if (argv[1] === "cf_rename") {
    const originalFileName = argv[2];
    let renamedFileName = originalFileName;
    const underScoreIndex = renamedFileName.search("_");
    renamedFileName =
        renamedFileName.slice(0, underScoreIndex) + "." + renamedFileName.slice(underScoreIndex + 1);
    if (argv[3]) {
        const problemNumericSeries = argv[3];
        renamedFileName = problemNumericSeries + renamedFileName;
    }
    if (argv[4]) {
        const folderNo = argv[4];
        const folderName = "difficulty-" + folderNo;
        renamedFileName = path.join(folderName, renamedFileName);
    }
    fs.rename(originalFileName, renamedFileName)
        .then(() => console.log(`${originalFileName} renamed to ${renamedFileName}`))
        .catch(err => console.error(err));
    process.exit(0);
}

if (argv[1] === "done") {
    const fileName = argv[2];
    const dateTimeString = new Date().toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
    });
    const lineToAppend = `${dateTimeString}\n`;
    fs.appendFile(fileName, lineToAppend)
        .then(() => console.log(`Done at ${dateTimeString}`))
        .catch(err => console.error(err));
    process.exit(0);
}

// copy the template into arg 1 file
if (argv[1]) {
    const fileName = argv[1];
    const templatePath = `${process.env.HOME}/.cp-cpi/template.cpp`;

    fs.readFile(templatePath, "utf-8")
        .then(templateContent => fs.writeFile(fileName, templateContent, { flag: "wx" }))
        .then(() => console.log(`Created ${fileName} from template`))
        .catch(err => {
            if (err.code === "EEXIST") {
                console.error(`${fileName} already exists`);
            } else {
                console.error(err);
            }
        });
    process.exit(0);
}
