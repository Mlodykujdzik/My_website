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
    sortingByPrice();
    let normalDiscountSum = products.reduce(
        (sum, product) => sum + product.discountedPrice,
        0
    );
    let multiDiscountSum = 0;
    let totalProducts = products.length;
    let i = 0;
    while (i < totalProducts) {
        let groupSize = Math.min(5, totalProducts - i);
        for (let j = 0; j < groupSize; j++) {
            let product = products[i + j];
            if (groupSize === 5 && j === 4) {
                multiDiscountSum += product.originalPrice * 0.01;
            } else if (groupSize < 5 && groupSize > 1 && j === groupSize - 1) {
                if (groupSize === 2) {
                    multiDiscountSum += product.originalPrice * 0.7;
                } else if (groupSize === 3) {
                    multiDiscountSum += product.originalPrice * 0.45;
                } else if (groupSize === 4) {
                    multiDiscountSum += product.originalPrice * 0.2;
                }
            } else {
                multiDiscountSum += product.originalPrice;
            }
        }
        i += groupSize;
    }
    if (normalDiscountSum < multiDiscountSum) {
        console.log(
            "Najlepszy rabat uzyskasz kupując na zwykłym kodzie rabatowym."
        );
        console.log(
            "Suma cen produktów na zwykłym kodzie rabatowym: " +
                normalDiscountSum.toFixed(2) +
                " zł"
        );
        console.log(
            "Suma cen produktów na multirabatach: " +
                multiDiscountSum.toFixed(2) +
                " zł"
        );
    } else if (normalDiscountSum > multiDiscountSum) {
        console.log("Najlepszy rabat uzyskasz kupując na multirabatach.");
        console.log(
            "Suma cen produktów na multirabatach: " +
                multiDiscountSum.toFixed(2) +
                " zł"
        );
        console.log(
            "Suma cen produktów na zwykłym kodzie rabatowym: " +
                normalDiscountSum.toFixed(2) +
                " zł"
        );
    } else {
        console.log("Oba rabaty są takie same.");
        console.log(
            "Suma cen produktów na multirabatach: " +
                multiDiscountSum.toFixed(2) +
                " zł"
        );
        console.log(
            "Suma cen produktów na zwykłym kodzie rabatowym: " +
                normalDiscountSum.toFixed(2) +
                " zł"
        );
    }
    updateProductList();
}
function sortingByPrice() {
    products.sort((a, b) => {
        if (b.originalPrice !== a.originalPrice) {
            return b.originalPrice - a.originalPrice;
        } else {
            return b.discountedPrice - a.discountedPrice;
        }
    });
}
