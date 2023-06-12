import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { reset, updateUser, addProfilePhoto } from '../../features/auth/authSlice'
import './Styles.css'
import Resume from "./Resume"
import Documents from "./Documents"
import { getResume } from "../../features/resume/resumeSlice"
import { getDocuments } from "../../features/documents/documentsSlice"
import { Button, Stack, Avatar, Typography, Divider, Box, Container, CssBaseline, TextField } from '@mui/material'
import { useMediaQuery } from "@mui/material"

function Informations() {

    const matches = useMediaQuery('(max-width:800px)')

    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)
    const fileInputRef = useRef(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [inputData, setInputData] = useState({
        id: user._id,
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        pathFoto: user.pathFoto,
        token: user.token,
        address: user.address

    })

    const { name, email, cpf } = inputData

    const { address } = inputData

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            toast.success('Dados atualizados com sucesso!')
        }

        dispatch(getDocuments(user.token))
        dispatch(getResume(user.token))
        dispatch(reset())

        fileInputRef.current.value = null

    }, [user, isError, isLoading, isSuccess, message, navigate, dispatch])


    const onChange = (e) => {
        const { name, value } = e.target
        setInputData({ ...inputData, [name]: value })
    }

    const handleChange = (e) => {
        e.preventDefault()

        dispatch(updateUser(inputData))
    }

    const handleFile = (e) => {
        e.preventDefault()

        dispatch(addProfilePhoto({ ...inputData, pathFoto: fileInputRef.current.files[0] }))

    }

    const onChangeAddress = (e) => {
        const { name, value } = e.target
        setInputData({ ...inputData, address: { ...inputData.address, [name]: value } })
    }

    const handleAddress = (e) => {
        e.preventDefault()

        dispatch(updateUser(inputData))
    }

    return (
        <Container>
            <CssBaseline />
            <Box>
                <Typography sx={
                    { marginBottom: '20px' }
                } variant="h5" color="text.primary">Dados Pessoais</Typography>

                <form onSubmit={handleChange}>

                    <Stack spacing={2} direction={matches ? "column" : 'row'} alignItems="center">

                        <TextField sx={
                            { width: '100%' }
                        } label='Nome' size="small" variant='filled' onChange={onChange} type="text" id="name" name="name" value={name} />

                        <TextField sx={
                            { width: '100%' }
                        } label='Email' size="small" variant='filled' onChange={onChange} type="email" id="email" name="email" value={email} />


                        <TextField sx={
                            { width: '100%' }
                        } label='CPF' size="small" variant='filled' onChange={onChange} type="number" id="cpf" name="cpf" value={cpf} />
                    </Stack>

                    <Button sx={
                        { margin: '20px 0' }
                    } type="submit" fullWidth variant="contained" color="primary">Atualizar</Button>

                </form>


                <Divider sx={{ margin: '20px 0' }} />

                <Typography sx={
                    { margin: '20px 0' }
                } variant="h5" color="text.primary">Foto de Perfil</Typography>

                {user.pathFoto ?
                    (<Box sx={
                        { display: 'flex', gap:'10px', flexDirection: 'column', justifyContent: 'center' }
                    }>
                        <Avatar src={user.pathFoto ? process.env.REACT_APP_API_URI + user.pathFoto: 'https://placehold.co/600x400'} alt="Foto de Perfil"
                            sx={{ width: 150, height: 150 }}
                            variant="rounded"
                        />

                        <input type="file" ref={fileInputRef} />
                        <Button onClick={handleFile} variant="contained" color="primary">Atualizar</Button>

                    </Box>) :
                    (<>
                        <Typography variant="body1" color="text.primary">Adicione uma foto de perfil</Typography>

                        <input type="file" ref={fileInputRef} />
                        <Button onClick={handleFile} variant="contained" color="primary">Atualizar</Button>
                    </>)
                }


                <Divider sx={{ margin: '20px 0' }} />


                <Typography sx={
                    { margin: '20px 0' }
                } variant="h5" color="text.primary">Endereço </Typography>


                <form onSubmit={handleAddress} >

                    <Stack spacing={2} direction={matches ? "column" : 'row'} alignItems="center">
                        <TextField label='CEP' size="small" variant='filled' fullWidth value={address ? address.cep : ''} type="number" name="cep" id="cep" placeholder="CEP" onChange={onChangeAddress} />

                        <TextField label='Logradouro' size="small" variant='filled' fullWidth value={address ? address.logradouro : ''} type="text" name="logradouro" id="logradouro" placeholder="Logradouro" onChange={onChangeAddress} />

                        <TextField label='Número' size="small" variant='filled' fullWidth value={address ? address.numero : ''} type="number" name="numero" id="numero" placeholder="Número" onChange={onChangeAddress} />

                        <TextField label='Complemento' size="small" variant='filled' fullWidth value={address ? address.complemento : ''} type="text" name="complemento" id="complemento" placeholder="Complemento" onChange={onChangeAddress} />
                    </Stack>

                    <Stack spacing={2} direction={matches ? "column" : 'row'} alignItems="center">
                        <TextField sx={
                            { margin: '10px 0' }
                        } label='Bairro' size="small" variant='filled' fullWidth value={address ? address.bairro : ''} type="text" name="bairro" id="bairro" placeholder="Bairro" onChange={onChangeAddress} />

                        <TextField sx={
                            { margin: '10px 0' }
                        } fullWidth label='Cidade' size="small" variant='filled' value={address ? address.cidade : ''} type="text" name="cidade" id="cidade" placeholder="Cidade" onChange={onChangeAddress} />

                        <TextField sx={
                            { margin: '10px 0' }
                        } fullWidth label='Estado' size="small" variant='filled' value={address ? address.estado : ''} type="text" name="estado" id="estado" placeholder="Estado" onChange={onChangeAddress} />

                        <Button sx={
                            { margin: '10px 0' }
                        } fullWidth type="submit" variant="contained" color="primary">Atualizar</Button>
                    </Stack>

                </form>



                <Divider sx={{ margin: '20px 0' }} />

                <Resume />

                <Divider sx={{ margin: '20px 0' }} />

                <Documents />

            </Box>
        </Container>

    )
}

export default Informations