const buildDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = [...new Set([...keys1, ...keys2])].sort();

  const diff = allKeys.map((key) => {
    if (!(key in obj2)) {
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!(key in obj1)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    return `    ${key}: ${obj1[key]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};

export default buildDiff;
