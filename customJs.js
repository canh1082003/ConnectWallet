document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addAccount").onclick = function () {
    showContainer("container-add");
    showSearch(false);
  };

  document.getElementById("editAccount").onclick = function () {
    showContainer("container-list");
    showSearch(true);
  };
});

function showContainer(containerId) {
  document.getElementById("container-add").style.display = "none";
  document.getElementById("container-list").style.display = "none";
  document.getElementById(containerId).style.display = "block";
}

function showSearch(visible) {
  document.querySelector(".search").style.display = visible ? "block" : "none";
}



// Lấy modal và các phần tử trong modal
const editAccountModal = document.getElementById("editAccountModal");
const closeModalBtn = document.querySelector(".close");

// Hàm mở modal form sửa
function openEditForm() {
	editAccountModal.style.display = "block";
}

// Hàm đóng modal form sửa
function closeEditForm() {
	editAccountModal.style.display = "none";
}

// Sự kiện đóng modal khi nhấn vào nút 'x'
closeModalBtn.onclick = function () {
	closeEditForm();
};

// Đóng modal khi nhấn ngoài modal
window.onclick = function (event) {
	if (event.target == editAccountModal) {
		closeEditForm();
	}
};

// Sự kiện mở modal khi nhấn vào icon edit
document.getElementById("edit").addEventListener("click", openEditForm);