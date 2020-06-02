function Opciones(){
    let ciudades = [];
    let tipos =[];
    $.get('data-1.json', (data)=>{
      for (let i = 0; i < data.length; i++) {
      CrearMenu(data, i);
      }
      for (let i = 0; i < ciudades.length; i++) {
        MenuCiudades(i);
      }
      for (let j = 0; j < tipos.length; j++) {
        MenuTipo(j);
        
      }
      $('select').material_select();
    });
  
    function CrearMenu(data, i) {
      if (ciudades.indexOf(data[i].Ciudad) === -1)
        ciudades.push(data[i].Ciudad);
      if (tipos.indexOf(data[i].Tipo) === -1)
        tipos.push(data[i].Tipo);
    }
  
    function MenuTipo(j) {
      $('#selectTipo').append('<option value ="' +tipos[j]+'">' +tipos[j]+'</option>');
    }
  
    function MenuCiudades(i) {
      $('#selectCiudad').append('<option value ="' +ciudades[i]+'">' +ciudades[i]+'</option>');
    }
  }
  
  $(document).ready(()=>{
    inicializarSlider();
    Opciones();
  
  
  })
  
  
  
  //Función para insertar los resultados en HTML
  
  function Resultados(array){
    $('.resultados').empty();
    for (let i = 0; i < array.length; i++) {
      $('.resultados').append(`
      <div class="card horizontal">
       <div class="card-image place-wrapper">
          <img class="img-responsive place-image" src="img/home.jpg"></div>
            <div class="card-stacked">
              <div class="card-content">
               <p>
                  <b>Dirección: </b>${array[i].Direccion}<br>
                  <b>Ciudad: </b>${array[i].Ciudad}<br>
                  <b>Teléfono: </b>${array[i].Telefono}<br>
                  <b>Código Postal: </b>${array[i].Codigo_Postal}<br>
                  <b>Tipo: </b>${array[i].Tipo}<br>
                  <span class="price"><b>Precio: </b>${array[i].Precio}</span>
               </p>
             </div>
            <div class="card-action">
              <a>Ver mas</a>
          </div>
        </div>
      </div>`);
      
    }
  }
  
  //Función para mostrar busqueda completa
  
  $('#mostrarTodos').click( ()=>{
    $.get('data-1.json', (data)=>{
      Resultados(data);
    });
  });
  
  //función para enviar consulta al servidor
  
  $('#submitButton').click(()=>{
    let ciudad = $('#selectCiudad option:selected').val();
    let tipo = $('#selectTipo option:selected').val();
    let precio = $('#rangoPrecio').val();
    console.log(ciudad +'+'+ tipo +'+'+ precio);
  
    $.get('buscador.php',{ciudad:ciudad, tipo:tipo, precio:precio}, (response)=>{
      let data =JSON.parse(response);
      let busq = data.data;
      Resultados(busq);
    });
    
  });
  