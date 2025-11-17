// ---- FUNCTION TO SETUP STAR RATING ----
function setupStars(starContainerId, ratingInputId) {
  const stars = document.querySelectorAll(`#${starContainerId} span`);
  stars.forEach(star => {
    star.addEventListener("click", () => {
      let rating = star.getAttribute("data-star");
      document.getElementById(ratingInputId).value = rating;

      stars.forEach(s => s.classList.remove("selected"));
      for (let i = 0; i < rating; i++) {
        stars[i].classList.add("selected");
      }
    });
  });
}

setupStars("stars1", "rating1");
setupStars("stars2", "rating2");


// ---- GENERIC COMMENT HANDLER ----
function handleComment(formId, nameId, emailId, commentId, ratingId,
  totalCommentsId, avgRatingId, commentsListId, nameErrorId, commentErrorId) {

  document.getElementById(formId).addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById(nameId).value.trim();
    let comment = document.getElementById(commentId).value.trim();
    let rating = parseInt(document.getElementById(ratingId).value);

    let nameError = document.getElementById(nameErrorId);
    let commentError = document.getElementById(commentErrorId);

    nameError.innerText = "";
    commentError.innerText = "";

    let valid = true;

    if (name.length < 2 || name.length > 50) {
      nameError.innerText = "Name must be 2–50 characters.";
      valid = false;
    }

    if (comment.length < 10 || comment.length > 500) {
      commentError.innerText = "Comment must be 10–500 characters.";
      valid = false;
    }

    if (!valid) return;

    let box = `
      <div class="comment-box">
        <strong>${name}</strong>
        <p>${comment}</p>
        ${rating > 0 ? `<div class='rating-display'>Rating: ${rating} ⭐</div>` : ''}
      </div>
    `;

    document.getElementById(commentsListId).innerHTML += box;

    let totalElement = document.getElementById(totalCommentsId);
    let avgElement = document.getElementById(avgRatingId);

    let total = parseInt(totalElement.innerText) + 1;
    totalElement.innerText = total;

    let prevRating = parseFloat(avgElement.getAttribute("data-total-rating") || 0);
    let newRatingTotal = prevRating + (rating > 0 ? rating : 0);

    avgElement.setAttribute("data-total-rating", newRatingTotal);
    avgElement.innerText = (newRatingTotal / total).toFixed(1);

    document.getElementById(formId).reset();
    document.getElementById(ratingId).value = 0;
  });
}

handleComment(
  "commentForm1", "name1", "email1", "comment1", "rating1",
  "totalComments1", "avgRating1", "commentsList1",
  "nameError1", "commentError1"
);

handleComment(
  "commentForm2", "name2", "email2", "comment2", "rating2",
  "totalComments2", "avgRating2", "commentsList2",
  "nameError2", "commentError2"
);
