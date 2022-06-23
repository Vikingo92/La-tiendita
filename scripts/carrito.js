const postList = document.querySelector('.posts-list');
const form = document.querySelector('.add-post-form');
const valor_producto = document.getElementById('title-value');
const cantidad_producto = document.getElementById('body-value');
const btn = document.querySelector('.btn');

let output = '';

const url = 'http://localhost:4000/products';

const render  = (productos) => {
    productos.forEach(productos => {
        output += `
        <div class="card mt-4 col-md-6 bg-ligth">
            <div class="card-body" data-id=${productos.id}>
            <h5 class="card-title">${productos.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${productos.discount}</h6>
              <img src="${productos.image}">
              <h6 class="card-subtitle mb-2 text-muted">Ahora: ${productos.price}</h6>
              <h6 class="card-subtitle mb-2 text-muted">Antes: ${productos.price2}</h6>
              <h7 class="card-subtitle mb-2 text-muted">${productos.iva}</h7>
              <p class="card-text">${productos.description}</p>
              <a href="#" class="card-link" id="edit-prod">Editar</a>
              <a href="#" class="card-link" id="delete-prod">Eliminar</a>
            </div>
          </div>
        `
    })
    postList.innerHTML = output;
}

// Get - Leer la informacion.
// Method: GET.

fetch(url)
    .then(res => res.json())
    .then(data => render(data))

postList.addEventListener('click', (eve) => {
    eve.preventDefault();
    // console.log(eve.target.id);

    let btnDelete = eve.target.id == 'delete-prod';
    let btnEditar = eve.target.id == 'edit-prod';

    // console.log(eve.target.parentElement.dataset.id);
    let id = eve.target.parentElement.dataset.id;

    // Delete: Eliminar 
    // Method: DELETE.

    if (btnDelete) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then( () => location.reload())
    }

    if (btnEditar) {
        
        const modificar = eve.target.parentElement;
        let titulo = modificar.querySelector('.card-title').textContent;
        let contenido = modificar.querySelector('.card-text').textContent;
        // console.log(titulo, contenido)


        valor_producto.value = titulo;
        cantidad_producto.value = contenido;
    }

    // M - actualizar. -Method - PATCH
    btn.addEventListener('click', (eve) => {
        eve.preventDefault()

        fetch(`${url}/$${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                producto: valor_producto.value,
                cantidad: valor_producto.value,
            })
        })

        .then(res => res.json())
        .then( () => location.reload())

    })

});



// Crear - inserta un nuevo elemento.
// Method: POST.

form.addEventListener('submit', (eve) => {
    eve.preventDefault();
    
    // console.log(valor_producto.value)

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            producto: valor_producto.value,
            cantidad: cantidad_producto.value 
        })
    })
    .then(res => res.json())
    .then(data => {
        const products_arr = [];
        products_arr.push(data);
        render(products_arr);
    })

    // Reset. Limpiar los campos.

    valor_producto.value = '';
    cantidad_producto.value = '';
})
   

