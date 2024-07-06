/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { ReactNode, createContext, useState } from "react";

import { ErrorInterface } from "../assets/utils/types";
import { AxiosError } from "axios";
import { ErrorResponseData } from "../assets/utils/types";

type GlobalError = {

    error: ErrorInterface,

    setError: React.Dispatch<React.SetStateAction<ErrorInterface>>

    globalErrorHandler: (error : AxiosError) => void
}


export const ErrorContext = createContext<GlobalError>({
    
    error: {
        message: '',
        code: 400,
        type: '',
        timestamp: null,
    },

    setError: () => {},

    globalErrorHandler: () => {}
})



export default function ErrorProvider ( { children } : { children: ReactNode } ) {

    const [error, setError] =  useState<ErrorInterface>({
        message: '',
        code: 200,
        type: '',
        timestamp: null,
    })

    const globalErrorHandler = ( err: AxiosError ) => {
  
        console.log(err);
        
        if (err.response  && err.response.data)
        { 
            const data = err.response.data as ErrorResponseData;
            if (data &&  data.error && data.error.statusCode === 400)
            { 
                
                    setError({
                    type: "ValidationError",
                    code: 400,
                    message: err.response.data.message,
                    timestamp: new Date(Date.now())
                })
            }
        } 
         
          
    } 


    return <ErrorContext.Provider value = { {error, setError, globalErrorHandler} }>
        { children }
    </ErrorContext.Provider>

}

