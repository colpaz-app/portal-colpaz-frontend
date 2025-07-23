import { useState } from 'react';
import Button from '../../components/Button';
import '../../assets/styles/auth/Login.css';
import { images } from "../../assets/images";
import { useTranslation } from 'react-i18next';
import { useHttp } from '../../hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import Input from '../../components/Input';

interface AuthResponse {
    token: string;
    user: {
        id: number;
        username: string;
        role: string;
    };
}

const Login = () => {
    const { t } = useTranslation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState<'success' | 'error' | 'warning' | 'info'>('info');

    const { error, loading, sendRequest } = useHttp<AuthResponse>('/auth/login', {
        method: 'POST',
        body: { username, password },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await sendRequest();

        if (result) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            sessionStorage.removeItem('sessionEnded');
            navigate('/');
        } else {
            setModalType('error');
            setModalMessage(
                error === 'NETWORK_ERROR' ? t('login.networkError') :
                    error?.includes('401') ? t('login.invalidCredentials') :
                        error?.includes('403') ? t('login.unauthorized') :
                            error?.includes('500') ? t('login.serverError') :
                                t('login.errorGeneric')
            );
            setShowModal(true);
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-image-section">
                    <img src={images.fondoLogin} alt="Login Visual" />
                </div>

                <div className="login-form-section">
                    <img
                        src={images.logoPNG}
                        alt={t('header.logoAlt')}
                        className="login-form-logo responsive-only"
                    />

                    <h2 className="login-title mb-4">{t('login.title')}</h2>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <Input
                            name="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={t('login.usernamePlaceholder')}
                            required
                            label={t('login.username')}
                            wrapperClassName="mb-3"
                        />

                        <Input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t('login.passwordPlaceholder')}
                            required
                            label={t('login.password')}
                            wrapperClassName="mb-3"
                        />

                        <div className="section-button">
                            <Button title={t('login.goSubmit')} variant="primary" type="submit" disabled={loading}>
                                {loading ? t('login.loading') : t('login.submit')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                show={showModal}
                type={modalType}
                title={modalType === 'success' ? t('login.successTitle') : t('login.errorTitle')}
                message={modalMessage}
                footer={
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        {t('common.close')}
                    </Button>
                }
                onClose={() => setShowModal(false)}
            />
        </>
    );
};

export default Login;