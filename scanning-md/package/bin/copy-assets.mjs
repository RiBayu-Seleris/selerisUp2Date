#!/usr/bin/env node
import {cp, mkdir, access} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const source = resolve(dirname(fileURLToPath(import.meta.url)), '../runtime');
const destination = resolve(process.argv[2] || 'public/vendor/seleris-rppg/0.1.0-dev.2');
await access(resolve(source, 'index.html'));
try {await access(destination); throw new Error(`Destination already exists: ${destination}. Use a new version directory or remove the old generated assets explicitly.`);}
catch (error) {if (error.code !== 'ENOENT') throw error;}
await mkdir(dirname(destination), {recursive: true});
await cp(source, destination, {recursive: true, errorOnExist: true, force: false});
console.log(`Seleris runtime copied to ${destination}`);
