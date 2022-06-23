const agregar = document.getElementById('agregar');
const close = document.getElementById('cancelar');

const render = document.getElementById('render');
const template_card = document.getElementById('template-card').content; 
const fragment = document.createDocumentFragment();

// const template_modal = document.getElementById('template_modal').content; 
// const modal = document.getElementById('modal_render');

let productos = {}



document.addEventListener('DOMContentLoaded', async() => {
    
    const response = await fetch('http://localhost:4000/products')
    const data = await response.json()
    console.log(data);

    
    get_info(data);
    // render_modal(data);
})


const get_info = (products) => {
    products.forEach(descuentos => {
        
        const { id, discount, name, image, price, price2, iva, description } = descuentos
        
        template_card.querySelector('img').setAttribute('src', image)
        template_card.querySelector('.discount').textContent = discount
        template_card.querySelector('.price').textContent = price
        template_card.querySelector('h5').textContent = price2
        template_card.querySelector('h4').innerText = name 
        template_card.querySelector('img').id = id
        
        const clone = template_card.cloneNode(true)
        fragment.appendChild(clone)
    })
    render.appendChild(fragment);

}


document.addEventListener('click', eve => {

    if(eve.target.classList.contains('img_product')) {
        localStorage.setItem('Ofertas', eve.target.id)
        location.href='../description.html';
        
    }
})



// close.addEventListener('click', () => {
//     modal.classList.remove('show');
// })

// agregar.addEventListener('click', (eve) => {

//     let clasificacion = eve.target.id
//      if (id == clasificacion) {

//         let 
//      }
//     locaslStorage.setItem('ofertas',)
// })