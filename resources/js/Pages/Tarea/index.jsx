import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Container, Box, Button, Stack, Alert, Typography, Dialog, AppBar, Toolbar, IconButton, Slide, List, ListItemButton, Divider, ListItemText, Tooltip, Zoom } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import ModalUI from '@/Components/ModalUI';
import RegisterTask from './RegisterTask';
import CloseIcon from '@mui/icons-material/Close';

import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import ShowTask from './ShowTask';
import Swal from 'sweetalert2';
import EditIdentificador from './EditIdentificador';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function index({auth,identificadores}) {

  const {data,setData,delete: deleteRequest,errors,reset} = useForm()

  const [actividadesIndicadores, setActividadesIndicadores] = useState([]);
  const [titleIdentificador, setTitleIdentificador] = useState('');
  const [valueUpdate, setValueUpdate] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const [openRegister, setOpenRegister] = useState(false);
  const handleOpenRegister = () => setOpenRegister(true);
  const handleCloseRegister = () => setOpenRegister(false);

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = async (IdIdentificador) => {
    try {
      const url = route('identificador.edit',IdIdentificador)
      const response = await axios.get(url);
      const resp_data = await response.data.identificador
      console.log('resp_data',resp_data)

      setValueUpdate(resp_data)

    } catch (error) {
      console.log(error)
    }
    setOpenEdit(true)
  };
  const handleCloseEdit = () => setOpenEdit(false);


  const handleDeleteIdentificador = (idIndicador) =>{
    // post(route('tarea.store'))
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡El identificador de tareas será eliminado permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Usa el método delete del hook useForm
            deleteRequest(route('identificador.destroy', idIndicador), {
                onSuccess: () => {
                    Swal.fire(
                        'Eliminado!',
                        'El ha sido eliminado permanentemente.',
                        'success'
                    );
                    // Opcional: Puedes actualizar la lista de registros aquí
                },
                onError: () => {
                    Swal.fire(
                        'Error!',
                        'No se pudo eliminar el registro.',
                        'error'
                    );
                }
            });
        }
    });
    
  }

  const ActividadesDeIdentificador = async (idIdentificador,titleIdentificador) => {
    try {
      const url = route('tarea.show',idIdentificador)
      const response = await axios.get(url);
      const resp_data = await response.data.actividades
      console.log('resp_data: ',resp_data)
      setActividadesIndicadores(resp_data)
      setTitleIdentificador(titleIdentificador)

    } catch (error) {
      console.log(error)
    }

    handleOpenDialog()
  }

  // 
  const identificadorTaskID = [{identificador_id:0}]
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
              body= {<RegisterTask onClose={handleCloseRegister} 
                DataTask={[{identificador_id:"vacio"}]}
                actividadesIndicadores={actividadesIndicadores}
              />}
              size='large'
          />
          {/* modal de show detalles de las tareas o actividades */}
          <Box component='div'>
            <ShowTask 
              openDialog={openDialog}
              onCloseDialog={handleCloseDialog}
              onOpenDialog={handleOpenDialog}
              onClick={handleCloseDialog}
              actividadesIndicadores={actividadesIndicadores}
              titleIdentificador={titleIdentificador}
              // ModalRegisterTask={handleOpenRegister}
            />
          </Box>
          {/* modal modificar titulo identificador */}
          <ModalUI 
              open={openEdit}
              close={handleCloseEdit}
              title='Modificar identificador'
              body= {<EditIdentificador onClose={handleCloseEdit} DataTask={valueUpdate}/>}
              size='large'
          />

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
                                  <>
                                    <Tooltip title="Ver" arrow TransitionComponent={Zoom}>
                                      <IconButton aria-label="show" color="warning" size="small" onClick={ () => ActividadesDeIdentificador(item.id,item.titulo)}>
                                        <VisibilityOutlinedIcon />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar" arrow TransitionComponent={Zoom}>
                                      <IconButton aria-label="update" color="primary" size="small" onClick={ () => handleOpenEdit(item.id)}>
                                        <EditOutlinedIcon />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Borrar" arrow TransitionComponent={Zoom}>
                                      <IconButton aria-label="delete" color="error" size="small" onClick={ () => handleDeleteIdentificador(item.id)}>
                                        <DeleteOutlinedIcon />
                                      </IconButton>
                                    </Tooltip>
                                  </>
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
