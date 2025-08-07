import { lazy } from "react";
const PostPage = lazy(() => import("./PostPage"));
const PostTemplate = lazy(() => import("./PostTemplate"));
const ScreenTemplate = lazy(() => import("../product/ScreenTemplate"));
const Home = lazy(() => import("./Home"));

export { PostPage, PostTemplate, Home, ScreenTemplate };
