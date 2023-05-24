// đây là phần MODAL đăng nhập đăng kí
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container_modal");
const form = document.querySelector("#signin-form");
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();
});

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}
let loginUserArray = "";

// đây là phần VALIDATE Form đăng nhập
function validate() {
  const username = document.getElementById("username");
  const password = document.getElementById("password-field");
  console.log(username.value, password.value);

  // Check if admin login
  if (username.value === "admin" && password.value === "admin") {
    swal({
      title: "Welcome bạn tới động admin",
      text: "",
      icon: "success",
      close: true,
      button: "Next",
    }).then(() => {
      window.location.href = "http://127.0.0.1:5502/ADMIN/Admin/custommer.html";
    });
    return;
  }

  // Check if user login
  let usersLocal = localStorage.getItem("users");
  let usersArray = JSON.parse(usersLocal);

  let foundUser = false;
  for (let i = 0; i < usersArray.length; i++) {
    if (
      username.value == usersArray[i].username &&
      password.value == usersArray[i].password
    ) {
      localStorage.setItem("loginusers", JSON.stringify(usersArray[i]));
      swal(
        "Chúc mừng bạn đăng nhập thành công",
        "Chúc bạn mua sắm vui vẻ nhé mãi yêu",
        "success"
      ).then(() => {
        location.reload();
        closeModal();
      });
      foundUser = true;
      break;
    }
  }

  if (!foundUser) {
    swal("Vui lòng nhập đúng thông tin đăng nhập", " ", "error");
  }
}

let loginUser = JSON.parse(localStorage.getItem("loginusers"));

function renderLoginUser() {
  if (loginUser) {
    document.querySelector("#nav-login").innerHTML = `
      <a href="#"><i class="fa-solid fa-user-group"></i>${loginUser.username}</a>
      <ul>
      <li><a href="#">Profile</a></li>
      <li><a class="logout" href="#">Đăng xuất</a></li>
  </ul>
      `;
  }
}
renderLoginUser();

// ĐÂY LÀ PHẦN LOGIN CỦA MOBILE
function renderLoginUserMobile() {
  if (loginUser) {
    document.querySelector("#login_mobile").innerHTML = `
    <i class="fa-solid fa-user-group" onclick="toggleDropdown()"></i>
    <ul class="dropdown_mobile" id="dropdown_menu">
        <li><a href="#">${loginUser.username}</a></li>
        <li><a class="logout" href="#">Đăng xuất</a></li>
    </ul>
      `;
  }
}
renderLoginUserMobile();
function toggleDropdown() {
  var dropdown = document.getElementById("dropdown_menu");
  dropdown.classList.toggle("show");
}

let navLoginMobile = document.getElementById("login_mobile");
navLoginMobile.onclick = function (e) {
  if (e.target.classList.contains("logout")) {
    localStorage.removeItem("loginusers");
    localStorage.removeItem("carts")
    location.reload();
  } 
};
// =-================================================================== 

// ĐÂY LÀ PHẦN LOGOUT CỦA TRANG
let navLogin = document.getElementById("nav-login");
navLogin.onclick = function (e) {
  if (e.target.classList.contains("logout")) {
    localStorage.removeItem("loginusers");
    localStorage.removeItem("carts")
    location.reload();
  }
};
// =-================================================================== 

// ĐÂY LÀ FORM ĐĂNG KÍ
let formModal = document.querySelector(".form_modal");
let userNameSignUp = document.querySelector("#username_signup");
let emailSignUp = document.querySelector("#email_signup");
let passWordSignUp = document.querySelector("#password_signup");

