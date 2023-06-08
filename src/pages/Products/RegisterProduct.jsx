import { Box, Button, Container, Typography, CircularProgress, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, deleteProduct, addProduct } from '../../features/products/productsSlice'


function RegisterProduct() {

  const dispatch = useDispatch()

  const { isLoading, isError, message } = useSelector(state => state.products)

  const products = useSelector(state => state.products)

  const productsData = products ? products.productsData : ''

  const [inputData, setFormData] = useState({
    name: '',
    selo: ''
  })

  const { name, selo } = inputData

  useEffect(() => {
    dispatch(getProducts())

  }, [])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const productData = {
      name,
      selo
    }

    dispatch(addProduct(productData))
  }


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
    }>
      <Box>
        {productsData.length === 0 ?

          (<Typography variant="h4" component="h1" gutterBottom>Nenhum produto cadastrado</Typography>)

          : (
            <>
              <Typography variant="h4" >Seus Produtos</Typography>

              {productsData.map((product) => (
                <div key={product._id}>
                  <Typography sx={
                    {
                      margin: '10px 0'
                    }
                  } variant="h5" component="h1">
                    {product.name}
                    <Button sx={
                      {
                        margin: "0 10px"
                      }
                    } variant='outlined' color='success' href={`/produto/${product._id}`}>Editar</Button>
                    <Button variant='outlined' color='error' onClick={() => dispatch(deleteProduct(product._id))} >Excluir</Button>
                  </Typography>
                </div>
              ))}
            </>
          )}

        <Typography variant="h4" component="h1" gutterBottom>Cadastrar Produto</Typography>

        <form onSubmit={onSubmit}>
          <Box sx={
            {
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }
          }>
            <Typography variant='h5'>Nome</Typography>
            <TextField size='small' name='name' onChange={onChange} value={name} />

            <Typography variant='h5'>Selo</Typography>
            <TextField type='number' size='small' name='selo' onChange={onChange} value={selo} />

            <Button variant='contained' type='submit'>Cadastrar</Button>
          </Box>
        </form>

        {isError && <h1>{message}</h1>}

      </Box>

    </Container>
  )
}

export default RegisterProduct