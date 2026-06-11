import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JornalService from '../services/JornalService';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

const ACCION_LABELS = {
    ENTRADA: 'Marcar entrada',
    INICIO_DESCANSO: 'Iniciar descanso',
    FIN_DESCANSO: 'Finalizar descanso',
    SALIDA_JORNADA: 'Finalizar jornada',
};

const SUCCESS_TITLES = {
    ENTRADA: 'Ingreso registrado',
    INICIO_DESCANSO: 'Descanso iniciado',
    FIN_DESCANSO: 'Descanso finalizado',
    SALIDA_JORNADA: 'Salida registrada',
};

export const QrJornalComponent = () => {
    const { setRefreshJornales } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const obraID = id;

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [estadoMarcaje, setEstadoMarcaje] = useState(null);
    const [accionesPermitidas, setAccionesPermitidas] = useState([]);
    const [obraNombre, setObraNombre] = useState('');
    const [errorCarga, setErrorCarga] = useState('');

    const cargarEstado = useCallback(() => {
        if (!obraID) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setErrorCarga('');
        JornalService.getEstadoMarcaje(obraID)
            .then((res) => {
                setEstadoMarcaje(res.data.estadoMarcaje);
                setAccionesPermitidas(res.data.accionesPermitidas || []);
                if (res.data.obraNombre) {
                    setObraNombre(res.data.obraNombre);
                } else if (res.data.jornal?.obra?.nombre) {
                    setObraNombre(res.data.jornal.obra.nombre);
                }
            })
            .catch((error) => {
                const msg = error.response?.data || 'No se pudo cargar el estado del jornal';
                setErrorCarga(msg);
                Swal.fire({ title: 'Error', text: msg, icon: 'error' });
            })
            .finally(() => setLoading(false));
    }, [obraID]);

    useEffect(() => {
        cargarEstado();
    }, [cargarEstado]);

    const ejecutarAccion = (accion) => {
        if (!obraID || submitting) return;
        setSubmitting(true);
        JornalService.createOrUpdateJornalQr(obraID, accion)
            .then((res) => {
                const data = res.data;
                const nombreObra = data.jornal?.obra?.nombre || obraNombre;
                const titulo = `${SUCCESS_TITLES[accion] || 'Marcaje registrado'}${nombreObra ? ': ' + nombreObra : ''}`;

                if (accion === 'SALIDA_JORNADA' || data.estadoMarcaje === 'CERRADO') {
                    Swal.fire({
                        title: titulo,
                        icon: 'success',
                        confirmButtonText: 'Cerrar',
                    }).then(() => {
                        setRefreshJornales(true);
                        navigate('/');
                    });
                } else {
                    Swal.fire({
                        title: titulo,
                        icon: 'success',
                        confirmButtonText: 'Continuar',
                    }).then(() => {
                        setRefreshJornales(true);
                        setEstadoMarcaje(data.estadoMarcaje);
                        setAccionesPermitidas(data.accionesPermitidas || []);
                        if (data.obraNombre) {
                            setObraNombre(data.obraNombre);
                        } else if (data.jornal?.obra?.nombre) {
                            setObraNombre(data.jornal.obra.nombre);
                        }
                    });
                }
            })
            .catch((error) => {
                const msg = error.response?.data || 'Error al registrar el marcaje';
                Swal.fire({ title: 'Error', text: msg, icon: 'error' });
            })
            .finally(() => setSubmitting(false));
    };

    const handleCancelar = () => navigate('/');

    if (!obraID) {
        return (
            <div className="container mt-5 text-center">
                <p>Obra no válida.</p>
                <button type="button" className="btn btn-secondary" onClick={handleCancelar}>Volver</button>
            </div>
        );
    }

    return (
        <div className="container mt-5 col-lg-6 mx-auto">
            <div className="card shadow-sm">
                <div className="card-body text-center">
                    <h2 className="card-title mb-2">Marcaje de jornal</h2>
                    {obraNombre && <p className="text-muted mb-3">{obraNombre}</p>}

                    {loading ? (
                        <p className="my-4">Cargando...</p>
                    ) : (
                        <>
                            {errorCarga ? (
                                <>
                                    <p className="text-danger mb-4">{errorCarga}</p>
                                    <button type="button" className="btn btn-primary" onClick={cargarEstado}>
                                        Reintentar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <p className="mb-4">
                                        {estadoMarcaje === 'SIN_JORNAL' && 'Seleccioná cómo registrar tu jornada.'}
                                        {estadoMarcaje === 'TRABAJANDO' && 'Estás en jornada. ¿Qué querés registrar?'}
                                        {estadoMarcaje === 'EN_DESCANSO' && 'Estás en descanso.'}
                                    </p>
                                    <div className="d-grid gap-2">
                                        {accionesPermitidas.map((accion) => (
                                            <button
                                                key={accion}
                                                type="button"
                                                className={`btn ${accion === 'SALIDA_JORNADA' ? 'btn-danger' : 'btn-primary'}`}
                                                disabled={submitting}
                                                onClick={() => ejecutarAccion(accion)}
                                            >
                                                {ACCION_LABELS[accion] || accion}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <button
                        type="button"
                        className="btn btn-outline-secondary mt-4"
                        onClick={handleCancelar}
                        disabled={submitting}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QrJornalComponent;
