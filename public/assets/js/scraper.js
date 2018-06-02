// MODAL FUNCTIONALITY
// Get the modal
var modal = document.getElementById('my-modal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal-close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$("#peel-btn").on("click", function () {

  $.get("/peel").then(function (data) {
    console.log(data);
  });
});

$("#clear-btn").on("click", function () {
  $.ajax("/clear", { type: "DELETE" })
    .then(function (response) {
      console.log(response);
    });
});