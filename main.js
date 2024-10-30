document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login");
    const errorMessage = document.getElementById("error");

    // Kiểm tra sự kiện đăng nhập
    loginForm?.addEventListener("submit", function (e) {
        e.preventDefault(); // Ngăn form reload trang
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Kiểm tra thông tin đăng nhập
        if (username === "admin" && password === "123456") {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "ktx/main.html"; // Chuyển hướng đến trang chính
        } else {
            errorMessage.style.display = "block"; // Hiển thị thông báo lỗi khi đăng nhập thất bại
            alert("Sai tên đăng nhập hoặc mật khẩu!");
        }
    });

    // Kiểm tra trạng thái đăng nhập, nếu chưa đăng nhập thì chuyển về trang index.html
    if (localStorage.getItem("loggedIn") !== "true" && !window.location.pathname.endsWith("index.html")) {
        alert("Vui lòng đăng nhập!");
        window.location.href = "index.html";
    }
});

// Hàm đăng xuất
function logout() {
    localStorage.removeItem("loggedIn");
    alert("Đã đăng xuất!");
    window.location.href = "index.html"; // Đường dẫn chính xác tới index.html
}
