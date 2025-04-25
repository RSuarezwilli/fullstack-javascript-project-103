import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }

    const val1 = obj1[key];
    const val2 = obj2[key];

    if (_.isObject(val1) && _.isObject(val2)) {
      return { key, type: 'nested', children: buildDiff(val1, val2) };
    }

    if (!_.isEqual(val1, val2)) {
      return { key, type: 'updated', value1: val1, value2: val2 };
    }

    return { key, type: 'unchanged', value: val1 };
  });
};

export default buildDiff;
