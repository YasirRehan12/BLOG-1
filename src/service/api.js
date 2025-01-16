
import axios from "axios"
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from "../constants/config.js"


const API_URL = 'http://localhost:8000'

const axiosInstance = axios.create({

    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    }
});



axiosInstance.interceptors.request.use(


    function (config) {


        // console.log("Config", config);

        return config;

    },
    function (error) {
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(

    function (response) {

        // stop the global loader here
    
        return processResponse(response);

    },
    function (error) {

        // stop the global loader here
        return Promise.reject(processError(error));
    }

)

const processResponse = (response) => {


    if (response?.status === 200) {

        return { isSuccess: true, data: response.data }

    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code

        }
    }
}




const processError = async (error) => {

    if (error.response) {
        console.log("ERROR IN RESPONSE:", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.responseFailure,
            code: error.response.status

        }
    }
    else if (error.request) {
        console.log("ERROR IN REQUEST:", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.requestFailure,
            code: ""

        }

    } else {
        console.log("ERROR IN NETWORK:", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.networkError,
            code: ""

        }

    }

}

const API = {};







for (const [key, value] of Object.entries(SERVICE_URLS)) {


    API[key] = (body, showUploadProgress, showDownloadProgress) => {


        return axiosInstance({

            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            onUploadProgress: function (ProgressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    showUploadProgress(percentageCompleted)
                }
            },
            onDownloadProgress: function (ProgressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    showDownloadProgress(percentageCompleted)
                }
            }

        });
    }

}


export { API }