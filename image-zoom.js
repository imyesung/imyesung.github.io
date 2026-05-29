/* Click-to-zoom for blackboard figures.
   Any <img class="zoomable-img"> toggles .zoomed on itself and its
   .image-wrapper; an optional #zoomHint reflects the current state. */
(function () {
  function init() {
    var hint = document.getElementById('zoomHint');
    var images = document.querySelectorAll('.zoomable-img');

    images.forEach(function (img) {
      img.addEventListener('click', function () {
        var zoomed = img.classList.toggle('zoomed');
        var wrapper = img.closest('.image-wrapper');
        if (wrapper) wrapper.classList.toggle('zoomed', zoomed);
        if (hint) {
          hint.textContent = zoomed
            ? 'Click image to fit · Scroll to pan'
            : 'Click image to zoom';
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
