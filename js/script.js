// =======================
//  DATA PRODUK
// =======================
const products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];

// DATA SUMMARY
const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

// Format Rupiah
function formatRupiah(num) {
    return "Rp " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// =======================
//  DETEKSI HALAMAN
// =======================
const path = location.pathname;

// Halaman login
if (
    path.endsWith("/") ||
    path.endsWith("index.html")
) {
    document.addEventListener("DOMContentLoaded", () => {
        const loginForm = document.getElementById("loginForm");
        const errorMessage = document.getElementById("errorMessage");

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            errorMessage.style.display = "none";

            if (email === "" || password === "") {
                errorMessage.textContent = "Email dan password tidak boleh kosong!";
                errorMessage.style.display = "block";
                return;
            }

            // VALIDASI PASSWORD HARUS NIM
            if (password !== "24090094") {
                errorMessage.textContent = "Password salah! Gunakan NIM Anda.";
                errorMessage.style.display = "block";
                return;
            }

            alert("Login berhasil!");
            window.location.href = "./dashboard.html";

        });
    });
}

// Halaman dashboard
else if (path.endsWith("dashboard.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("totalProducts").textContent = summary.totalProducts;
        document.getElementById("totalSales").textContent = summary.totalSales;
        document.getElementById("totalRevenue").textContent = formatRupiah(summary.totalRevenue);

        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("Apakah Anda yakin ingin logout?")) {
                window.location.href = "./index.html";
            }
        });
    });
}

// Halaman products
else if (path.endsWith("products.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        renderProductsTable();

        const logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (confirm("Apakah Anda yakin ingin logout?")) {
                window.location.href = "./index.html";
            }
        });
    });

    // Render tabel produk
    function renderProductsTable() {
        const tableBody = document.getElementById("productsTableBody");
        tableBody.innerHTML = "";

        products.forEach((product, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${formatRupiah(product.price)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Edit produk
    window.editProduct = function(id) {
        const product = products.find(p => p.id === id);
        alert(`Edit produk: ${product.name}`);
    };

    // Delete produk
    window.deleteProduct = function(id) {
        if (confirm("Yakin hapus produk ini?")) {
            const index = products.findIndex(p => p.id === id);
            if (index !== -1) {
                products.splice(index, 1);
                renderProductsTable();
            }
        }
    };
}