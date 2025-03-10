let products = [];

function addProduct() {
    let name = document.getElementById("product-name").value;
    let discountedPrice = parseFloat(
        document.getElementById("discounted-price").value
    );
    let originalPrice = parseFloat(
        document.getElementById("original-price").value
    );
    if (!name || isNaN(discountedPrice) || isNaN(originalPrice)) {
        alert("Proszę wprowadzić poprawne dane.");
        return;
    }
    if (discountedPrice >= originalPrice) {
        alert("Cena po rabacie musi być mniejsza od ceny przed rabatem.");
        return;
    }

    products.push({ name, discountedPrice, originalPrice });
    updateProductList();

    document.getElementById("product-name").value = "";
    document.getElementById("discounted-price").value = "";
    document.getElementById("original-price").value = "";
}
function updateProductList() {
    const listElement = document.getElementById("product-list");
    listElement.innerHTML = "";
    products.forEach((product, index) => {
        // Nowy wiersz w tabeli
        const row = document.createElement("tr");
        // Nazwa produktu
        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;
        row.appendChild(nameCell);
        // Cena po rabacie
        const discountedCell = document.createElement("td");
        discountedCell.textContent = product.discountedPrice.toFixed(2) + " zł";
        row.appendChild(discountedCell);

        // Cena przed rabatem
        const originalCell = document.createElement("td");
        originalCell.textContent = product.originalPrice.toFixed(2) + " zł";
        row.appendChild(originalCell);

        // Przycisk usuwania
        const actionCell = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Usuń";
        deleteBtn.onclick = () => {
            removeProduct(index); // dorobić funkcję usuwania
        };
        actionCell.appendChild(deleteBtn);
        row.appendChild(actionCell);
        listElement.appendChild(row);
    });
}
function removeProduct(index) {
    products.splice(index, 1);
    updateProductList();
}
function calculateBestDiscount() {
    products.sort((a, b) => {
        if (b.originalPrice !== a.originalPrice) {
            return b.originalPrice - a.originalPrice;
        } else {
            return b.discountedPrice - a.discountedPrice;
        }
    });
    updateProductList();
}
