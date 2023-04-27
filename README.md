# cp-ninja

This is a command-line interface (CLI) tool for competitive programming (CP) enthusiasts. The tool provides several functionalities that can help with CP tasks.

## Install

1. Install Dependencies
   To use the script, you will need to have Node.js on your system.
    - If you do not have Node.js installed, you can download it from the official website (https://nodejs.org/).
2. Then install the tool globally
    ```zsh
    npm i -g cp-ninja
    ```

## Commands

-   `<file name>`: Create a file with `~/.cp-cpi/template.cpp` contents.
-   `set <file name>`: Copy the template file to `~/.cp-cpi/template.cpp`.
-   `cf_status <numeric series> <alphabetical series>`: Open the problem submission status page for the given problem on the Codeforces website in the default web browser.
-   `cf_rename <file name> <problem numeric series> <dir name rate>`: Rename the specified file with a specific formatting for Codeforces problems.
-   `done <file name>`: Add the current time to the end of the specified file.
-   `help`: Show the list of available commands and their descriptions.

## Usage

To create a file with ~/.cp-cpi/template.cpp contents:

```zsh
$ cp-ninja <file name>
```

Replace <file name> with the name of the file you want to create.

To copy the template file to ~/.cp-cpi/template.cpp:

```zsh
$ cp-ninja set <file name>
```

Replace <file name> with the name of the file you want to set the template for.

To open the problem submission status page for a Codeforces problem in the default web browser:

```zsh
$ cp-ninja cf_status <numeric series> <alphabetical series>
```

Replace <numeric series> with the numeric series of the problem and <alphabetical series> with the alphabetical series of the problem.

To rename a file with a specific formatting for Codeforces problems:

```zsh
$ cp-ninja cf_rename <file name> <problem numeric series> <dir name rate>
```

Replace <file name> with the name of the file you want to rename. If you want to include the problem numeric series in the file name, include it as the second argument. If you want to include a directory name in the file path, include it as the third argument.

To add the current time to the end of a file:

```zsh
$ cp-ninja done <file name>
```

Replace <file name> with the name of the file you want to add the timestamp to.

To show the list of available commands and their descriptions:

```zsh
$ cp-ninja help
```
