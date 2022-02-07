import { GET,POST  } from "@/utils/fetch"
export const getWxInfo = (data) => GET('/wechat/config/get/group', data)
export const getUserInfoApi = (data) => POST(`/wechat/group/code?code=${data.code}`)
export const loginApi = data => POST(`/ratingIndexTool/Login`, data)
export const registerApi = data => POST(`/ratingIndexTool/Sign`, data)

