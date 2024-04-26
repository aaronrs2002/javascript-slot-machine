function generate() {//SELECT A RANDOM NUMBER BETWEEN ZERO AND THE LENGTH OF "icons" ARRAY
    return Math.floor(Math.random() * icons.length);
}
let random = null;
let iconObj = [];
let ckMatches = [];
let doublePrize = 0;
let triplePrize = 0;
let count = 0;
let balance = 500;
if (localStorage.getItem("balance") && Number(localStorage.getItem("balance"))) {
    balance = Number(localStorage.getItem("balance"));
}
document.getElementById("balanceTarget").innerHTML = balance;
function getRandom() {
    if (random) {
        iconObj = [];
        let iconTargetHTML = "";
        ckMatches = [];
        for (let i = 0; i < 9; i++) {//BUILD OUT RESULTS AND HTML IMAGE OUTPUT STRING WITH A "forLoop"
            const number = generate();
            iconObj.push(icons[number].value);
            ckMatches.push(icons[number].title);
            iconTargetHTML = iconTargetHTML + "<div data-icon='" + icons[number].title + "'></div>";
        }
        document.getElementById("iconTarget").innerHTML = iconTargetHTML;

    }
}

function checkRandom(status) {
    document.querySelector(".alert-light").classList.remove("hide");//DISABLE OR HIDE COMPONENTS NOT BEING USED IN THIS SPECIFIC STEP
    document.querySelector("[title='START']").classList.add("hide");
    document.querySelector("[title='Stop']").classList.remove("hide");
    if (status == true) {
        random = setInterval(getRandom, 100);//ITERATE THE getRandom() FUNCTION 1/10 OF EVERY SECOND
    } else {
        document.querySelector("[data-hide='1']").classList.remove("hide");
        document.querySelector("[data-hide='2']").classList.remove("hide");
        document.querySelector("[title='START']").classList.remove("hide");
        document.querySelector("[title='Stop']").classList.add("hide");
        let iconSum = 0;
        let details = "";
        let totals = [//EVERYTHING IS SET TO ZERO INITIALLY
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
        for (let i = 0; i < icons.length; i++) {//THE "count" IS UPDATED EACH TIME THE MATCHING ICON IS REPRESENTED.
            for (let j = 0; j < ckMatches.length; j++) {
                if (ckMatches[j] === "bar" && ckMatches[j] === icons[i].title) {
                    iconSum = iconSum - 150;
                    details = details + "<li class='list-group-item list-group-item-danger'><h3>" + icons[i].title + ": $-150</h3></li>";
                }
                if (ckMatches[j] === "bell" && ckMatches[j] === icons[i].title) {
                    iconSum = iconSum - 100;
                    details = details + "<li class='list-group-item list-group-item-danger'><h3>" + icons[i].title + ": $-100</h3></li>";
                }
                if (ckMatches[j] !== "bar" && ckMatches[j] !== "bell" && ckMatches[j] === icons[i].title) {

                    totals[i].count = totals[i].count + 1;
                    if (totals[i].count > 1) {
                        iconSum = iconSum + icons[i].value;
                        details = details + "<li class='list-group-item list-group-item-success'><h3>Extra " + icons[i].title + ": $" + icons[i].value + "</h3></li>";
                    }
                }
            }
        }
        document.getElementById("winningDetails").innerHTML = details; //RESULT ARE DISPLAY IN A STRING THAT WAS JUST COMPI;ED IN OUR "forLoop"
        let plusMinus = "";
        if (iconSum >= 0) {
            plusMinus = "+"
        }
        document.getElementById("iconSum").innerHTML = plusMinus + iconSum;//THE TOTAL SCORE FOR THE ROUND
        if (iconSum <= 0) {
            document.querySelector("[data-iconsum]").classList.add("alert-danger");
            try {
                document.querySelector("[data-iconsum]").classList.remove("alert-secondary");
                document.querySelector("[data-iconsum]").classList.remove("alert-success");
            } catch (error) {
                console.log("no item found: " + error)
            }
        } else {
            document.querySelector("[data-iconsum]").classList.add("alert-success");
            try {
                document.querySelector("[data-iconsum]").classList.remove("alert-secondary");
                document.querySelector("[data-iconsum]").classList.remove("alert-danger");
            } catch (error) {
                console.log("no item found: " + error)
            }
        }
        balance = balance + iconSum;
        document.getElementById("balanceTarget").innerHTML = balance;
        localStorage.setItem("balance", balance)
        return false;
    }
}

