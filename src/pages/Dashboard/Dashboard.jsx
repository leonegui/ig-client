import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {  reset } from "../../features/auth/authSlice"
import { listUsers } from "../../features/admin/adminSlice"
import { Typography, Box, Container, CssBaseline, Link, Button, TextField, CircularProgress } from '@mui/material';
import RegisterProduct from "../Products/RegisterProduct";
import { trackProduct, clear } from "../../features/products/productsSlice";

function Dashboard() {

  const { user } = useSelector((state) => state.auth)

  const { isLoading, users } = useSelector((state) => state.admin)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [selo, setSelo] = useState('')

  const onTrack = (e) => {
    e.preventDefault()

    dispatch(trackProduct({ selo }))

  
    navigate('/rastreabilidade')
   

  }

  useEffect(() => {

    if (user && user.role === "admin") {
      dispatch(listUsers(user.token))
    }

  }, [])


  if (isLoading) {
    return <Box sx={
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
    }>
      <CircularProgress sx={
        {
          margin: '100px',
        }
      } size={100} />
    </Box>
  }

  return (
    <Container sx={
      {
        height: '100vh',
      }
    }  >
      <CssBaseline />

      {(!user || user.role==='user' ) ? (

        <Box sx={
          {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }
        }>

          <Typography variant="h4" component="h1" gutterBottom>Rastreie produtos oficiais!</Typography>
          <TextField type="number" placeholder="Digite o selo do produto" value={selo} onChange={(e) => setSelo(e.target.value)} />
          <Button onClick={onTrack} variant="contained" color="success">Rastrear</Button>
          
        </Box>

      ) : (

        <Box sx={
          {
            height: '100vh',
          }
        }>
          {user.role === "admin" ? (
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>Usuários Cadastrados</Typography>

              {users && users.map((user) => (


                <Box key={user._id}
                  sx={{
                    marginTop: '10px',
                    padding: '10px 0',
                  }}
                >
                  <h2>{`${user.name} - ${user.role}`}</h2>

                  <Button variant="contained" href={`/usuario/${user._id}`}>Ver Dados</Button>

                </Box>
              ))
              }
            </Box>
          ) : (

            <Box>
              {(user.role === "produtor") && (

                <RegisterProduct />
              )}

            </Box>

          )}
        </Box>
      )
      }
    </Container>

  )
}

export default Dashboard