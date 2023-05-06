import { ContainerItems } from "../../../../transaction/menu/hsmenu";
import { DetailLevelData } from "../../Level";
import { ItemStack } from "bdsx/bds/inventory";
import { ShopDetailPage } from "../farmerData";
import { events } from "bdsx/event";

export enum Livestock {
  pig,
  sheep,
  cow,
  mooshroom,
  chicken,
  ocelot,
  cat,
  rabbit,
  turtle,
  fox,
  strider,
  axolotle,
  frog,
  tadpole,
  allay,
}

export class StockbreederData {
  protected _validDate: number;
  constructor(
    protected _map_dayStockbreeder: Map<Livestock, number> = new Map<Livestock, number>(),
    protected _map_totalStockbreeder: Map<Livestock, number> = new Map<Livestock, number>(),
    date: number = new Date().getDate(),
    private _quest: Set<string> = new Set<string>(),
    private _achievement: Set<string> = new Set<string>(),
    private _perks: Set<string> = new Set<string>(),
    private _level: DetailLevelData = new DetailLevelData()
  ) {
    const validDate = new Date().getDate();
    if (validDate !== date) {
      this._validDate = validDate;
      this._map_dayStockbreeder = new Map<Livestock, number>();
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

  public breeding(stock: Livestock) {
    const day = this._map_totalStockbreeder.get(stock);
    this._map_dayStockbreeder.set(stock, day ? day + 1 : 1);
    const total = this._map_totalStockbreeder.get(stock);
    this._map_totalStockbreeder.set(stock, total ? total + 1 : 1);
  }
}
