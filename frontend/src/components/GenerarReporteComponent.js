
import ReporteService from "../services/ReporteService";
import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import ObraService from "../services/ObraService";
import JornalFinderFormComponent from "./functionalComponents/JornalFinderFormComponent";
import ErrorMessage from './functionalComponents/ErrorMessageComponent';
import { useNavigate } from 'react-router-dom';
import JornalService from "../services/JornalService";

const GenerarReporteComponent = () => {
    const navigate = useNavigate();

    const [obras, setObras] = useState([]);
    const [mensajeError, setMensajeError] = useState();
    const [alertaSinConfirmar, setAlertaSinConfirmar] = useState(null);
    const [reporteCompleto, setReporteCompleto] = useState(false);

    const generarReporte = async (data) => {
        try {
            setAlertaSinConfirmar(null);
            const updatedData = { ...data, completo: reporteCompleto };

            const existeSinConfirmarResp = await JornalService.existsSinConfirmarEnFiltro(updatedData);
            if (existeSinConfirmarResp.data) {
                setAlertaSinConfirmar({
                    texto: `Hay jornales sin confirmar entre las obras y trabajadores elegidos, en el período del ${data.fechaDesde} al ${data.fechaHasta}.`,
                    filtrosBusqueda: {
                        fechaDesde: updatedData.fechaDesde,
                        fechaHasta: updatedData.fechaHasta,
                        obras: updatedData.obras,
                        personas: updatedData.personas,
                        soloSinConfirmar: true,
                    },
                });
                return;
            }

            const response = await ReporteService.getReporteEntreFechas(updatedData);

            // Crear URL para el Blob
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `jornales_${data.fechaDesde}_al_${data.fechaHasta}.xlsx`); // Nombre del archivo por defecto
            document.body.appendChild(link);
            link.click();

            // Limpiar
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            if (error.response && error.response.data instanceof Blob) {
                const errorText = await error.response.data.text();
                setMensajeError(errorText); // Mostrar mensaje de error si la respuesta es un Blob
            } else {
                setMensajeError(error.response?.data || "Error desconocido"); // Manejar otros errores
            }
        }
    };

    const fetchObrasActivasEntreFechas = async (fechaDesde, fechaHasta) => {
        try {
            const obrasData = await ObraService.getObrasActivasEntreFechas(fechaDesde, fechaHasta);
            setObras(obrasData.data);
        } catch (error) {
            setMensajeError(error.response.data);
        }
    };

    const handleCancelar = () => {
        navigate('/');
    }


    const handleAlertCloseError = (e) => {
        e.preventDefault();
        setMensajeError()
    }

    const irAJornalesSinConfirmar = () => {
        if (!alertaSinConfirmar?.filtrosBusqueda) return;
        navigate('/buscar-jornal', { state: { prefillBusquedaSinConfirmar: alertaSinConfirmar.filtrosBusqueda } });
        setAlertaSinConfirmar(null);
    };

    const cerrarAlertaSinConfirmar = (e) => {
        e.preventDefault();
        setAlertaSinConfirmar(null);
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-3 row'>
            <JornalFinderFormComponent
                titleFromParent={'Generar reporte'}
                obrasFromParent={obras}
                showTrabajadores={true}
                onSubmitDataToParent={generarReporte}
                onFechasChange={fetchObrasActivasEntreFechas}
                onCancelar={handleCancelar}
            />

            <div className="row justify-content-center">
            <button
                className={`btn btn-outline-dark col-md-2 my-3 mx-1 ${reporteCompleto ? 'btn-active-dark' : 'btn-inactive-dark'}`}
                onClick={(e) => { e.preventDefault(); setReporteCompleto(prevState => !prevState); }}>
                Completo
            </button>
            </div>

            {alertaSinConfirmar && (
                <div className="alert alert-warning alert-dismissible fade show col-lg-8 mx-auto mt-3" role="alert">
                    <p className="mb-2">{alertaSinConfirmar.texto}</p>
                    <button type="button" className="btn btn-primary btn-sm me-2" onClick={irAJornalesSinConfirmar}>
                        Ver jornales sin confirmar
                    </button>
                    <button type="button" className="btn-close" aria-label="Cerrar" onClick={cerrarAlertaSinConfirmar} />
                </div>
            )}
            {mensajeError && <ErrorMessage mensajeError={mensajeError} handleAlertClose={(e) => handleAlertCloseError(e)} />}
        </div>

    );
};

export default GenerarReporteComponent;









