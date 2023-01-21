import { client as redis } from "..";

const GetCache = async (key: string) => {
  let _cache: any = await redis.get(key);
  if (_cache) _cache = JSON.parse(_cache);
  return _cache;
};
const SetCache = async (key: string, value: any) => {
  await redis.set(key, JSON.stringify(value));
};

export { GetCache, SetCache };
