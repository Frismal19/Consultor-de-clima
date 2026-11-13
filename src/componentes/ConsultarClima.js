import React, { useState } from 'react';

function ConsultorClima() {
  const [ciudad, setCiudad] = useState('');
  const [clima, setClima] = useState(null);    
  const [error, setError] = useState(null);   
  const [cargando, setCargando] = useState(false);

  const API_KEY = '18e2c93c0e454134b0b75118262003'; 
  const URL_BASE = 'https://api.weatherapi.com/v1/current.json';

  const consultarClima = async (e) => {
    e.preventDefault(); 

    if (!ciudad.trim()) {
      setError('Por favor, ingresa una ciudad.');
      return;
    }

    setCargando(true);
    setError(null);
    setClima(null);

    try {
      const respuesta = await fetch(`${URL_BASE}?key=${API_KEY}&q=${ciudad}&lang=es`);
      const datos = await respuesta.json();
      if (datos.error) {
        setError('No se encontró la ciudad. Revisa la ortografía.');
      } else {
        setClima(datos);
      }
    } catch (msgError) {
      setError('Ocurrió un error al conectar con el servicio de clima.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card">
        
        <div className="card-header bg-success text-white text-center p-4">
          <h2 className="mb-3">Aplicación de clima</h2>
          <p className="mb-0">Puedes ingresar la ciudad o municipio que quieras para</p>
          <p className="mb-0">tener una mejor idea de cómo organizar tu día, es gratis (por ahora)</p>
        </div>

        <div className="card-body p-4">
          <form onSubmit={consultarClima} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Ej: Ciudad de Guatemala, Mixco..."
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)} 
              />
              <button className="btn btn-info btn-lg text-white" type="submit">
                Consultar
              </button>
            </div>
          </form>

          {cargando && <div className="alert alert-info text-center border-0">Consultando...</div>}
          {error && <div className="alert alert-danger text-center border-0">{error}</div>}

          {clima && (
            <div className="text-center mt-4 animated fadeIn">
              <h2 className="display-6 fw-bold text-dark">{clima.location.name}</h2>
              <p className="text-muted">{clima.location.region}, {clima.location.country}</p>
              
              <div className="d-flex align-items-center justify-content-center my-3">
                <img 
                  src={clima.current.condition.icon} 
                  alt="Icono del clima" 
                  style={{ width: '80px', height: '80px' }}
                />
                <span className="display-1 fw-normal ms-2">{Math.round(clima.current.temp_c)}°<small className="text-muted">C</small></span>
              </div>

              <p className="lead text-capitalize fw-semibold text-success mb-4">
                {clima.current.condition.text}
              </p>

              <div className="row g-3 bg-light p-3 rounded shadow-sm">
                <div className="col border-end">
                  <div className="small text-muted mb-1 text-uppercase fw-bold">Humedad</div>
                  <div className="h4 mb-0 fw-bold">{clima.current.humidity}%</div>
                </div>
                <div className="col">
                  <div className="small text-muted mb-1 text-uppercase fw-bold">Viento</div>
                  <div className="h4 mb-0 fw-bold">{clima.current.wind_kph} km/h</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="card-footer text-center text-muted small p-3 bg-white rounded-bottom">
          Proyecto final - Consultor de clima para eventos
        </div>
      </div>
    </div>
  );
}

export default ConsultorClima;