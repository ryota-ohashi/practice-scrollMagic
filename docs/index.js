// scrollmagicを用いてkvをピン留め、
// kv内の画像をスクロール量と連動させながら切り替えする

// 一枚あたりのスクロール量
var oneImageDuration = 400;
var numImage = 5;
var duration = oneImageDuration * numImage;

// controller
var controller = new ScrollMagic.Controller();

// kvをピン留め
var scene = new ScrollMagic.Scene({
  duration: duration
})
  .setPin(".kv")
  .addTo(controller);

var kv = $(".kv").children();
var scroll = 0;
// var easing = 0.1;
// var smoothScroll = 0;

// var count = 0;
// function incrementValue() {
//   smoothScroll += (scroll - smoothScroll) * easing;
//   $('.smoothScrollValue').text(smoothScroll);
//   requestAnimationFrame(incrementValue);
// }

// requestAnimationFrame(incrementValue);

document.addEventListener('scroll', function () {
  scroll = $(window).scrollTop();

  // 左上に分かりやすく今のスクロール量を表示(デバッグ用)
  $('.scrollValue').text(scroll);

  // 画像切り替え
  switchImage(scroll);
});

function switchImage(scroll) {

    // kv外の時はラストの画像のopacityを1にして早々にreturn
    if (scroll > duration) {
      $(kv[numImage- 1]).css("opacity", 1);
      return;
    }

    // 画像切り替え
    for (let i = 0; i < kv.length; i++) {

      if ( oneImageDuration * (i) < scroll && scroll <= oneImageDuration * (i + 1) ) {
        const valueDec = calcValue(scroll, i, "dec");
        const valueInc = calcValue(scroll, i, "inc");
        if (i !== 0) $(kv[i - 1]).css("opacity", valueDec);
        $(kv[i]).css("opacity", valueInc);

      }else{
        // スクロールが早い場合を考慮して、対象以外の画像のopacityを0に
        $(kv[i]).css("opacity", 0);
      }

    }
}


function calcValue(scroll, i, direction) {

  const diff = scroll - oneImageDuration * i;
  const normalized = diff / oneImageDuration;

  // 増加方向
  if (direction === "inc") {
    return normalized

  // 減少方向
  }else if (direction === "dec"){
    return 1 - normalized;
  }
}

// vh計算
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
// resize
window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});