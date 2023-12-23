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

### Package

``` javascript
import { cipherContent, decipherContent, cipherFile, decipherFile } from "sifre";

const greeting = 'Hello, World!';

const buffer = Buffer.from(greeting);

const cypher = cipherContent(buffer, 'myPassword');

console.log(cypher); // <Buffer 13 b9 86 08 92 35 33 ad 79 15 86 56 2f 7c 99 52 e3 9b 61 fb 2d cb 26 42 56 47 a3 78 c0>

console.log(cypher.toString()); // '\x13��\b�53�y\x15�V/|�R�a�-�&BVG�x�'

const decypher = decipherContent(cypher, 'myPassword');

console.log(decypher.toString()); // 'Hello, World!' 

// --- //

cipherFile('hello.txt', 'otherPassword'); // In the same directory the file 'hello.txt.crypted' will be created
decipherFile('hello.txt.crypted', 'otherPassword'); // will decrypt the file 'hello.txt.crypted' and return to 'hello.txt' with the original content
```

### CLI
Once installed, to encrypt a file, navigate to the folder where the file is located and run the following command:

```bash
sifre
```
You will be prompted to select file to encrypt and then enter a password.

> [!CAUTION]
> This application does not use exhaustive encryption methods, so it is not recommended to encrypt extremely important documents. Additionally, if the password is forgotten or entered incorrectly, there is a risk of completely losing the file.

## Decrypting a file
To decrypt a file, run the same command that you used to encrypt it. You will be prompted to enter the password that you used to encrypt the file.
