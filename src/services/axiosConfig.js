import axios from "axios";

const axiosConfig=async(method,url,reqBody,reqHeader)=>{
    let reqObj={
        method:method,
        url:url,
        data:reqBody,
        headers:reqHeader
        
    }
    return await axios(reqObj).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}

export default axiosConfig