//Función para mostrar resultados de la búsqueda
function Resultados(array) {
  $('.resultados').empty();
  for (let i = 0; i < array.length; i++) {
    $('.resultados').append(`<div class="card horizontal">
    <div class="card-image place-wrapper">
        <img class="img-responsive place-image" src="img/${array[i].Ciudad}.jpg">
    </div>
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
</div>
    
    
    
    
    
    
    `);
  }
}
