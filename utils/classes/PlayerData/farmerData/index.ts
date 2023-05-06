import { ContainerItems } from "../../../../transaction/menu/hsmenu";
import { DetailLevelData } from "../../Level";
import { ItemStack } from "bdsx/bds/inventory";

export enum CROPS {
  wheat_seeds = "wheat_seeds",
  beetroot_seeds = "beetroot_seeds",
  melon_seeds = "melon_seeds",
  pumpkin_seeds = "pumpkin_seeds",
  torchflower_seeds = "torchflower_seeds",
  wheat = "wheat",
  beetroot = "beetroot",
  melon_block = "melon_block",
  pumpkin = "pumpkin",
  torchflower = "torchflower",
  potato = "potato",
  poisonous_potato = "poisonous_potato",
  cocoa_beans = "cocoa_beans",
  carrot = "carrot",
  nether_wart = "nether_wart",
  sweet_berries = "sweet_berries",
  bamboo = "bamboo",
  sugar_cane = "sugar_cane",
  chorus_flower = "chorus_flower",
  chorus_fruit = "chorus_fruit",
  vine = "vine",
  weeping_vines = "weeping_vines",
  twisting_vines = "twisting_vines",
  glow_berries = "glow_berries",
  kelp = "kelp",
  torchflower_crop = "torchflower_crop",
  melon_stem = "melon_stem",
  pumpkin_stem = "pumpkin_stem",
  cocoa = "cocoa",
  sweet_berry_bush = "sweet_berry_bush",
  chorus_plant = "chorus_plant",
} //나중에 interface로 바꿀수도

export enum ShopDetailPage {
  QUEST,
  ACHIEVEMENT,
  PERKS,
} //공용으로 변경

export class FarmerData {
  constructor(
    private _map_dayHarvest = new Map<CROPS | string, number>(),
    private _map_totalHarvest = new Map<CROPS | string, number>(),
    private _date: number = new Date().getDate(),
    private _quest: Set<string> = new Set<string>(), //2p 클리어 목록, 일정 기간마다 리셋 -> PlayerJoin시 초기화
    private _achievement: Set<string> = new Set<string>(), //3p 영구보존1: 일정 조건 달성
    private _perks: Set<string> = new Set<string>(), //특전 영구보존2: 특정 이벤트 영구 보존
    private _level: DetailLevelData = new DetailLevelData()
  ) {
    const validDate = new Date().getDate();
    if (validDate !== _date) {
      _date = new Date().getDate();
      this._map_dayHarvest = new Map<CROPS, number>();
    }
  }
  get level() {
    return this._level;
  }
  get quest() {
    return this._quest;
  }
  get achievement() {
    return this._achievement;
  }
  get perks() {
    return this._perks;
  }

  public has_achieve(selector: ShopDetailPage, str: string): boolean {
    switch (selector) {
      case ShopDetailPage.ACHIEVEMENT:
        return this._achievement.has(str);
      case ShopDetailPage.PERKS:
        return this._perks.has(str);
      case ShopDetailPage.QUEST:
        return this._quest.has(str);
    }
  }

  public achieve(selector: ShopDetailPage, str: string) {
    //단순 저장
    switch (selector) {
      case ShopDetailPage.ACHIEVEMENT:
        this._achievement.add(str);
        break;
      case ShopDetailPage.PERKS:
        this._perks.add(str);
        break;
      case ShopDetailPage.QUEST:
        this._quest.add(str);
        break;
    }
  }

  public harvest(crop: CROPS) {
    const day = this._map_dayHarvest.get(crop);
    this._map_dayHarvest.set(crop, day ? day + 1 : 1);
    const total = this._map_totalHarvest.get(crop);
    this._map_totalHarvest.set(crop, total ? total + 1 : 1);
  }

  public get_dayHarvest(crop: CROPS): number {
    const day = this._map_dayHarvest.get(crop);
    return day ? day : 0;
  }
}
