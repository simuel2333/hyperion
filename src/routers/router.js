import Index from "../view/admin/dashboard/Index";
import Edit from "../view/admin/products/Edit";
import List from "../view/admin/products/List";
import Login from "../view/loginAndRegister/login"
import Register from "../view/loginAndRegister/register";
import PageNotFound from "../view/PageNotFound";
import board from '../view/admin/trademark/board'
import UploadFile from '../view/admin/addFile/UploadFile'
import companys from '../view/admin/company/companys'
import initList from '../view/admin/distribution/initList'
import distribution from "../view/admin/distribution/distribution";
import futures from "../view/admin/futures/futures";
import bank from "../view/admin/bank/bank"
import { CopyOutlined, AreaChartOutlined, ShopOutlined, TrademarkCircleFilled, CloudUploadOutlined } from '@ant-design/icons'
export const mainRoutes = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/404",
        component: PageNotFound
    }
];

export const adminRoutes = [
    {
        path: "/admin/dashboard",
        component: Index,
        isShow: true,
        title: "历史交易",
        icon: AreaChartOutlined
    },
    {
        path: "/admin/products",
        component: List,
        exact: true,
        isShow: false,
        title: "商品",
        icon: ShopOutlined
    },
    {
        path: "/admin/products/edit/:id?",
        component: Edit,
        isShow: false
    },
    {
        path: "/admin/trademark/board",
        component: board,
        isShow: true,
        title: "交易市场",
        icon: TrademarkCircleFilled
    },
    {
        path: "/admin/upload",
        component: UploadFile,
        isShow: false,
        title: "上传图片",
        icon: CloudUploadOutlined
    },
    // {
    //     path: "/admin/companys",
    //     component: companys,
    //     isShow: true,
    //     title: "企业管理",
    //     icon: ShopOutlined
    // },
    {
        path: "/admin/initlist",
        component: initList,
        isShow: true,
        title: "初始分配",
        icon: ShopOutlined
    },
    {
        path: "/admin/distribution",
        component: distribution,
        isShow: false,
        title: "分配份额",
    },
    {
        path: "/admin/futures",
        component: futures,
        isShow: true,
        title: "个人期货交易",
        icon: CopyOutlined
    },
    {
        path: "/admin/bank",
        component: bank,
        isShow: true,
        title: "钱庄",
        icon: CloudUploadOutlined
    },
];