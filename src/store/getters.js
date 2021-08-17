const getters = {
  disclaimer: state => state.app.disclaimer,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  auth: state => state.user.auth,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  add_routes: state => state.permission.addRoutes,
  errorLogs: state => state.errorLog.logs
};

export default getters;
