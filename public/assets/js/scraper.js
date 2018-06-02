// MODAL FUNCTIONALITY
// Get the modal
var modal = document.getElementById('my-modal');

var loading = document.getElementById('loading-modal');

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
  $(".loading-modal-body").html(`<img src="/assets/images/onion-dribbble.gif">`);
  loading.style.display = "block";
  $.get("/peel").then(function (data) {
    console.log(data);
    if (data.new === 0) {
      $(".modal-body").html(`<p>No new articles.</p>`);
      loading.style.display = "none";
      modal.style.display = "block";
    }
    else if (data.new === 1) {
      $(".modal-body").html(`<p>1 new article added.</p>`);
      loading.style.display = "none";
      modal.style.display = "block";
    }
    else {
      $(".modal-body").html(`<p>${data.new} new articles added.</p>`);
      loading.style.display = "none";
      modal.style.display = "block";
    }
  });
});

$("#clear-btn").on("click", function () {
  $.ajax("/clear", { type: "DELETE" })
    .then(function (response) {
      console.log(response);
    });
});

$(".main-content").on("click", ".save-article", function () {
  $(".loading-modal-body").html(`<img src="/assets/images/onion-dribbble.gif">`);
  loading.style.display = "block";
  var articleId = $(this).data("id");
  var removeIt = $(this).parents(".article-li");
  $.post("/stick", { _id: articleId })
    .then(function (data) {
      console.log(data);
      loading.style.display = "none";
      $("#modal-title").html("Success!");
      $(".modal-body").html(
        `<p>Article has been saved.</p>`
      );
      modal.style.display = "block";
      removeIt.fadeOut();
    });
});

$(".main-content").on("click", ".delete-article", function () {
  $(".loading-modal-body").html(`<img src="/assets/images/onion-dribbble.gif">`);
  loading.style.display = "block";
  var articleId = $(this).data("id");
  var removeIt = $(this).parents(".article-li");
  $.ajax("/discard", {
    type: "PUT",
    data: { _id: articleId }
  }).then(function (data) {
    removeIt.fadeOut();
    $("#modal-title").html("Success!");
    loading.style.display = "none";
    $(".modal-body").html(
      `<p>Article has been removed from your saved list.</p>`
    );
    modal.style.display = "block";
    console.log(data);
  });

});

$(".main-content").on("click", ".comment-btn", function () {
  var articleId = $(this).data("id");
  $.get("/comments", { _id: articleId })
    .then(function (data) {
      console.log(data);
      var noteHeading = $(`<h3>Notes for Article #${articleId}</h3>`);
      var noteContainer = $(`#${articleId}-notes-container`);
      noteContainer.html(noteHeading);

      // if (data) {
        // for (let i = 0; i < data.note.length; i++) {
        //   const element = data.note;
          var note = $(`<p>${data.note.body}</p>`);
          noteContainer.append(note);
        // }
      // }

      noteContainer.append(`
          <form>
            <textarea id="note-input" rows="3" placeholder="new note..."></textarea>
            <button class="add-note" data-id="${articleId}">Add Note</button>
          </form>
        `);

      noteContainer.slideToggle();

    });

});

$(".main-content").on("click", ".add-note", function (e) {
  e.preventDefault();
  var note = $("#note-input").val().trim();
  var articleId = $(this).data("id");
  var noteObject = {
    note: note,
    id: articleId
  }

  $.post("/comment", noteObject)
    .then(function (data) {
      console.log(data);
    });
});