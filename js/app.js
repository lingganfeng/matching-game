/*
 * 创建一个包含所有卡片的数组
 */

//很多思路都是Udacity一对一的老师提供的，对于JS的编程我还有很长的路要走
//还参考了 Yahya Elharony's https://www.youtube.com/watch?v=G8J13lmApkQ 和 https://codepen.io/csalcedo815/pen/rKjXzG?editors=1000#0

 let cards = Array.from(document.getElementsByClassName('card'))


/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


let deckElm = document.getElementsByClassName('deck')[0]

function initGame(){
  let cardShuffle = shuffle(cards);
  deckElm.innerHTML = '';
  cardShuffle.map(function(card){
    //console.log(card)
    deckElm.appendChild(card)
  })
}

initGame()

let restartButton = document.querySelector('.restart')
restartButton.addEventListener('click',function(e){
  window.location.reload(true);
})

let openedCards = []

deckElm.addEventListener('click',function(event){
  let target = event.target

  if(target.className.includes('card')){
    target.className = "card open show";

    openedCards.push(target)
    if(openedCards.length === 2){
    //  console.log('2')

      let card_1 = openedCards[0]
      let card_2 = openedCards[1]

      //匹配
      if(card_1.firstElementChild.className == card_2.firstElementChild.className){
        card_1.className = 'card match'
        card_2.className = 'card match'
      } else {//不匹配
        setTimeout(function(){
          card_1.className = 'card'
          card_2.className = 'card'
        }, 500)
      }
      openedCards = []
    }
  }
})



/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

//计时器（来源：https://www.jb51.net/article/105783.htm)
/*
 hour=minute=second=0;//初始化
 var millisecond=0;//毫秒
 var int;
 function Reset()//重置
 {
   window.clearInterval(int);
   millisecond=hour=minute=second=0;
   document.getElementsByClassName('timer-container').value='00时00分00秒000毫秒';
 }

 function start()//开始
 {
   int=setInterval(timer,50);
 }

 function timer()//计时
 {
   millisecond=millisecond+50;
   if(millisecond>=1000)
   {
     millisecond=0;
     second=second+1;
   }
   if(second>=60)
   {
     second=0;
     minute=minute+1;
   }

   if(minute>=60)
   {
     minute=0;
     hour=hour+1;
   }
   document.getElementByClassName('timer-container').value=hour+'时'+minute+'分'+second+'秒'+millisecond+'毫秒';

 }

 function stop()//暂停
 {
   window.clearInterval(int);
 }
 没法跟我前面的设置匹配，无法显示在页面上
*/


/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = "00";
    totalMinutes = "00";

// Set the default value to the timer's container
timerContainer.innerHTML = totalMinutes + ":"+ totalSeconds

function startTimer() {
  liveTimer = setInterval(function() {
    // Increase the totalSeconds by 1
    totalSeconds++;
    // Update the HTML Container with the new time
    timerContainer.innerHTML = totalMinutes + ":" + totalSeconds;
    //Increase minutes when seconds equal 60
    if(totalSeconds === 60) {
      totalMinutes++;
      totalSeconds = 0;
      totalSeconds++;
      // Update the HTML Container with the new time
      timerContainer.innerHTML = totalMinutes + ":" + totalSeconds;
    }
    //stop timer when there are 8 matched pairs
    if(openedCards.length === 16) {
      stopTimer();
      gameOver();
    }
  }, 1000);
}

//reset timer
function resetTimer() {
  timerContainer.innerHTML = "00:00";
}

/*
* Stop Timer
*/

function stopTimer() {
    clearInterval(liveTimer);
}


//Count Moves
const movesContainer = document.querySelector(".moves");
let moves = 0;
function countMoves() {
  moves++;
  movesContainer.innerHTML = moves;
  if (moves === 1) {
    startTimer();
  }
}


//Reset Moves
function resetMoves() {
  movesContainer.innerHTML = 0;
}
