import {GET,POST} from "@/utils/fetch"

// 获取用户信息
export const GetUserInfo = (data) => {
    return GET('/User/GetUserInfo', data)
}
// 获取用户推荐码
export const refereeCodeInfo = (data) => {
    return GET('/User/GetRefereeCodeInfo', data)
}
// 绑定推荐码
export const BindRefereeCode = (data) => {
    return POST('/User/BindRefereeCode', data)
}
// 我的推广-发展用户总人数
export const ExtendInfo = (data) => {
    return GET('/Order/GetExtendInfo', data)
}
// 我的推广-分页信息
export const ExtendInfoPage = (data) => {
    return POST('/Order/GetExtendInfoPage', data)
}
// 话充相关  -  佣金分页信息
export const FanliPage = (data) => {
    return POST('/Order/GetFanliPage', data)
}
// 话充相关  -  订单分页信息
export const OrderListPage = (data) => {
    return POST('/Order/GetOrderListPage', data)
}
// 话充相关  -  任务金额分页信息
export const TaskOrderPageList = (data) => {
    return POST('/Order/GetTaskOrderPageList', data)
}
// 话充相关  -  奖励金额分页列表
export const PrizeOrderPageList = (data) => {
    return POST('/Order/GetPrizeOrderPageList', data)
}
// 话充相关  -  订单详情
export const OrderDetail = (data) => {
    return GET(`/Order/GetOrderDetail`,data )
}
// 话充相关  -  账单分页信息
export const GetDebtInfoPage = (data) => {
    return POST('/Order/GetDebtInfoPage', data)
}
// 话充相关  -  账单汇总信息
export const DebtInfoAmount = (data) => {
    return GET('/Order/GetDebtInfoAmount', data)
}
// 话充相关  -  获取收益相关
export const AccountInfo = (data) => {
    return GET('/Order/GetAccountInfo', data)
}
// 话充相关 - 判断是否 开通
export const userState = (data) => {
    return GET('/User/GetUserState', data)
}
// 话充相关 - 获取任务金额 和奖励金额
export const TaskAmount = (data) => {
    return GET('/Order/GetTaskAmount', data)
}
