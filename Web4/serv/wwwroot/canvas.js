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


var obj_speed = 10;
var angle_x = randomAngle();
var sign_x = rnd_sign();

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
    var playButton = document.getElementById('playButton');
    playButton.addEventListener('click', function (e) {
        addToList("pressed play button");
        var work = document.getElementById('work');
        if (work.style.display == 'none' || work.style.display == '') {
            work.style.display = 'block';
            work.style.visibility = 'visible';
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
    var doAnim = true;
    var animationId;

    startButton.addEventListener('click', function (e) {
        addToList("pressed start button");
        doAnim = true;
        startButton.style.display = 'none';
        stopButton.style.display = 'block';
        start_anim();
    });
    stopButton.addEventListener('click', function (e) {
        addToList("pressed stop button");
        doAnim = false;
        stop();
        stopButton.style.display = 'none';
        startButton.style.display = 'block';
    });
    reloadButton.addEventListener('click', function (e) {
        addToList("pressed reload button");
        doAnim = true;
        startButton.style.display = 'block';
        stopButton.style.display = 'none';
        reloadButton.style.display = 'none';
        anim_obj.x = randomPosition(field.width - 30);
        anim_obj.y = 1;
        angle_x = randomAngle();
        sign_x = rnd_sign();
        anim_obj.dy = 1;
    });


    var canvas = document.getElementById('anim');
    canvas.width = 500;
    canvas.height = 500;
    var context = canvas.getContext("2d");
    reFrame();
    var field = {
        x: 1,
        y: 1,
        width: canvas.width,
        height: canvas.height
    };

    var anim_obj = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        dx: 0,
        dy: 0,
        speed: 0
    };

    anim_obj.width = 10;
    anim_obj.height = 10;
    anim_obj.x = randomPosition(field.width - 30);
    anim_obj.y = 1;
    anim_obj.dx = 1;
    anim_obj.dx = anim_obj.dx * sign_x;
    anim_obj.dy = 1;
    anim_obj.speed = obj_speed;

    function start_anim() {
        if (doAnim) {
            animationId = window.requestAnimationFrame(start_anim);
            update();
            render();
        }

    }
    function stop() {
        context.fillStyle = "red";
        context.fillRect(anim_obj.x, anim_obj.y, anim_obj.width, anim_obj.height);
        window.cancelAnimationFrame(animationId);
        animationId = undefined;
    }

    function update() {
        time_interval = 0.01;
        anim_obj.x += time_interval * anim_obj.speed * anim_obj.dx * angle_x;
        anim_obj.y += time_interval * anim_obj.speed * anim_obj.dy;

        if (anim_obj.x <= field.x) {
            anim_obj.dx = 1;
            anim_obj.x = field.x;
            addToList("hit left edge");
        } else if (anim_obj.x + anim_obj.width >= field.x + field.width + 20) {
            anim_obj.dx = -1;
            anim_obj.x = field.x + field.width - anim_obj.width + 20;
            addToList("hit right edge");
        }

        if (anim_obj.y + anim_obj.height >= field.y + field.height) {
            anim_obj.dy = -1;
            anim_obj.y = field.y + field.height - anim_obj.height
            stop();
            startButton.style.display = 'none';
            stopButton.style.display = 'none';
            reloadButton.style.display = 'block';
            addToList("got out of the box");
        }

    }

    function render() {
        reFrame();
        context.fillStyle = "red";
        context.fillRect(anim_obj.x, anim_obj.y, anim_obj.width, anim_obj.height);
    }

    function reFrame() {
        var blueprint_background = new Image();
        blueprint_background.src = "background.jpg";
        blueprint_background.onload = function () {
            var pattern = context.createPattern(this, "repeat");
            context.fillStyle = pattern;
            context.fillRect(0, 0, canvas.width, canvas.height);
        };
    }
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