/**
 * 路由控制:应该存在两类
 * 1、共有的
 * 2、私有的
 */
import {
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
} from '@ant-design/icons';
import {
    UserList,
    User,
    Login,
    InvitationList,
    AnswerList,
    CollectionInvitationList,
    AttentionList,
    Dashboard,
    AnnouncementList,
    MyComment,
    NotFound,
    InvitationTypeList,
    Invitation,
    AdminList,
    ReportUserList,
    ReportInvitationList,
    ReportCommentList,
    CheckUserList,
    CheckInvitationList,
    CheckCommentList,
    ParamList,
    EnumParamList,
    EnumTypeList,
    UseLoading
} from '../pages';
import React from "react";
import {getToken} from "../util/userLoginUtil";


const commonRoutes = [
    {
        pathname: '/login',
        component: Login,
        title: '登录',
        isTop: true
    },
    {
        pathname: '/404',
        component: NotFound,
        title: '路径未知',
        isTop: true
    }
]

const routers = [
    {
        pathname: '/admin/userList',
        component: UserList,
        title: '用户列表',
        isTop: true
    },
    {
        pathname: '/admin/admin',
        component: AdminList,
        title: '用户列表',
        isTop: true
    },
    {
        pathname: '/admin/invitationList',
        component: InvitationList,
        title: '帖子列表',
        isTop: false
    },
    {
        pathname: '/admin/invitation',
        component: Invitation,
        title: '帖子详情',
        isTop: false
    },
    {
        pathname: '/admin/typeList',
        component: InvitationTypeList,
        title: '帖子列表',
        isTop: false
    },
    {
        pathname: '/admin/answerList',
        component: AnswerList,
        title: '帖子列表',
        isTop: true
    },
    {
        pathname: '/admin/user',
        component: User,
        title: '用户表单',
        isTop: false
    },
    {
        pathname: '/admin/reportUser',
        component: ReportUserList,
        title: '举报用户记录',
        isTop: false
    },
    {
        pathname: '/admin/reportInvitation',
        component: ReportInvitationList,
        title: '举报帖子记录',
        isTop: false
    }, {
        pathname: '/admin/reportComment',
        component: ReportCommentList,
        title: '举报评论记录',
        isTop: false
    }, {
        pathname: '/admin/checkUserList',
        component: CheckUserList,
        title: '用户审核列表',
        isTop: false
    }, {
        pathname: '/admin/checkInvitationList',
        component: CheckInvitationList,
        title: '帖子审核列表',
        isTop: false
    }, {
        pathname: '/admin/checkCommentList',
        component: CheckCommentList,
        title: '评论审核列表',
        isTop: false
    },
    {
        pathname: '/admin/collection',
        component: CollectionInvitationList,
        title: '帖子收藏列表',
        isTop: true
    },
    {
        pathname: '/admin/attention',
        component: AttentionList,
        title: '用户关注列表',
        isTop: false
    },
    {
        pathname: '/admin/dashboard',
        component: Dashboard,
        title: '用户关注列表',
        isTop: false
    },
    {
        pathname: '/admin/comment',
        component: MyComment,
        title: '评论列表',
        isTop: false
    },
    {
        pathname: '/admin/announcement',
        component: AnnouncementList,
        title: '公告',
        isTop: false
    },
    {
        pathname: '/admin/paramList',
        component: ParamList,
        title: '参数列表',
        isTop: false
    },
    {
        pathname: '/admin/enumParamList',
        component: EnumParamList,
        title: '枚举参数列表',
        isTop: false
    },
    {
        pathname: '/admin/enumTypeList',
        component: EnumTypeList,
        title: '枚举参数列表',
        isTop: false
    },
    {
        pathname: '/admin/custom/loading',
        component: UseLoading,
        title: '枚举参数列表',
        isTop: false
    }
]

const privateRoutes = [
    {
        title: '监控中心',
        icon: <LaptopOutlined/>,
        children: [
            {
                title: '监控台',
                pathname: '/admin/dashboard',
                component: Dashboard,
            }
        ]
    },
    {
        title: '用户管理',
        icon: <UserOutlined/>,
        children: [
            {
                title: '用户列表',
                pathname: '/admin/userList',
                component: UserList,
            },
            {
                title: '用户关注列表',
                pathname: '/admin/attention',
                component: AttentionList,
            },
            {
                title: '用户举报记录',
                pathname: '/admin/reportUser',
                component: ReportUserList,
            },
            {
                title: '管理员列表',
                pathname: '/admin/admin',
                component: AdminList,
                level: '1'
            },
        ]
    },
    {
        title: '帖子管理',
        icon: <NotificationOutlined/>,
        children: [
            {
                title: '帖子列表',
                pathname: '/admin/invitationList',
                component: InvitationList,
            },
            {
                title: '收藏管理',
                pathname: '/admin/collection',
                component: CollectionInvitationList,
            },
            {
                title: '帖子举报记录',
                pathname: '/admin/reportInvitation',
                component: ReportInvitationList,
            },
            {
                title: '帖子种类',
                pathname: '/admin/typeList',
                component: InvitationTypeList,
                isShow: getToken().level==="1"
            },
        ]
    },
    {
        title: '审核中心',
        icon: <NotificationOutlined/>,
        children: [
            {
                title: '审核举报用户',
                pathname: '/admin/checkUserList',
                component: CheckUserList,
            },
            {
                title: '审核举报帖子',
                pathname: '/admin/checkInvitationList',
                component: CheckInvitationList,
            },
            {
                title: '审核举报评论',
                pathname: '/admin/checkCommentList',
                component: CheckCommentList,
            }
        ]
    },
    {
        title: '公告中心',
        icon: <UserOutlined/>,
        children: [
            {
                title: '公告列表',
                pathname: '/admin/announcement',
                component: AnnouncementList,
            }
        ]
    },
    {
        title: '评论管理',
        icon: <UserOutlined/>,
        children: [
            {
                title: '评论列表',
                pathname: '/admin/comment',
                component: MyComment,
            },
            {
                title: '评论举报记录',
                pathname: '/admin/reportComment',
                component: ReportCommentList,
            }
        ]
    },
    {
        title: '参数管理',
        icon: <UserOutlined/>,
        children: [
            {
                title: '参数列表',
                pathname: '/admin/paramList',
                component: ParamList,
            },
            {
                title: '参数字典列表',
                pathname: '/admin/enumTypeList',
                component: EnumTypeList,
            },
            {
                title: '枚举类型列表',
                pathname: '/admin/enumParamList',
                component: EnumParamList,
            }
        ]
    },
    {
        title: '组件管理',
        icon: undefined,
        children: [
            {
                title: 'loading',
                pathname: '/admin/custom/loading',
                component: UseLoading,
                icon: undefined
            }
        ]
    },
    {
        title: '测试',
        icon: <LaptopOutlined/>,
    },
]
export {
    commonRoutes, privateRoutes, routers
}
