function stars(average) {
    let two = document.querySelector('.two')
    let three = document.querySelector('.three')
    let four = document.querySelector('.four')
    let one = document.querySelector('.one')
    let five = document.querySelector('.five')
    console.log(average)
    if (average == 1) {
        one.checked = true;
    } else if (average == 2) {
        two.checked = true;
    } else if (average == 3) {
        three.checked = true;
    } else if (average == 4) {
        four.checked = true;
    } else if (average == 5) {
        five.checked = true;
    }
}

stars();