import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Box, TextField } from '@mui/material';

import './../../../css/auth.css'

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />
            <Box component='div' className='container-login-register' sx={{width:'100%',height:'100vh'}}>
                <Box component='div' sx={{width:'50%',height:'auto', margin:'auto',position:'absolute',top:'20%',left:'25%'}}>
                    <Box component='div' sx={{width:'100%',height:'auto',p:'1rem',borderRadius:'10px',boxShadow:'2px 2px 6px gray',bgcolor:'#fff'}}>
                        <Box component='div' sx={{textAlign:'center',marginTop:'2rem'}}>
                            <h6 className="text-3xl font-bold" style={{color:'#fd7d46',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',top:'-1.5rem'}}><strong>Regístrate</strong> Ahora</h6>
                        </Box>
                        <form onSubmit={submit}>
                            <div>
                                <TextField
                                    fullWidth
                                    label="Ingresar su nombre"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <TextField
                                    fullWidth
                                    label="Ingresar su correo"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <TextField
                                    fullWidth
                                    label="Contraseña"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <TextField
                                    fullWidth
                                    label="Repetir su contraseña"
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route('login')}
                                    className="underline text-sm text-orange-600 hover:text-orange-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Iniciar Sesión
                                </Link>

                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
