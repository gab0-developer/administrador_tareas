import React, { useEffect } from 'react'
import { Box, Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

import { SnackbarProvider, useSnackbar } from 'notistack';

function EditIdentificador({onClose,DataTask}) {

    const { enqueueSnackbar } = useSnackbar();
    const { flash } = usePage().props;  // Accede a los mensajes de flash

    const inertiaTask={
        titulo: DataTask.titulo,
    }
    const {data,setData,put,errors,reset} = useForm(inertiaTask)

    const SubmitUpdateTask = (e) => {
        e.preventDefault();

        put(route('identificador.update',DataTask.id), {
            // respuesta del redireccionamiento
            onSuccess: (page) => {
                // Accede al mensaje desde page.props.flash.success
                const successMessage = page.props.flash?.success;
                if (successMessage) {
                    enqueueSnackbar(successMessage, { variant: 'success' });
                    // cerrar modal
                    onClose()
                    // onCloseDialog()
                    // openDialog()

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
                            name='titulo'
                            id="titulo"
                            label="Cambiar Titulo"
                            value={data.titulo.toUpperCase()}
                            onChange={(e) => setData('titulo', e.target.value.toUpperCase())}
                            variant="outlined" 
                        />
                        <InputError message={errors.titulo} className="mt-2" />
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

export default EditIdentificador
