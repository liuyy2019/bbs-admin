/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数返回值都是promise
 */
import ajax from './ajax'

const env = process.env.NODE_ENV;
const url_prefix = env === 'development' ? '/mock': '';

// 登录
export function reqLogin(username, password) {
    return ajax('/login',{username, password}, 'POST')
}
// 等价于
export const reqLogin2 = (username, password ) => ajax('/v1/user/user',{username, password}, 'GET')
// 管理员登录
export const adminLogin = (username, password ) => ajax(url_prefix+'/v1/admin/login',{username, password}, 'GET')

// 获取所有的用户列表
export const getAllUsers = (callback)=>ajax('/v1/user/userList',{},"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取用户列表
export const getListUsers = (data,callback)=>ajax(url_prefix+'/v1/user/user/test',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 获取用户,根据用户名
export const getUserByName = (data,callback)=>ajax('/v1/user/userList',data,"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 获取用户通过id
export const getUserById = (id,callback)=>ajax(`/v1/user/one/${id}`,{},"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 根据id删除用户
export const deleteUserById = (id,callback)=>ajax(`/v1/user/user/${id}`,{},"delete").then(result => {
    console.log(result)
    callback && callback(result);
}).catch(err => {
    console.log('error', err)
});

// 新增用户
export const addUser = (data,callback)=>ajax('/v1/user/add',data,"POST").then(result => {
    console.log(result)
    callback && callback(result);
}).catch(err => {
    console.log('error', err)
});

// 更新用户
export const updateUser = (data,callback)=>ajax('/v1/user/update',data,"PUT").then(result => {
    console.log(result)
    callback && callback(result);
}).catch(err => {
    console.log('error', err)
});

// 获取所有的用户关注列表
export const getAllAttentions = (callback)=>ajax(url_prefix+'/v1/attention/allAttentions',{},"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取用户关注列表
export const getListAttentions = (data,callback)=>ajax(url_prefix+'/v1/attention/attention/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取某个用户关注列表
export const getListAttentionsByName = (data,callback)=>ajax('/v1/attention/sort',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 根据id删除关注信息
export const deleteAttentionById = (id,callback)=>ajax(`/v1/attention/${id}`,{},"delete").then(result => {
    console.log(result)
    callback && callback(result);
}).catch(err => {
    console.log('error', err)
});

// 更新用户
export const updateAttention = (data,callback)=>ajax('/v1/attention/update',data,"PUT").then(result => {
    console.log(result)
    callback && callback(result);
}).catch(err => {
    console.log('error', err)
});

// 获取所有的帖子
export const getAllInvitations = (callback) => ajax(url_prefix+'/v1/invitation/invitationList',{}, 'GET').then(result => {
    console.log(result.data)
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取帖子列表
export const getListInvitations = (data,callback)=>ajax(url_prefix+'/v1/invitation/invitation/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 获取帖子访问量高的数据列表
export const getListInvitationsByVisitors = (callback)=>ajax(url_prefix+'/v1/invitations/byVisitors',{},"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 根据id获取帖子
// 方式一：
// export const getInvitation2 = (data)=> ajax('/v1/invitation/invitation',data,'GET');
// 方式二：使用？拼接的方式
export const getInvitation = (data,callback)=> ajax('/v1/invitation/invitation', data, 'GET').then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
})
/**
 * 新建帖子
 * @param data
 * @param callback
 * @returns {Q.Promise<any>}
 */
export const addInvitation = (data,callback)=> ajax('/v1/invitation/add', data, 'POST').then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 根据id删除帖子信息
export const deleteInvitationById = (id,callback)=>ajax(`/v1/invitation/${id}`,{},"delete").then(result => {
    console.log(result)
    callback && callback(result);
}).catch(err => {
    console.log('error', err)
});

// 更新帖子信息
export const updateInvitation = (data,callback)=> ajax('/v1/invitation/update', data, 'PUT').then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
})

// export const getInvitation2 =(id)=> ajax('/v1/invitation/invitation/${id}',{},'GET');


// 获取所有的问答
export const getAllAnswers = (callback) => ajax('/v1/answer/answerList',{}, 'GET').then(result => {
    console.log(result.data)
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取问答列表
export const getListAnswers = (data,callback)=>ajax('/v1/answer/answer/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 获取所有的帖子收藏
export const getAllCollections = (callback)=>ajax(url_prefix+'/v1/collection/allCollections',{},"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取帖子收藏列表
export const getListCollections = (data,callback)=>ajax('/v1/collection/collection/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 删除帖子收藏记录
export const deleteCollection = (id,callback)=>ajax(`/v1/collection/${id}`,{},"delete").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 更新收藏信息
export const updateCollection = (data,callback)=> ajax('/v1/collection/update', data, 'PUT').then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
})


// 动态获取评论列表
export const getListComments = (data,callback)=>ajax(url_prefix+'/v1/comment/comment/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 更新评论信息
export const updateComment = (data,callback)=>ajax('/v1/comment/update',data,"PUT").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 删除评论信息
export const deleteComment = (id,callback)=>ajax(`/v1/comment/id/${id}`,{},"delete").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取公告列表
export const getListAnnouncements = (data,callback)=>ajax(url_prefix+'/v1/announcement/announcement/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 获取所有公告列表
export const getAllAnnouncements = (callback)=>ajax(url_prefix+'/v1/announcement/announcementList',{},"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 新增公告
export const addAnnouncement = (data,callback)=>ajax('/v1/announcement/add',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 删除公告
export const deleteAnnouncement = (id,callback)=>ajax(`/v1/announcement/${id}`,{},"delete").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 修改公告
export const updateAnnouncement = (data,callback)=>ajax('/v1/announcement/update',data,"PUT").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取管理员列表
export const getListAdmins = (data,callback)=> {
    let res = ajax(url_prefix + '/v1/admin/admin/page',data,"POST");
    console.log('getListAdmins',res);
    res.then(result => {
        callback && callback(result.data);
    }).catch(err => {
        console.log('error', err)
    });
};

// 添加管理员
export const addAdmin = (data,callback)=>ajax('/v1/admin/add',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 修改管理员信息
export const updateAdmin = (data,callback)=>ajax('/v1/admin/update',data,"PUT").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 删除管理员信息
export const deleteAdmin = (id,callback)=>ajax(`/v1/admin/admin/${id}`,{},"delete").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取帖子种类列表
export const getListTypes = (data,callback)=>ajax(url_prefix+'/v1/admin/type/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 获取所有帖子种类列表
export const getAllTypes = (callback)=>ajax(url_prefix+'/v1/admin/typeAll',{},"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 删除帖子种类
export const deleteInvitationType = (id,callback)=>ajax(`/v1/invitation/type/${id}`,{},"delete").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 修改帖子种类信息
export const updateInvitationType = (data,callback)=>ajax('/v1/type/update',data,"PUT").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 新增种类列表
export const addInvitationType = (data,callback)=>ajax('/v1/type/add',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
})

// 动态获取举报用户列表
export const getListReportUsers = (data,callback)=>ajax(url_prefix+'/v1/reportUser/reportUser/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 获取举报用户列表
export const getListReportUsersById = (data,callback)=>ajax(url_prefix+'/v1/reportUser/sort',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 更新举报用户信息
export const updateReportUser = (data,callback)=>ajax('/v1/reportUser/update',data,"PUT").then(result => {
    callback && callback(result);
}).catch(err => {
    console.log('error', err)
});


// 动态获取举报帖子信息列表
export const getListReportInvitations = (data,callback)=>ajax(url_prefix+'/v1/reportInvitation/reportInvitation/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 获取举报帖子信息列表
export const getListReportInvitationsById = (data,callback)=>ajax('/v1/reportInvitation/sort',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 修改帖子举报信息
export const updateReportInvitation = (data,callback)=>ajax('/v1/reportInvitation/update',data,"PUT").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取所有评论举报列表
export const getListReportComments = (data,callback)=>ajax(url_prefix+'/v1/reportComment/reportComment/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 获取所有评论举报列表
export const getListReportCommentsById = (data,callback)=>ajax(url_prefix+'/v1/reportComment/sort',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 修改评论举报信息
export const updateReportComment = (data,callback)=>ajax('/v1/reportComment/update',data,"PUT").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 根据评论id，获取相应的评论举报信息
export const getReportCommentById = (id,callback)=>ajax(`/v1/reportCommentList/byId/${id}`,{},"delete").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取所有参数信息列表
export const getListParams = (data,callback)=>ajax(url_prefix+'/v1/param/param/page',data,"POST").then(result => {
    callback && callback(result);
}).catch(err => {
    console.log('error', err)
});

// 获取一条参数信息
export const getParamByCodeId= (data,callback)=>ajax('/v1/param/codeId',{codeId:data},"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    callback();
    console.log('error', err)
});

// 修改参数信息
export const updateParam = (data,callback)=>ajax('/v1/param/update',data,"PUT").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 新增参数信息
export const addParam = (data,callback)=>ajax('/v1/param/add',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 删除评论信息
export const deleteParam = (id,callback)=>ajax(`/v1/param/param/${id}`,{},"delete").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态获取枚举类型信息列表
export const getListEnumType = (data,callback)=>ajax(url_prefix+'/v1/enum/enumType/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 获取所有枚举类型信息列表
export const getAllEnumType = (callback)=>ajax('/v1/enum/typeList',{},"GET").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 修改枚举类型信息
export const updateEnumType = (data,callback)=>ajax('/v1/enumType/update',data,"PUT").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 新增枚举类型信息
export const addEnumType = (data,callback)=>ajax('/v1/enumType/add',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 删除枚举类型信息
export const deleteEnumType = (id,callback)=>ajax(`/v1/enum/enumType/${id}`,{},"delete").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 动态分页获取枚举码信息列表
export const getListEnumCode = (data,callback)=>ajax(url_prefix+'/v1/enum/enumCode/page',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    callback();
    console.log('error', err)
});

// 动态获取枚举码信息列表（不分页）
export const getCodeByType = (data,callback)=>ajax('/v1/enumCode/codeList',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    callback();
    console.log('error', err)
});

// 修改枚举码信息
export const updateEnumCode = (data,callback)=>ajax('/v1/enumCode/update',data,"PUT").then(result => {
    callback && callback(result.data);
}).catch(err => {
    callback();
    console.log('error', err)
});

// 新增枚举码信息
export const addEnumCode = (data,callback)=>ajax('/v1/enumCode/add',data,"POST").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});

// 删除枚举码信息
export const deleteEnumCode = (id,callback)=>ajax(`/v1/enum/enumCode/${id}`,{},"delete").then(result => {
    callback && callback(result.data);
}).catch(err => {
    console.log('error', err)
});


