function makeRed() {
  console.log("Ok, making red!");
  $("#section1Head").toggleClass('styled');
}

$(document).ready(function() {
  $("#button").on('click', function() {
    makeRed();
  });
});
