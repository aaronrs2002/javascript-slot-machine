function generate() {
    return Math.floor(Math.random() * icons.length);
}

let random = null;
let iconObj = [];
let ckMatches = [];
let doublePrize = 0;
let triplePrize = 0;
let count = 0;

function getRandom() {
    if (random) {
        iconObj = [];
        let iconTargetHTML = "";
        ckMatches = [];
        for (let i = 0; i < 9; i++) {
            const number = generate();
            iconObj.push(icons[number].value);
            ckMatches.push(icons[number].title);
            iconTargetHTML = iconTargetHTML + "<div data-icon='" + icons[number].title + "'></div>";
        }


        document.getElementById("iconTarget").innerHTML = iconTargetHTML;
    }
}

function checkRandom(status) {
    document.querySelector("[data-hide='1']").classList.remove("hide");
    if (status == true) {
        random = setInterval(getRandom, 100);
    } else {
        document.querySelector("[data-hide='2']").classList.remove("hide");
        let iconSum = 0;
        let details = "";
        let totals = [
            { title: "cherry", count: 0 },
            { title: "lemon", count: 0 },
            { title: "watermelon", count: 0 },
            { title: "bell", count: 0 },
            { title: "bar", count: 0 },
            { title: "heart", count: 0 },
            { title: "purple", count: 0 },
            { title: "clover", count: 0 },
            { title: "orange", count: 0 },
            { title: "horseshoe", count: 0 },
            { title: "grapes", count: 0 },
            { title: "apple", count: 0 },
            { title: "diamond", count: 0 },
            { title: "dollars", count: 0 }
        ];
        clearInterval(random, null);
        random = null;

        for (let i = 0; i < icons.length; i++) {
            for (let j = 0; j < ckMatches.length; j++) {
                if (ckMatches[j] === "bar" && ckMatches[j] === icons[i].title) {
                    iconSum = iconSum - 150;

                    details = details + "<li><h3>" + icons[i].title + ": $-150</h3></li>";
                    console.log("ckMatches: " + ckMatches);
                }
                if (ckMatches[j] !== "bar" && ckMatches[j] === icons[i].title) {

                    totals[i].count = totals[i].count + 1;
                    if (totals[i].count > 1) {
                        iconSum = iconSum + icons[i].value;

                        details = details + "<li><h3>" + icons[i].title + ": $" + icons[i].value + "</h3></li>";

                    }

                }
            }
        }

        document.getElementById("winningDetails").innerHTML = details;
        document.getElementById("iconSum").innerHTML = iconSum;
        // console.log("JSON.stringify(totals): " + JSON.stringify(totals));
        return false;
    }

}

