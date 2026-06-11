import React, { useEffect, useMemo, useState } from 'react'
import PersonaService from '../services/PersonaService'
import { Link } from 'react-router-dom'
import ContainerPersonaFinderComponent from './functionalComponents/ContainerPersonaFinderComponent';
import ContainerDatoPersonaComponent from './functionalComponents/ContainerDatoPersonaComponent';

const esPersonaActiva = (p) => p.activo === true;

export const ListPersonasComponent = () => {

    const [personas, setPersonas] = useState([])
    const [mostrarInactivas, setMostrarInactivas] = useState(false)

    const listarPersonas = () => {
        PersonaService.getAllPersonas().then(res => {
            setPersonas(res.data)
        }).catch(() => {
            setPersonas([])
        })
    }

    useEffect(() => {
        listarPersonas()
    }, [])

    const cantidadInactivas = useMemo(
        () => personas.filter((p) => !esPersonaActiva(p)).length,
        [personas]
    )

    const personasVisibles = useMemo(
        () => (mostrarInactivas ? personas : personas.filter(esPersonaActiva)),
        [personas, mostrarInactivas]
    )

    const handleCancelar=()=>{};

    return (
        <div className='container my-5 row justify-content-center'>
            <h1 className='text-center'>PERSONAS</h1>
            <Link to='/add-persona' className='btn btn-primary mb-2 col-lg-8' >Agregar Persona </Link>
            <div className='table-responsive col-lg-8 mt-2'>
                <ContainerDatoPersonaComponent personas={personasVisibles}/>
            </div>
            {cantidadInactivas > 0 && (
                <div className="col-lg-8 mt-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setMostrarInactivas((v) => !v)}
                    >
                        {mostrarInactivas
                            ? 'Ocultar personas inactivas'
                            : `Mostrar personas inactivas (${cantidadInactivas})`}
                    </button>
                    {!mostrarInactivas && (
                        <small className="text-muted">
                            Por defecto solo se listan las personas activas.
                        </small>
                    )}
                </div>
            )}
            <div className='my-5'>
                <ContainerPersonaFinderComponent onCancelar={handleCancelar}></ContainerPersonaFinderComponent>
            </div>
        </div >
    )
}
export default ListPersonasComponent
