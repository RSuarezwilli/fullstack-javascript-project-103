const getIndet  =(depth, spaceCount = 4) => ' ' .repeat(depth * spaceCount - 2);
const gerBraketIndebt = (depth, spaceCount = 4) => ' ' .repeat((depth - 1) * spaceCount)

const stringify = (value, depth) => {
    if (typeof value !== 'object' || value === null){
        return String(value);
    }

    const entries = Object.entries(value);
    const lines = entries.map(
        ([key, val]) =>   `${getIndet(depth)} ${key}: ${stringify(val, depth + 1)}`
    );

    return [ '{' , ...lines,   `${getBracetIndet(depth + 1)}}`].join('\n');
};

const stylish = (tree) =>{
    const iter = (node, depth) =>{
        const indet = getIndet(depth);
        const getBraketIndent = gerBraketIndet(depth + 1);
        const line = node.map((item) =>{
            const {key, value, type} = item;
            switch (type) {
                case 'added':
                    return `${indet}+ ${key}: ${stringify(value, depth + 1)}`;
                case 'deleted':
                    return `${indet}- ${key}: ${stringify(value, depth + 1)}`;
                case 'unchanged':
                    return `${indet}  ${key}: ${stringify(value, depth + 1)}`;
                case 'changed':
                    return [
                        `${indet}- ${key}: ${stringify(value[0], depth + 1)}`,
                        `${indet}+ ${key}: ${stringify(value[1], depth + 1)}`
                    ].join('\n');
                case 'nested':
                    return `${indet}  ${key}: {\n${iter(value, depth + 1)}\n${getBraketIndent}}`;
                default:
                    throw new Error(`Unknown type: ${type}`);
            }
        })

    }

}