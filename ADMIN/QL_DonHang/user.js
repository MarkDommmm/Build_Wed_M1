let tbody = document.getElementById("tbody");
let informationUserLocal =
  JSON.parse(localStorage.getItem("informationUser")) || [];

//Tìm kiếm
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
// =========================================================================================

let productLocal = JSON.parse(localStorage.getItem("products"));

tbody.onclick = function (e) {
  // đây là ủy quyền sự kiện click chỉnh trạng thái đơn hàng
  if (e.target.classList.contains("fa-pen-to-square")) {
    let td = e.target.parentElement;

    td.innerHTML = `
   <select name="status" id="status" class="status" placeholder="Tình trạng đơn hàng">
   <option value="Đã xong">Đã xong</option>
    <option value="Đang xử lý">Đang xử lý</option>
    <option value="Đang ship hàng">Đang ship hàng</option>
    </select> 
  <br>
  <a id="save" class="save"><i class="fa fa-floppy-o save"></i></a>
   `;
  }
  //đây là phần save sau khi chỉnh sửa trạng thái đơn hàng
  if (e.target.classList.contains("save")) {
    let select = document.getElementById("status");
    let id =
      e.target.parentElement.parentElement.parentElement.children[0].innerText;

    for (let i = 0; i < informationUserLocal.length; i++) {
 
      if (informationUserLocal[i].id === Number(id)) {
        informationUserLocal[i].transport = select.value;
        localStorage.setItem(
          "informationUser",
          JSON.stringify(informationUserLocal)
        );
        renderProduct()
        break;
      }
    }
   
  }

  
  // phần modal thông tin chi tiết sản phẩm
  let checkInfo = undefined;
  if (e.target.classList.contains("btn_modal")) {
    document.getElementById("tbody_detail").innerHTML = "";
    let id = e.target.parentElement.parentElement.children[0].innerText;
    for (let i = 0; i < informationUserLocal.length; i++) {
      if (informationUserLocal[i].id === Number(id)) {
        checkInfo = informationUserLocal[i].products;
        for (let j = 0; j < checkInfo.length; j++) {
          document.getElementById("tbody_detail").innerHTML += `
          <tr>
          <td class="text_center">${checkInfo[j].id}</td>
          <td class="text_center">${checkInfo[j].nameproduct} </td>
          <td class="text_center">
          <img src="${checkInfo[j].img}"</td>
          <td class="text_center">${checkInfo[j].amount}</td>
      </tr>
          `;
        }
      }
    }
  }
};
// =========================================================================================

let tbodyTest = document.getElementById("tbody");

let sum = 0;
function renderProduct(e) {
  tbodyTest.innerHTML = ''
  for (let i = 0; i < informationUserLocal.length; i++) {
    let products = informationUserLocal[i].products;
    let sum = 0;
    for (let j = 0; j < products.length; j++) {
      sum += products[j].amount;
    }
    console.log(informationUserLocal[i]);
    tbodyTest.innerHTML += `
       <tr>
      <td class="text_center">${informationUserLocal[i].id}</td>
      <td class="text_center">
      Tên khách hàng: 
      ${informationUserLocal[i].fullName} <br>
      Địa chỉ:
      ${informationUserLocal[i].address}<br>
      Số điện thoại:
      ${informationUserLocal[i].phoneNumber}<br>
      Phương thức thanh toán:
      ${informationUserLocal[i].pay}<br>
      Ghi chú:
      ${informationUserLocal[i].note}<br>
      </td>
      <td class="text_center">${sum}</td>
      <td class="text_center"><button class="btn_modal" onclick="openModal()">Thông tin chi tiết sản phẩm</button></td>
      <td class="text_center">
      ${informationUserLocal[i].transport}!     
          <i class="fa-solid fa-pen-to-square"></i>
  </td>
      </tr>
      `;
  }
}
renderProduct()
// =========================================================================================

// đây là phần modal
function openModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
// =========================================================================================
