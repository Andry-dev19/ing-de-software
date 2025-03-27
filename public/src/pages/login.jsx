import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/form';
import Input from '../components/input';
import Button from '../components/button';
import { getUser, newUser } from '../api';

const Login = ({ handle }) => {
    sessionStorage.setItem('isLogin', 'false');
    const navigate = useNavigate();
    const [isCreateAcount, setIsCreateAcount] = useState(false);
    const [usuario, setUsuario] = useState('');
    const [apellido, setApellido] = useState('');
    const [clave, setClave] = useState('');
    const [errorMensaje, setErrorMensaje] = useState('');

    const validarClave = (password) => {
        const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,}$/;
        return regex.test(password);
    };

    const sendForm = async (e) => {
        e.preventDefault();
        if (!validarClave(clave)) {
            setErrorMensaje('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
            return;
        }
        try {
            const user = await getUser(usuario);
            if (user.clave === clave) {
                saveSesion(user);
                handle(true);
                navigate("/dashboard/products");
            }
        } catch (error) {
            console.error(error);
            alert("Usuario o contraseña incorrectos");
        }
    };

    const sendNewUser = async (e) => {
        e.preventDefault();
        if (!validarClave(clave)) {
            setErrorMensaje('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
            return;
        }
        try {
            const user = {
                nombre: usuario,
                apellido,
                clave
            };
            await newUser(user);
            saveSesion(user);
            handle(true);
            navigate("/dashboard/products");
        } catch (error) {
            console.error(error);
        }
    };

    const saveSesion = (user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('isLogin', 'true');
    };

    return (
        <section className="h-screen flex relative">
            <div className="absolute md:relative md:w-1/2 h-full">
                <img className='w-full h-full object-cover' src="https://i.imgur.com/uID4scN.jpeg" alt="img" />
            </div>
            <div className='relative z-10 flex-grow flex justify-center items-center'>
                <Form className="bg-black/30 text-white" event={isCreateAcount ? sendNewUser : sendForm}>
                    <p className="font-prata text-xl font-medium text-center mb-4 md:text-2xl lg:text-3xl">Inicio de sesión</p>
                    <Input title="Nombre" placeholder="Ingrese su nombre" value={usuario} event={setUsuario} />
                    {isCreateAcount &&
                        <Input title="Apellido" placeholder="Ingrese su apellido" value={apellido} event={setApellido} />
                    }
                    <Input title="Contraseña" placeholder="Ingrese su contraseña" type="password" value={clave} event={setClave} />
                    {errorMensaje && <p className="text-red-500 text-sm">{errorMensaje}</p>}
                    <Button title={isCreateAcount ? "Crear Cuenta" : "Iniciar Sesión"} />
                    <p className='mt-4 text-right'>{!isCreateAcount ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "} 
                        <span className='font-semibold cursor-pointer' onClick={() => setIsCreateAcount(!isCreateAcount)}>
                            {isCreateAcount ? "Iniciar Sesión" : "Crear Cuenta"}
                        </span>
                    </p>
                    {isCreateAcount && (
                        <div className='mt-4 p-2 bg-white-800 text-black rounded-md'>
                            <p className='font-semibold'>Requisitos de contraseña:</p>
                            <ul className='list-disc ml-4 text-sm'>
<li>Mínimo 8 caracteres</li>
                                <li>Al menos una letra mayúscula</li>
                                <li>Al menos una letra minúscula</li>
                                <li>Al menos un número</li>
                                <li>Al menos un carácter especial (@#$%^&+=!)</li>
                            </ul>
                        </div>
                    )}
                </Form>
            </div>
        </section>
    );
};

export default Login;