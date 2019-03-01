/*
 * 创建一个包含所有卡片的数组
 */
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

let cardShuffle = shuffle(cards);
$.each(cardShuffle,function(index,value){
	$('.deck').append(value);
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
 var hour,minute,second;//时 分 秒
 hour=minute=second=0;//初始化
 var millisecond=0;//毫秒
 var int;
 function Reset()//重置
 {
   window.clearInterval(int);
   millisecond=hour=minute=second=0;
   document.getElementById('timetext').value='00时00分00秒000毫秒';
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
   document.getElementById('timetext').value=hour+'时'+minute+'分'+second+'秒'+millisecond+'毫秒';

 }

 function stop()//暂停
 {
   window.clearInterval(int);
 }
