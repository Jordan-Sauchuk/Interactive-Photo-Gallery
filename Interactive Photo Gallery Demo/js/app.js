//Define Variables Chalkey Style 

var $overlay = $('<div id="overlay"></div>');
var $escape = $('<div id="escape">X</div>');
var $flex = $('<div id="flex"></div>');
var $prev = $('<div id="prev">&lsaquo;</div>');
var $image = $('<img>');
var $next = $('<div id="next">&rsaquo;</div>');
var $caption = $("<p></p>");


var currentImg;
var imgLocation;
var imgCaption;
var overlayVisibility = false;

$overlay.append($escape);
$overlay.append($flex);
$flex.append($prev);
$flex.append($image);
$flex.append($next);
$overlay.append($caption);

$("body").append($overlay);


//Lightbox with information 

$("#imgGallery a").click(function(event) {
  event.preventDefault();
  currentImg = $(this).children("img");
  imgLocation = $(this).attr("href");
  $image.attr("src", imgLocation);
  imgCaption = $(this).children("img").attr("alt");
  $caption.text(imgCaption);
  $overlay.show();
  overlayVisibility = true;
});
    
//JS FOR NEXT IMAGE 

var next = function() {
  imgLocation = currentImg.parents("li").next().children("a").attr("href");
  $image.attr("src", imgLocation);
  imgCaption = currentImg.parents("li").next().children("a").children("img").attr("alt");
  $caption.text(imgCaption);
  $overlay.show();
  currentImg = currentImg.parents("li").next().children("a").children("img");
};

//JS FOR PREVIOUS IMAGE

var prev = function() {
  imgLocation = currentImg.parents("li").prev().children("a").attr("href");
  $image.attr("src", imgLocation);
  imgCaption = currentImg.parents("li").prev().children("a").children("img").attr("alt");
  $caption.text(imgCaption);
  $overlay.show();
  currentImg = currentImg.parents("li").prev().children("a").children("img");
};

//NEXT BUTTON
$('#next').click(function() {
  if (currentImg.parents("li").next().children("a").children("img").length !== 0) {
      next();
  } 
});

//PREVIOUS BUTTON
$('#prev').click(function() {
  if (currentImg.parents("li").prev().children("a").children("img").length !== 0) {
    prev();
  } 
});

//ARROW KEYS
$(window).keyup(function(event) {
  if (overlayVisibility === true) {
    if (event.which === 39 && currentImg.parents("li").next().children("a").children("img").length !== 0) {
      next();
    }
    if (event.which === 37 && currentImg.parents("li").prev().children("a").children("img").length !== 0) {
      prev();
    } 
  }
});


// OTHER PROPERTIES 




//HIDE LIGHTBOX
$image.click(function() {
  $overlay.hide();
});

$escape.click(function() {
   $overlay.hide(); 
});







//BLOCK FORM
$("form").submit(function(event) {
  event.preventDefault();
});






//SEARCH OPTION
$('#search').keyup(function() {
  $search = $(this).val().toLowerCase();
  if ($search.length === 0) {
      $('#imgGallery img').each(function(){
         $(this).parents('li').show(); 
      });
  } else {
    $('#imgGallery img').each(function() {
        if ($(this).attr("alt").toLowerCase().search($search) < 0) {
            $(this).parents('li').hide();
        }
        else {
            $(this).parents('li').show();
        }
    });
  }
});