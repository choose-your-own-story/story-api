import fs from 'fs';


class QueryLoader {

    basePath: string;

    constructor(basePath: string) {
        this.basePath = basePath;
    }

    rq(queryName: string) {
        return fs.readFileSync(`src/repositories/queries/${this.basePath}/${queryName}.sql`,
            {encoding: 'utf8'});
    };

    lq(query: string) {
        console.log(query.replace(/\n/g, ' ')
            .replace(/\r/g, ' ')
            .replace(/\t/g, ' '));
    };

}

export default QueryLoader;
