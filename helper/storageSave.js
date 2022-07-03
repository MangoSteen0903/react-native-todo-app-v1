import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_ID = `@todos`;
export const SaveToDo = async (save) => {
  await AsyncStorage.setItem(STORAGE_ID, JSON.stringify(save));
};

export const LoadData = async () => {
  const stored_data = JSON.parse(await AsyncStorage.getItem(STORAGE_ID));
  if (!stored_data) {
    return {};
  }
  return stored_data;
};
