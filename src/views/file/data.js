import dayjs from "dayjs";

//https://github.com/sonicsunsky/airport-file-cli/blob/main/docs
//http://by1.hjlinfo.top
const downloadUrl =
  process.env.NODE_ENV === "production"
    ? `http://by1.hjlinfo.top/pdf/compressed.tracemonkey-pldi-09.pdf`
    : `http://localhost:9527/pdf/compressed.tracemonkey-pldi-09.pdf`;

const mimeList = ["pdf", "video", "image"];
// const videoList = [
//   "http://vjs.zencdn.net/v/oceans.mp4",
//   "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
// ];

export const createTableData = size => {
  return new Array(size).fill("").map((item, index) => {
    return {
      id: index + 1,
      role: Math.random() > 0.5 ? "admin" : "visitor",
      name: `机场文件${index + 1}`,
      status: Math.random() > 0.5 ? "read" : "unread",
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"), //YYYY-MM-DD HH:mm:ss
      mime: mimeList[index % 3],
      download_url: downloadUrl,
      href: downloadUrl
    };
  });
};

export const treeData = [
  {
    label: "文件一级 1",
    children: [
      {
        label: "文件二级 1-1",
        children: [
          {
            label: "文件三级 1-1-1"
          }
        ]
      }
    ]
  },
  {
    label: "文件一级 2",
    children: [
      {
        label: "文件二级 2-1",
        children: [
          {
            label: "文件三级 2-1-1"
          }
        ]
      },
      {
        label: "文件二级 2-2",
        children: [
          {
            label: "文件三级 2-2-1"
          }
        ]
      }
    ]
  },
  {
    label: "文件一级 3",
    children: [
      {
        label: "文件二级 3-1",
        children: [
          {
            label: "文件三级 3-1-1"
          }
        ]
      },
      {
        label: "文件二级 3-2",
        children: [
          {
            label: "文件三级 3-2-1"
          }
        ]
      }
    ]
  }
];
