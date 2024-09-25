import React, { useEffect, useState } from 'react'
import { Head, useForm } from '@inertiajs/react';
import { Container, Box, Button, Stack, Alert, Typography, Dialog, AppBar, Toolbar, IconButton, Slide, List, ListItemButton, Divider, ListItemText, ListItem, ListItemIcon, Checkbox } from '@mui/material';
import ModalUI from '@/Components/ModalUI';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useSnackbar } from 'notistack';
import axios from 'axios';
import ChartTask from './ChartTask';
import EditTask from './EditTask';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ShowTask({openDialog,onCloseDialog,onClick,actividadesIndicadores}) {
    const { enqueueSnackbar } = useSnackbar();
    const [Actividades, setActividades] = useState(actividadesIndicadores);
    const [valueUpdate, setValueUpdate] = useState('');
    const [estatusTarea, setEstatusTarea] = useState('');

    const {data,setData,delete: deleteRequest,put ,errors,reset} = useForm({
        estatusTask:estatusTarea
    })
    
    const [tareasPendiente, setTareasPendiente] = useState('');
    const [tareasCompletada, setTareasCompletada] = useState('');
    const [checked, setChecked] = useState([]);

    const [openProgress, setOpenProgress] = useState(false);
    const handleOpenProgress = () => setOpenProgress(true);
    const handleCloseProgress = () => setOpenProgress(false);

    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = async (idTask) => {
        try {
            const url = route('tarea.edit',idTask)
            const response = await axios.get(url);
            const resp_data = await response.data.actividades
            console.log('resp_data',resp_data)

            setValueUpdate(resp_data)
      
        } catch (error) {
            console.log(error)
        }
        setOpenEdit(true)
    };
    const handleCloseEdit = () => setOpenEdit(false);


    let pendientesCount = 0;
    let completadasCount = 0;
    // cantidad de registros
    const tareaEstatus = () =>{
        Actividades.forEach((item) => {
            if (item.estatu_id == '1') {
                pendientesCount++;
            } else {
                completadasCount++;
            }
        });
        setTareasPendiente(pendientesCount)
        setTareasCompletada(completadasCount)
        
    }
    
    const handleDelete = (idTask) =>{
        // post(route('tarea.store'))
        console.log('idTask delete',idTask)
        deleteRequest(route('tarea.destroy',idTask), {
            onSuccess: (page) => {
                // Accede al mensaje desde page.props.flash.success
                const successMessage = page.props.flash?.success;
                if (successMessage) {
                    enqueueSnackbar(successMessage, { variant: 'success' });
                }
                // setActividades(actividadesIndicadores)
                // Actualiza el estado después de la eliminación
                setActividades(prevActivacion => prevActivacion.filter(Actividades => Actividades.id !== idTask));
            },
            onError: (errors) => {
                // Si ocurre algún error
                enqueueSnackbar('Ocurrió un error', { variant: 'error' });
            }
        });
        
    }
    const handleTaskCompletada = (idTarea) =>{
        // post(route('tarea.store'))
        console.log('cambio estatu tarea',idTarea)
        put(route('tarea.update',idTarea), {
            onSuccess: (page) => {
                // Accede al mensaje desde page.props.flash.success
                const successMessage = page.props.flash?.success;
                if (successMessage) {
                    enqueueSnackbar(successMessage, { variant: 'success' });
                }
                // setActividades(actividadesIndicadores)
                // Actualiza el estado después de la eliminación
                setActividades(actividadesIndicadores);
                // setActividades(prevActivacion => prevActivacion.filter(Actividades => Actividades.id !== idTarea));
            },
            onError: (errors) => {
                // Si ocurre algún error
                enqueueSnackbar('Ocurrió un error', { variant: 'error' });
            }
        });
        
    }

    const handleToggleSuccess = (idTask,estatu_id) => () => {
        const currentIndex = checked.indexOf(idTask);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(idTask); 
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        handleTaskCompletada(idTask)
        console.log('currentIndex', currentIndex)
        console.log('newChecked', newChecked)
        console.log('estatus: ', estatu_id)
        console.log('idTask: ', idTask)
    };

    useEffect(() => {
        setActividades(actividadesIndicadores);
        setEstatusTarea(2)
        setData('estatusTask', estatusTarea);
    }, [actividadesIndicadores]);

  return (
    <>

        {/* modal de progreso (chartjs) */}
        <ModalUI 
              open={openProgress}
              close={handleCloseProgress}
              title='Registrar tareas'
              body= {<ChartTask onClick={tareaEstatus} />}
              size='xlarge'
          />

          {/* modal update */}
        <ModalUI 
            open={openEdit}
            close={handleCloseEdit}
            title='Editar tarea'
            body= {<EditTask 
                onClose={handleCloseEdit} 
                DataTask={valueUpdate}
                Actividades={Actividades}
                openDialog={openDialog}
                onCloseDialog={onCloseDialog}
            />}
            size='large'
        />
        <Box component='div'>
            <Dialog
                fullScreen
                open={openDialog}
                onClose={onCloseDialog}
                TransitionComponent={Transition}
            >
                <AppBar color='warning' sx={{ position: 'relative' }}>
                <Toolbar >
                    
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Mis actividades
                    </Typography>
                    <Button sx={{ mr: 2, flex: 1 }} variant='contained' color="primary" onClick={handleOpenProgress}>
                        <Typography variant="h6" component="div">
                            Agregar tarea
                        </Typography>
                    </Button>
                    <Button sx={{ mr: 2, flex: 1 }} variant='contained' color="success" onClick={handleOpenProgress}>
                        <Typography variant="h6" component="div">
                            Progreso
                        </Typography>
                    </Button>
                    <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClick}
                    aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                </Toolbar>
                </AppBar>

                <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                    {Actividades.length > 0 ? (
                        <>
                            {/* Actividades con estatu_id == 1 */}
                            {Actividades.filter(item => item.estatu_id == '1').map((item) => {
                                const labelId = `checkbox-list-label-${item.id}`;
                                return (
                                    <Box component='div' key={item.id}>
                                        <ListItem
                                            secondaryAction={
                                                <>
                                                    <IconButton edge="end" aria-label="comments" onClick={() => handleOpenEdit(item.id)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="comments" onClick={() => handleDelete(item.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            }
                                            // disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggleSuccess(item.id, item.estatu_id)} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={checked.includes(item.id)}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={item.tarea} />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                );
                            })}
                            
                            {/* Actividades con estatu_id == 2 */}
                            {Actividades.filter(item => item.estatu_id == '2').map((item) => {
                                const labelId = `checkbox-list-label-${item.id}`;
                                return (
                                    <Box component='div' key={item.id}>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="comments" onClick={() => handleDelete(item.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} dense>
                                                <ListItemIcon>
                                                    <Checkbox
                                                        edge="start"
                                                        checked={true}
                                                        tabIndex={-1}
                                                        disableRipple
                                                        inputProps={{ 'aria-labelledby': labelId }}
                                                    />
                                                </ListItemIcon>
                                                <ListItemText id={labelId} primary={item.tarea} />
                                            </ListItemButton>
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                );
                            })}
                        </>
                    ) : (
                        <p>No hay nada</p>
                    )}
                </List>

                
                

            </Dialog>
        </Box>
    </>
  )
}

export default ShowTask
