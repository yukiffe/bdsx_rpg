import { ContainerItems } from "../../../../transaction/menu/hsmenu";
import { DetailLevelData } from "../../Level";
import { ItemStack } from "bdsx/bds/inventory";
import { ShopDetailPage } from "../farmerData";
import { events } from "bdsx/event";

export enum Woods {
  oak,
  birch,
  spruce,
  jungle,
  acacia,
  dark_oak,
  mangrove,
  crimson,
  warped,
}

export class WoodcutterData {
  protected _validDate: number;
  constructor(
    protected _map_dayLogging: Map<Woods, number> = new Map<Woods, number>(),
    protected _map_totalLogging: Map<Woods, number> = new Map<Woods, number>(),
    date: number = new Date().getDate(),
    private _quest: Set<string> = new Set<string>(),
    private _achievement: Set<string> = new Set<string>(),
    private _perks: Set<string> = new Set<string>(),
    private _level: DetailLevelData = new DetailLevelData()
  ) {
    const validDate = new Date().getDate();
    if (validDate !== date) {
      this._validDate = validDate;
      this._map_dayLogging = new Map<Woods, number>();
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

  public logging(wood: Woods) {
    const day = this._map_totalLogging.get(wood);
    this._map_dayLogging.set(wood, day ? day + 1 : 1);
    const total = this._map_totalLogging.get(wood);
    this._map_totalLogging.set(wood, total ? total + 1 : 1);
  }
}
