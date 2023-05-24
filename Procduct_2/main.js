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
  var username = document.getElementById("username");
  var password = document.getElementById("password-field");
  //Đặt 1 Admin ảo để đăng nhập quản trị
  if (username.value == "admin" && password.value == "123456") {
    swal({
      title: "Welcome bạn tới động admin❤",
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
        "Chúc mừng bạn đăng nhập thành công❤",
        "Chúc bạn mua sắm vui vẻ nhé mãi yêu❤",
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
    localStorage.removeItem("carts");
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
      swal("Bạn đã đăng kí thành công ❤", " ", "success");
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

// ĐÂY LÀ HÀM RENDER PRODUCT Ở GIỮA NÈ
let products = JSON.parse(localStorage.getItem("products"));
let contentText = document.getElementById("content_text");
let content = document.getElementById("content");
let pageProduct = JSON.parse(localStorage.getItem("pageproduct"));
let navModel = document.getElementById("nav_model");
let review_product = document.getElementById("review_product");
let productMore = document.getElementById("product_more");

function renderProduct() {
  navModel.innerHTML = `${pageProduct.model}`;
  content.innerHTML = `
      <div>
				<img src="${pageProduct.img}" alt="">
			</div>
			<div class="content_text" id="content_text">
				<h4>Đồng hồ ${pageProduct.nameproduct}</h4>
				<p>Mã SP: <b>665.NX.7170.LR.1204</b> Giá: <span>${pageProduct.price}</span> <sup>₫</sup></p>
				<p>TÌNH TRẠNG: FULLSET MỚI 100%</p>

				<p>Cam kết tất cả sản phẩm bán ra là Chính Hãng 100%</p>
				<p>Bảo hành từ 2 đến 5 năm theo đúng tiêu chuẩn của hãng</p>
				<p>Tặng gói Spa miễn phí 2 năm trị giá 3.000.000 đồng</p>
				<p>Giao hàng toàn quốc,hỗ trợ 24/7 về chất lượng sản phẩm</p>
				<p>Giá trên website chỉ mang tính tham khảo,có thể thay đổi theo thời điểm để có giá tốt nhất quý khách
					vui lòng LH qua Hotline 0944448286</p>
				<button id="btn_buy" class="buy_btn"> <a class="buy_btn">Đặt mua sản phẩm</a> </button>
			</div>
      <div class="sub_nav1">

				<div class="sub_nav">
					<p>MUA HÀNG TẠI HÀ NỘI</p>
					<p><i class="fa-solid fa-house gold"></i>Số 125 Ô Chợ Dừa - Quận.Đống Đa - Tp.Hà Nội</p>
					<p><i class="fa-solid fa-phone gold"></i>Hotline: 0944448286</p>
				</div>
				<div class="sub_nav">
					<p><i class="fa-solid fa-book-tanakh gold"></i>Bảo hành : Chính hãng toàn quốc</p>
					<p><i class="fa-brands fa-space-awesome gold"></i>Miễn phí vận chuyển toàn quốc, giao nhanh trong
						nội thành Hà Nội & Tp.HCM</p>
				</div>
				<div class="sub_nav">
					<p><i class="fa-solid fa-heart gold"></i>1 đổi 1 trong 10 ngày nếu có lỗi nhà sản xuất</p>
				</div>
			</div>

      `;
  review_product.innerHTML = `
      <div>

				<p>${pageProduct.nameproduct} mang một vẻ bề ngoài ấn tượng với mặt đồng
					hồ tonneau đặc trưng của dòng Spirit Of Big Bang. Ngoại hình thiết bị khá đơn giản, tinh tế với hai
					tông màu đen và trắng chủ đạo. Mặt đồng hồ làm từ kính sapphire trong vắt với khả năng chống phản
					quang hoàn hảo và độ bền cực lớn. Vành đồng hồ đúc titanium nguyên chất cho một độ cứng hoàn hảo với
					trọng lượng rất nhẹ. Bên trên phần vành là 6 chiếc đinh vít được cách điệu theo chữ H trứ danh của
					nhà Hublot, tạo ra độ tương thích tuyệt đối giữa mặt đồng hồ và càng nối dây. Điểm nhấn lớn nhất của
					chiếc đồng hồ là 50 viên kim cương tự nhiên được đính tỉ mỉ quanh chiếc đồng hồ tạo cảm giác sang
					trọng tuyệt đối.</p>
				<p>${pageProduct.nameproduct} có mặt số sở hữu tấm nền đen bí ẩn, thu
					hút. Bộ kim cùng các cọc số đều được hoàn thiện bằng titanium với ngôn ngữ thiết kế sắc sảo, dày
					dặn. Đặt tại góc 6 giờ là một cửa số chỉ ngày tinh giản, tô điểm thêm cho mặt đồng hồ với kích thước
					39mm. Logo và tên thương hiệu Hublot cũng được thiết kế cân bằng, đối xứng ở góc 12 giờ và 6 giờ,
					bao trọn lấy tâm bộ kim.</p>
				<img id="img_content" src="${pageProduct.img}" alt="">
				<p>Dây đồng hồ ${pageProduct.nameproduct} làm từ cao su bọc da nhuộm
					đen, vừa đảm bảo độ bền bỉ cũng như tính thời thượng của sản phẩm. Đi kèm với khóa clasp titanium,
					bộ dây này bắt cặp hoàn hảo với tấm nền mặt đồng hồ, tất cả tạo ra một tổng thể hài hòa giữa các gam
					màu.</p>
				<h3>Bên trong ${pageProduct.nameproduct}
				</h3>
				<p>${pageProduct.nameproduct} không thể hoạt động bền bỉ và chính xác
					nếu thiếu đi bộ máy tự động HUB1710. Khả năng chống thấm nước lên đến 100m, cùng với thời lượng cót
					50 giờ khẳng định độ tinh xảo tối đa trong khâu lắp đặt thủ công của những nghệ nhân vĩ đại nhà
					Hublot.</p>
			</div>
			<div>
				<h3>THÔNG SỐ KỸ THUẬT</h3>
				<p>Dòng sản phẩm: Big Bang</p>
				<p>Thấm nước: Chống thấm nước - Khả năng chống thấm nước lên đến mức 50m hoặc 5 ATM</p>
				<p>Kích thước mặt: 39mm</p>
				<p>Vành đồng hồ: Vành đồng hồ - Đính kim cương thiên nhiên</p>
				<p>Năng lượng: Năng lượng - Máy cơ, tự lên dây</p>
				<p>Chất liệu vỏ: Chất liệu vỏ- thép không gỉ,đính kim cương thiên nhiên</p>
				<p>Dây đeo: Dây đeo - Dây đeo cao su tổng hợp màu đen</p>
				<p>Khóa: Khóa - khóa clasp bằng thép không gỉ</p>
				<p>Mặt kính: Mặt kính - Sapphire với khả năng chống phản chiếu, chống trầy xước</p>
				<p>Sản xuất: tạiThụy Sĩ</p>

			</div>
      `;
  for (let i = 0; i < products.length; i++) {
    productMore.innerHTML += `
        <div class="product click" id="${products[i].id}">
        <a class="click">
        <img class="click" src="${products[i].img}"
        alt="Lỗi hình ảnh huhu">
        <div class="click">
        <a class="click">Đồng Hồ ${products[i].nameproduct}</a>
        <p class="click">Giá: <span>${products[i].price}</span> ₫</p>
        </div>
        </a>
        </div>
        `;
  }
}

renderProduct();
let body = document.getElementsByTagName("body")[0];

body.onclick = function (e) {
  if (e.target.classList.contains("click")) {
    let id = e.target.parentElement.parentElement.id;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === Number(id)) {
        localStorage.setItem("pageproduct", JSON.stringify(products[i]));
      }
    }

    window.location.href = "http://127.0.0.1:5502/Procduct_2/index.html";
  }
};

// dây là phần render giỏ hàng ra (nếu có)
let cart = document.getElementById("cart");
let totalPriceCarts = document.getElementById("total_price_carts");
let carts = JSON.parse(localStorage.getItem("carts")) || [];

let amount = document.getElementById("number_cart");

// // ĐÂY LÀ PHẦN RENDER GIỎ HÀNG NÈ TỪ LOCAL STORAGE
function renderCarts() {
  let sum = 0;
  let totalAmount = 0;
  cart.innerHTML = "";
  for (let i = 0; i < carts.length; i++) {
    amount.style.display = "flex";
    // document.getElementById("alert_cart").style.display = "none";
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

// ĐÂY LÀ PHẦN NÚT BUYYYYYY
let checkCart = false;
let buy = document.getElementById("content");
buy.onclick = function (e) {
  if (e.target.classList.contains("buy_btn")) {
    if (loginUser == null) {
      openModal();
    } else {
      console.log("Hello world");
      let findI = carts.findIndex((e, i) => {
        return e.nameproduct === pageProduct.nameproduct;
      });
      if (findI === -1) {
        carts.push(pageProduct);
        localStorage.setItem("carts", JSON.stringify(carts));
        renderCarts();
        swal(
          "❤Chúc mừng bạn❤",
          "Bạn đã thêm vào giỏ hàng thành công!!!",
          "success",
          {
            button: "Thanh toán đi ❤",
          }
        );
      } else {
        swal({
          title: "Bạn lụm thêm cái nữa hả giàu Ghê ❤ ",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            swal("❤ ❤ ❤ Ôi khách díp đây dồi mãi yêu ❤ ❤ ❤  ", {
              icon: "success",
            });
            carts[findI].amount++;
            localStorage.setItem("carts", JSON.stringify(carts));
            renderCarts();
          } else {
            swal("Your imaginary file is safe!");
          }
        });
      }
      // swal(
      //   "❤Chúc mừng bạn❤",
      //   "Bạn đã thêm vào giỏ hàng thành công!!!",
      //   "success",
      //   {
      //     button: "Thanh toán đi ❤",
      //   }
      // ).then(() => {
      //   carts.push(pageProduct);
      //   localStorage.setItem("carts", JSON.stringify(carts));
      //   renderCarts();
      //   checkCart = true;
      // });
    }
    // swal({
    //   title: "Bạn lụm thêm cái nữa hả giàu Ghê ❤ ",
    //   text: "",
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true,
    // }).then((willBuy) => {
    //   if (willBuy) {
    //     swal("❤ ❤ ❤ Ôi khách díp đây dồi mãi yêu ❤ ❤ ❤  ", {
    //       icon: "success",
    //     });
    //     let productId = pageProduct.id;
    //     let productExists = false;
    //     for (let i = 0; i < carts.length; i++) {
    //       if (carts[i].id === productId) {
    //         carts[i].amount += 1;
    //         productExists = true;
    //         break;
    //       }
    //     }
    //     if (!productExists) {
    //       carts.push(pageProduct);
    //     }
    //     localStorage.setItem("carts", JSON.stringify(carts));
    //     location.reload();
    //   } else {
    //     swal("Bạn mình ơi hãy mua nhiều vào THANKS for LOVE <3");
    //   }
    // });
  }
};

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
        swal("❤Chúc bạn mua sắm vui vẻ!!!");
      }
    });
  }
};

let UlDropDown = document.getElementById("ul_dropdown");
UlDropDown.onclick = function (e) {
  if (e.target.classList.contains("maintenance")) {
    swal("😭 tính năng đang phát triển😭 ", "", "info");
  }
};
