let infoLocal = JSON.parse(localStorage.getItem("informationUser"));
let tbodyOrder = document.getElementById("total_order");
let footerOrder = document.getElementById("footer_order");
let total_price = 0;
infoLocal.forEach(function (e) {
  let product = e.products;
  let sum = 0;
  let total = 0;
  for (let i = 0; i < product.length; i++) {
    sum += product[i].amount;
    let price = Number(product[i].price.replaceAll(".", ""));
    total_price += price
    let amount = product[i].amount;
    total += amount * price;
   
   
  }
  tbodyOrder.innerHTML += `
  <tr>
  <td>${e.id}</td>
  <td>${e.fullName}</td>
  <td><button class="btn_modal" onclick="openModal()">Thông tin chi tiết sản phẩm</button></td>
  <td>${sum} sản phẩm</td>
  <td>${total.toLocaleString("vi-VN", { useGrouping: true })} đ</td>
  </tr>
  `;

  // let amount =  e[0].info.product.amount
  // sum += price * amount
  
  footerOrder.innerHTML = `
  <tr>
  <th colspan="4">Tổng cộng:</th>
  <td>${total_price.toLocaleString("vi-VN", { useGrouping: true })} đ</td>
  </tr>
  `;
  document.getElementById('number_totalpay').innerHTML = total_price.toLocaleString("vi-VN", { useGrouping: true })
});
function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// tổng đơn hàng!
for (let i = 0; i < infoLocal.length; i++) {
  document.getElementById("number_ship").innerHTML = infoLocal.length;
}
//==========================================================================
// Tổng sản phẩm!
let product = JSON.parse(localStorage.getItem('products'))
for (let i = 0; i < product.length; i++) {
  document.getElementById('number_allproduct').innerHTML= product.length
}
//==========================================================================

let checkInfo = undefined;
let totalOrder = document.getElementById("total_order");
tbodyOrder.onclick = function (e) {
  if (e.target.classList.contains("btn_modal")) {
    document.getElementById("tbody_detail").innerHTML = "";
    let id = e.target.parentElement.parentElement.children[0].innerText;
   
    for (let i = 0; i < infoLocal.length; i++) {
      if (infoLocal[i].id === Number(id)) {
        checkInfo = infoLocal[i].products;
        for (let j = 0; j < checkInfo.length; j++) {
          document.getElementById("tbody_detail").innerHTML += `
            <tr>
            <td class="text_center">${checkInfo[j].id}</td>
            <td class="text_center">
            <img src="${checkInfo[j].img}"</td>
            <td>${checkInfo[j].nameproduct} </td>
            <td class="text_center">${checkInfo[j].amount}</td>
        </tr>
            `;
        }
      }
    }
  }
};
