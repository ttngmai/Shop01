const convertToTrees = (
  array,
  idFieldName,
  parentIdFieldName,
  childrenFieldName,
) => {
  const cloned = array.slice();

  for (let i = cloned.length - 1; i > -1; i--) {
    let parentId = cloned[i][parentIdFieldName];

    if (parentId) {
      let filtered = array.filter((element) => {
        return element[idFieldName].toString() === parentId.toString();
      });

      if (filtered.length) {
        let parent = filtered[0];

        if (parent[childrenFieldName]) {
          parent[childrenFieldName].unshift(cloned[i]);
        } else {
          parent[childrenFieldName] = [cloned[i]];
        }
      }
      cloned.splice(i, 1);
    }
  }

  return cloned;
};

module.exports = convertToTrees;
