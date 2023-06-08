import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { loginUser, reset } from '../../features/auth/authSlice'
import { getResume } from '../../features/resume/resumeSlice'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Button, Typography, Box, Container, CssBaseline, TextField } from '@mui/material';

function Login() {
  const [formData, setFormData] = useState({
    cpf: '',
    password: ''
  })

  const { cpf, password } = formData

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

      dispatch(getResume(user.token))
    }

    dispatch(reset())

  }, [user, isError, isLoading, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      cpf,
      password
    }

    dispatch(loginUser(userData))
  }

  if (isLoading) {
    return (<h1>Carregando...</h1>)
  }

  return (
    <Container>
      <CssBaseline />
      <Box
        sx={
          {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            marginTop: '-50px',
          }
        }
      >

        <Typography variant="h4" component="h1" gutterBottom>ENTRAR</Typography>

        <form onSubmit={onSubmit}>

          <TextField sx={
            {
              width: '100%',
              marginBottom: 2,
            }
          } label='CPF' variant='filled' onChange={onChange} type="number" id="cpf" name="cpf" value={cpf} />

          <TextField sx={
            {
              width: '100%',
              marginBottom: 2,
            }
          } label='Senha' variant='filled' onChange={onChange} type="password" id="password" name="password" value={password} />

          <Button sx={
            {
              width: '100%',
              marginBottom: 2,
            }
          } variant="contained" type="submit">Entrar</Button>

        </form>
      </Box>

    </Container>
  )
}

export default Login