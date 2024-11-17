export const sortObject = (obj: any) => {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      // @ts-ignore
      result[key] =
        obj[key] && typeof obj[key] === "object"
          ? sortObject(obj[key])
          : obj[key];
      return result;
    }, {});
};
