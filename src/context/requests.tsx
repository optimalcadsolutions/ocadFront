
import { ReactNode, createContext, useState } from "react";
import { Request } from "../assets/utils/types";
import axios, { AxiosError } from "axios";
import useError from "../hooks/useError";


type GlobalRequests = {

    requests: Request[] | [],

    setRequests: React.Dispatch<React.SetStateAction<Request[] | []>>

    getAllRequests: (show: string) => void,
    postNewRequest: (data : {modelName: string, modelDescription: string, requestedBy: string, contact: string }) => Promise<boolean>
}


const RequestContext = createContext<GlobalRequests>({

    requests:[],

    setRequests: () => {},

    getAllRequests: () => {},
    postNewRequest: () => Promise.reject()

})


export default function RequestProvider( { children } : { children : ReactNode }){
    

    const [ requests, setRequests ] = useState<Request[] | [] >([])

    const { globalErrorHandler } = useError();


    const URL = 'https://ocadbackend.onrender.com/api/v1';

    const getAllRequests = async (show: string) => {


        try {
            const response = await axios({
                url: `${URL}/requests?show=${show}`,
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
                
            })
    
            setRequests(response.data.requests);
        }

        catch (e) {
            console.log(e);
            
        }

    }

    const postNewRequest = async (data : {modelName: string, modelDescription: string, requestedBy: string, contact: string }) => {

        try {

            const response = await axios({
                url: `${URL}/requests`,
                method: "POST",
                data,
                headers: {
                    'Content-Type': "application/json"
                }
            })

            if (response.status === 201) {
                return true
            }

            return false;
            
        }

        catch (e: unknown ) {

            if (e instanceof AxiosError)
            globalErrorHandler(e)
            return false;
        }

    }
  

    return <RequestContext.Provider value={{requests, setRequests, getAllRequests, postNewRequest}}>
        { children }
    </RequestContext.Provider>

}

export { RequestContext };