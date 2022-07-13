function removeWorld() {
    console.log(worlds);
    var world = worlds[Math.floor(Math.random()*worlds.length)];
    console.log(world);
    if (world == undefined) {
        window.alert('CONGRATULATIONS!\nYou cleared all the worlds!\nGame will be restarted')
        location.reload();
    } else {
        var indexOfWorld = worlds.indexOf(world);
        worlds.splice(indexOfWorld, 1);
        world();
    }
}

var worlds = [
    function firstWorld() {
        var world = [
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2],
            [2,1,1,2,3,3,3,3,3,3,3,3,2,1,1,2],
            [2,1,1,2,3,3,3,3,3,3,3,3,2,1,1,2],
            [2,1,1,2,2,2,1,2,2,1,2,2,2,1,1,2],
            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,2,2,2,2,2,2,2,2,1,1,1,2],
            [2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
        ];
        var pacman = {
            x: 1,
            y: 8,
        }
        var score = 0;

        function displayWorld() {
            var output = '';
            for (var i=0; i<world.length; i++) { // row
                output += "\n<div class='row'>\n"
                for (var j=0; j<world[i].length; j++) {
                    if (world[i][j] === 0) {
                        output += "<div class='empty'></div>";
                    }
                    else if (world[i][j] === 1) {
                        output += "<div class='coin'></div>";
                    }
                    else if (world[i][j] === 2) {
                        output += "<div class='brick'></div>";
                    }
                    else if (world[i][j] === 3) {
                        output += "<div class='cherry'></div>";
                    }
                }
                output += "\n</div>";
            }
            // console.log(output);
            document.getElementById('world').innerHTML = output;
        }
        displayWorld();

        function displayScore() {
            document.getElementById('score').innerHTML = score;
        }
        displayScore();

        function displayPacman() {
            document.getElementById('pacman').style.top = pacman.y*40+"px";
            document.getElementById('pacman').style.left = pacman.x*40+"px";
        }
        displayPacman();

        document.onkeydown = function(e) {
            // console.log(e);
            if (e.keyCode === 38 && world[pacman.y-1][pacman.x] != 2) { // top
                pacman.y--;
            }
            else if (e.keyCode === 40 && world[pacman.y+1][pacman.x] != 2) { // bottom
                pacman.y++;
            }
            else if (e.keyCode === 39 && world[pacman.y][pacman.x+1] != 2) { // right
                pacman.x++;
            }
            else if (e.keyCode === 37 && world[pacman.y][pacman.x-1] != 2) { // left
                pacman.x--;
            }

            if (e.keyCode === 38) { // top
                document.getElementById('pacman').style.transform = "rotate(-90deg)";
            } else if (e.keyCode === 40) { // bottom
                document.getElementById('pacman').style.transform = "rotate(90deg)";
            } else if (e.keyCode === 39) { // right
                document.getElementById('pacman').style.transform = "rotate(0deg)";
            } else if (e.keyCode === 37) {
                document.getElementById('pacman').style.transform = "rotate(180deg)";
            }

            if (world[pacman.y][pacman.x] == 1 || world[pacman.y][pacman.x] == 3) {
                if (world[pacman.y][pacman.x] == 1) {
                    score += 10;
                }
                else if (world[pacman.y][pacman.x] == 3) {
                    score += 20;
                }
                world[pacman.y][pacman.x] = 0;
                displayWorld();
                displayScore();
            }
            displayPacman();

            if (score == 970) {
                text = "CONGRATULATIONS!\nYour score is: "+score+"\nGo to the next world?";
                clearInterval(intervalId);
                if (window.confirm(text) == true) {
                    removeWorld();
                } else {
                    firstWorld();
                }
            }

            if (ghosts.x1 == pacman.x && ghosts.y1 == pacman.y || ghosts.x2 == pacman.x && ghosts.y2 == pacman.y) {
                document.getElementById("display-score").innerHTML = "Your score is: "+score;
                text = "GAME OVER!\nYour score is: "+score;
                clearInterval(intervalId);
                window.alert(text);
                firstWorld();
            }
        }

        var ghosts = {
            x1: 7,
            y1: 3,
            x2: 13,
            y2: 2
        }

        function moveGhost() {
            document.getElementById('ghost1').style.left = ghosts.x1*40+"px";
            document.getElementById('ghost1').style.top = ghosts.y1*40+"px";
            document.getElementById('ghost2').style.left = ghosts.x2*40+"px";
            document.getElementById('ghost2').style.top = ghosts.y2*40+"px";
        }
        moveGhost();

        var intervalId = window.setInterval(function(){
            if (ghosts.y1 < pacman.y && world[ghosts.y1+1][ghosts.x1] != 2) { // down
                ghosts.y1 += 1;
            }
            else if (ghosts.y1 > pacman.y && world[ghosts.y1-1][ghosts.x1] != 2) { // up
                ghosts.y1 -= 1;
            }
            else if (ghosts.x1 < pacman.x && world[ghosts.y1][ghosts.x1+1] != 2) { // right
                document.getElementById('ghost1').style.transform = "scaleX(-1)"
                ghosts.x1 += 1;
            }
            else if (ghosts.x1 > pacman.x && world[ghosts.y1][ghosts.x1-1] != 2) { // left
                document.getElementById('ghost1').style.transform = "scaleX(1)"
                ghosts.x1 -= 1;
            }

            if (ghosts.y2 < pacman.y && world[ghosts.y2+1][ghosts.x2] != 2) { // down
                ghosts.y2 += 1;
            }
            else if (ghosts.y2 > pacman.y && world[ghosts.y2-1][ghosts.x2] != 2) { // up
                ghosts.y2 -= 1;
            }
            else if (ghosts.x2 < pacman.x && world[ghosts.y2][ghosts.x2+1] != 2) { // right
                document.getElementById('ghost2').style.transform = "scaleX(-1)"
                ghosts.x2 += 1;
            }
            else if (ghosts.x2 > pacman.x && world[ghosts.y2][ghosts.x2-1] != 2) { // left
                document.getElementById('ghost2').style.transform = "scaleX(1)"
                ghosts.x2 -= 1;
            }
            moveGhost();

            if (ghosts.x1 == pacman.x && ghosts.y1 == pacman.y || ghosts.x2 == pacman.x && ghosts.y2 == pacman.y) {
                document.getElementById("display-score").innerHTML = "Your score is: "+score;
                text = "GAME OVER!\nYour score is: "+score;
                clearInterval(intervalId);
                window.alert(text);
                firstWorld();
            }
        }, 1000)
    }
    ,
    function secondWorld() {
        var world = [
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [2,0,1,1,1,1,1,3,3,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,2,2,1,1,1,1,1,1,2],
            [2,2,2,1,1,1,1,2,2,1,1,1,1,2,2,2],
            [2,3,3,1,1,1,1,2,2,1,1,1,1,3,3,2],
            [2,3,3,1,1,1,1,2,2,1,1,1,1,3,3,2],
            [2,2,2,1,1,1,1,2,2,1,1,1,1,2,2,2],
            [2,1,1,1,1,1,1,2,2,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,3,3,1,1,1,1,1,1,2],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
        ];

        var pacman = {
            x: 1,
            y: 1,
        }
        var score = 0;
        function displayWorld() {
            var output = '';
            for (var i=0; i<world.length; i++) { // row
                output += "\n<div class='row'>\n"
                for (var j=0; j<world[i].length; j++) {
                    if (world[i][j] === 0) {
                        output += "<div class='empty'></div>";
                    }
                    else if (world[i][j] === 1) {
                        output += "<div class='coin'></div>";
                    }
                    else if (world[i][j] === 2) {
                        output += "<div class='brick'></div>";
                    }
                    else if (world[i][j] === 3) {
                        output += "<div class='cherry'></div>";
                    }
                }
                output += "\n</div>";
            }
            // console.log(output);
            document.getElementById('world').innerHTML = output;
        }
        displayWorld();

        function displayScore() {
            document.getElementById('score').innerHTML = score;
        }
        displayScore();

        function displayPacman() {
            document.getElementById('pacman').style.top = pacman.y*40+"px";
            document.getElementById('pacman').style.left = pacman.x*40+"px";
        }
        displayPacman();

        document.onkeydown = function(e) {
            // console.log(e);
            if (e.keyCode === 38 && world[pacman.y-1][pacman.x] != 2) { // top
                pacman.y--;
            }
            else if (e.keyCode === 40 && world[pacman.y+1][pacman.x] != 2) { // bottom
                pacman.y++;
            }
            else if (e.keyCode === 39 && world[pacman.y][pacman.x+1] != 2) { // right
                pacman.x++;
            }
            else if (e.keyCode === 37 && world[pacman.y][pacman.x-1] != 2) { // left
                pacman.x--;
            }

            if (e.keyCode === 38) { // top
                document.getElementById('pacman').style.transform = "rotate(-90deg)";
            } else if (e.keyCode === 40) { // bottom
                document.getElementById('pacman').style.transform = "rotate(90deg)";
            } else if (e.keyCode === 39) { // right
                document.getElementById('pacman').style.transform = "rotate(0deg)";
            } else if (e.keyCode === 37) {
                document.getElementById('pacman').style.transform = "rotate(180deg)";
            }

            if (world[pacman.y][pacman.x] == 1 || world[pacman.y][pacman.x] == 3) {
                if (world[pacman.y][pacman.x] == 1) {
                    score += 10;
                }
                else if (world[pacman.y][pacman.x] == 3) {
                    score += 20;
                }
                world[pacman.y][pacman.x] = 0;
                displayWorld();
                displayScore();
            }
            displayPacman();

            if (score == 1030) {
                text = "CONGRATULATIONS!\nYour score is: "+score+"\nGo to the next world?";
                clearInterval(intervalId);
                if (window.confirm(text) == true) {
                    removeWorld();
                } else {
                    secondWorld();
                }
            }

            if (ghosts.x1 == pacman.x && ghosts.y1 == pacman.y || ghosts.x2 == pacman.x && ghosts.y2 == pacman.y) {
                document.getElementById("display-score").innerHTML = "Your score is: "+score;
                text = "GAME OVER!\nYour score is: "+score;
                clearInterval(intervalId);
                window.alert(text);
                secondWorld();
            }
        }

        var ghosts = {
            x1: 4,
            y1: 4,
            x2: 11,
            y2: 5
        }

        function moveGhost() {
            document.getElementById('ghost1').style.left = ghosts.x1*40+"px";
            document.getElementById('ghost1').style.top = ghosts.y1*40+"px";
            document.getElementById('ghost2').style.left = ghosts.x2*40+"px";
            document.getElementById('ghost2').style.top = ghosts.y2*40+"px";
        }
        moveGhost();

        var intervalId = window.setInterval(function(){
            if (ghosts.y1 < pacman.y && world[ghosts.y1+1][ghosts.x1] != 2) { // down
                ghosts.y1 += 1;
            }
            else if (ghosts.y1 > pacman.y && world[ghosts.y1-1][ghosts.x1] != 2) { // up
                ghosts.y1 -= 1;
            }
            else if (ghosts.x1 < pacman.x && world[ghosts.y1][ghosts.x1+1] != 2) { // right
                document.getElementById('ghost1').style.transform = "scaleX(-1)"
                ghosts.x1 += 1;
            }
            else if (ghosts.x1 > pacman.x && world[ghosts.y1][ghosts.x1-1] != 2) { // left
                document.getElementById('ghost1').style.transform = "scaleX(1)"
                ghosts.x1 -= 1;
            }

            if (ghosts.y2 < pacman.y && world[ghosts.y2+1][ghosts.x2] != 2) { // down
                ghosts.y2 += 1;
            }
            else if (ghosts.y2 > pacman.y && world[ghosts.y2-1][ghosts.x2] != 2) { // up
                ghosts.y2 -= 1;
            }
            else if (ghosts.x2 < pacman.x && world[ghosts.y2][ghosts.x2+1] != 2) { // right
                document.getElementById('ghost2').style.transform = "scaleX(-1)"
                ghosts.x2 += 1;
            }
            else if (ghosts.x2 > pacman.x && world[ghosts.y2][ghosts.x2-1] != 2) { // left
                document.getElementById('ghost2').style.transform = "scaleX(1)"
                ghosts.x2 -= 1;
            }
            moveGhost();

            if (ghosts.x1 == pacman.x && ghosts.y1 == pacman.y || ghosts.x2 == pacman.x && ghosts.y2 == pacman.y) {
                document.getElementById("display-score").innerHTML = "Your score is: "+score;
                text = "GAME OVER!\nYour score is: "+score;
                clearInterval(intervalId);
                window.alert(text);
                secondWorld();
            }
        }, 1000)
    }
    ,
    function thirdWorld() {
        var world = [
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,1,0,0,1,1,1,3,3,1,1,1,0,0,1,2],
            [2,1,0,0,1,1,1,3,3,1,1,1,0,0,1,2],
            [2,1,0,0,1,1,1,3,3,1,1,1,0,0,1,2],
            [2,1,0,0,1,1,1,3,3,1,1,1,0,0,1,2],
            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
        ];

        var pacman = {
            x: 1,
            y: 1,
        }
        var score = 0;
        function displayWorld() {
            var output = '';
            for (var i=0; i<world.length; i++) { // row
                output += "\n<div class='row'>\n"
                for (var j=0; j<world[i].length; j++) {
                    if (world[i][j] === 0) {
                        output += "<div class='empty'></div>";
                    }
                    else if (world[i][j] === 1) {
                        output += "<div class='coin'></div>";
                    }
                    else if (world[i][j] === 2) {
                        output += "<div class='brick'></div>";
                    }
                    else if (world[i][j] === 3) {
                        output += "<div class='cherry'></div>";
                    }
                }
                output += "\n</div>";
            }
            // console.log(output);
            document.getElementById('world').innerHTML = output;
        }
        displayWorld();

        function displayScore() {
            document.getElementById('score').innerHTML = score;
        }
        displayScore();

        function displayPacman() {
            document.getElementById('pacman').style.top = pacman.y*40+"px";
            document.getElementById('pacman').style.left = pacman.x*40+"px";
        }
        displayPacman();

        document.onkeydown = function(e) {
            // console.log(e);
            if (e.keyCode === 38 && world[pacman.y-1][pacman.x] != 2) { // top
                pacman.y--;
            }
            else if (e.keyCode === 40 && world[pacman.y+1][pacman.x] != 2) { // bottom
                pacman.y++;
            }
            else if (e.keyCode === 39 && world[pacman.y][pacman.x+1] != 2) { // right
                pacman.x++;
            }
            else if (e.keyCode === 37 && world[pacman.y][pacman.x-1] != 2) { // left
                pacman.x--;
            }

            if (e.keyCode === 38) { // top
                document.getElementById('pacman').style.transform = "rotate(-90deg)";
            } else if (e.keyCode === 40) { // bottom
                document.getElementById('pacman').style.transform = "rotate(90deg)";
            } else if (e.keyCode === 39) { // right
                document.getElementById('pacman').style.transform = "rotate(0deg)";
            } else if (e.keyCode === 37) {
                document.getElementById('pacman').style.transform = "rotate(180deg)";
            }

            if (world[pacman.y][pacman.x] == 1 || world[pacman.y][pacman.x] == 3) {
                if (world[pacman.y][pacman.x] == 1) {
                    score += 10;
                }
                else if (world[pacman.y][pacman.x] == 3) {
                    score += 20;
                }
                world[pacman.y][pacman.x] = 0;
                displayWorld();
                displayScore();
            }
            displayPacman();

            if (score == 1030) {
                text = "CONGRATULATIONS!\nYour score is: "+score+"\nGo to the next world?";
                clearInterval(intervalId);
                if (window.confirm(text) == true) {
                    removeWorld();
                } else {
                    thirdWorld();
                }
            }

            if (ghosts.x1 == pacman.x && ghosts.y1 == pacman.y || ghosts.x2 == pacman.x && ghosts.y2 == pacman.y) {
                document.getElementById("display-score").innerHTML = "Your score is: "+score;
                text = "GAME OVER!\nYour score is: "+score;
                clearInterval(intervalId);
                window.alert(text);
                thirdWorld();
            }
        }

        var ghosts = {
            x1: 4,
            y1: 4,
            x2: 11,
            y2: 5
        }

        function moveGhost() {
            document.getElementById('ghost1').style.left = ghosts.x1*40+"px";
            document.getElementById('ghost1').style.top = ghosts.y1*40+"px";
            document.getElementById('ghost2').style.left = ghosts.x2*40+"px";
            document.getElementById('ghost2').style.top = ghosts.y2*40+"px";
        }
        moveGhost();

        var intervalId = window.setInterval(function(){
            if (ghosts.y1 < pacman.y && world[ghosts.y1+1][ghosts.x1] != 2) { // down
                ghosts.y1 += 1;
            }
            else if (ghosts.y1 > pacman.y && world[ghosts.y1-1][ghosts.x1] != 2) { // up
                ghosts.y1 -= 1;
            }
            else if (ghosts.x1 < pacman.x && world[ghosts.y1][ghosts.x1+1] != 2) { // right
                document.getElementById('ghost1').style.transform = "scaleX(-1)"
                ghosts.x1 += 1;
            }
            else if (ghosts.x1 > pacman.x && world[ghosts.y1][ghosts.x1-1] != 2) { // left
                document.getElementById('ghost1').style.transform = "scaleX(1)"
                ghosts.x1 -= 1;
            }

            if (ghosts.y2 < pacman.y && world[ghosts.y2+1][ghosts.x2] != 2) { // down
                ghosts.y2 += 1;
            }
            else if (ghosts.y2 > pacman.y && world[ghosts.y2-1][ghosts.x2] != 2) { // up
                ghosts.y2 -= 1;
            }
            else if (ghosts.x2 < pacman.x && world[ghosts.y2][ghosts.x2+1] != 2) { // right
                document.getElementById('ghost2').style.transform = "scaleX(-1)"
                ghosts.x2 += 1;
            }
            else if (ghosts.x2 > pacman.x && world[ghosts.y2][ghosts.x2-1] != 2) { // left
                document.getElementById('ghost2').style.transform = "scaleX(1)"
                ghosts.x2 -= 1;
            }
            moveGhost();

            if (ghosts.x1 == pacman.x && ghosts.y1 == pacman.y || ghosts.x2 == pacman.x && ghosts.y2 == pacman.y) {
                document.getElementById("display-score").innerHTML = "Your score is: "+score;
                text = "GAME OVER!\nYour score is: "+score;
                clearInterval(intervalId);
                window.alert(text);
                thirdWorld();
            }
        }, 1000)
    }
    ,
    function fourthWorld() {
        var world = [
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [2,0,1,1,1,2,1,1,1,1,1,1,1,2,0,2],
            [2,1,1,1,1,1,1,1,1,1,1,1,1,1,0,2],
            [2,1,1,1,1,2,1,3,3,1,1,1,2,2,0,2],
            [2,1,1,1,1,2,1,3,3,1,1,2,2,2,1,2],
            [2,1,1,1,1,2,2,3,3,1,1,1,2,2,1,2],
            [2,1,1,1,1,2,2,3,3,1,1,1,2,2,1,2],
            [2,3,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,3,1,1,1,2,1,1,1,1,1,1,1,2,1,2],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
        ];

        var pacman = {
            x: 1,
            y: 1,
        }
        var score = 0;
        function displayWorld() {
            var output = '';
            for (var i=0; i<world.length; i++) { // row
                output += "\n<div class='row'>\n"
                for (var j=0; j<world[i].length; j++) {
                    if (world[i][j] === 0) {
                        output += "<div class='empty'></div>";
                    }
                    else if (world[i][j] === 1) {
                        output += "<div class='coin'></div>";
                    }
                    else if (world[i][j] === 2) {
                        output += "<div class='brick'></div>";
                    }
                    else if (world[i][j] === 3) {
                        output += "<div class='cherry'></div>";
                    }
                }
                output += "\n</div>";
            }
            // console.log(output);
            document.getElementById('world').innerHTML = output;
        }
        displayWorld();

        function displayScore() {
            document.getElementById('score').innerHTML = score;
        }
        displayScore();

        function displayPacman() {
            document.getElementById('pacman').style.top = pacman.y*40+"px";
            document.getElementById('pacman').style.left = pacman.x*40+"px";
        }
        displayPacman();

        document.onkeydown = function(e) {
            // console.log(e);
            if (e.keyCode === 38 && world[pacman.y-1][pacman.x] != 2) { // top
                pacman.y--;
            }
            else if (e.keyCode === 40 && world[pacman.y+1][pacman.x] != 2) { // bottom
                pacman.y++;
            }
            else if (e.keyCode === 39 && world[pacman.y][pacman.x+1] != 2) { // right
                pacman.x++;
            }
            else if (e.keyCode === 37 && world[pacman.y][pacman.x-1] != 2) { // left
                pacman.x--;
            }

            if (e.keyCode === 38) { // top
                document.getElementById('pacman').style.transform = "rotate(-90deg)";
            } else if (e.keyCode === 40) { // bottom
                document.getElementById('pacman').style.transform = "rotate(90deg)";
            } else if (e.keyCode === 39) { // right
                document.getElementById('pacman').style.transform = "rotate(0deg)";
            } else if (e.keyCode === 37) {
                document.getElementById('pacman').style.transform = "rotate(180deg)";
            }

            if (world[pacman.y][pacman.x] == 1 || world[pacman.y][pacman.x] == 3) {
                if (world[pacman.y][pacman.x] == 1) {
                    score += 10;
                }
                else if (world[pacman.y][pacman.x] == 3) {
                    score += 20;
                }
                world[pacman.y][pacman.x] = 0;
                displayWorld();
                displayScore();
            }
            displayPacman();

            if (score == 990) {
                text = "CONGRATULATIONS!\nYour score is: "+score+"\nGo to the next world?";
                clearInterval(intervalId);
                if (window.confirm(text) == true) {
                    removeWorld();
                } else {
                    fourthWorld();
                }
            }

            if (ghosts.x1 == pacman.x && ghosts.y1 == pacman.y || ghosts.x2 == pacman.x && ghosts.y2 == pacman.y) {
                document.getElementById("display-score").innerHTML = "Your score is: "+score;
                text = "GAME OVER!\nYour score is: "+score;
                clearInterval(intervalId);
                window.alert(text);
                fourthWorld();
            }
        }

        var ghosts = {
            x1: 4,
            y1: 4,
            x2: 11,
            y2: 5
        }

        function moveGhost() {
            document.getElementById('ghost1').style.left = ghosts.x1*40+"px";
            document.getElementById('ghost1').style.top = ghosts.y1*40+"px";
            document.getElementById('ghost2').style.left = ghosts.x2*40+"px";
            document.getElementById('ghost2').style.top = ghosts.y2*40+"px";
        }
        moveGhost();

        var intervalId = window.setInterval(function(){
            if (ghosts.y1 < pacman.y && world[ghosts.y1+1][ghosts.x1] != 2) { // down
                ghosts.y1 += 1;
            }
            else if (ghosts.y1 > pacman.y && world[ghosts.y1-1][ghosts.x1] != 2) { // up
                ghosts.y1 -= 1;
            }
            else if (ghosts.x1 < pacman.x && world[ghosts.y1][ghosts.x1+1] != 2) { // right
                document.getElementById('ghost1').style.transform = "scaleX(-1)"
                ghosts.x1 += 1;
            }
            else if (ghosts.x1 > pacman.x && world[ghosts.y1][ghosts.x1-1] != 2) { // left
                document.getElementById('ghost1').style.transform = "scaleX(1)"
                ghosts.x1 -= 1;
            }

            if (ghosts.y2 < pacman.y && world[ghosts.y2+1][ghosts.x2] != 2) { // down
                ghosts.y2 += 1;
            }
            else if (ghosts.y2 > pacman.y && world[ghosts.y2-1][ghosts.x2] != 2) { // up
                ghosts.y2 -= 1;
            }
            else if (ghosts.x2 < pacman.x && world[ghosts.y2][ghosts.x2+1] != 2) { // right
                document.getElementById('ghost2').style.transform = "scaleX(-1)"
                ghosts.x2 += 1;
            }
            else if (ghosts.x2 > pacman.x && world[ghosts.y2][ghosts.x2-1] != 2) { // left
                document.getElementById('ghost2').style.transform = "scaleX(1)"
                ghosts.x2 -= 1;
            }
            moveGhost();

            if (ghosts.x1 == pacman.x && ghosts.y1 == pacman.y || ghosts.x2 == pacman.x && ghosts.y2 == pacman.y) {
                document.getElementById("display-score").innerHTML = "Your score is: "+score;
                text = "GAME OVER!\nYour score is: "+score;
                clearInterval(intervalId);
                window.alert(text);
                fourthWorld();
            }
        }, 1000)
    }
    ,
    function fifthWorld() {
        var world = [
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
            [2,0,3,1,1,1,1,1,1,1,1,1,1,0,0,2],
            [2,3,2,2,2,2,2,2,2,2,2,2,2,2,0,2],
            [2,1,2,1,1,2,1,3,3,1,1,1,2,2,0,2],
            [2,1,2,1,1,2,1,3,3,1,1,2,2,2,1,2],
            [2,1,2,1,1,2,2,3,3,1,1,1,2,2,1,2],
            [2,1,2,1,1,2,2,3,3,1,1,1,2,2,1,2],
            [2,3,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,3,3,1,1,1,1,1,1,1,1,1,1,1,1,2],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
        ];

        var pacman = {
            x: 1,
            y: 1,
        }
        var score = 0;
        function displayWorld() {
            var output = '';
            for (var i=0; i<world.length; i++) { // row
                output += "\n<div class='row'>\n"
                for (var j=0; j<world[i].length; j++) {
                    if (world[i][j] === 0) {
                        output += "<div class='empty'></div>";
                    }
                    else if (world[i][j] === 1) {
                        output += "<div class='coin'></div>";
                    }
                    else if (world[i][j] === 2) {
                        output += "<div class='brick'></div>";
                    }
                    else if (world[i][j] === 3) {
                        output += "<div class='cherry'></div>";
                    }
                }
                output += "\n</div>";
            }
            // console.log(output);
            document.getElementById('world').innerHTML = output;
        }
        displayWorld();

        function displayScore() {
            document.getElementById('score').innerHTML = score;
        }
        displayScore();

        function displayPacman() {
            document.getElementById('pacman').style.top = pacman.y*40+"px";
            document.getElementById('pacman').style.left = pacman.x*40+"px";
        }
        displayPacman();

        document.onkeydown = function(e) {
            // console.log(e);
            if (e.keyCode === 38 && world[pacman.y-1][pacman.x] != 2) { // top
                pacman.y--;
            }
            else if (e.keyCode === 40 && world[pacman.y+1][pacman.x] != 2) { // bottom
                pacman.y++;
            }
            else if (e.keyCode === 39 && world[pacman.y][pacman.x+1] != 2) { // right
                pacman.x++;
            }
            else if (e.keyCode === 37 && world[pacman.y][pacman.x-1] != 2) { // left
                pacman.x--;
            }

            if (e.keyCode === 38) { // top
                document.getElementById('pacman').style.transform = "rotate(-90deg)";
            } else if (e.keyCode === 40) { // bottom
                document.getElementById('pacman').style.transform = "rotate(90deg)";
            } else if (e.keyCode === 39) { // right
                document.getElementById('pacman').style.transform = "rotate(0deg)";
            } else if (e.keyCode === 37) {
                document.getElementById('pacman').style.transform = "rotate(180deg)";
            }

            if (world[pacman.y][pacman.x] == 1 || world[pacman.y][pacman.x] == 3) {
                if (world[pacman.y][pacman.x] == 1) {
                    score += 10;
                }
                else if (world[pacman.y][pacman.x] == 3) {
                    score += 20;
                }
                world[pacman.y][pacman.x] = 0;
                displayWorld();
                displayScore();
            }
            displayPacman();

            if (score == 890) {
                text = "CONGRATULATIONS!\nYour score is: "+score+"\nGo to the next world?";
                clearInterval(intervalId);
                if (window.confirm(text) == true) {
                    removeWorld();
                } else {
                    fifthWorld();
                }
            }

            if (ghosts.x1 == pacman.x && ghosts.y1 == pacman.y || ghosts.x2 == pacman.x && ghosts.y2 == pacman.y) {
                document.getElementById("display-score").innerHTML = "Your score is: "+score;
                text = "GAME OVER!\nYour score is: "+score;
                clearInterval(intervalId);
                window.alert(text);
                fifthWorld();
            }
        }

        var ghosts = {
            x1: 4,
            y1: 4,
            x2: 11,
            y2: 5
        }

        function moveGhost() {
            document.getElementById('ghost1').style.left = ghosts.x1*40+"px";
            document.getElementById('ghost1').style.top = ghosts.y1*40+"px";
            document.getElementById('ghost2').style.left = ghosts.x2*40+"px";
            document.getElementById('ghost2').style.top = ghosts.y2*40+"px";
        }
        moveGhost();

        var intervalId = window.setInterval(function(){
            if (ghosts.y1 < pacman.y && world[ghosts.y1+1][ghosts.x1] != 2) { // down
                ghosts.y1 += 1;
            }
            else if (ghosts.y1 > pacman.y && world[ghosts.y1-1][ghosts.x1] != 2) { // up
                ghosts.y1 -= 1;
            }
            else if (ghosts.x1 < pacman.x && world[ghosts.y1][ghosts.x1+1] != 2) { // right
                document.getElementById('ghost1').style.transform = "scaleX(-1)"
                ghosts.x1 += 1;
            }
            else if (ghosts.x1 > pacman.x && world[ghosts.y1][ghosts.x1-1] != 2) { // left
                document.getElementById('ghost1').style.transform = "scaleX(1)"
                ghosts.x1 -= 1;
            }

            if (ghosts.y2 < pacman.y && world[ghosts.y2+1][ghosts.x2] != 2) { // down
                ghosts.y2 += 1;
            }
            else if (ghosts.y2 > pacman.y && world[ghosts.y2-1][ghosts.x2] != 2) { // up
                ghosts.y2 -= 1;
            }
            else if (ghosts.x2 < pacman.x && world[ghosts.y2][ghosts.x2+1] != 2) { // right
                document.getElementById('ghost2').style.transform = "scaleX(-1)"
                ghosts.x2 += 1;
            }
            else if (ghosts.x2 > pacman.x && world[ghosts.y2][ghosts.x2-1] != 2) { // left
                document.getElementById('ghost2').style.transform = "scaleX(1)"
                ghosts.x2 -= 1;
            }
            moveGhost();

            if (ghosts.x1 == pacman.x && ghosts.y1 == pacman.y || ghosts.x2 == pacman.x && ghosts.y2 == pacman.y) {
                document.getElementById("display-score").innerHTML = "Your score is: "+score;
                text = "GAME OVER!\nYour score is: "+score;
                clearInterval(intervalId);
                window.alert(text);
                fifthWorld();
            }
        }, 1000)
    }
]

removeWorld();