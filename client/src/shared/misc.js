export const availableColors = [
  '#e53935',
  '#8E24AA',
  '#3949AB',
  '#039BE5',
  '#00897B',
  '#7CB342',
  '#FB8C00',
  '#6D4C41',
  '#455A64',
];
export const defaultColor = '#455A64';

// sorting comparators
// order = 1  -> Ascending
// order = -1 -> Descending
export const sortByName =
  (order = 1) =>
  (l1, l2) =>
    l1.name.toLowerCase() > l2.name.toLowerCase() ? 1 * order : -1 * order;

export const sortByDateAdded =
  (order = 1) =>
  (l1, l2) => {
    let time1 = new Date(l1.createdAt);
    let time2 = new Date(l2.createdAt);
    return (time1 - time2) * order;
  };

export const sortByDateModified =
  (order = 1) =>
  (l1, l2) => {
    let time1 = new Date(l1.updatedAt);
    let time2 = new Date(l2.updatedAt);
    return (time1 - time2) * order;
  };
