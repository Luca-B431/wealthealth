import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/employee-list", "routes/employee-list.tsx"),
] satisfies RouteConfig;
