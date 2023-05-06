import { database } from "../../database";
import { path } from "../../path";

export class GeneralLevelData {
  protected _goal_sumExperience: number;
  protected _request_experience: number;
  constructor(protected _level: number = 0, protected _experience: number = 0, protected _sum_experience: number = 0, update: boolean = true) {
    if (update) this.update_experience();
  }
  get level() {
    return this._level;
  }
  public add_experience(experience: number) {
    this._experience += experience;
    this._sum_experience += experience;
    this.add_level();
  }
  protected add_level() {
    if (this._goal_sumExperience <= this._sum_experience) {
      this._experience -= this._request_experience;
      this._level++;
      this.update_experience();
    }
  }
  protected update_experience() {
    const levelData = map_generalLevel.get(this._level + 1)!;
    this._goal_sumExperience = levelData._sum_experience;
    this._request_experience = levelData._experience;
  }
}

export const map_generalLevel = new Map<number, GeneralLevelData>();
{
  const json = database.load(path.PLUGIN_UTILS_DATABASE, `general_level.json`);
  for (const token of json) {
    const level: GeneralLevelData = new GeneralLevelData(token.level, token.experience, token.sum_experience, false);
    map_generalLevel.set(token.level, level);
  }
}

export class DetailLevelData {
  protected _goal_sumExperience: number;
  protected _request_experience: number;
  constructor(protected _level: number = 0, protected _experience: number = 0, protected _sum_experience: number = 0, update: boolean = true) {
    if (update) this.update_experience();
  }
  get level() {
    return this._level;
  }
  public add_experience(experience: number): number {
    this._experience += experience;
    this._sum_experience += experience;
    this.add_level();
    return this._experience / this._request_experience; //출력사항
  }
  protected add_level() {
    while (this._goal_sumExperience <= this._sum_experience) {
      this._experience -= this._request_experience;
      this._level++;
      this.update_experience();
    }
  }
  protected update_experience() {
    const levelData = map_detailLevel.get(this._level + 1)!;
    this._goal_sumExperience = levelData._sum_experience;
    this._request_experience = levelData._experience;
  }
}

export const map_detailLevel = new Map<number, DetailLevelData>();
{
  const json = database.load(path.PLUGIN_UTILS_DATABASE, `detail_level.json`);
  for (const token of json) {
    const level: DetailLevelData = new DetailLevelData(token.level, token.experience, token.sum_experience, false);
    map_detailLevel.set(token.level, level);
  }
}
