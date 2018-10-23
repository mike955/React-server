import * as path from 'path';
import * as logger from 'koa-morgan';
import * as fs from 'fs';

export default class Route {
    private ctx:any;
    constructor(ctx) {
        this.ctx = ctx;
    }

    async execute() {
        const category = this.ctx.category;
        const catalog = this.ctx.catalog;
        const content = this.ctx.content;
        if(category == 'get' && catalog == 'all' && content == 'catagory') {
            try {
                let judge_exist = fs.existsSync('./public/category_tree.json');
                if(judge_exist){
                    return fs.readFileSync('./public/category_tree.json', 'utf8')
                }
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
            let judge_exist = fs.existsSync(file);
            if(judge_exist){
                return fs.readFileSync(file, 'utf8')
            }
        } catch (error) {
            console.log(error)
            return {
                error: 404,
                errmsg: 'can not found file'
            }
        }

    }
}