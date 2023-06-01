import transform from "lodash/transform";
import isObject from "lodash/isObject";
import isArray from "lodash/isArray";

export function deepMap<T>(
  obj: T,
  iterator: (val: any, key: any, obj: T) => any
): T {
  return transform(obj as any, function (result: any, val, key) {
    result[key] =
      isObject(val) || isArray(val)
        ? deepMap(val as any, iterator)
        : iterator(val, key, obj);
  });
}
