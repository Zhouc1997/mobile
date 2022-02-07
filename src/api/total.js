import { GET } from "@/utils/fetch"
// 统计列表
export const totalListApi = (data) => GET('/ratingIndexTool/statList', data)