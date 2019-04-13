
window.setupImageRandomizer = function(HIGHEST_IMAGE_ID, ) {

  var HIGHEST_IMAGE_ID = 3851;
  var visitedImages = [];
  var nextImagesToVisit = [];
  var pageContent = document.getElementsByClassName('page-content')[0];


  function updateImage(imageId) {
    // update history to reflect new image
    if (window.history && window.history.replaceState){
      window.history.replaceState({imageId:imageId}, null, '/' + imageId);
    }
    // update the UI to reflect the new image, and hide the back button if it is the first one      
    var newImage = new Image();
    newImage.src =  '/captioned_images/' + imageId + '.jpg';
    newImage.id = 'main-image';
    pageContent.innerHTML = '';
    pageContent.appendChild(newImage);
    if (visitedImages.length === 1) {
      document.getElementById('controls-wrapper').className = 'at-first';
    } else {
      document.getElementById('controls-wrapper').className = '';
    }
  };
  
  
  window.navigateToNextImage = function() {
    if (!nextImagesToVisit.length) {
      nextImagesToVisit.push(Math.floor(Math.random() * HIGHEST_IMAGE_ID) + 1)
    }
    visitedImages.push(nextImagesToVisit.pop());
    updateImage(visitedImages[visitedImages.length-1]);
  };
  
  window.navigateToPreviousImage = function() {
    // once there are no more images in the history to go back to
    // this becomes a no-op
    if (visitedImages.length > 1) {
      nextImagesToVisit.push(visitedImages.pop());
      updateImage(visitedImages[visitedImages.length-1]);
    }
  };

  // bind left and right arrows

  window.addEventListener('keyup', function(e) {
    if (e.keyCode == 37) {
      navigateToPreviousImage();

    } else if (e.keyCode == 39) {
      navigateToNextImage();
    }
  }, false);

  
  function onInit(){
    var imageIdFromURL = window.location.pathname.split('/')[1];
    if (imageIdFromURL) {
      nextImagesToVisit.push(parseInt(imageIdFromURL));
      // add meta tag reflective of the new url
      var meta = document.createElement('meta');
      meta.name = "og:image";
      meta.content = "/captioned_images/" + imageIdFromURL + '.jpg';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    navigateToNextImage();
  }
  
  onInit();

}
