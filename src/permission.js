import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getStorage } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist
const permissionRoles = ["administrator", "editor"];

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getStorage("token") || "";
  console.log("hasToken: ", hasToken);
  const userInfo = getStorage("userInfo") || {};
  const userRole = userInfo.user_role || "";

  if (hasToken) {
    if (permissionRoles.includes(userRole)) {
      next();
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        Message({
          message: "您没有管理员的权限",
          type: "error"
        });
        next(`/login?redirect=${to.fullPath}`);
        NProgress.done();
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.fullPath}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
