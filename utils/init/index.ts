import { path } from "../path";
import { database } from "../database";

database.create_folder_if_not_exist(path.DATABASE);
database.create_folder_if_not_exist(path.DATABASE_PLAYER);
