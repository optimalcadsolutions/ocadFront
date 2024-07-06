
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import useModel from '../../hooks/useModel'
import { Model } from '../../assets/utils/types'

import { useEffect, useRef, useState } from 'react'
import './ModelPage.css' 
import Button from '../../components/Button/Button'
import { GoDownload } from "react-icons/go";
import Viewer from '../../components/3DViewer/Viewer'
import Modal from '../../components/Modal/Modal'
import Preview from '../../components/ModelPreview/Preview'

import signInAndGetFileURL from '../../assets/utils/firebaseAuth.js'

const ModelPage = () => {


    const { models, getModelByID } = useModel();
    const param = useParams();
    const modelID: string = param.id as string;

    const [currentModel, setCurrentModel] = useState<Model>(models.filter(model => model._id === modelID)[0])
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const [ fileUrls, setFileUrls ] = useState<
    {
        model: string,
        glb: string
    }>({
        model: '',
        glb: ''
    })

    const pageRef = useRef<HTMLDivElement | null>(null)
    
    
    const fetchFiles = async () => {

        if (currentModel?.modelFile && currentModel?.glbFile) {
            const modelUrl = await signInAndGetFileURL(currentModel.modelFile)
            const glbUrl = await signInAndGetFileURL(currentModel.glbFile)
                
            console.log(modelUrl);
            console.log(glbUrl);
            
            

            if (modelUrl && glbUrl) 
            {
                setFileUrls({
                    model: modelUrl,
                    glb: glbUrl
                })
                
            }
        }
    }
    

    useEffect( () => {
        
        if (!currentModel) 
         getModelByID(modelID, setCurrentModel)
  

         
        
    }, [models]) 
    
    useEffect( () => {
        
        if (currentModel)
        fetchFiles()
    
    }, [currentModel] )
 
    useEffect( () => {

        const pageTimeout = setTimeout( () => {

            pageRef.current?.classList.add('pageLoad')
        
        }, 800)

        
        return () => {
            clearTimeout(pageTimeout)
        }


    }, []) 

    const readableDateGen = (date: Date) => {
        
        const months = ['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}`
    }   
    

    return (
        <div>
            <header>
                <Navbar />
            </header>

            <div ref={pageRef} className='model--container'>


                <div className='file--container'>

                    <div className='file--img' onClick={() => setModalOpen(true)}> 
                        {!modalOpen && currentModel && fileUrls.glb ? <Preview fileURL = {'https://storage.googleapis.com/ocadbackend.appspot.com/1720196346573-base.glb'} /> : ''}
                    </div>

                    <div className='about--file'>
                            <p className='file--name'>{currentModel?.name}</p>
                            <p className='file--desc'>{currentModel?.description}</p>
                            <p className='file--size'>{currentModel?.fileSize / 1000} KB</p>
                            <p className='file--creator'>- {currentModel?.publishedBy}</p>
                            <p className='file--date'>{readableDateGen(new Date(currentModel?.postedOn))}</p>
                            <div>
                                <a href={fileUrls.model} download > <Button> Download <GoDownload className='download--ico'/> </Button> </a> 
                            </div>
                    </div>
 

                </div>

                <div className='threeD-viewer'>
                    <Modal isOpen = { modalOpen } closeModalFn = {setModalOpen}>
                        <Viewer fileURL = {fileUrls.glb ? fileUrls.glb : '' } /> 
                    </Modal>
                </div>

 
            </div>
        </div>
    )
}

export default ModelPage