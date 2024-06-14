export interface DailyMenu {
  date: string
  tartList: Tart[]
  remark: string
}
export interface Tart {
  id: string
  name: string
  engName: string
  cover: string
  remark: string
}

export const tartList: Tart[] = [
  {
    id: '1',
    name: "抹茶",
    engName: "Matcha",
    cover: "/logo.jpg",
    remark: ""
  },
  {
    id: '2',
    name: "無花果",
    engName: "Fig",
    cover: "/frontpage.jpg",
    remark: ""
  },
  {
    id: '3',
    name: "檸檬",
    engName: "lemon",
    cover: "/logo.jpg",
    remark: ""
  },
  {
    id: '4',
    name: "母親節限定",
    engName: "Mother'sDayOnly",
    cover: "/frontpage.jpg",
    remark: ""
  },
]

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
]