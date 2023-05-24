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
// đây là phần VALIDATE Form đăng nhập
function validate() {
  var username = document.getElementById("username");
  var password = document.getElementById("password-field");
  //Đặt 1 Admin ảo để đăng nhập quản trị
  if (username.value == "admin" && password.value == "123456") {
    swal({
      title: "Welcome bạn tới động admin",
      text: "",
      icon: "success",
      close: true,
      button: "Next",
    }).then(() => {
      window.location.href = "http://127.0.0.1:5502/ADMIN/Admin/custommer.html";
    });
  }
  //Nếu không nhập gì mà nhấn đăng nhập thì sẽ báo lỗi
  if (!username.value && !password.value) {
    swal({
      title: "",
      text: "Bạn chưa điền đầy đủ thông tin đăng nhập...",
      icon: "error",
      close: true,
      button: "Thử lại",
    });
  }
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

// ĐÂY LÀ PHẦN LOGOUT CỦA TRANG
let navLogin = document.getElementById("nav-login");
navLogin.onclick = function (e) {
  if (e.target.classList.contains("logout")) {
    localStorage.removeItem("loginusers");
    localStorage.removeItem("carts")
    location.reload();
  }
};

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
      if (
        userNameSignUp.value === users[i].username ||
        emailSignUp.value === users[i].email
      ) {
        checkIndex = i;
      }
    }
    if (checkIndex != -1) {
      swal("Username hoặc email đã có vui lòng nhập lại", " ", "error");
    } else if (
      userNameSignUp.value !== "" &&
      validateEmail(emailSignUp.value) &&
      passWordSignUp.value !== ""
    ) {
      swal("Bạn đã đăng kí thành công", " ", "success");
      let user = {
        id: Math.floor(Math.random() * 10000000),
        username: userNameSignUp.value,
        email: emailSignUp.value,
        password: passWordSignUp.value,
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      formModal.reset();
    } else {
      if (e.target.nodeName !== "INPUT") {
        if (userNameSignUp.value === "" || passWordSignUp.value === "") {
          swal("Vui lòng nhập đầy đủ thông tin", " ", "error");
        } else if (!validateEmail(emailSignUp.value)) {
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

// RENDER GIỎ HÀNG
let carts = JSON.parse(localStorage.getItem("carts")) || [];
let cart = document.getElementById("cart");
let containerAll = document.getElementById("container");
let totalPriceCarts = document.getElementById("total_price_carts");
let totalAmount = 0;
let sum = 0;
let amount = document.getElementById("number_cart");
// ĐÂY LÀ PHẦN RENDER GIỎ HÀNG NÈ TỪ LOCAL STORAGE
function renderCarts() {
  for (let i = 0; i < carts.length; i++) {
    totalAmount += carts[i].amount;

    amount.innerHTML = totalAmount;
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

// ĐÂY LÀ PHẦN THÔNG TIN KHÁCH HÀNG
let username = document.getElementById("username_input");
let address = document.getElementById("address");
let phoneNumber = document.getElementById("phone");
let email = document.getElementById("email");
let note = document.getElementById("note");
let bank = document.querySelector(".bank");
let formAll = document.getElementById("form");

let informationUser = JSON.parse(localStorage.getItem("informationUser")) || [];
let usersLocal = JSON.parse(localStorage.getItem("users"));

formAll.onsubmit = function (e) {
  e.preventDefault();

  const usernameValue = username.value;
  const addressValue = address.value.trim();
  const phoneNumberValue = phoneNumber.value.trim();
  const emailValue = email.value.trim();
  if (
    usernameValue !== "" &&
    addressValue !== "" &&
    phoneNumberValue !== "" &&
    emailValue !== ""
  ) {
    // for (let i = 0; i < carts.length; i++) {
    //   let confirm = [
    //     {
    //       info:{
    //         user: {
    //           id: carts.id,
    //           username: usernameValue,
    //           address: addressValue,
    //           phoneNumber: phoneNumberValue,
    //           email: emailValue,
    //           note: note.value,
    //           pay: bank.value,
    //           transport:"Đang xử lý!",
    //         },
    //         product: {
    //           id:carts[i].id,
    //           img: carts[i].img,
    //           nameproduct: carts[i].nameproduct,
    //           amount: carts[i].amount,
    //           price: carts[i].price,
    //           totalPrice: totalPriceCarts.innerHTML,
    //         },
    //         usersLogin:{
    //           id: loginUser.id,
    //           username: loginUser.username,
    //           email:loginUser.email,
    //           password:loginUser.password,
    //           roleUser :  loginUser.roleUser
    //         }
    //       }
    //     },
    //   ];
    //   informationUser.push(confirm);
    //   localStorage.setItem("informationUser", JSON.stringify(informationUser));
    //   localStorage.removeItem("carts")
    //   swal("Đa tạ hihi! lần sau nhớ mua nhìu vào nhá!!", " ", "success").then(() => {
    //     window.location.href = " http://127.0.0.1:5502/Home%20_1/index.html";
    //   });
    // }

    // Thanh toán và thêm đơn hàng mới
    let order = {
      id: Math.floor(Math.random() * 1000000000),
      fullName: usernameValue,
      address: addressValue,
      phoneNumber: phoneNumberValue,
      email: emailValue,
      note: note.value,
      pay: bank.value,
      transport: "Đang xử lý!",
      products: carts,
      usersLogin: {
        id: loginUser.id,
        username: loginUser.username,
        email: loginUser.email,
        password: loginUser.password,
        roleUser: loginUser.roleUser,
      },
    };
    informationUser.push(order);
    localStorage.setItem("informationUser", JSON.stringify(informationUser));
    localStorage.removeItem("carts");
    swal("Đa tạ hihi! lần sau nhớ mua nhìu vào nhá!!", " ", "success").then(
      () => {
        window.location.href = " http://127.0.0.1:5502/Home%20_1/index.html";
      }
    );
  } else {
    swal("Vui lòng nhập đầy đủ và đúng định dạng thông tin", "", "error");
  }
};

//  ĐÂY LÀ  PHẦN ĐƠN HÀNG CỦA BẠN NÈ

function renderOder() {
  for (let i = 0; i < carts.length; i++) {
    let totalPrice = document.getElementById("total_price");
    document.getElementById("tbody").innerHTML += `
      <tr>
            <td class="text_table">Đồng hồ ${carts[i].nameproduct} <span class="gold">X</span> ${carts[i].amount}</td>
            <td class="gold">${carts[i].price}<span class="white">đ</span></td>
      </tr>
      `;
    totalPrice.innerHTML = `
        <td id="total_price" class="gold">${(
          carts[i].amount * Number(carts[i].price.replaceAll(".", ""))
        ).toLocaleString("vi-VN", {
          useGrouping: true,
        })}<span class="white">đ</span></td>
      `;
  }
}
renderOder();

let totalPrice = (document.getElementById(
  "total_price"
).innerHTML = `${totalPriceCarts.innerHTML}<span class="white"> đ</span>`);

let UlDropDown = document.getElementById("ul_dropdown");
UlDropDown.onclick = function (e) {
  if (e.target.classList.contains("maintenance")) {
    swal("😭 tính năng đang phát triển😭 ", "", "info");
  }
};
