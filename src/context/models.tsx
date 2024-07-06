
import { ReactNode, createContext, useState } from "react";
import { Model } from "../assets/utils/types";
import axios, {  AxiosError } from "axios";
import useError from "../hooks/useError"; 
 


type GlobalModel = {

    models: Model[],
    totalDBModels: number,  

    setModels: React.Dispatch<React.SetStateAction<Model[] | []>> 

    getAllModels: (page: number) => void
    getModelByID: (id: string, setter: React.Dispatch<React.SetStateAction<Model>>) => void,
    filterModelsBySearch: (term: string) => void

}


const ModelContext = createContext<GlobalModel>({

    models: [], 
    totalDBModels: 0,


    setModels: () => {}, 

    getAllModels: () => {},
    getModelByID: () => {},
    filterModelsBySearch: () => {}
})


const ModelProvider = ( { children } : { children : ReactNode } ) => {

    const [ models, setModels ] = useState<Model[] | []>([])
    const [ totalDBModels, setTotalDBModels ] = useState<number>(0);

    const { globalErrorHandler } = useError();

    const URL = 'https://ocadbackend.onrender.com/api/v1';


    const getAllModels = async ( page: number) => {

        try {
            const response = await axios({
                url: `${URL}/model?page=${page}`,
                method: "GET",
    
                headers : {
                    'Content-Type': 'application/json'
                }
            })
            console.log(response); 
            
            setModels(response.data.files)
            setTotalDBModels(response.data.totalModels)
        }

        catch (e: unknown) {

            if (e instanceof AxiosError)
            globalErrorHandler(e);
            
        }

    }

    const getModelByID = async (id: string, setter: React.Dispatch<React.SetStateAction<Model>>) => {

        try {
            const response = await axios({
                url: `${URL}/model/${id}`,
                method: "GET",
    
                headers : {
                    'Content-Type': 'application/json'
                }
            })

            setter(response.data.file)
        }

        catch (e: unknown) {

            if (e instanceof AxiosError)
            globalErrorHandler(e)
            
        }

    }

    const filterModelsBySearch = async (term: string) => {

        try {
            const response = await axios({
                url: `${URL}/model/search/${term}`,
                method: "GET",
    
                headers: {
                    'Content-Type': 'application/json'
                }
    
            })
    
            setModels(response.data.models)
        }

        catch (e: unknown) {

            if (e instanceof AxiosError)
            globalErrorHandler(e)
            
        }
    }


    return <ModelContext.Provider value={{models, setModels, getAllModels, getModelByID, filterModelsBySearch, totalDBModels}}>
        { children }
    </ModelContext.Provider>

}

export default ModelProvider;
export { ModelContext }