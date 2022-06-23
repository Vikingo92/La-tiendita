
document.addEventListener('DOMContentLoaded', async () => {

    let id = localStorage.getItem('Ofertas')
    let res = await fetch(`http://localhost:4000/products/${id}`)
    let data = await res.json()

    let  modal = document.getElementById('modal_render');

    
    modal.innerHTML = `
    <div class="modal" id="modal" align="center" width="500px">
            <span class="modal__back"></span>
            <div class="modal__content">
                <div class="modal__header">
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body" align="center">
                    <h1>${data.discount}</h1>
                    <h2 class="modal-title">${data.name}</h2>
                    <img class="principal" src="${data.image}">
                    <h3>${data.iva}</h3>
                    <p>${data.description}</p>
                    <h3>${data.price}</h3>
                    <h4>${data.price2}</h4>
                    <div class="modal__info" align="center">
                        <img src="${data.image}">
                        <img src="">
                        <img src="">
                    </div>
                 </div>
                <div class="modal-footer">
                    <button class="close-modal" id="agregar">Agregar</button>
                    <button class="close-modal" id="cancelar">Cancelar</button>
                </div>
            </div>
        </div>
        `

})