import dayjs from "dayjs";

const downloadUrl =
  process.env.NODE_ENV === "production"
    ? `https://github.com/sonicsunsky/airport-file-cli/blob/main/docs/pdf/test1.pdf`
    : `/pdf/test1.pdf`;

export const createTableData = size => {
  return new Array(size).fill("").map((item, index) => {
    return {
      id: index + 1,
      role: Math.random() > 0.5 ? "admin" : "visitor",
      name: `机场文件${index + 1}`,
      status: Math.random() > 0.5 ? "read" : "unread",
      date: dayjs().format("YYYY-MM-DD HH:mm:ss"), //YYYY-MM-DD HH:mm:ss
      mime: `application/pdf`,
      download_url: downloadUrl, //files[index % 4],
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
