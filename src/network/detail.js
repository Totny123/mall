import { request } from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    method: 'get',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = this.getColumns(columns, services);
    this.services = this.getServices(services);
    this.desc=itemInfo.desc;
    this.realPrice=itemInfo.lowNowPrice;
  }

  getColumns(columns, services) {
    columns.splice(2, 1, services[services.length - 1].name);
    return columns;
  }

  getServices(services) {
    services.splice(2, 1);
    return services;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.cSells = shopInfo.cSells;
    this.cGoods = shopInfo.cGoods;
    this.score = shopInfo.score;
  }
}

export class ParamsInfo {
  constructor(info, rule) {
    this.info = info.set;
    this.rule = rule.tables[0];
  }
}