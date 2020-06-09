/**
 * 路由控制:应该存在两类
 * 1、共有的
 * 2、私有的
 */
import {
    UserList,
    User,
    Login,
    InvitationList,
    AnswerList,
    CollectionList,
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
} from '../pages'


const commonRoutes = [
    {
        pathname:'/login',
        component: Login,
        title:'登录',
        isTop : true
    },
    {
        pathname:'/404',
        component: NotFound,
        title:'路径未知',
        isTop : true
    }
]

const privateRoutes = [
    {
        pathname:'/admin/userList',
        component: UserList,
        title:'用户列表',
        isTop : true
    },
    {
        pathname:'/admin/admin',
        component: AdminList,
        title:'用户列表',
        isTop : true
    },
    {
        pathname:'/admin/invitationList',
        component: InvitationList,
        title:'帖子列表',
        isTop : false
    },
    {
        pathname:'/admin/invitation',
        component: Invitation,
        title:'帖子详情',
        isTop : false
    },
    {
        pathname:'/admin/typeList',
        component: InvitationTypeList,
        title:'帖子列表',
        isTop : false
    },
    {
        pathname:'/admin/answerList',
        component: AnswerList,
        title:'帖子列表',
        isTop : true
    },
    {
        pathname:'/admin/user',
        component: User,
        title:'用户表单',
        isTop : false
    },
    {
        pathname:'/admin/reportUser',
        component: ReportUserList,
        title:'举报用户记录',
        isTop : false
    },
    {
        pathname:'/admin/reportInvitation',
        component: ReportInvitationList,
        title:'举报帖子记录',
        isTop : false
    },{
        pathname:'/admin/reportComment',
        component: ReportCommentList,
        title:'举报评论记录',
        isTop : false
    },{
        pathname:'/admin/checkUserList',
        component: CheckUserList,
        title:'用户审核列表',
        isTop : false
    },{
        pathname:'/admin/checkInvitationList',
        component: CheckInvitationList,
        title:'帖子审核列表',
        isTop : false
    },{
        pathname:'/admin/checkCommentList',
        component: CheckCommentList,
        title:'评论审核列表',
        isTop : false
    },
    {
        pathname:'/admin/collection',
        component: CollectionList,
        title:'帖子收藏列表',
        isTop : true
    },
    {
        pathname:'/admin/attention',
        component: AttentionList,
        title:'用户关注列表',
        isTop : false
    },
    {
        pathname:'/admin/dashboard',
        component: Dashboard,
        title:'用户关注列表',
        isTop : false
    },
    {
        pathname:'/admin/comment',
        component: MyComment,
        title:'评论列表',
        isTop : false
    },
    {
        pathname:'/admin/announcement',
        component: AnnouncementList,
        title:'公告',
        isTop : false
    },
    {
        pathname:'/admin/paramList',
        component: ParamList,
        title:'参数列表',
        isTop : false
    },
    {
        pathname:'/admin/enumParamList',
        component: EnumParamList,
        title:'枚举参数列表',
        isTop : false
    },
    {
        pathname:'/admin/enumTypeList',
        component: EnumTypeList,
        title:'枚举参数列表',
        isTop : false
    }
]

export {
    commonRoutes,privateRoutes
}