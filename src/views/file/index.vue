<template>
  <div class="file">
    <el-dialog
      title="免责声明弹窗"
      :visible.sync="showDisclaimer"
      width="50%"
      center
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div class="disclaimer">
        <span>
          免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明
          免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明
        </span>
      </div>
      <div slot="footer" class="disclaimer-footer">
        <el-button type="primary" @click="showDisclaimer = false"
          >我已阅读以上免责声明</el-button
        >
      </div>
    </el-dialog>

    <template v-if="device === 'mobile'">
      <div class="lay-mobile">
        <el-tree
          accordion
          default-expand-all
          :expand-on-click-node="false"
          :data="catalogData"
          :props="defaultProps"
          @node-click="handleTreeNodeClick"
        ></el-tree>

        <div class="search-input">
          <div class="title">文件搜索</div>
          <el-input
            v-model="keyword"
            placeholder="请输入查询文件的名称"
            @keyup.enter.native="onSearchFileList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="onSearchFileList"
            ></el-button>
          </el-input>
        </div>

        <div class="file-table">
          <el-table
            v-loading="tableLoading"
            element-loading-text="文件加载中"
            element-loading-spinner="el-icon-loading"
            :data="fileList"
            stripe
            style="width: 100%"
            max-height="1000px"
          >
            <el-table-column prop="name" label="文件名称"></el-table-column>
            <el-table-column label="是否已读">
              <template slot-scope="{ row }">
                <el-tag :type="row.status === 'read' ? 'success' : 'danger'">{{
                  row.status === "read" ? "已读" : "未读"
                }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="date" label="上传时间"></el-table-column>

            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button type="text" @click="openFileDetail(row)"
                  >查看详情</el-button
                >

                <el-button
                  v-if="row.role === 'admin'"
                  type="text"
                  @click="downloadFile(row)"
                  >下载</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>

        <pagination
          v-show="total > 0"
          layout="prev, pager, next"
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="fetchFileList"
        />
      </div>
    </template>

    <template v-else>
      <div class="lay-pc">
        <el-row type="flex" :gutter="10">
          <el-col :xs="8" :sm="8" :md="6" :lg="4" :xl="4">
            <el-tree
              accordion
              default-expand-all
              :expand-on-click-node="false"
              :data="catalogData"
              :props="defaultProps"
              @node-click="handleTreeNodeClick"
            ></el-tree>
          </el-col>

          <el-col :xs="12" :sm="12" :md="16" :lg="18" :xl="18">
            <div class="search-input">
              <div class="title">文件搜索</div>
              <el-input
                v-model="keyword"
                placeholder="请输入查询文件的名称"
                @keyup.enter.native="onSearchFileList"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="onSearchFileList"
                ></el-button>
              </el-input>
            </div>

            <div class="file-table">
              <el-table
                v-loading="tableLoading"
                element-loading-text="文件加载中"
                element-loading-spinner="el-icon-loading"
                :data="fileList"
                stripe
                style="width: 100%"
                max-height="1000px"
              >
                <el-table-column prop="name" label="文件名称"></el-table-column>
                <el-table-column label="是否已读">
                  <template slot-scope="{ row }">
                    <el-tag
                      :type="row.status === 'read' ? 'success' : 'danger'"
                      >{{ row.status === "read" ? "已读" : "未读" }}</el-tag
                    >
                  </template>
                </el-table-column>

                <el-table-column prop="date" label="上传时间"></el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="{ row }">
                    <el-button type="text" @click="openFileDetail(row)"
                      >查看详情</el-button
                    >

                    <el-button
                      v-if="row.role === 'admin'"
                      type="text"
                      @click="downloadFile(row)"
                      >下载</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="fetchFileList"
            />
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { treeData, createTableData } from "./data";
import Pagination from "@/components/Pagination";

export default {
  name: "File",
  data() {
    return {
      showDisclaimer: false,
      keyword: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      catalogData: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      tableLoading: false,
      fileList: []
      //通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据
    };
  },
  computed: {
    device() {
      return this.$store.state.app.device;
    }
  },
  components: {
    Pagination
  },
  created() {},
  mounted() {
    this.catalogData = [...treeData];
    this.total = 50;
    this.generateTableData();
  },
  methods: {
    generateTableData() {
      this.tableLoading = true;
      const size = Math.floor(Math.random() * 10 + 1);
      console.log(size);
      setTimeout(() => {
        const list = createTableData(size);
        this.fileList = [...list];
        this.tableLoading = false;
      }, 500);
    },
    handleTreeNodeClick(e) {
      console.log(e);
      this.generateTableData();
    },
    onSearchFileList() {
      if (this.keyword.trim() === "") return;
      this.generateTableData();
      // this.getFileList();
    },
    fetchFileList({ page, limit }) {
      this.listQuery.page = page;
      this.listQuery.limit = limit;
      this.keyword = "";
      this.generateTableData();
      // this.getFileList();
    },
    openFileDetail({ url }) {
      if (url) {
        // window.open(url);
        window.location.href = url;
      }
    },
    downloadFile({ link }) {
      if (link) {
        // window.open(link);
        window.location.href = link;
      }
      // const title = `确定要解封${account}账号吗？`;
      // this.$confirm(`点击确定后该账号将可使用`, title, {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(({ value }) => {
      //   this.unblockUserAccount(author_id);
      // });
    },

    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++
            },
            {
              name: "zone" + this.count++
            }
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    },
    async getFileList() {
      let startTime = "";
      let endTime = "";
      let meta = {
        relation: "AND",
        0: {
          key: "is_blocked", //固定值
          value: "1", //固定值
          type: "numeric",
          compare: "="
        }
      };
      if (this.endTime === 1) {
        startTime = dayjs().format("YYYY-MM-DD");
        endTime = dayjs().format("YYYY-MM-DD");
      }
      if (this.endTime === 2) {
        startTime = dayjs()
          .startOf("month")
          .format("YYYY-MM-DD");
        endTime = dayjs()
          .endOf("month")
          .format("YYYY-MM-DD");
      }
      if (this.endTime === 3) {
        startTime = dayjs()
          .subtract(3, "month")
          .format("YYYY-MM-DD");
        endTime = dayjs().format("YYYY-MM-DD");
      }
      if (this.endTime === 4) {
        startTime = dayjs()
          .subtract(6, "month")
          .format("YYYY-MM-DD");
        endTime = dayjs().format("YYYY-MM-DD");
      }
      if (this.endTime === 5) {
        endTime = dayjs()
          .subtract(6, "month")
          .format("YYYY-MM-DD");
      }
      let index = 0; //索引位置
      if (startTime !== "") {
        index++;
        meta[index] = {
          key: "blocked_time", //查询时间范围----开始时间
          value: startTime, //自行修改
          type: "DATETIME",
          compare: ">="
        };
      }
      if (endTime !== "") {
        index++;
        meta[index] = {
          key: "blocked_time", //查询时间范围----结束时间
          value: endTime, //自行修改
          type: "DATETIME",
          compare: "<="
        };
      }
      const params = {
        search: this.keyword,
        meta_query: meta
      };
      const res = await this.$Api.getFileList(params);
      console.log(res);
      if (res.data.list) this.handleUserData(res.data);
      else {
        this.userList = [];
        this.total = +res.data.count;
      }
    },
    handleUserData(data = {}) {
      const arr = data.list.map(item => {
        return {
          author_id: item.basic.ID,
          account: item.basic.display_name,
          status: item.custom.is_blocked ? item.custom.is_blocked[0] : "0",
          block_reason: item.custom.blocked_reason
            ? item.custom.blocked_reason[0]
            : "",
          block_detail: item.custom.description
            ? item.custom.description[0]
            : "",
          date: item.custom.blocked_time
            ? item.custom.blocked_time[0].slice(0, 10)
            : ""
        };
      });
      this.userList = [...arr];
      this.total = +data.count;
    },
    async unblockUserAccount(author_id) {
      const params = {
        user_id: author_id,
        meta_arr: {
          is_blocked: "0" //1表示被禁用，0或者null都表示未禁用
        }
      };
      const res = await this.$Api.updateUserStatus(params);
      console.log(res);
      await this.getFileList();
      if (+res.errCode === 0) {
        this.$message({
          type: "success",
          message: "解封成功"
        });
        this.getFileList();
      }
    }
  }
};
</script>

<style lang="scss">
// .el-table {
//   .doc {
//     color: $el-primary;
//   }
// }
</style>

<style lang="scss" scoped>
@import "./index.scss";
</style>
