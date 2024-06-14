// 每日菜單的interface
export interface DailyMenu {
  date: string
  tartList: Tart[]
  remark: string
}

// 商品的interface
export interface Tart {
  id: string;
  name: string;
  engName: string;
  cover: string;
  price: number;
  remark: string;
}

// 購物車的interface
export interface Order {
  date: string;
  order: OrderProduct[];
}
export interface OrderProduct {
  id: string;
  count: number;
}

export const tartList: Tart[] = [
  {
    id: "1",
    name: "抹茶",
    engName: "Matcha",
    cover: "/logo.jpg",
    price: 550,
    remark: "",
  },
  {
    id: "2",
    name: "無花果",
    engName: "Fig",
    cover: "/frontpage.jpg",
    price: 550,
    remark: "",
  },
  {
    id: "3",
    name: "檸檬",
    engName: "lemon",
    cover: "/logo.jpg",
    price: 550,
    remark: "",
  },
  {
    id: "4",
    name: "母親節限定",
    engName: "Mother'sDayOnly",
    cover: "/frontpage.jpg",
    price: 550,
    remark: "",
  },
];

export const dailyMenu: DailyMenu[] = [
  {
    date: "星期一",
    tartList: [tartList[0], tartList[3], tartList[2]],
    remark: "公休"
  },
  {
    date: "星期二",
    tartList: [tartList[1], tartList[2]],
    remark: "公休"
  },
  {
    date: "星期三",
    tartList: [tartList[0], tartList[3], tartList[2]],
    remark: ""
  },
  {
    date: "星期四",
    tartList: [tartList[0], tartList[2]],
    remark: ""
  },
  {
    date: "星期五",
    tartList: [tartList[1], tartList[3]],
    remark: ""
  },
  {
    date: "星期六",
    tartList: [tartList[0], tartList[2]],
    remark: ""
  },
  {
    date: "星期日",
    tartList: [tartList[1], tartList[3]],
    remark: ""
  },
];
