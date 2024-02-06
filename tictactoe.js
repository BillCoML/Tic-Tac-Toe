function AI_GO() {
    let num=0;
    while (num==0 || num==10) {
        num = Math.round(Math.random()*10);
    }
    return num;
}

function Win(who) {
    let r = 1; let c = 1;
    let row; let column; let down; 
    //Check rows and columns
    for (let i=0; i<=2; i++) {
            row = 0;
            column = 0;
            down = 0;
            for (let y=0; y<=2; y++) {
                if (document.getElementById("" + (r+y)).innerHTML == who) row += 1;
                if (document.getElementById("" + (c+down)).innerHTML == who) column += 1;
                down += 3;
            }
            if (row == 3 || column == 3) return true;
            c += 1;
            r += 3;
    }
    //Check Diagonal Lines
    const d1 = [1,5,9];
    const d2 = [3,5,7];
    let dia1 = 0; let dia2 = 0;
    for (let z = 0; z<=2; z++) {
        if (document.getElementById(""+d1[z]).innerHTML == who) dia1+=1;
        if (document.getElementById(""+d2[z]).innerHTML == who) dia2+=1;
    }
    if (dia1 == 3 || dia2 == 3) return true;
    return false;
}


function Bot(diff) {
        const corner = [1,3,7,9];
        let warning = 0;
        if (go==1 || diff=="3") {
            if (document.getElementById("5").innerHTML == "") {
                $("#5").html("O");
                return;
            }
        }
        if (go==3 || diff=="3") {
            if (diff=="3" || diff=="2") {
                for (let i=1; i<=9; i++) {
                    if (document.getElementById(""+i).innerHTML == "") {
                        $("#"+i).html("X");
                        if (Win("X")) {
                            $("#"+i).html("O");
                            return;
                        }
                        $("#"+i).html("");
                    }
                }
            }
        }

        //Stop Corners
        if (diff=="2"||diff=="3") {
            for (let c=0;c<=3;c++) {
                if (document.getElementById(""+corner[c]).innerHTML == "X") {
                    warning += 1;
                }
                if (warning==2) {
                    for (let c=0; c<=3; c++) {
                        if (document.getElementById(""+corner[c]).innerHTML == "") {
                            $("#"+corner[c]).html("O");
                            return;
                        }
                    }
                }
            }
        }

        if (diff=="3") {
            for (let i=1; i<=9; i++) {
                if (document.getElementById(""+i).innerHTML == "") {
                    $("#"+i).html("O");
                    if (Win("O")) return;
                    $("#"+i).html("");
                }
            }
        }
        //Defense
        if (diff=="3" || diff=="2") {
            for (let i=1; i<=9; i++) {
                if (document.getElementById(""+i).innerHTML == "") {
                    $("#"+i).html("X");
                    if (Win("X")) {
                        $("#"+i).html("O");
                        return;
                    }
                    $("#"+i).html("");
                }
            }
        }
        ///////////////
        if (diff=="3") {
            for (let c=0; c<=3; c++) {
                if (document.getElementById(""+corner[c]).innerHTML == "") {
                    $("#"+corner[c]).html("O");
                    return;
                }
            }
        }

        let AI = AI_GO();
        while (document.getElementById(""+AI).innerHTML != "") {
            AI = AI_GO();
        }
        $("#"+AI).html("O");
}

function restart() {
    for (let i=1; i<=9; i++) {
        $("#"+i).html("");
    }
    $(".container>div").css("background-color","white");
    go = 0;
    end = false;
    let who = Math.round(Math.random());
    $("#comment").html("In-game processing...")
    if (who==0) {
        Bot();
        go+=1;
    }
}


let go = 0;
let win = 0;
let lose = 0;

//Generate whether who goes first
let who = Math.round(Math.random());
if (who==0) {
    Bot();
    go+=1;
}
//
let end = false;




function me(num) {
    if (end == true) {
        restart();
        return;
    }
    //My Turn
    let diff = $("#difficulty").val();
    let id = "" + num; 
    if (document.getElementById(id).innerHTML == "") {
        document.getElementById(id).innerHTML = "X";
        go += 1;
        if (Win("X")) {
            win+=1;
            $("#comment").html("<b>You WIN!</b>");
            $("#score").html("You: "+win+" vs Bot: "+lose);
            $(".container>div").css("background-color","rgb(83, 213, 124)");
            end = true;
            return;
        }
        if (go==8) {
            for (let i=1; i<=9; i++) {
                if (document.getElementById(""+i).innerHTML == "") {
                    $("#"+i).html("O");
                    if (Win("O")) {
                        $("#"+i).html("");
                        lose+=1;
                        $("#comment").html("<b>You LOSE!</b>");
                        $("#score").html("You: "+win+" vs Bot: "+lose);
                        $(".container>div").css("background-color","rgb(219, 80, 80)");
                        end = true;
                        return;
                    }
                    $("#"+i).html("");
                }
            }
            $("#comment").html("<b>TIE!</b>");
            $(".container>div").css("background-color","rgb(191, 226, 67)");
            end = true;
            return;
        }



        //BOT'S Turn
        Bot(diff);
        go += 1;
        if (Win("O")) {
            $("#comment").html("You lose !");
            lose += 1;
            $("#comment").html("<b>You LOSE!</b>");
            $("#score").html("You: "+win+" vs Bot: "+lose);
            $(".container>div").css("background-color","rgb(219, 80, 80)");
            end = true;
            return;
        }

        if (go==8) {
            for (let i=1; i<=9; i++) {
                if (document.getElementById(""+i).innerHTML == "") {
                    $("#"+i).html("X");
                    if (Win("X")) {
                        $("#"+i).html("");
                        win+=1;
                        $("#comment").html("<b>You WIN!</b>");
                        $("#score").html("You: "+win+" vs Bot: "+lose);
                        $(".container>div").css("background-color","rgb(83, 213, 124)");
                        end = true;
                        return;
                    }
                    $("#"+i).html("");
                }
            }
            $("#comment").html("<b>TIE!</b>");
            $(".container>div").css("background-color","rgb(191, 226, 67)");
            end = true;
        }

    }
}

