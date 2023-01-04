// scrollmagicを用いてkvをピン留め、
// kv内の画像をスクロール量と連動させながら切り替えする

var kv = $(".kv").children();
var scroll = 0;

// 一枚あたりのスクロール量
var oneImageDuration = 400;
var numImage = kv.length;
var duration = oneImageDuration * (numImage -  1);

// controller
var controller = new ScrollMagic.Controller();

// kvをピン留め
var scene = new ScrollMagic.Scene({
  duration: duration
})
  .setPin(".kv")
  .addTo(controller);


document.addEventListener('scroll', function () {
  scroll = $(window).scrollTop();

  // 左上に分かりやすく今のスクロール量を表示(デバッグ用)
  $('.scrollValue').text(scroll);

  // 画像切り替え
  switchImage(scroll);
});

// 初期起動
switchImage(scroll);

function switchImage(scroll) {

  // kv外の時
  if (scroll >= duration) {
    $(kv[numImage - 2]).css("opacity", 0);
    $(kv[numImage - 1]).css("opacity", 1);
    return;
  }

  // 画像切り替え
  for (let i = 0; i < kv.length; i++) {

    if ( oneImageDuration * i <= scroll && scroll < oneImageDuration * (i + 1) ) {

      const valueDec = calcValue(scroll, i, "dec");
      const valueInc = calcValue(scroll, i, "inc");

      $(kv).each(function(index, el) {
        if (index === i) {
          $(el).css("opacity", valueDec);
        }else if(index === i + 1){
          $(el).css("opacity", valueInc);
        }else{
          $(el).css("opacity", 0);
        }
      });
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


// iOS用にこれも使おう
// vh計算
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
// resize
window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});