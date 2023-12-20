# Sifre

This is a CLI (Command Line Interface) that uses the native Node.js module crypto and the library Inquirer.js to encrypt and decrypt files.

> [!WARNING]
> When using it, you will be prompted to enter a password, which you will need to remember to decrypt the file.

## Installation
To install this CLI globally, you can use npm, yarn, or pnpm with the following command:

```bash
npm install -g sifre
```

## Usage
Once installed, to encrypt a file, navigate to the folder where the file is located and run the following command:

```bash
sifre
```
You will be prompted to select file to encrypt and then enter a password.

> [!CAUTION]
> This application does not use exhaustive encryption methods, so it is not recommended to encrypt extremely important documents. Additionally, if the password is forgotten or entered incorrectly, there is a risk of completely losing the file.

## Decrypting a file
To decrypt a file, run the same command that you used to encrypt it. You will be prompted to enter the password that you used to encrypt the file.
