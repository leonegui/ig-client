import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";

import { storage } from "../../firebase/firebase.js"
import { Box, Button } from "@mui/material";


function Teste() {

  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "photoPerfil/");

  const uploadFile = () => {

    if (imageUpload == null) return;

    const imageRef = ref(storage, `photoPerfil/${imageUpload.name + Date.now()}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
 }

  const deleteFile = (url) => {

   const imageToDelete = ref(storage, url)

    deleteObject(imageToDelete) 
      .then(() => {
        alert("Arquivo deletado com sucesso!");
        setImageUrls((prev) => prev.filter((item) => item !== url));
      })
      .catch((error) => {
        alert("Erro ao deletar o arquivo!");
      });
  };


  const downloadFile = (url) => {
    const imageToDownload = ref(storage, url);
  
    getDownloadURL(imageToDownload)
      .then((url) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = url.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Erro ao baixar documento", error);
      });
  };


  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <Box sx={
      {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }
    }>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
     <Button   variant="contained" onClick={uploadFile}>Upload</Button>
      {imageUrls.map((url, indice) => (
        
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "10px",
          margin: "10px",
          gap: "10px"

        }} key={indice}>
          <img width={300} src={url} alt="Foto" />
          <br />
          <Button fullWidth color="error" variant="contained" onClick={() => deleteFile(url)}>Deletar</Button>
          <Button fullWidth color="success" variant="contained"  onClick={() => downloadFile(url)}>Baixar</Button>
        </Box>

      ))}
    </Box>
  );
}

export default Teste