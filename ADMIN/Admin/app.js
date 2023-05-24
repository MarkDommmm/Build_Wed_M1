let tbody = document.getElementById("tbody");
let productsAll = JSON.parse(localStorage.getItem("products")) || [];

//render products trên local xuống nè
function renderProducts(e) {
  for (let i = 0; i < productsAll.length; i++) {
    tbody.innerHTML += ` 
            <tr>
            <td class="text_center">${productsAll[i].id}</td>

            <td class="text_center">${productsAll[i].nameproduct}</td>
            <td id="img_table"><img width="100px" src="${productsAll[i].img}" alt=""></td>
            <td class="text_center">${productsAll[i].price}</td>
            <td class="text_center">${productsAll[i].model}</td>
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
// Thêm sản phẩm vào bảng và đẩy lên local

let updateIndex = -1;
let find = -1;
let container = document.getElementById("container-table");
container.onclick = function (e) {
  if (e.target.classList.contains("add-new")) {
    tbody.innerHTML += `<tr> 
        <td></td> 
        <td><input type="text" class="form-control" name="name_product" id="name_product" placeholder="Nhập Tên sản phẩm"></td> 
        <td><input type="text" class="form-control" name="img_product" id="img_product"></td> 
        <td><input type="text" class="form-control" name="" id="" value="" placeholder="Giá tiền"></td> +
        <td><input type="text" class="form-control" name="model" id="model" value="" placeholder="Model"></td>  
        <td> 
        <a id="save" class="save"><i class="save fa-solid fa-cloud-arrow-up"></i></a>
        <a id="delete" class="delete"><i class="fa fa-trash-o"></i></a> </td> 
            </tr>`;
  }
  if (e.target.classList.contains("save")) {
    let id = Math.floor(Math.random() * 10000000);
    let nameProduct =
      e.target.parentElement.parentElement.parentElement.children[1].children[0]
        .value;
    let imgProduct =
      e.target.parentElement.parentElement.parentElement.children[2].children[0]
        .value;
    let priceProduct =
      e.target.parentElement.parentElement.parentElement.children[3].children[0]
        .value;
    let modelProduct =
      e.target.parentElement.parentElement.parentElement.children[4].children[0]
        .value;
    let work = {
      id: id,
      nameproduct: nameProduct,
      img: imgProduct,
      price: priceProduct,
      amount: 1,
      model: modelProduct,
    };
    productsAll.push(work);
    localStorage.setItem("products", JSON.stringify(productsAll));
    location.reload();
  } 

  // ĐÂY LÀ HÀM XÓA NÈ CÁC BẠN
  if (e.target.classList.contains("delete")) {
    let id =
      e.target.parentElement.parentElement.parentElement.children[0].innerText;
    let updatedProducts = productsAll.filter(
      (product) => product.id !== Number(id)
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    location.reload();
  }
  if (e.target.classList.contains("edit")) {
    let tr = e.target.closest("tr");
    let id = tr.querySelector("td:first-child").textContent;
    let checkIndex = -1;
    for (let i = 0; i < productsAll.length; i++) {
      if (productsAll[i].id === Number(id)) {
        checkIndex = i;
      }
    }
    if (checkIndex > -1) {
      updateIndex = checkIndex;
      find = productsAll[checkIndex];

      tr.innerHTML = `
          <td>${find.id}</td>
          <td><input type="text" class="form-control" name="name_product" id="name_product" value="${find.nameproduct}"></td>
          <td><input type="text" class="form-control" name="img_product" id="img_product" value="${find.img}"></td>
          <td><input type="text" class="form-control" name="" id="price"  value="${find.price}"></td>
          <td><input type="text" class="form-control" name="model" id="model"  value="${find.model}"></td>
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

    let img =
      e.target.parentElement.parentElement.parentElement.children[2].children[0]
        .value;

    let price =
      e.target.parentElement.parentElement.parentElement.children[3].children[0]
        .value;
        
    let model =
      e.target.parentElement.parentElement.parentElement.children[4].children[0]
        .value;

    // Cập nhật thông tin sản phẩm trong mảng sản phẩm
    productsAll[updateIndex].nameproduct = name;
    productsAll[updateIndex].img = img;
    productsAll[updateIndex].price = price;
    productsAll[updateIndex].model = model;

    // Lưu lại thông tin sản phẩm đã được sửa đổi vào local storage
    localStorage.setItem("products", JSON.stringify(productsAll));
    localStorage.removeItem('carts')

    // Cập nhật nội dung hàng của sản phẩm trong bảng hiển thị sản phẩm
    let tr = e.target.closest("tr");
    tr.innerHTML = `
      <td>${productsAll[updateIndex].id}</td>
      <td>${name}</td>
      <td>${img}</td>
      <td>${price}</td>
      <td>${model}</td>
      <td> 
        <a id="edit" class="edit_btn"><i class="fa fa-pencil"></i></a>
        <a id="delete" class="delete_btn"><i class="fa fa-trash-o"></i></a>
      </td>`;
    location.reload();
  }
};
