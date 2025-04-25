const buildDiff = (obj1, obj2) => {
  // Obtener y ordenar claves únicas (reemplazo para _.union y _.sortBy)
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();

  return keys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }

    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }

    const val1 = obj1[key];
    const val2 = obj2[key];

    // Función helper para verificar si es objeto (reemplazo para _.isObject)
    const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

    if (isObject(val1) && isObject(val2)) {
      return { key, type: 'nested', children: buildDiff(val1, val2) };
    }

    // Función helper para comparación profunda (reemplazo para _.isEqual)
    const isEqual = (a, b) => {
      if (a === b) return true;
      if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null) return false;

      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length !== keysB.length) return false;

      return keysA.every((k) => isEqual(a[k], b[k]));
    };

    if (!isEqual(val1, val2)) {
      return {
        key, type: 'updated', value1: val1, value2: val2,
      };
    }

    return { key, type: 'unchanged', value: val1 };
  });
};

export default buildDiff;
