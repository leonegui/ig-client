import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset, registerUser } from '../../features/auth/authSlice'
import { getResume, resetResume } from '../../features/resume/resumeSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Typography, Box, Container, CssBaseline, TextField } from '@mui/material';


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    password2: ''
  })

  const resume = useSelector((state) => state.resume.resume)
  const { name, cpf, email, password, password2 } = formData

  const { user, isError, isLoading, isSuccess, message } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    if (isSuccess) {

      toast.success('Entrou com sucesso!')

      dispatch(resetResume())

      if (!resume) {
        dispatch(getResume(user.token))
      }

    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch, resume])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Senhas não conferem.')
    }
    else {
      const userData = {
        name,
        cpf,
        email,
        password
      }

      dispatch(registerUser(userData))
    }

  }

  if (isLoading) {
    return (<h1>Carregando...</h1>)
  }

  return (
    <Container>
      <CssBaseline />

      <Box sx={
        {
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100vh',
          marginTop: '-50px',
        }
      } >

        <Typography variant="h4" component="h1" gutterBottom>CADASTRO</Typography>

        <form onSubmit={onSubmit}>

          <TextField sx={
            {
              width: '100%',
              marginBottom: 2,
            }
          } label='Nome' variant='filled' onChange={onChange} type="text" id="name" name="name" value={name} />


          <TextField sx={
            {
              width: '100%',
              marginBottom: 2,
            }
          } label='CPF' variant='filled' onChange={onChange} type="number" id="cpf" name="cpf" value={cpf}>

          </TextField>

          <TextField sx={
            {
              width: '100%',
              marginBottom: 2,
            }
          } label='Email' variant='filled' onChange={onChange} type="email" id="email" name="email" value={email} />



          <TextField sx={
            {
              width: '100%',
              marginBottom: 2,
            }
          } label='Senha' variant='filled' onChange={onChange} type="password" id="password" name="password" value={password} />



          <TextField sx={
            {
              width: '100%',
              marginBottom: 2,
            }
          } label='Confirme sua senha' variant='filled' onChange={onChange} type="password" id="password2" name="password2" value={password2} />

          <Button sx={
            {
              width: '100%',
              marginBottom: 2,
            }
          } variant="contained" type="submit">Cadastrar</Button>

        </form>
      </Box>
    </Container>

  )
}

export default Register