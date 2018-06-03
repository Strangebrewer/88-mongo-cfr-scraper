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

$("#scrape-btn").on("click", function () {
  $(".loading-modal-body").html(`<img src="/assets/images/loading.gif">`);
  loading.style.display = "block";
  $.get("/scrape").then(function (data) {
    if (data.new === 0) {
      loading.style.display = "none";
      $("#modal-title").html("Try Again Later.");
      $(".modal-body").html(`<p>No new articles.</p>`);
      modal.style.display = "block";
    }
    else if (data.new === 1) {
      loading.style.display = "none";
      $("#modal-title").html("Success!");
      $(".modal-body").html(`<p>1 new article added.</p>`);
      modal.style.display = "block";
    }
    else {
      loading.style.display = "none";
      $("#modal-title").html("Success!");
      $(".modal-body").html(`<p>${data.new} new articles added.</p>`);
      modal.style.display = "block";
    }

    for (let i = 0; i < data.articles.length; i++) {
      const element = data.articles[i];
      var article = $(`
        <li class="article-li">
          <div class="article-header-container">        
            <div class="article-header">
              <h4 class="topic">
                <a href="https://www.cfr.org${element.topic_link}" target="_blank">${element.topic}</a>
              </h4>
              <h3 class="headline">
                <a href="${element.link}" target="_blank">${element.title}</a>
              </h3>
              <p>${element.date}</p>
            </div>        
            <div class="article-btns">
              <button class="save-article article-btn" data-id="${element._id}">Save Article</button>
            </div>
          </div>
          <div class="notes-container" id="${element._id}-notes-container"></div>   
        </li>
      `);
      $(".article-ul").prepend(article);      
    }
  });
});

$(".main-content").on("click", ".save-article", function () {
  var articleId = $(this).data("id");
  var removeIt = $(this).parents(".article-li");
  $.post("/stick", { _id: articleId })
    .then(function (data) {
      $("#modal-title").html("Success!");
      $(".modal-body").html(
        `<p>Article has been saved.</p>`
      );
      modal.style.display = "block";
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
    $("#modal-title").html("Success!");
    $(".modal-body").html(
      `<p>Article has been removed from your saved list.</p>`
    );
    modal.style.display = "block";
  });

});

$(".main-content").on("click", ".comment-btn", function () {
  var articleId = $(this).data("id");
  var getObj = { _id: `${articleId}` };

  $.get("/comments", getObj)
    .then(function (data) {
      var noteHeading = $(`<h3>Notes</h3>`);
      var noteContainer = $(`#${data._id}-notes-container`);
      noteContainer.html(noteHeading);

      if (data.notes) {
        for (let i = 0; i < data.notes.length; i++) {
          const element = data.notes[i];
          var noteDiv = $(`<div class='note-div'>`);
          var dltBtn = $(`<button data-id='${data._id}' data-note-id='${element._id}'>X</button>`);
          dltBtn.addClass("delete-note-btn note-btn");
          var note = $(`<p>${element.body}</p>`);
          noteDiv.append(dltBtn);
          noteDiv.append(note);
          noteContainer.append(noteDiv);
        }
      }

      noteContainer.append(`
          <form>
            <textarea id="note-input" rows="5" placeholder="new note..."></textarea>
            <button class="add-note note-btn" data-id="${data._id}">Add Note</button>
          </form>
        `);

      noteContainer.slideToggle();

    });

});

$(".main-content").on("click", ".delete-note-btn", function () {
  var noteId = $(this).data("note-id");
  var articleId = $(this).data("id");

  var deleteObj = {
    noteId: noteId,
    articleId: articleId
  }
  $(`#${articleId}-notes-container`).slideToggle();

  $.ajax("/delete/comment", {
    type: 'DELETE',
    data: deleteObj
  }).then(function (data) {
  })
})

$(".main-content").on("click", ".add-note", function (e) {
  e.preventDefault();
  var note = $(this).siblings("#note-input").val().trim();
  var articleId = $(this).data("id");
  var noteObject = {
    note: note,
    id: articleId
  }
  $(`#${articleId}-notes-container`).slideToggle();

  $.post("/add/comment", noteObject)
    .then(function (data) {
    });
});