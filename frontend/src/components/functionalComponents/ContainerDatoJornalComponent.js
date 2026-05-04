
import DatoJornalComponent from "./DatoJornalComponent";
import { useState, useEffect, useMemo } from "react";
import ErrorMessage from './ErrorMessageComponent';
import SuccessMessage from './SuccessMessageComponent';
import { useAuth } from '../../context/AuthContext';

const ContainerDatoJornalComponent = ({ jornales, adminView, jefeView, confirmar, pageSize = 20 }) => {
    const { setRefreshJornales } = useAuth();
    const [mensajeError, setMensajeError] = useState([]);
    const [mensajeSuccess, setMensajeSuccess] = useState([]);
    const [page, setPage] = useState(1);
    const [showAll, setShowAll] = useState(false);

    const list = Array.isArray(jornales) ? jornales : [];

    useEffect(() => {
        setPage(1);
        setShowAll(false);
    }, [jornales]);

    const effectivePageSize = pageSize > 0 ? pageSize : list.length || 1;
    const totalPages = showAll || list.length === 0 ? 1 : Math.max(1, Math.ceil(list.length / effectivePageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);

    const visible = useMemo(() => {
        if (list.length === 0) return [];
        if (showAll) return list;
        if (pageSize <= 0) return list;
        const start = (safePage - 1) * effectivePageSize;
        return list.slice(start, start + effectivePageSize);
    }, [list, showAll, safePage, effectivePageSize, pageSize]);

    const rangeStart = list.length === 0 ? 0 : showAll || pageSize <= 0 ? 1 : (safePage - 1) * effectivePageSize + 1;
    const rangeEnd = list.length === 0 ? 0 : showAll || pageSize <= 0 ? list.length : Math.min(safePage * effectivePageSize, list.length);
    const showPager = pageSize > 0 && list.length > effectivePageSize;

    const handleFetchError = (error) => {
        setMensajeError(prevErrors => [...prevErrors, error]);
        setRefreshJornales(true)
    };

    const handleFetchSuccess = (message) => {
        setMensajeSuccess(prevMessages => [...prevMessages, message]);
        setRefreshJornales(true)
    };

    const handleAlertCloseError = (index) => {
        setMensajeError(prevErrors => prevErrors.filter((_, i) => i !== index));
        setRefreshJornales(true)
    };

    const handleAlertCloseSuccess = (index) => {
        setMensajeSuccess(prevMessages => prevMessages.filter((_, i) => i !== index));
        setRefreshJornales(true)
    };

    if (list.length === 0) {
        return null;
    }

    return (
        <>
            <table className='table table-sm table-bordered  mt-3'>
            <thead>
                <tr>
                    {/* <th> </th> */}
                    {(adminView || jefeView) && (<th className="text-center">Nombre</th>)}
                    <th className="text-center">Tipo </th>
                    <th className="text-center">Fecha</th>
                    <th className="text-center">Obra</th>
                    <th className="text-center">Ingreso</th>
                    <th className="text-center">Salida</th>
                    {(adminView || jefeView) && (<th className="text-center">Confirmado</th>)}
                    {(adminView || jefeView) && (<th className="text-center">Acciones</th>)}
                </tr>
            </thead>
            <tbody>
                {visible.map(p => <DatoJornalComponent
                    key={p.id}
                    jornal={p}
                    adminView={adminView}
                    jefeView={jefeView}
                    confirmar={confirmar}
                    onError={handleFetchError}
                    onSuccess={handleFetchSuccess} />
                )}
            </tbody>
        </table>

            {showPager && (
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-2 mt-2 px-1">
                    <small className="text-muted">
                        Mostrando {rangeStart}–{rangeEnd} de {list.length}
                    </small>
                    <div className="btn-group align-self-center" role="group" aria-label="Paginación">
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            disabled={showAll || safePage <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            Anterior
                        </button>
                        <span className="btn btn-sm btn-outline-secondary disabled">
                            Página {safePage} de {totalPages}
                        </span>
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            disabled={showAll || safePage >= totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            Siguiente
                        </button>
                    </div>
                    <div className="align-self-center">
                        {!showAll ? (
                            <button type="button" className="btn btn-link btn-sm p-0" onClick={() => setShowAll(true)}>
                                Ver todos ({list.length})
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-link btn-sm p-0"
                                onClick={() => {
                                    setShowAll(false);
                                    setPage(1);
                                }}
                            >
                                Usar paginación
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className='row justify-content-center mt-4'>
                {mensajeError.length > 0 && <ErrorMessage mensajeError={mensajeError} handleAlertClose={handleAlertCloseError} />}
                {mensajeSuccess.length > 0 && <SuccessMessage mensajeSuccess={mensajeSuccess} handleAlertClose={handleAlertCloseSuccess} />}
            </div>
        </>
    );
};

export default ContainerDatoJornalComponent;









