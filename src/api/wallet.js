import {
    GET,POST
} from "@/utils/fetch"
//我的钱包-账户金额
export const GetBalance = (data) => {
    return GET('/User/GetBalance', data)
}
//我的钱包订单信息显示分页查询
export const GetOrderListPage = (data) => {
    return POST('/User/GetOrderListPage', data)
}
//我的押金列表
export const GetDepositInfo = (data) => {
    return GET('/User/GetDepositInfo', data)
}
//退押金
export const Refund = (data) => {
    return GET('/User/Refund', data)
}
//结算是判断是否有未结算订单
export const JudgeIslockOrder = (data) => {
    return POST('/Order/JudgeIslockOrder', data)
}