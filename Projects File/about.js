function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);

var element = document.documentElement,
    body = document.body,
    scrollTop = 'scrollTop',
    scrollHeight = 'scrollHeight',
    progress = document.querySelector('.progress-bar'),
    scroll;

document.addEventListener('scroll', function() {
  scroll = (element[scrollTop]||body[scrollTop]) / ((element[scrollHeight]||body[scrollHeight]) - element.clientHeight) * 100;
  progress.style.setProperty('--scroll', scroll + '%');
});