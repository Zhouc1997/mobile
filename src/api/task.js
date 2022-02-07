import { GET,POST } from "@/utils/fetch"
// 获取今日收益
export const getToadyDataApi = () => GET('/Order/GetDayIncome')

// 获取任务
export const getTaskApi = data => POST(`/Order/GetTaskOrder`, data)
// 查看任务列表
export const getTaskListApi = () => GET('/Order/GetOrderSendInfo')

// 获取任务筛选条件（回显）
export const getListApi = () => GET('/Search/Get')
// 保存任务筛选条件
export const saveTaskApi = data => POST(`/Search/Save`, data)
// 获取额度和单数
export const getNumApi = () => GET('/Search/GetTaskFilterRemaining')
// 获取省份列表
export const getProvincApi = () => GET('/Search/GetProvince')
// 获取周期列表
export const getCycleApi = () => GET('/Search/GetCycle')
// 获取来源运营商列表
export const getOperatorApi = () => GET('/Search/GetOperator')
// 获取面值列表
export const getFaceValueApi = () => GET('/Search/GetFaceValue')
// 缴纳押金，返回通行证url
export const getDepositUrlApi = (data) => GET('/User/OpenAccount',data)
// 放弃或完成任务
export const saveOrGiveupTaskApi = data => POST(`/Order/PendingOrderPayed`, data)
// 上传图片接口
export const saveImgApi = data => POST(`/Order/UploadPicture`, data)
// 获取邀请码接口
export const getCodeApi = () => GET('/User/GetRefereeCodeInfo')
/*=============================================================================V1.0.01 */
// 获取用户工作设置
export const getWorkListApi = () => GET('/UserWork/List')
// 删除用户工作设置
export const deleteWorkListApi = (data) => GET('/UserWork/Delete',data)
// 添加工作设置
export const addWorkApi = data => POST(`/UserWork/Add`, data)
// 获取工作详情
export const getWorkDetailApi = (data) => GET('/UserWork/GetInfoById',data)

// 极速充值
export const OrderPayApi = data => GET(`/Order/OrderPay`, data)

// 编辑工作设置
export const updateWorkApi = data => POST(`/UserWork/Update`, data)
// 设置工作状态
export const WorkStatusApi = data => POST(`/UserWork/SetStatus`, data)

// 获取可用额度
export const getQuotaApi = (data) => GET('/Search/GetUsableQuota',data)
// 获取运营商对应单量
export const getIpsNumApi = (data) => GET('/Search/GetIspOrderNumber',data)
// 获取面值和对应订单数
export const getFacevalNumApi = (data) => GET('/Search/GetTaskOrderNumber',data)
