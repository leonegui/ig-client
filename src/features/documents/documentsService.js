import axios from "axios"

const API_URL = process.env.REACT_APP_API_URI + 'api/documentos/'

// pegar documentos ADMIN
const getDocumentsAdmin = async(token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + 'admin', config)
    
    if(response.data){
        localStorage.setItem('documents', JSON.stringify(response.data))

    }

    return response.data

}


// pegar documentos 
const getDocuments = async(token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    if(response.data){
        localStorage.setItem('documents', JSON.stringify(response.data))
        
    }

    return response.data

}

// baixar documentos 
const downloadDocument = async(documentData,token) =>{

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        responseType: "blob"
    }

    const response = await axios.get(API_URL + 'baixar/' + documentData._id, config)

    const blob = new Blob([response.data], { type: response.data.type });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);

    link.setAttribute("download", documentData.name, blob);
    document.body.appendChild(link);

    link.click()
    link.remove();

    // return response.data
}

// adcionar documentos
const addDocument = async(documentData) =>{

    let token = documentData.token

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    }

    const response = await axios.post(API_URL + 'adicionar', documentData, config)
    
    if(response.data){
        localStorage.setItem('documents', JSON.stringify(response.data))
    }

    return response.data
}

// deletar documento
const deleteDocument = async(documentData) =>{
   
    const response = await axios.delete(API_URL + 'deletar/' + documentData.document)

    if(response.data){
        localStorage.setItem('documents', JSON.stringify(response.data))
    }

    return response.data
}


const documentsService = {
    getDocuments,
    downloadDocument,
    addDocument,
    deleteDocument,
    getDocumentsAdmin
}

export default documentsService