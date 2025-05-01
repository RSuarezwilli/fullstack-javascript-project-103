// Mueve la declaración de isObject antes de su uso
// const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

// const buildDiff = (obj1, obj2) => {
//   const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
//   const sortedKeys = [...keys].sort();

//   return sortedKeys.map((key) => {
//     if (!Object.hasOwn(obj2, key)) {
//       return { key, type: 'removed', value: obj1[key] };
//     }
//     if (!Object.hasOwn(obj1, key)) {
//       return { key, type: 'added', value: obj2[key] };
//     }
//     if (isObject(obj1[key]) && isObject(obj2[key])) {
//       return {
//         key,
//         type: 'nested',
//         children: buildDiff(obj1[key], obj2[key]),
//       };
//     }
//     if (obj1[key] !== obj2[key]) {
//       return {
//         key,
//         type: 'changed',
//         oldValue: obj1[key],
//         newValue: obj2[key],
//       };
//     }
//     return { key, type: 'unchanged', value: obj1[key] };
//   });
// };

// export default (data1, data2) => ({
//   type: 'root',
//   children: buildDiff(data1, data2),
// });

import _ from 'lodash';

function getDiff(dataFile1, dataFile2) {
  const keys = _.sortBy(_.union(Object.keys(dataFile1), Object.keys(dataFile2)));

  return keys.map((key) => {
    const valueInFile1 = dataFile1[key];
    const valueInFile2 = dataFile2[key];

    if (!(key in dataFile1)) {
      return { key, type: 'added', value: valueInFile2 };
    }
    if (!(key in dataFile2)) {
      return { key, type: 'deleted', value: valueInFile1 };
    }
    if (_.isPlainObject(valueInFile1) && _.isPlainObject(valueInFile2)) {
      return {
        key,
        type: 'nested',
        children: getDiff(valueInFile1, valueInFile2),
      };
    }
    if (!_.isEqual(valueInFile1, valueInFile2)) {
      return {
        key,
        type: 'changed',
        value1: valueInFile1,
        value2: valueInFile2,
      };
    }

    return { key, type: 'unchanged', value: valueInFile2 };
  });
}

export default (data1, data2) => ({
  type: 'root',
  children: getDiff(data1, data2),
});
