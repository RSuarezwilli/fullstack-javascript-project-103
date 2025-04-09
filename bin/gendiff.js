import {program} from 'commander';
import {fs}  from 'fs';


program
.name('gendiff')
.description('Compares two configuration files and shows a difference.')
.version('0.0.1')
.option('-f, --format <type>', 'output format',)
.argument('<filepath1.json>', 'the path to the first file')
.argument('<filepath2.json>', 'the path to the second file')
.action((filepath1 , filepath2) => {
    console.log('filepath1:', filepath1.json);
    console.log('filepath2:', filepath2.json);
    
});
program.parse(process.argv);


