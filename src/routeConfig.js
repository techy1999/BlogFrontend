import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBlog from "./pages/MyBlog";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import NotFound from "./components/common/NotFound"
import NotFoundImage from "./assets/undraw_page_not_found.svg"


export const routeConfig = [
    {
        path:"/",
        element: <Home/>
    },
    {
        path:"/blogs",
        element: <Blog/>
    },
    {
        path:"/blogs/:id",
        element: <BlogDetail/>
    },
    {
        path:"/my-blogs",
        element: <MyBlog/>
    },
    {
        path:"/blog",
        element: <CreateBlog/>
    },
    {
        path:"/login",
        element: <Login/>
    },
    {
        path:"/register",
        element: <Register/>
    },
    {
        path:"/profile",
        element: <Profile/>
    },
    {
        path:"*",
        element: <NotFound imageUrl={NotFoundImage} />
    },
    {
        path:"/api",
        element: null
    },
]
