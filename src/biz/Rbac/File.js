import FileApi from '@/api/Rbac/File';
import CommonResult from "@/entity/_Common/CommonResult";

async function addCompareGroup({
                                   referenceFiles,
                                   compareFiles,
                                   taskId,
                               }) {
    let r = await FileApi.upload({
        file1: referenceFiles,
        file2: compareFiles,
        taskId,
    })
    let commonResult = new CommonResult(r.data, r.message, r.code);
    return commonResult.message;
}

export default {
    addCompareGroup
}