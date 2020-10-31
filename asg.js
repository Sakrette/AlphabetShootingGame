ALPHABETS = new Array(26).fill(0).map((_, index) => String.fromCharCode(index + 65));
STORAGE = {};
STATUS = {KEY: {}};

function start() {
    document.body.addEventListener("keydown", keydown);
    document.body.addEventListener("keydown", keyup);

    play();
}

function keydown(e) {
    let code = e.keyCode;
    if (code >= 65 && code <= 90) {
        if (!STATUS.KEY[code]) {
            STATUS.KEY[code] = true;
            pop(ALPHABETS[code-65], true);
        }
    }
}
function keyup(e) {
    let code = e.keyCode;
    if (code >= 65 && code <= 90) {
        if (STATUS.KEY[code]) {
            STATUS.KEY[code] = false;
        }
    }
}


function play() {
    let itvl = setInterval(() => {
        let item = create();
        if (STORAGE[item.alph]==null) STORAGE[item.alph] = [item];
        else STORAGE[item.alph].push(item);
        drop(item);
    }, 300);
}

function create() {
    let item = document.createElement("p");
    item.style.position = "absolute";
    pos = [random(0, window.innerWidth - 5), -35];
    item.style.left = pos[0] + "px";
    item.style.top = pos[1] + "px";

    let alph = ALPHABETS[randint(0,25)];
    item.innerText = alph;
    document.body.appendChild(item);

    return {item:item, pos: pos, alph:alph, v:random(0,5), a:0.1};
}

function random(min, max) {
    return Math.random() * (max-min+1) + min;
}

function randint(min, max) {
    return Math.floor(random(min, max));
}

function drop(item) {
    item.itvl = setInterval(() => {
        if (item.pos[1] < window.innerHeight) {
            item.v += item.a;
            item.pos[1] += item.v  * 0.01 * Math.round(window.innerHeight * .002);
            item.item.style.top = item.pos[1] + "px";
        } else {
            pop(item.alph);
        }
    }, 10);
}

function pop(alph, getscore=false) {
    let item = STORAGE[alph] && STORAGE[alph].splice(0,1)[0];
    if (item==null) getscore = false;
    else {
        document.body.removeChild(item.item);
        clearInterval(item.itvl);
    }

    score.innerText = parseInt(score.innerText) + (getscore? 1: -1);
}
