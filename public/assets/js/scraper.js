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
      //  create modal from response.new
    });
});

$(".main-content").on("click", ".save-article", function () {
  var articleId = $(this).data("id");
  var removeIt = $(this).parents(".article-li");
  $.post("/stick", { _id: articleId })
    .then(function (data) {
      console.log(data);
      //  modal that article has been saved.
      removeIt.fadeOut();
    });
});

$(".main-content").on("click", ".delete-article", function () {
  var articleId = $(this).data("id");
  var removeIt = $(this).parents(".article-li");
  $.ajax("/discard", {
    type: "PUT",
    data: { _id: articleId }
  }).then(function (data) {
    removeIt.fadeOut();
    //  modal that article has been removed
    console.log(data);
  });

});

$(".main-content").on("click", ".comment-btn", function () {

});