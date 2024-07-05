import { servicesProducts } from "../services/product-services.js"; 

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="funkos">
            <div class="funkos-imagen-container">
                <img class="funkos_imagen" src="${image}" alt="${name}">
                <div class="funkos_informacion">
                    <p class="funkos_nombre">${name}</p>
                    <p class="funkos_precio">$${price}</p>
                    <button class="icono_borrar" data-id="${id}">
                        <div class="icono_basurero">
                            <img src="./assets/trash-can-solid.svg" alt="Eliminar">
                        </div>
                    </button>
                </div>
            </div> 
        </div>
    `;

    card.querySelector(".icono_borrar").addEventListener("click", () => {
        servicesProducts.deleteProduct(id)
            .then(() => {
                card.remove();
            })
            .catch((err) => console.log(err));
    }); 

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listProducts = await servicesProducts.productList();
        
        listProducts.forEach(product => {
            createCard(product.name, product.price, product.image, product.id);
        });

    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    console.log({ nombre, precio, imagen }); // Para verificar los valores

    servicesProducts.createProducts(nombre, precio, imagen)
        .then((product) => {
            createCard(product.name, product.price, product.image, product.id);
        })
        .catch((err) => console.log(err));
});

render();
