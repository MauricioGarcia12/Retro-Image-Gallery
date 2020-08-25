import React, {useState,useEffect} from 'react';
import Formulario from './components/Formulario'
import ListadoImagenes from './components/ListadoImagenes'


function App() {

  //State de la app
  const [busqueda,guardarBusqueda]=useState('');
  const [imagenes, guardarImagenes]=useState([]);

  //paginador
  const [ paginaactual, guardarPaginaActual]=useState(1);
  const [totalpaginas,guardarTotalPaginas]=useState(17);

  useEffect(() => {
    //no haga consulta si esta vacia
    if(busqueda === '') return;

   const consultarAPI = async () =>{
    const imagenesPorPagina =30;
    const key ='18026964-37229ebf5f831553df0e61157';
    const url =`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&min_width=${500}&min_height=${500}`;
    
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    guardarImagenes(resultado.hits)

    //calcular el total de paginas
    const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
    guardarTotalPaginas(calcularTotalPaginas)

   }
   consultarAPI()
    

  }, [busqueda])


  //definir pagina anterior
  const paginaAnterior = () =>{
    const nuevaPaginaActual = paginaactual -1;
    if(nuevaPaginaActual === 0) return ;

    guardarPaginaActual(nuevaPaginaActual);
  }

  //definir pagina siguiente
  const paginaSiguiente = () =>{
    const nuevaPaginaActual = paginaactual +1;

    if(nuevaPaginaActual>totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }


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
          <button
          className='btn btn-info mr-1'
          type='button'
          onClick={paginaAnterior}
          >&laquo; Anterior </button>

          <button
          className='btn btn-info mr-1'
          type='button'
          onClick={paginaSiguiente}
          >Siguiente &raquo;</button>
      </div>
    </div>
  );
}

export default App;
