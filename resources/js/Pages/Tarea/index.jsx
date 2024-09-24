import React, { useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Container, Box, Button, Stack, Alert, Typography, Dialog, AppBar, Toolbar, IconButton, Slide, List, ListItemButton, Divider, ListItemText } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import ModalUI from '@/Components/ModalUI';
import RegisterTask from './RegisterTask';
import CloseIcon from '@mui/icons-material/Close';

import { SnackbarProvider } from 'notistack';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function index({auth,identificadores}) {

  // const { data, setData, post, processing, errors, reset } = useForm(tareas);
  const [actividadesIndicadores, setActividadesIndicadores] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);


  const IndicadoresActividades = async (value) => {
    try {
      const url = route('identificador.edit',value)
      const response = await axios.get(url);
      const resp_data = response.data.actividades

      setActividadesIndicadores(resp_data)

    } catch (error) {
      console.log(error)
    }

    handleOpenDialog()
  }


  const Progress =() =>{
    console.log('progreso modal')
  }
  
  return (
    <>
      <SnackbarProvider maxSnack={1}>
        <AuthenticatedLayout
          user={auth.user}
          header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registrar tareas</h2>}
        >
          <Head title="Tareas" />

          {/* modal de registro */}
          <ModalUI 
              open={openRegister}
              close={handleCloseRegister}
              title='Registrar tareas'
              body= {<RegisterTask onClose={handleCloseRegister}/>}
              size='large'
          />
          {/* modal de modificacion */}
          <Dialog
            fullScreen
            open={openDialog}
            onClose={handleCloseDialog}
            TransitionComponent={Transition}
          >
            <AppBar color='warning' sx={{ position: 'relative' }}>
              <Toolbar >
                
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Mis actividades
                </Typography>
                <Button sx={{ mr: 2, flex: 1 }} variant='contained' color="success" onClick={Progress}>
                  <Typography variant="h6" component="div">
                    Progreso
                  </Typography>
                </Button>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseDialog}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            {actividadesIndicadores.length> 0 ? actividadesIndicadores.map((item) =>(
              <Box component='div' sx={{height:'100px',overflow:'auto', bgcolor:'red'}}>
                <List>
                  <ListItemButton>
                    <ListItemText primary={item.tarea} />
                  </ListItemButton>
                  <Divider />
                </List>
              </Box>
            )):
              <p>no hay nada</p>
            }

          </Dialog>

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 xl:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                      <Container maxWidth="xl">
                        <Box component='div'>
                          <Button variant="contained" color="warning" onClick={handleOpenRegister}>
                            Nueva tarea
                          </Button>
                        </Box>
                        <Box component='div' sx={{my:'2rem',height:'380px',overflow:'auto'}}>
                          <Stack sx={{ width: '100%' }} spacing={2}>
                            {identificadores.length > 0 ? identificadores.map((item) => (
                              <Alert
                                severity="success" color='warning'
                                action={
                                  <Button variant='outlined' color="warning" size="small" onClick={ () => IndicadoresActividades(item.id)}>
                                    visualizar
                                  </Button>
                                }
                              >
                              <Typography variant="p" color="initial"><strong>Titulo de tarea:</strong> {item.titulo}</Typography>
                              </Alert>
                            )) :
                              <Alert severity="warning" sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                Aún no tienes tareas para realizar.
                              </Alert>
                            }
                          </Stack>
                        </Box>
                      </Container>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
      </SnackbarProvider>
      
    </>
  )
}

export default index
