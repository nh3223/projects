export const allTrue = (object) => (Object.keys(object).length === 0) ? false : Object.values(object).every((element) => element);

export const anyTrue = (object) => (Object.keys(object).length === 0) ? false : Object.values(object).some((element) => element);