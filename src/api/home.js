import { GET } from "@/utils/fetch"
export const geAddListApi = (data) => GET('/ratingIndexTool/addressList', data)
export const getDataApi = () => GET('/User/BusinessSummary')
export const getTaskPeopleApi = () => GET('/Business/Get')

