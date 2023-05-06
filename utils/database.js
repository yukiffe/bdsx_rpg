"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const fs = require("fs");
class Database {
    constructor() {
        this.exist_file = (path, file_name) => {
            return fs.existsSync(`${path}/${file_name}`);
        };
        this.unlink = (path, file_name) => {
            if (this.exist_file(path, file_name))
                fs.unlink(`${path}/${file_name}`, (err) => {
                    if (err)
                        throw err;
                });
        };
    }
    create_folder_if_not_exist(path) {
        const database = fs.existsSync(path);
        if (database == false)
            fs.mkdirSync(path);
    }
    create_file_if_not_exist(path, file_name) {
        if (fs.existsSync(path) == false) {
            fs.writeFileSync(`${path}/${file_name}`, JSON.stringify({}));
        }
    }
    create_file(path, file_name) {
        fs.writeFileSync(`${path}/${file_name}`, JSON.stringify({}));
    }
    get_folders(path) {
        return fs.readdirSync(path);
    }
    load(path, file_name) {
        return JSON.parse(fs.readFileSync(`${path}/${file_name}`, "utf8"), reviver);
    }
    upload(path, file_name, data) {
        if (data === undefined) {
            console.log(path + " 오류");
            return;
        }
        fs.writeFileSync(`${path}/${file_name}`, JSON.stringify(data, replacer), "utf8");
    }
}
exports.database = new Database();
function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: "Map",
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    }
    else if (value instanceof Set) {
        return {
            dataType: "Set",
            value: Array.from(value),
        };
    }
    else {
        return value;
    }
}
function reviver(key, value) {
    if (typeof value === "object" && value !== null) {
        if (value.dataType === "Map") {
            return new Map(value.value);
        }
        else if (value.dataType === "Set") {
            return new Set(value.value);
        }
    }
    return value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5QkFBeUI7QUFFekIsTUFBTSxRQUFRO0lBQWQ7UUFnQkUsZUFBVSxHQUFHLENBQUMsSUFBWSxFQUFFLFNBQWlCLEVBQVcsRUFBRTtZQUN4RCxPQUFPLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksU0FBUyxFQUFFLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUM7UUFDRixXQUFNLEdBQUcsQ0FBQyxJQUFZLEVBQUUsU0FBaUIsRUFBRSxFQUFFO1lBQzNDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDO2dCQUNsQyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLFNBQVMsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ3hDLElBQUksR0FBRzt3QkFBRSxNQUFNLEdBQUcsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7SUFXSixDQUFDO0lBbENDLDBCQUEwQixDQUFDLElBQVk7UUFDckMsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLFFBQVEsSUFBSSxLQUFLO1lBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0Qsd0JBQXdCLENBQUMsSUFBWSxFQUFFLFNBQWlCO1FBQ3RELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUU7WUFDaEMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUQ7SUFDSCxDQUFDO0lBQ0QsV0FBVyxDQUFDLElBQVksRUFBRSxTQUFpQjtRQUN6QyxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxJQUFJLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0QsV0FBVyxDQUFDLElBQVk7UUFDdEIsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFVRCxJQUFJLENBQUMsSUFBWSxFQUFFLFNBQWlCO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxJQUFJLFNBQVMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBWSxFQUFFLFNBQWlCLEVBQUUsSUFBUztRQUMvQyxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDMUIsT0FBTztTQUNSO1FBQ0QsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRixDQUFDO0NBQ0Y7QUFFWSxRQUFBLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO0FBQ3ZDLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLO0lBQzFCLElBQUksS0FBSyxZQUFZLEdBQUcsRUFBRTtRQUN4QixPQUFPO1lBQ0wsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxvQ0FBb0M7U0FDekUsQ0FBQztLQUNIO1NBQU0sSUFBSSxLQUFLLFlBQVksR0FBRyxFQUFFO1FBQy9CLE9BQU87WUFDTCxRQUFRLEVBQUUsS0FBSztZQUNmLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUN6QixDQUFDO0tBQ0g7U0FBTTtRQUNMLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDO0FBQ0QsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUs7SUFDekIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtRQUMvQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQzVCLE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO2FBQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtZQUNuQyxPQUFPLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtLQUNGO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIn0=