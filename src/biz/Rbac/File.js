import FileApi from '@/api/Rbac/File';

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

}