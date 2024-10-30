// Lấy các phần tử từ DOM
const msvInput = document.getElementById("msv");
const spInput = document.getElementById("sp");
const button = document.querySelector("button");
const tableBody = document.querySelector("tbody");

// Tạo một đối tượng để lưu trữ thông tin sinh viên
const studentData = {
    "2021001": { name: "Nguyễn Văn A", gender: "Nam", hometown: "Hải Phòng", contact: "0123456789", dob: "01/01/2000", class: "12A1" },
    "2021002": { name: "Trần Thị B", gender: "Nữ", hometown: "Hải Dương", contact: "0987654321", dob: "02/02/2001", class: "12A2" },
    "2021003": { name: "Nguyễn Văn C", gender: "Nam", hometown: "Cao Bằng", contact: "0331254669", dob: "03/03/2002", class: "12A3" },
    "2021004": { name: "Trịnh Hồng D", gender: "Nữ", hometown: "Hà Nội", contact: "0789456123", dob: "04/04/2003", class: "12A4" },
    "2021005": { name: "Nguyễn Văn E", gender: "Nam", hometown: "Thái Bình", contact: "01239876", dob: "05/05/2004", class: "12A5" },
    "2021006": { name: "Nguyễn Văn F", gender: "Nam", hometown: "Quảng Ninh", contact: "0159875321", dob: "06/06/2005", class: "12A6" },
    "2021007": { name: "Nguyễn Thị G", gender: "Nữ", hometown: "Hồ Chí Minh", contact: "0123578977", dob: "07/07/2006", class: "12A7" },
};

// Hàm kiểm tra mã sinh viên đã có trong bảng
function isStudentExists(msv) {
    for (let row of tableBody.rows) {
        if (row.cells[0].textContent === msv) {
            return true; // Mã sinh viên đã tồn tại
        }
    }
    return false; // Mã sinh viên chưa tồn tại
}

// Hàm xóa sinh viên
function deleteStudent(row) {
    tableBody.deleteRow(row.rowIndex); // Xóa hàng tương ứng
}

// Hàm thêm sinh viên vào danh sách
function addStudent() {
    const msv = msvInput.value.trim();
    const roomNumber = spInput.value.trim();

    // Kiểm tra điều kiện
    if (msv === "" || roomNumber === "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Kiểm tra mã sinh viên có tồn tại trong dữ liệu không
    if (!studentData[msv]) {
        // Nếu mã sinh viên không tồn tại, yêu cầu nhập thông tin sinh viên mới
        const name = prompt("Mã sinh viên không tồn tại. Vui lòng nhập tên sinh viên mới:");
        if (!name) {
            alert("Tên sinh viên không được để trống!");
            return;
        }

        // Yêu cầu nhập ngày sinh và lớp
        const dob = prompt("Nhập ngày sinh (dd/mm/yyyy):");
        if (!dob) {
            alert("Ngày sinh không được để trống!");
            return;
        }

        const className = prompt("Nhập lớp:");
        if (!className) {
            alert("Lớp không được để trống!");
            return;
        }

        // Lưu thông tin sinh viên mới vào studentData
        studentData[msv] = {
            name: name,
            gender: prompt("Nhập giới tính (Nam/Nữ):") || "Nam",
            hometown: prompt("Nhập quê quán:") || "Chưa xác định",
            contact: prompt("Nhập số điện thoại:") || "Chưa xác định",
            dob: dob,
            class: className
        };
    }

    // Kiểm tra xem mã sinh viên đã có trong bảng chưa
    if (isStudentExists(msv)) {
        alert("Mã sinh viên đã có trong bảng!");
        return;
    }

    // Tạo một hàng mới cho sinh viên
    const newRow = tableBody.insertRow();

    // Thêm các ô vào hàng mới
    const msvCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const genderCell = newRow.insertCell(2);
    const hometownCell = newRow.insertCell(3);
    const dobCell = newRow.insertCell(4);
    const classCell = newRow.insertCell(5);
    const roomCell = newRow.insertCell(6);
    const contactCell = newRow.insertCell(7);
    const actionCell = newRow.insertCell(8); // Ô mới cho nút xóa

    // Nhập dữ liệu cho các ô từ đối tượng studentData
    msvCell.textContent = msv;
    nameCell.textContent = studentData[msv].name;
    genderCell.textContent = studentData[msv].gender;
    hometownCell.textContent = studentData[msv].hometown;
    dobCell.textContent = studentData[msv].dob; // Hiển thị ngày sinh
    classCell.textContent = studentData[msv].class; // Hiển thị lớp
    roomCell.textContent = roomNumber;
    contactCell.textContent = studentData[msv].contact;

    // Tạo nút xóa
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Xóa";
    deleteButton.style.backgroundColor = "red"; // Màu nền nút xóa
    deleteButton.style.color = "white"; // Màu chữ nút xóa
    deleteButton.addEventListener("click", () => deleteStudent(newRow)); // Gọi hàm xóa
    actionCell.appendChild(deleteButton); // Thêm nút xóa vào ô

    // Xóa giá trị trong các ô input
    msvInput.value = "";
    spInput.value = "";
}

// Thêm sự kiện click cho nút
button.addEventListener("click", addStudent);
