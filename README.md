# TDD Playground

## Input File

```ts
import * as fs from 'node:fs/promises';
//const buffer = await fs.readFile('input.txt');
export const buffer = await fs.readFile('input.txt');
// Tableau avec l'ensemble des lignes du fichier
export const content = buffer.toString();
```
