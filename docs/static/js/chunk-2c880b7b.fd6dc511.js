(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c880b7b"],{"099f":function(e,t,a){},"365d":function(e,t,a){"use strict";a("7b11")},"6f0a":function(e,t,a){},7156:function(e,t,a){var n=a("861d"),i=a("d2bb");e.exports=function(e,t,a){var o,r;return i&&"function"==typeof(o=t.constructor)&&o!==a&&n(r=o.prototype)&&r!==a.prototype&&i(e,r),e}},"7b11":function(e,t,a){e.exports={menuText:"#bfcbd9",menuActiveText:"#409eff",subMenuActiveText:"#f4f4f5",menuBg:"#304156",menuHover:"#263445",subMenuBg:"#1f2d3d",subMenuHover:"#001528",sideBarWidth:"260px"}},8719:function(e,t,a){"use strict";a("6f0a")},a9e3:function(e,t,a){"use strict";var n=a("83ab"),i=a("da84"),o=a("94ca"),r=a("6eeb"),l=a("5135"),c=a("c6b6"),s=a("7156"),u=a("c04e"),d=a("d039"),p=a("7c73"),f=a("241c").f,g=a("06cf").f,m=a("9bf2").f,h=a("58a8").trim,b="Number",v=i[b],y=v.prototype,k=c(p(y))==b,w=function(e){var t,a,n,i,o,r,l,c,s=u(e,!1);if("string"==typeof s&&s.length>2)if(s=h(s),t=s.charCodeAt(0),43===t||45===t){if(a=s.charCodeAt(2),88===a||120===a)return NaN}else if(48===t){switch(s.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+s}for(o=s.slice(2),r=o.length,l=0;l<r;l++)if(c=o.charCodeAt(l),c<48||c>i)return NaN;return parseInt(o,n)}return+s};if(o(b,!v(" 0o1")||!v("0b1")||v("+0x1"))){for(var x,_=function(e){var t=arguments.length<1?0:e,a=this;return a instanceof _&&(k?d((function(){y.valueOf.call(a)})):c(a)!=b)?s(new v(w(t)),a,_):w(t)},C=n?f(v):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),N=0;C.length>N;N++)l(v,x=C[N])&&!l(_,x)&&m(_,x,g(v,x));_.prototype=y,y.constructor=_,r(i,b,_)}},bf7b:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"file"},[a("el-dialog",{attrs:{title:"免责声明弹窗",visible:e.disclaimer,width:"50%",center:"","show-close":!1,"close-on-press-escape":!1,"close-on-click-modal":!1},on:{close:e.closeDisclaimer}},[a("div",{staticClass:"disclaimer"},[a("span",[e._v(" 免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明 免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明免责声明 ")])]),a("div",{staticClass:"disclaimer-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.closeDisclaimer}},[e._v("我已阅读以上免责声明")])],1)]),"mobile"===e.device?[a("div",{staticClass:"lay-mobile"},[a("el-tree",{attrs:{"empty-text":"目录为空",accordion:"","default-expand-all":"","expand-on-click-node":!1,data:e.catalogData,props:e.defaultProps},on:{"node-click":e.handleTreeNodeClick}}),a("div",{staticClass:"search-input"},[a("div",{staticClass:"title"},[e._v("文件搜索")]),a("el-input",{attrs:{placeholder:"请输入查询文件的名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSearchFileList.apply(null,arguments)}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.onSearchFileList},slot:"append"})],1)],1),a("div",{staticClass:"file-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"文件加载中","element-loading-spinner":"el-icon-loading",data:e.fileList,stripe:"","max-height":"1000px"}},[a("el-table-column",{attrs:{prop:"name",label:"文件名称"}}),a("el-table-column",{attrs:{label:"是否已读"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tag",{attrs:{type:"read"===n.status?"success":"danger"}},[e._v(e._s("read"===n.status?"已读":"未读"))])]}}],null,!1,1476960494)}),a("el-table-column",{attrs:{prop:"date",label:"上传时间"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{type:"text",icon:"el-icon-view"},on:{click:function(t){return e.openFileDetail(n)}}},[e._v("查看详情")]),"admin"===n.role?a("el-button",{attrs:{type:"text",icon:"el-icon-download"},on:{click:function(t){return e.handleDownloadFile(n)}}},[e._v("下载")]):e._e()]}}],null,!1,4018013846)})],1)],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{layout:"prev, pager, next",total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.fetchFileList}})],1)]:[a("div",{staticClass:"lay-pc"},[a("el-row",{attrs:{type:"flex",gutter:10}},[a("el-col",{attrs:{xs:8,sm:8,md:6,lg:4,xl:4}},[a("el-tree",{attrs:{"empty-text":"目录为空",accordion:"","default-expand-all":"","expand-on-click-node":!1,data:e.catalogData,props:e.defaultProps},on:{"node-click":e.handleTreeNodeClick}})],1),a("el-col",{attrs:{xs:12,sm:12,md:16,lg:18,xl:18}},[a("div",{staticClass:"search-input"},[a("div",{staticClass:"title"},[e._v("文件搜索")]),a("el-input",{attrs:{placeholder:"请输入查询文件的名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onSearchFileList.apply(null,arguments)}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.onSearchFileList},slot:"append"})],1)],1),a("div",{staticClass:"file-table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],staticStyle:{width:"100%"},attrs:{"element-loading-text":"文件加载中","element-loading-spinner":"el-icon-loading",data:e.fileList,stripe:"","max-height":"1000px"}},[a("el-table-column",{attrs:{prop:"name",label:"文件名称"}}),a("el-table-column",{attrs:{label:"是否已读"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-tag",{attrs:{type:"read"===n.status?"success":"danger"}},[e._v(e._s("read"===n.status?"已读":"未读"))])]}}])}),a("el-table-column",{attrs:{prop:"date",label:"上传时间"}}),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-button",{attrs:{type:"text",icon:"el-icon-view"},on:{click:function(t){return e.openFileDetail(n)}}},[e._v("查看详情")]),"admin"===n.role?a("el-button",{attrs:{type:"text",icon:"el-icon-download"},on:{click:function(t){return e.handleDownloadFile(n)}}},[e._v("下载")]):e._e()]}}])})],1)],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.fetchFileList}})],1)],1)],1)]],2)},i=[],o=a("c964"),r=a("f3f3"),l=(a("b0c0"),a("fb6a"),a("d81d"),a("99af"),a("498a"),a("96cf"),a("2f62")),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},s=[],u=(a("a9e3"),{name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e})},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize})}}}),d=u,p=(a("8719"),a("2877")),f=Object(p["a"])(d,c,s,!1,null,"2f39d2f3",null),g=f.exports,m=a("365c"),h={name:"File",components:{Pagination:g},data:function(){return{keyword:"",defaultProps:{children:"child",label:"name"},catalogData:[],total:0,listQuery:{page:1,limit:10},tableLoading:!1,fileList:[]}},computed:Object(r["a"])(Object(r["a"])({},Object(l["b"])(["disclaimer"])),{},{device:function(){return this.$store.state.app.device}}),created:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.total=50,t.next=3,e.getDocumentCategory();case 3:return t.next=5,e.getDocumentList();case 5:case"end":return t.stop()}}),t)})))()},mounted:function(){},methods:{closeDisclaimer:function(){this.$store.dispatch("app/closeDisclaimer")},handleTreeNodeClick:function(e){console.log(e),this.categoryId=e.id,this.getDocumentList()},loadNode:function(e,t){var a,n=this;return 0===e.level?t([{name:"region1"},{name:"region2"}]):e.level>3?t([]):(a="region1"===e.data.name||"region2"!==e.data.name&&Math.random()>.5,void setTimeout((function(){var e;e=a?[{name:"zone"+n.count++},{name:"zone"+n.count++}]:[],t(e)}),500))},getDocumentCategory:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,m["a"].getDocumentCategory();case 3:a=t.sent,console.log(a),100===a.code&&(e.catalogData=a.content.slice(),e.categoryId=e.catalogData[0].id),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},getDocumentList:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.tableLoading=!0,a={categoryId:e.categoryId},t.prev=2,t.next=5,m["a"].getDocumentList(a);case 5:n=t.sent,console.log(n),100===n.code&&(e.tableLoading=!1,i="http://by2.hjlinfo.top",e.fileList=n.content.map((function(e,t){return{id:e.id,name:e.name,status:Math.random()>.5?"read":"unread",date:e.createTime,mime:"pdf",download_url:"".concat(i,"/uploadDir").concat(e.path),href:"".concat(i,"/uploadDir").concat(e.path)}}))),t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](2),console.log(t.t0),e.tableLoading=!1;case 14:case"end":return t.stop()}}),t,null,[[2,10]])})))()},onSearchFileList:function(){this.keyword.trim()},fetchFileList:function(e){var t=e.page,a=e.limit;this.listQuery.page=t,this.listQuery.limit=a,this.keyword=""},openFileDetail:function(e){var t=e.href,a=void 0===t?"":t,n=e.mime;this.$router.push({path:"/document",query:{href:a,mime:n}}).catch((function(){}))},handleDownloadFile:function(e){var t=e.download_url,a=void 0===t?"":t,n=e.name,i=void 0===n?"":n;console.log(a);var o=document.createElement("a");o.style.display="none",o.href=a,o.setAttribute("download",i),document.body.appendChild(o),o.click(),document.body.removeChild(o)}}},b=h,v=(a("365d"),a("d298"),Object(p["a"])(b,n,i,!1,null,"bd80765a",null));t["default"]=v.exports},d298:function(e,t,a){"use strict";a("099f")}}]);
//# sourceMappingURL=chunk-2c880b7b.fd6dc511.js.map