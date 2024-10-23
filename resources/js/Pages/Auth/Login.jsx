import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Box, TextField } from '@mui/material';

import img from '../../../img/image'

const circle1 ={
    width: '100px',
    height: '100px',
    position: 'absolute',
    background:'rgba(255, 153, 51, 1)',
    borderRadius: '50%',
    top: '20%;',/* Ajusta la posición vertical */
    left: '10%', /* Ajusta la posición horizontal */
  }
  
const circle2 = {
    width: '200px',
    height: '200px',
    position: 'absolute',
    background:'rgba(255, 153, 51, 1)',
    borderRadius: '50%',
    bottom: '0%', /* Ajusta la posición vertical */
    left: '80%', /* Ajusta la posición horizontal */
  }
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };



    return (

        <>
            <Box component='div' sx={{width:'100wh',height:'100vh',background: 'linear-gradient(to bottom left, rgba(255, 204, 153, 1), rgba(255, 153, 51, 1))'}}>
                <Head title="Log in" />

                <div className="circle circle1" style={circle1}></div>
                <div className="circle circle2" style={circle2}></div>

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <Box component='div' sx={{width:'70%',margin:'auto',display:'flex',alignItems:'center',justifyContent:'space-around',background:'#fff',position:'absolute',top:'10%',left:'15%',borderRadius:'10px',overflow:'hidden',boxShadow:'2px 2px 6px gray',position:'absolute'}}>
                    
                    <Box component='div' sx={{width:'70%',height:'80vh',bgcolor:'#000'}}>
                        <Box component='div' sx={{width:'100%',height:'100%'}}>
                            <img src={img.fondoLogin} alt="" style={{height:'100%'}} />
                        </Box>
                    </Box>
                    <Box component='div' sx={{width:'50%',p:5}}>
                        <Box component='div' sx={{textAlign:'center',marginTop:'2rem'}}>
                            <h6 className="text-3xl font-bold" style={{color:'#fd7d46',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',top:'-6rem'}}>Iniciar Sesión</h6>
                        </Box>
                        <form onSubmit={submit}>
                            <div>
                                <TextField
                                    fullWidth
                                    id="email"
                                    type="email"
                                    name="email"
                                    label="Titulo de la tarea"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <TextField
                                    id="password"
                                    type="password"
                                    name="password"
                                    label="Contraseña"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="block mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Box component='div' >

                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Iniciar Sesion
                                    </PrimaryButton>
                                </Box>
                            </div>
                            <Box component='div' sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',mt:2}}>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Olvidó su contraseña?
                                    </Link>
                                )}

                                <Link
                                    href={route('register')}
                                    className="underline text-sm text-orange-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-decoration:none"
                                >
                                    Registrarse
                                </Link>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
            
        </>
    );
}
