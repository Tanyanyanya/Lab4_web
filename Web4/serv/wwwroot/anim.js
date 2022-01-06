var obj_speed = 100;

//<script>
//    // холст для фона
//    var backGroundCanvas = document.getElementById("canvasBackground");
//    var backGroundContext = backGroundCanvas.getContext("2d");

//    // холст для обруча
//    var circleCanvas = document.getElementById("canvasCircle");
//    var circleContext = circleCanvas.getContext("2d");

//    var xPos = 50;
//    var yPos = circleCanvas.height / 2;
//    var radius = 40;
//    var endXPos = circleCanvas.width - 75;
//    var change = 10;
//    var startAngle = (Math.PI / 180) * 0;
//    var interval = 80;
//    var endAngle = (Math.PI / 180) * 360;

//    // закрасим фон цветом
//    backGroundContext.fillStyle = "silver";
//    backGroundContext.fillRect(0, 0, backGroundCanvas.width, backGroundCanvas.height);
//    // рисуем через заданный интервал
//    var intervalID = setInterval(drawCircle, interval);

//    // Рисуем обруч
//    function drawCircle()
//    {
//        // очистим холст
//        //circleContext.clearRect(0, 0, circleCanvas.width, circleCanvas.height);

//        circleContext.strokeStyle = "red";
//        circleContext.lineWidth = 4;
//        circleContext.shadowOffsetX = 3;
//        circleContext.shadowOffsetY = 3;
//        circleContext.shadowBlur = 5;
//        circleContext.shadowColor = "gray";
//        // меняем позицию
//        xPos += change;
//        // останавливаемся при достижении края
//        if(xPos > endXPos)
//        {
//        clearInterval(intervalID)
//    };

//        circleContext.beginPath();
//        circleContext.arc(xPos, yPos, radius, startAngle, endAngle, true);
//        circleContext.stroke();
//    }
//</script>


async function save_speed(val) {
    let speed_val = val;
    const response = await fetch("/api/updates/put?id=1", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: 1,
            speed: speed_val
        })
    });
}

async function get_speed() {
    let speed_to_return;
    const response = await fetch("/api/updates/get/1").
        then(response => response.json()).then(data => {
            speed_to_return = data.speed;
        })
    obj_speed = speed_to_return;
}

window.onload = function () {
    obj_speed = prompt("Set square speed");
    save_speed(obj_speed);
    var animationId;
    var toStop = false;
    function stop() {
        window.cancelAnimationFrame(animationId);
        animationId = undefined;
        toStop = true;
    }
    function addToList(element) {
        ul = document.getElementById('operations');
        var li = document.createElement('li');
        li.setAttribute('class', 'item');

        ul.appendChild(li);
        cur_time = new Date();
        var set_time = cur_time.getHours() + ":"
            + cur_time.getMinutes() + ":"
            + cur_time.getSeconds();
        li.innerHTML += set_time + " " + element;
        localStorage.setItem(set_time, element);
    }
    
    var anim_obj = document.getElementById("square");
    var field = document.getElementById("anim");

    var width = anim_obj.offsetWidth;
    var height = anim_obj.offsetHeight;
    var field_width = field.offsetWidth;
    var field_height = field.offsetHeight;
    var x = randomPosition(field_width - 30);
    var y = 0;
    var step = 1;
    var dx = step;
    var dy = step;
    var angle_x = randomAngle();
    dx = dx * rnd_sign();
    function start_move() {
        if (!toStop) {
            animationId = requestAnimationFrame(animation);
        } else {
            anim_obj.style.display = 'none';
        }

        function animation() {
            if (x <= 1) {
                dx = 1;
                addToList("hit left edge");
            } else if (x + width >= field_width) {
                dx = -1;
                x = field_width - width;
                addToList("hit right edge");
            }
            if (y + 29 >= field_height ) {
                addToList("hit bottom edge");
                stop();
                anim_obj.style.display = 'none';
                startButton.style.display = 'none';
                stopButton.style.display = 'none';
                reloadButton.style.display = 'block';
                addToList("got out of the box");
            }

            time_interval = 0.01;

            x += time_interval * obj_speed * dx * angle_x;
            y += time_interval * obj_speed * dy;

            anim_obj.style.transform = "translate(" + x + "px, " + y + "px)";

            if (!toStop) {
                animationId = requestAnimationFrame(animation);
            } else {
                anim_obj.style.display = 'none';
            }
        }
    }

    var playButton = document.getElementById('playButton');
    playButton.addEventListener('click', function (e) {
        addToList("pressed play button");
        var work = document.getElementById('work');
        if (work.style.display == 'none' || work.style.display == '') {
            work.style.visibility = "visible";
            work.style.display = 'block';
        }
    });
    var closeButton = document.getElementById('closeButton');
    closeButton.addEventListener('click', function (e) {
        addToList("pressed close button");
        var work = document.getElementById('work');
        if (work.style.display == 'block') {
            work.style.display = 'none';
        }
    });

    var startButton = document.getElementById('startButton');
    var stopButton = document.getElementById('stopButton');
    var reloadButton = document.getElementById('reloadButton');
    startButton.addEventListener('click', function (e) {
        addToList("pressed start button");
        toStop = false;
        startButton.style.display = 'none';
        stopButton.style.display = 'block';
        anim_obj.style.display = 'block';
        start_move();
    });
    stopButton.addEventListener('click', function (e) {
        addToList("pressed stop button");
        stop();
        stopButton.style.display = 'none';
        startButton.style.display = 'block';
    });
    reloadButton.addEventListener('click', function (e) {
        addToList("pressed reload button");
        toStop = false;
        startButton.style.display = 'block';
        stopButton.style.display = 'none';
        reloadButton.style.display = 'none';

        x = randomPosition(field_width - 30);
        y = 0;
        angle_x = randomAngle();
    });
};




function randomAngle() {
    let b = Math.floor(Math.random() * 10);
    if (b == 0) {
        b = 1;
    }
    return b;
}

function randomPosition(value) {
    let b = Math.floor(Math.random() * value);
    return b;
}

function rnd_sign() {
    let b = Math.floor(Math.random() * 10);
    if (b == 0) {
        b = 1;
    }
    if (b > 4) {
        return -1;
    }
    else {
        return 1;
    }
}