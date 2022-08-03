function generate() {
    return Math.floor(Math.random() * icons.length);
}

let random = null;
let iconObj = [];
function getRandom() {
    if (random) {
        iconObj = [];
        let iconTargetHTML = "";
        for (let i = 0; i < 3; i++) {
            const number = generate();
            iconObj.push(icons[number].value);
            iconTargetHTML = iconTargetHTML + "<div data-icon='" + icons[number].title + "'></div>";
        }
        document.getElementById("iconTarget").innerHTML = iconTargetHTML;
    }
}

function checkRandom(status) {
    if (status == true) {
        random = setInterval(getRandom, 100);
    } else {
        let iconSum = 0;
        for (let i = 0; i < iconObj.length; i++) {
            iconSum = iconSum + Number(iconObj[i]);
        }
        document.getElementById("iconSum").innerHTML = iconSum;
        clearInterval(random, null);
        random = null;
        return false;
    }

}

