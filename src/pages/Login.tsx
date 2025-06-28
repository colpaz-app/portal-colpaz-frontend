import Button from "../components/Button/Button"
import '../assets/styles/Login.css';
import { images } from "../assets/images";

const Login = () => {
    return (
        <div className="login-container">
            <div className="login-image-section">
                <img src={images.fondoLogin} alt="Login Visual" />
            </div>

            <div className="login-form-section">
                <img
                    src={images.logoPNG}
                    alt="Logo Colpaz"
                    className="login-form-logo responsive-only"
                />

                <h2 className="login-title mb-4">Iniciar Sesión</h2>
                <form className="login-form">
                    <label htmlFor="email">Correo electrónico</label>
                    <input type="email" id="email" placeholder="Ingresar correo eléctronico" required />

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Ingresar contraseña" required />

                    <div className="section-button">
                        <Button variant="primary" type="submit">
                            Ingresar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login