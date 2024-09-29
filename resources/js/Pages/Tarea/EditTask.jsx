import React, { useEffect } from 'react'
import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

import { SnackbarProvider, useSnackbar } from 'notistack';

function EditTask({onClose,DataTask,Actividades,setActividades}) {
    const { enqueueSnackbar } = useSnackbar();
    const { flash } = usePage().props;  // Accede a los mensajes de flash

    const inertiaTask={
        tarea: DataTask.tarea,
        estatusTask:'1'
    }
    const {data,setData,put,errors,reset} = useForm(inertiaTask)

    const SubmitUpdateTask = (e) => {
        e.preventDefault();

        put(route('tarea.update',DataTask.id), {
            // respuesta del redireccionamiento
            onSuccess: (page) => {
                // Accede al mensaje desde page.props.flash.success
                const successMessage = page.props.flash?.success;
                if (successMessage) {
                    enqueueSnackbar(successMessage, { variant: 'success' });
                    // cerrar modal
                    onClose()
                    // onCloseDialog()
                    // Actualiza el estado de Actividades
                    setActividades(Actividades => // prevActividades es el listado de todos los valroes actuales antes de ser actualizados
                        Actividades.map(item => // crear un nuevo array basado en prevActividades
                            item.id === DataTask.id ? { ...item, tarea: data.tarea } : item
                        )
                    );
                }
                // Resetear el formulario
                reset();
            },
            onError: (errors) => {
                // Si ocurre algún error
                enqueueSnackbar('Ocurrió un error', { variant: 'error' });
            }
        });
        
    };

   

  return (
    <>


         <Box component='form' onSubmit={SubmitUpdateTask} encType="multipart/form-data">
            <Grid container spacing={2}>
                <Grid size={{xs:12, md:12,sm:12}}>
                        <TextField
                            fullWidth
                            type='text'
                            name='tarea'
                            id="tarea"
                            label="Cambiar tarea"
                            value={data.tarea}
                            onChange={(e) => setData('tarea', e.target.value)}
                            variant="outlined" 
                        />
                        <InputError message={errors.tarea} className="mt-2" />
                </Grid>
            </Grid>
            <Box component='div' sx={{my:2,float:'right'}}>
                <Button type='submit' variant="contained" color="success" sx={{mr:1}} >
                    Modificar
                </Button>
                <Button variant="contained" color="error" onClick ={onClose}>
                    cerrar
                </Button>
            </Box>

        </Box>
    </>
  )
}

export default EditTask
