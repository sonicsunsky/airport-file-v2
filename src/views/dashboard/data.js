export const barChartData = {
  xAxisData: [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ],
  seriesData: [750, 480, 510, 780, 800, 760, 800, 750, 480, 510, 300, 900]
};

export const uvTotal = 124543233;
export const uvMonth = 1500;
export const uvToday = 230;
export const uvData = [20, 4500, 1800, 3600, 3800, 2500, 2000];
export const pvData = [3000, 1900, 2500, 3600, 1800, 2500, 1000];

export const pieChartData = [
  {
    name: "产品数量",
    value: 3502
  },
  {
    name: "需求数量",
    value: 6730
  },
  {
    name: "招聘数量",
    value: 3000
  }
];

export const rankData = new Array(6).fill("").map((item, index) => {
  return {
    id: index + 1,
    name: `小诸葛制造`,
    rank: Math.floor(Math.random() * 5000) + 1
  };
});
