const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);

const buildDiff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();

  return keys.map((key) => {
    if (!(key in obj1)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!(key in obj2)) {
      return { key, type: 'removed', value: obj1[key] };
    }

    const val1 = obj1[key];
    const val2 = obj2[key];

    if (val1 === val2) {
      return { key, type: 'unchanged', value: val1 };
    }

    if (isObject(val1) && isObject(val2)) {
      return { key, type: 'nested', children: buildDiff(val1, val2) };
    }

    return {
      key,
      type: 'changed',
      oldValue: val1,
      newValue: val2,
    };
  });
};

export default buildDiff;
