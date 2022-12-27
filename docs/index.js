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
var len = kv.length;
var perDuration = duration / len;
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
      $(kv[len - 1]).css("opacity", 1);
      return;
    }

    // 画像切り替え
    for (let i = 0; i < kv.length; i++) {

      if ( perDuration * (i) < scroll && scroll <= perDuration * (i + 1)) {
        const value = calcValue(scroll, i);
        $(kv[i]).css("opacity", value);
      }else{
        // スクロールが早い場合を考慮して、対象以外の画像のopacityを0に
        $(kv[i]).css("opacity", 0);
      }

    }
}


function calcValue(scroll, i) {
  var diff = scroll - perDuration * i;
  var normalized = diff / perDuration;
  var value;

  // 最初の画像以外は0→1→0
  if (i !== len - 1) {
    if(0 <= normalized && normalized < 0.5) value = normalized * 2;
    if(0.5 <= normalized && normalized <= 1) value = (1 - normalized) * 2;
    if(value < 0.05) value = 0;
    return value;

  // 最後の画像は0→1
  }else{
    value = normalized;
    if(value > 0.95) value = 1;
    return value;
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