import * as SecureStore from "expo-secure-store";

export async function save(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.log('Error saving token:', error);
  }
}

export async function getValueFor(key) {
  try {
    let result = await SecureStore.getItemAsync(key);
    if (!result) {
      alert("No values stored under key.");
    }
  } catch (error) {
    console.log('Error retrieving token:', error);
  }
}
