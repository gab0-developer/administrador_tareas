import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, Fab, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
// icons
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import { useSnackbar } from 'notistack';

function RegisterTask({onClose,DataTask,ActividadesTask,setActividades}) {
    
    const { enqueueSnackbar } = useSnackbar();
    const { flash } = usePage().props;  // Accede a los mensajes de flash

    const [idtask, setIdTask] = useState(1);
    const [task, setTask] = useState('');
    const [Inputsdomtask, setInputsdomTask] = useState([]);

    const [disabledSubmitTask, setDisabledSubmitTask] = useState(true); //desabilitar bton register tarea
    const [disabledAddTask, setDisabledAddTask] = useState(true); //desabilitar bton agregar tarea

    const tareas = {
        titulo:'IDENTIFICAR',
        tarea:Inputsdomtask,
        identificadoriD:DataTask[0].identificador_id,
        
    };
    const { data, setData, post, processing, errors, reset } = useForm(tareas);

    // CADA VEZ QUE SE ACTUALICE EL ESTADO Inputsdomtask SE EJECUTA LA FUNCION DEL HOOK useEffect
    useEffect(()=>{
        if(task.length > 0 ){
            setDisabledAddTask(false)
        }else{
            setDisabledAddTask(true)
        }
        if(Inputsdomtask.length > 0 ){
            setDisabledSubmitTask(false)
        }else{
            setDisabledSubmitTask(true)
        }
        
        setInputsdomTask(Inputsdomtask)
        setData('tarea', Inputsdomtask);

    },[Inputsdomtask,task])
    // AGREGAR INPUTS tarea
    const incremento = () =>{setIdTask(idtask + 1)}
    const addTareas = () => {
        incremento()
        setInputsdomTask([...Inputsdomtask,{
            idActividad:idtask,
            actividad:task
        }]);
        setTask('') //limpiar campo tarea
        console.log('DataTask desde register: ',DataTask[0].identificador_id)
    }
    // ELEMINIAR INPUTS CREADOS 
    const Deletetask = (idtask) => {
        setInputsdomTask(Inputsdomtask.filter((item) => item.idActividad !== idtask ));    
    };


    // SUBMIT REGISTRO DE TAREAS
    const handleSubmit = (e) =>{
        e.preventDefault();
        // post(route('identificador.store'))
        post(route('identificador.store'), {
            onSuccess: (page) => {
                // Accede al mensaje desde page.props.flash.success
                const successMessage = page.props.flash?.success;
                if (successMessage) {
                    enqueueSnackbar(successMessage, { variant: 'success' });
                    // cerrar modal
                    onClose()
                }
                // ! PENDIETNE POR TERMIAR QUE SE ACTUALICE EL ESTADO DE ACTIVIDADES CUANDO SE AGREGA NUEVAS TAREAS CORRESPONDIENTE AL IDENTIFICADOR
                // Resetear el formulario
                reset();
            },
            onError: (errors) => {
                // Si ocurre algún error
                enqueueSnackbar('Ocurrió un error', { variant: 'error' });
                console.log(errors)
            }
        });
    }
    return (
        <>
            <Box component='form' onSubmit={handleSubmit} >
                <Grid container spacing={2} sx={{my:'1rem'}}>
                    <Grid size={{xs:12, md:12,sm:12}}>
                            { DataTask[0].identificador_id == "vacio" ? (
                                <>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        name='titulo'
                                        id="titulo"
                                        label="Titulo de la tarea"
                                        value={data.titulo.toUpperCase()}
                                        onChange={(e) => setData('titulo', e.target.value.toUpperCase())}
                                        variant="filled" 
                                    />
                                    <InputError message={errors.titulo} className="mt-2" />
                                </>
                            ):(
                                <input type="text" style={{display:'none'}} />
                            )}
                            
                    </Grid>
                </Grid>
                <Grid container spacing={2} >
                    <Grid size={{xs:12, md:10,sm:10}}>
                            <TextField
                                fullWidth
                                type='text'
                                name='tarea'
                                id="tarea"
                                label="ingresar tarea"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                variant="outlined" 
                            />
                            <InputError message={errors.tarea} className="mt-2" />
                    </Grid>
                    <Grid size={{xs:12, md:2,sm:2}}>
                        <Fab color="success" aria-label="add" onClick={addTareas} disabled={disabledAddTask}>
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>

                <Box component='div'>
                    <Typography variant="h6" color="info">Lista de tareas:</Typography>
                    <Box component='div' sx={{height:'300px',overflow:'auto'}}>
                        {Inputsdomtask.length > 0 ? Inputsdomtask.map((item) =>(
                            
                            <Grid container spacing={2} sx={{my:'1rem'}}>
                                <Grid size={{xs:12, md:10,sm:10}}>
                                    <TextField
                                        fullWidth
                                        type='text'
                                        name='actividad'
                                        id="actividad"
                                        label="Actividad"
                                        value={item.actividad}
                                        variant="filled" 
                                    />
                                    <InputError message={errors.actividad} className="mt-2" />
                                </Grid>
                                <Grid size={{xs:12, md:2,sm:2}}>
                                    <Fab color="error" aria-label="add" onClick={() => Deletetask(item.idActividad)} >
                                        <ClearIcon />
                                    </Fab>
                                </Grid>
                            </Grid>
                            
                        )) : 
                            <Alert severity="warning" sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                                Aún no tienes tareas para registrar.
                            </Alert>
                        }
                    </Box>
                </Box>
                <Box component='div' sx={{my:2,float:'right'}}>
                    <Button type='submit' variant="contained" color="success" sx={{mr:1}} disabled={disabledSubmitTask}>
                        Registrar
                    </Button>
                    <Button variant="contained" color="error" onClick ={onClose}>
                        cerrar
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default RegisterTask
