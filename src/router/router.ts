import * as path from 'path';
import * as logger from 'koa-morgan';
import {promisify} from 'util';
import * as fse from 'fs-extra';
import * as fs from 'fs';

export default class Route {
    private ctx:any;
    constructor(ctx) {
        this.ctx = ctx;
    }

    private  category() {

    }

    async execute() {
        const category = this.ctx.category;
        const catalog = this.ctx.catalog;
        const content = this.ctx.content;
        if(category == 'get' && catalog == 'all' && content == 'catagory') {
            try {
                return fse.readJsonSync('./public/category_tree.json');
            } catch (error) {
                console.log(error)
                return {
                    error: 404,
                    errmsg: 'can not found file'
                }
            }
        }
        let file = `./category/${category}/${catalog}/${content}.md`;
        try {
            fse.ensureDir(file);
            // return fse.readJsonSync(file)
            // return fs.readJsonSync(file);
            return fs.readFileSync(file);
        } catch (error) {
            console.log(error)
            return {
                error: 404,
                errmsg: 'can not found file'
            }
        }

    }
}