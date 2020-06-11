import ls from "@react-native-community/async-storage";
import { defaultsDeep } from "lodash";

const LocalStorage = {
  get(key) {
    return ls.getItem(key).then(JSON.parse);
  },

  set(key, value) {
    return ls.setItem(key, JSON.stringify(value)).then(() => value);
  },
  update(key, value, merge = true) {
    return LocalStorage.get(key).then(item => {
      if (typeof value === "string") {
        item = value;
      } else if (typeof value === "object") {
        item = merge ? defaultsDeep({}, item, value) : value;
      }

      return LocalStorage.set(key, item);
    });
  },

  delete(key) {
    return ls.removeItem(key);
  },

  clear() {
    return ls.clear();
  }
};

export default LocalStorage;
