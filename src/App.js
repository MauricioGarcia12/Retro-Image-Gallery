import React, {useState,useEffect} from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'


function App() {

  //State de la app
  const [busqueda,guardarBusqueda]=useState('');
  const [imagenes, guardarImagenes]=useState([]);

  useEffect(() => {
    //no haga consulta si esta vacia
    if(busqueda === '') return;

   const consultarAPI = async () =>{
    const imagenesPorPagina =15;
    const key ='18026964-37229ebf5f831553df0e61157';
    const url =`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
    
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    guardarImagenes(resultado.hits)

   }
   consultarAPI()
    

  }, [busqueda])


  return (
    <div className='container'>
      <div className='jumbotron'>
          <h2 className='lead text-center '>Buscador de Imagenes</h2>
          <Formulario
          guardarBusqueda={guardarBusqueda}
          />
      </div>
      <div className='row justify-content-center'>
          <ListadoImagenes
            imagenes={imagenes}
          />
      </div>
    </div>
  );
}

export default App;
