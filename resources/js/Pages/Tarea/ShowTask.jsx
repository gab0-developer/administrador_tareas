import React, { useEffect, useState } from 'react'
import { Head, useForm } from '@inertiajs/react';
import { Container, Box, Button, Stack, Alert, Typography, Dialog, AppBar, Toolbar, IconButton, Slide, List, ListItemButton, Divider, ListItemText, ListItem, ListItemIcon, Checkbox, Collapse } from '@mui/material';
import ModalUI from '@/Components/ModalUI';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useSnackbar } from 'notistack';
import axios from 'axios';
import ChartTask from './ChartTask';
import EditTask from './EditTask';
import RegisterTask from './RegisterTask';
import BodyCharBard from '@/Components/BodyCharBard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ShowTask({openDialog,onCloseDialog,onOpenDialog,onClick,actividadesIndicadores,titleIdentificador}) {
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

    // collapse
    const [openShowTask, setOpenShowTask] = useState(true);
    // const handleCloseOpenShowTask = () => setOpenShowTask(false);

    const [openProgress, setOpenProgress] = useState(false);
    // const handleCloseProgress = () => setOpenProgress(false);

    const [openEdit, setOpenEdit] = useState(false);

    const [openRegister, setOpenRegister] = useState(false);
    const handleOpenRegister = () => setOpenRegister(true); 
    const handleCloseRegister = () => setOpenRegister(false);


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
        // onCloseDialog()
        // onOpenDialog()
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
                const errorMessage = page.props.flash?.error;
                if (successMessage) {
                    enqueueSnackbar(successMessage, { variant: 'success' });
                }
                else if(errorMessage){
                    enqueueSnackbar(errorMessage, { variant: 'error' });
                }
                // setActividades(actividadesIndicadores)
                // Actualiza el estado después de la eliminación
                setActividades(Actividades => Actividades.filter(Actividades => Actividades.id !== idTask));
            },
            onError: (errors) => {
                // Si ocurre algún error
                enqueueSnackbar('Ocurrió un error', { variant: 'error' });
            }
        });
        
    }
    const handleTaskCompletada = (idTarea,identificador_id) =>{
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
                // setActividades(prevActividades => // prevActividades es el listado de todos los valores actuales antes de ser actualizados
                //     prevActividades.map(item => // crear un nuevo array basado en prevActividades
                //         item.id === idTarea ? { ...item, estatusTask:2 } : item
                //     ) 
                // );
                // !PRENDIENTE POR TERMINAR 
                console.log('consola:',actividadesIndicadores => actividadesIndicadores.map((item) => 
                        item.identificador_id === identificador_id ? { ...item} : item))
                // setActividades(actividadesIndicadores => actividadesIndicadores.map((item) => item.identificador_id === identificador_id));
            },
            onError: (errors) => {
                // Si ocurre algún error
                enqueueSnackbar('Ocurrió un error', { variant: 'error' });
            }
        });
        
    }

    const handleToggleSuccess = (idTask,estatu_id,identificador_id) => () => {
        const currentIndex = checked.indexOf(idTask);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(idTask); 
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        handleTaskCompletada(idTask,identificador_id)
        console.log('currentIndex', currentIndex)
        console.log('newChecked', newChecked)
        console.log('estatus: ', estatu_id)
        console.log('idTask: ', idTask)
    };

    // actualizar estado para guardar actividades del identificador
    useEffect(() => {
        setActividades(actividadesIndicadores);
        setEstatusTarea(2)
        setData('estatusTask', estatusTarea);
    }, [actividadesIndicadores]);

    const handleOpenShowTask = () => {
        setOpenProgress(false);
        setOpenShowTask(true);
    }
    const handleOpenProgress = () => {
        setOpenShowTask(false);
        setOpenProgress(true);
    }


  return (
    <>

          {/* modal update */}
        <ModalUI 
            open={openEdit}
            close={handleCloseEdit}
            title='Editar tarea'
            body= {<EditTask 
                onClose={handleCloseEdit} 
                DataTask={valueUpdate}
                Actividades={Actividades}
                setActividades={setActividades}
                onOpenDialog={onOpenDialog}
                onCloseDialog={onCloseDialog}
            />}
            size='large'
        />
        {/* modal de registro */}
        <ModalUI 
            open={openRegister}
            close={handleCloseRegister}
            title='Registrar tareas'
            body= {<RegisterTask 
                onClose={handleCloseRegister} 
                DataTask={actividadesIndicadores}
                ActividadesTask={Actividades}
                setActividades={setActividades}
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
                    
                    <Typography sx={{ ml: 2, flex: 1,cursor:'pointer' }} variant="h6" component="div" onClick={handleOpenShowTask}>
                        {titleIdentificador}
                    </Typography>
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
                
                <Box component='div' sx={{my:2}}>
                    <Button variant="contained" color="warning" onClick={handleOpenRegister}>
                        Agregar tarea
                    </Button>
                </Box>

                {/* collapse tareas de indentificadores */}
                <Collapse in={openShowTask}>
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
                                                <ListItemButton role={undefined} onClick={handleToggleSuccess(item.id, item.estatu_id,item.identificador_id)} dense>
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
                            <Alert severity="warning" sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                Aún no tienes tareas para realizar.
                            </Alert>
                        )}
                    </List>
                </Collapse>
                <Collapse in={openProgress}>
                    <Box component='div'>
                        
                        <ChartTask 
                            datas={Actividades}
                        />
                        {/* <BodyCharBard
                            titiledashboard='TOTAL TAREAS PENDIENTES'
                            subtitledata='Cantidad:'
                            labeldata='TAREAS PENDIENTES'
                            datas={['developer1', 'developer2', 'developer3','developer3','developer3','developer3','developer3','developer3','developer3','developer3','developer3','developer3','developer3','developer3','developer3','developer3','developer3']} 
                        /> */}
                    </Box>
                </Collapse>
                
                

            </Dialog>
        </Box>
    </>
  )
}

export default ShowTask
