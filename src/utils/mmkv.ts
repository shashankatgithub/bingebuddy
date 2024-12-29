import { MMKV } from 'react-native-mmkv';

export const mmkv = new MMKV();

export const saveToMMKV = (key: string, value: any) => {
  mmkv.set(key, JSON.stringify(value));
};

export const getFromMMKV = (key: string) => {
  const value = mmkv.getString(key);
  return value ? JSON.parse(value) : null;
};
