const formatToJson = (diffTree) => {
  // Función recursiva que procesa cada nodo del árbol
  const formatNode = (node) => {
    if (node.children) { // Si es un nodo con hijos (objeto anidado)
      return {
        key: node.key,
        children: node.children.map(formatNode), // Procesa hijos recursivamente
        status: node.status,
      };
    }
    // Para nodos hoja (valores primitivos)
    return {
      key: node.key,
      oldValue: node.oldValue, // Valor en el primer archivo
      newValue: node.newValue, // Valor en el segundo archivo
      status: node.status, // added/removed/changed/unchanged
    };
  };

  // Convierte todo el árbol y lo formatea con indentación de 2 espacios
  const jsonOutput = diffTree.map(formatNode);
  return JSON.stringify(jsonOutput, null, 2);
};

export default formatToJson;
