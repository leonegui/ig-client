import { useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addDocument, deleteDocument, downloadDocument } from "../../features/documents/documentsSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { resetDocuments } from "../../features/documents/documentsSlice"
import { Button, Typography,Box } from '@mui/material';
import { FaDownload, FaTrash } from 'react-icons/fa'

function Documents() {

  const { user } = useSelector((state) => state.auth)
  const { documents } = useSelector((state) => state.documents)

  const dispatch = useDispatch()

  // informação do documento
  const [documentData, setDocumentData] = useState({
    name: '',
    path: '',
    user: user._id,
    token: user.token
  })

  // estados do documento
  const { isError, isLoading, isSuccess, message } = useSelector((state) => state.documents)

  // referência do input file
  const fileInputRef = useRef(null)

  // função para pegar o arquivo
  const onChange = () => {
    setDocumentData({ ...documentData, name: fileInputRef.current.files[0].name, path: fileInputRef.current.files[0] })
  }

  // função para enviar o arquivo
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addDocument(documentData))

  }

  useEffect(() => {
    if (documents && isError) {
      toast.error(message)
    }

    if (documents && isSuccess) {
      toast.success(message)
    }

    dispatch(resetDocuments())

  }, [isError, isSuccess, message, documents, dispatch])


  if (isLoading) return (<h1>Carregando...</h1>)

  return (
    <Box sx={
      {
        marginBottom: '20px',
      }
    }>

      <Typography sx={
        {
          marginBottom: '20px',

        }} variant='h5' >Documentos</Typography>

      <form onSubmit={handleSubmit}>
        <input onChange={onChange} type="file" ref={fileInputRef} />
        <Button type="submit" variant="contained" color="primary">Adicionar</Button>
      </form>

        {documents && documents.length > 0 ? (<>
          {documents.map((document) => (
            <Box>
            <div key={document._id}>
              <p>{document.name}</p>
              <button onClick={() => dispatch(downloadDocument(document))}><FaDownload /> </button>
              <button onClick={() => dispatch(deleteDocument({ document: document._id }))}><FaTrash /> </button>
            </div>
            </Box>
          ))
          }
        </>) : (
            <Typography sx={
              {
                marginBottom: '20px',
      
              }} variant='h5' >Adicione algum documento</Typography>
        )}

     
    </Box>
  )
}

export default Documents