import * as fs from "fs";

class Database {
  create_folder_if_not_exist(path: string): void {
    const database = fs.existsSync(path);
    if (database == false) fs.mkdirSync(path);
  }
  create_file_if_not_exist(path: string, file_name: string): void {
    if (fs.existsSync(path) == false) {
      fs.writeFileSync(`${path}/${file_name}`, JSON.stringify({}));
    }
  }
  create_file(path: string, file_name: string): void {
    fs.writeFileSync(`${path}/${file_name}`, JSON.stringify({}));
  }
  get_folders(path: string): string[] {
    return fs.readdirSync(path);
  }
  exist_file = (path: string, file_name: string): boolean => {
    return fs.existsSync(`${path}/${file_name}`);
  };
  unlink = (path: string, file_name: string) => {
    if (this.exist_file(path, file_name))
      fs.unlink(`${path}/${file_name}`, (err) => {
        if (err) throw err;
      });
  };
  load(path: string, file_name: string): any {
    return JSON.parse(fs.readFileSync(`${path}/${file_name}`, "utf8"), reviver);
  }
  upload(path: string, file_name: string, data: any): void {
    if (data === undefined) {
      console.log(path + " 오류");
      return;
    }
    fs.writeFileSync(`${path}/${file_name}`, JSON.stringify(data, replacer), "utf8");
  }
}

export const database = new Database();
function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else if (value instanceof Set) {
    return {
      dataType: "Set",
      value: Array.from(value),
    };
  } else {
    return value;
  }
}
function reviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    } else if (value.dataType === "Set") {
      return new Set(value.value);
    }
  }
  return value;
}
