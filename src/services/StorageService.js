export const storeData = (key, data) => {
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const storeDataFromFirestore = (key, data) => {
  try {
    localStorage.setItem(key, data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getData = key => {
  try {
    const data = localStorage.getItem(key);
    if (data != null) {
      return data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return null;
};

export const removeData = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
