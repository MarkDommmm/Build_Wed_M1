let tbody = document.getElementById("tbody");
let usersLocal = JSON.parse(localStorage.getItem("users"));

let informationUserLocal = JSON.parse(localStorage.getItem("informationUser"));

//render products trên local xuống nè
function renderProducts(e) {
  for (let i = 0; i < usersLocal.length; i++) {
    
    tbody.innerHTML += `
            <tr>
            <td class="text_center">${usersLocal[i].id}</td>

            <td class="text_center">${usersLocal[i].username}</td>
            <td class="text_center">${usersLocal[i].password}</td>
            <td class="text_center">${usersLocal[i].email}</td>
            <td class="text_center" id="VIP">${usersLocal[i].roleUser} <br> </td>

            <td>
                <a id="add" class="add"><i class="fa fa-floppy-o"></i></a>
                <a id="edit" class="edit"><i class="edit fa fa-pencil"></i></a>
                <a id="delete" class="delete"><i class="delete fa fa-trash-o"></i></a>
            </td>
        </tr>
            `;
  }
}
renderProducts();

// Tìm kiếm
function myFunction() {
  let input, filter, table, tr, td, i, tValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      tValue = td.textContent || td.innerText;
      if (tValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
// Thêm USERS vào bảng và đẩy lên local

let updateIndex = -1;
let find = -1;
let container = document.getElementById("container-table");
container.onclick = function (e) {
  if (e.target.classList.contains("add-new")) {
    tbody.innerHTML += `<tr> 
        <td></td> 
        <td><input type="text" class="form-control" placeholder="Nhập Tên username"></td> 
        <td><input type="text" class="form-control" placeholder="Nhập password"></td> 
        <td><input type="text" class="form-control" placeholder="nhập Email"></td> 
        <td><input type="text" class="form-control" placeholder=" Vip"></td> 
        <td> 
        <a id="save" class="save"><i class="save fa-solid fa-cloud-arrow-up"></i></a>
        <a id="delete" class="delete"><i class="fa fa-trash-o"></i></a> </td> 
            </tr>`;
  }
  if (e.target.classList.contains("save")) {
    let name =
      e.target.parentElement.parentElement.parentElement.children[1].children[0]
        .value;
    let password =
      e.target.parentElement.parentElement.parentElement.children[2].children[0]
        .value;
    let email =
      e.target.parentElement.parentElement.parentElement.children[3].children[0]
        .value;
    let vip =
      e.target.parentElement.parentElement.parentElement.children[4].children[0]
        .value;
    let checkIndex = -1;
    for (let i = 0; i < usersLocal.length; i++) {
      if (name.trim() !== "" && name.trim() === usersLocal[i].username) {
        checkIndex = i;
        break;
      }
      if (email.trim() !== "" && email.trim() === usersLocal[i].email) {
        checkIndex = i;
        break;
      }
    }
    if (checkIndex !== -1) {
      swal("Username hoặc email đã có vui lòng nhập lại", " ", "error");
    } else if (
      name.trim() !== "" &&
      validateEmail(email) &&
      password.trim() !== ""
    ) {
      if (password.trim().length < 6) {
        swal("Mật khẩu phải chứa ít nhất 6 ký tự", " ", "error");
      } else {
        swal("Bạn đã đăng kí thành công", " ", "success");
        let user = {
          id: Math.floor(Math.random() * 10000000),
          username: name.trim(),
          email: email.trim(),
          password: password.trim(),
        };
        usersLocal.push(user);
        localStorage.setItem("users", JSON.stringify(usersLocal));
        location.reload();
      }
    } else {
      if (e.target.nodeName !== "INPUT") {
        if (name.trim() === "" || password.trim() === "") {
          swal("Vui lòng nhập đầy đủ thông tin", " ", "error");
        } else if (!validateEmail(email.trim())) {
          swal("Email không hợp lệ, vui lòng nhập lại", " ", "error");
        }
      }
    }
  }

  // ĐÂY LÀ HÀM XÓA NÈ CÁC BẠN
  if (e.target.classList.contains("delete")) {
    let id =
      e.target.parentElement.parentElement.parentElement.children[0].innerText;
    let updatedUser = usersLocal.filter((product) => product.id !== Number(id));

    localStorage.setItem("users", JSON.stringify(updatedUser));
    location.reload();
  }
  if (e.target.classList.contains("edit")) {
    let tr = e.target.closest("tr");
    let id = tr.querySelector("td:first-child").textContent;
    let checkIndex = -1;
    for (let i = 0; i < usersLocal.length; i++) {
      if (usersLocal[i].id === Number(id)) {
        checkIndex = i;
      }
    }
    if (checkIndex > -1) {
      updateIndex = checkIndex;
      find = usersLocal[checkIndex];

      tr.innerHTML = `
          <td>${find.id}</td>
          <td><input type="text" class="form-control" name="name_product" id="name_product" value="${find.username}"></td>
          <td><input type="text" class="form-control" name="img_product" id="img_product" value="${find.password}"></td>
          <td><input type="text" class="form-control" name="" id="price"  value="${find.email}"></td>
          <td><input type="text" class="form-control" name="" id="price"  value="${find.roleUser}"></td>

          <td> 
            <a id="save" class="save_btn"><i class="save_btn fa-solid fa-cloud-arrow-up"></i></a>
            <a id="delete" class="delete_btn"><i class="fa fa-trash-o"></i></a>
          </td>`;
    }
  }
  if (e.target.classList.contains("save_btn")) {
    // Lấy thông tin sản phẩm cần sửa đổi từ các trường nhập liệu
    let name =
      e.target.parentElement.parentElement.parentElement.children[1].children[0]
        .value;
    let password =
      e.target.parentElement.parentElement.parentElement.children[2].children[0]
        .value;
    let email =
      e.target.parentElement.parentElement.parentElement.children[3].children[0]
        .value;
    let vip =
      e.target.parentElement.parentElement.parentElement.children[4].children[0]
        .value;

    // Cập nhật thông tin sản phẩm trong mảng sản phẩm
    usersLocal[updateIndex].username = name;
    usersLocal[updateIndex].password = password;
    usersLocal[updateIndex].email = email;
    usersLocal[updateIndex].roleUser = roleUser;

    // Lưu lại thông tin sản phẩm đã được sửa đổi vào local storage
    localStorage.setItem("users", JSON.stringify(usersLocal));

    // Cập nhật nội dung hàng của sản phẩm trong bảng hiển thị sản phẩm
    let tr = e.target.closest("tr");
    tr.innerHTML = `
      <td>${usersLocal[updateIndex].id}</td>
      <td>${name}</td>
      <td>${password}</td>
      <td>${email}</td>
      <td>${roleUser}</td>

      <td> 
        <a id="edit" class="edit_btn"><i class="fa fa-pencil"></i></a>
        <a id="delete" class="delete_btn"><i class="fa fa-trash-o"></i></a>
      </td>`;
    location.reload();
  }
};

// hàm check validate email
function validateEmail(email) {
  const regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
  return regex.test(email);
}