let users = JSON.parse(localStorage.getItem("users")) || [];
formModal.onclick = function (e) {
  e.preventDefault();
  if (e.target.classList.contains("btn_modal")) {
    let checkIndex = -1;
    for (let i = 0; i < users.length; i++) {
      if (userNameSignUp.value.trim() !== "" && userNameSignUp.value.trim() === users[i].username) {
        checkIndex = i;
        break;
      }
      if ( emailSignUp.value.trim() !== "" && emailSignUp.value.trim() === users[i].email ) {
        checkIndex = i;
        break;
      }
    } 
    if (checkIndex !== -1) {
      swal("Username hoặc email đã có vui lòng nhập lại", " ", "error");
    } else if (userNameSignUp.value.trim() !== "" && validateEmail(emailSignUp.value) && passWordSignUp.value.trim() !== "") {
      if (passWordSignUp.value.trim().length < 6) {
        swal("Mật khẩu phải chứa ít nhất 6 ký tự", " ", "error");
      } else {
        swal("Bạn đã đăng kí thành công", " ", "success");
        let user = {
          id: Math.floor(Math.random() * 10000000),
          username: userNameSignUp.value.trim(),
          email: emailSignUp.value.trim(),
          password: passWordSignUp.value.trim(),
          roleUser: "VIP 0" ,
          totalpay: 0,
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        formModal.reset();
      }
    } else {
      if (e.target.nodeName !== "INPUT") {
        if (
          userNameSignUp.value.trim() === "" ||
          passWordSignUp.value.trim() === ""
        ) {
          swal("Vui lòng nhập đầy đủ thông tin", " ", "error");
        } else if (!validateEmail(emailSignUp.value.trim())) {
          swal("Email không hợp lệ, vui lòng nhập lại", " ", "error");
        }
      }
    }
  }
};

function validateEmail(email) {
  const regex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
  return regex.test(email);
}

//===========================================================================>>>
// LẤY PRODUCT TỪ LOCALSTOARGE XUỐNG
let productsLocal = JSON.parse(localStorage.getItem("products"));
// dây là phần render giỏ hàng ra (nếu có)
let carts = JSON.parse(localStorage.getItem("carts")) || [];

let cart = document.getElementById("cart");
let totalPriceCarts = document.getElementById("total_price_carts");
let sum = 0;
let totalAmount = 0;
let amount = document.getElementById("number_cart");
// ĐÂY LÀ PHẦN RENDER GIỎ HÀNG NÈ TỪ LOCAL STORAGE
function renderCarts() {
  for (let i = 0; i < carts.length; i++) {
    amount.style.display = "flex";
    document.getElementById("alert_cart").style.display = "none";
    cart.innerHTML += `
        <div id="${carts[i].id}" class="cart_child">
        <div>
        <img src="${carts[i].img}">
        </div>
        <div class="text_cart">
        <p id="name_cart">${carts[i].nameproduct}</p>
        <span id="amount_cart">${carts[i].amount} x <b id="price_cart" class="gold">${carts[i].price}</b>₫</span>
        </div>
        <div>
        <i class="fa-regular fa-circle-xmark"></i>
        </div>
        </div>
        </div>
      `;
    totalAmount += carts[i].amount;

    sum += carts[i].amount * Number(carts[i].price.replaceAll(".", ""));
    amount.innerHTML = totalAmount;
  }
  totalPriceCarts.innerHTML = sum.toLocaleString("vi-VN", {
    useGrouping: true,
  });
}
renderCarts();

// // đây là hàm xóa sản phẩm trong giỏ hàng
cart.onclick = function (e) {
  if (e.target.classList.contains("fa-circle-xmark")) {
    swal({
      title: "Bạn có muốn xóa đồng hồ khỏi giỏ hàng không?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Bạn đã xóa thành công!!!", {
          icon: "success",
        });
        let id = e.target.parentElement.parentElement.id;
        for (let i = 0; i < carts.length; i++) {
          if (carts[i].id === Number(id)) {
            if (carts[i].amount === 1) {
              // Nếu amount của sản phẩm = 1 thì xóa sản phẩm khỏi giỏ hàng
              carts.splice(i, 1);
            } else {
              // Ngược lại, giảm amount đi 1
              carts[i].amount -= 1;
            }
            localStorage.setItem("carts", JSON.stringify(carts));
            location.reload();
          }
        }
        renderCarts();
      } else if (!willDelete) {
        swal("Chúc bạn mua sắm vui vẻ!!!");
      }
    });
  }
};

let pageProduct = JSON.parse(localStorage.getItem("pageproduct")) || [];

//render sản phẩm  Rolex
let contentRolex = document.getElementById("content_rolex");
let body = document.getElementsByTagName("body")[0];

body.onclick = function (e) {
  if (e.target.classList.contains("click")) {
    let id = e.target.parentElement.parentElement.id;
    for (let i = 0; i < productsLocal.length; i++) {
      if (productsLocal[i].id === Number(id)) {
        localStorage.setItem("pageproduct", JSON.stringify(productsLocal[i]));
      }
    }

    window.location.href = "http://127.0.0.1:5502/Procduct_2/index.html";
  }
  // phần thông báo tính năng đang bảo trì hoặc phát triển ngen
  if (e.target.classList.contains("maintenance")) {
    swal("😭 tính năng đang phát triển😭 ", "", "info");
  }
};
function renderRolex() {
  for (let i = 0; i < productsLocal.length; i++) {
    if (productsLocal[i].model == "ROLEX") {
      contentRolex.innerHTML += `
      <div class="product click" id="${productsLocal[i].id}">
      <a class="click">
      <img class="click" src="${productsLocal[i].img}"
      alt="Lỗi hình ảnh huhu">
      <div class="click fix" >
      <a class="click">Đồng Hồ ${productsLocal[i].nameproduct}</a>
      <p class="click">Giá: <span>${productsLocal[i].price}</span> ₫</p>
      </div>
      </a>
      </div>
      `;
    }
  }
}
renderRolex();

// HẦM RENDER PRODUCT HUBLOT
let contentHublot = document.getElementById("content_hublot");

function renderHublot(e) {
  for (let i = 0; i < productsLocal.length; i++) {
    if (productsLocal[i].model == "HUBLOT") {
      contentHublot.innerHTML += `
      <div class="product click" id="${productsLocal[i].id}">
      <a class="click">
      <img class="click" src="${productsLocal[i].img}"
      alt="Lỗi hình ảnh huhu">
      <div class="click fix" >
      <a class="click">Đồng Hồ ${productsLocal[i].nameproduct}</a>
      <p class="click">Giá: <span>${productsLocal[i].price}</span> ₫</p>
      </div>
      </a>
      </div>
      `;
    }
  }
}
renderHublot();
