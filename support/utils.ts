import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
export class Utilities{

    public static createDirectory(dir: string) {
        if (!fs.existsSync(dir)) {
            mkdirp.sync(dir);
        }
    }
}