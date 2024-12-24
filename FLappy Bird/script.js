let move_speed = 3, grativy = 0.5;
let bird = document.querySelector(".bird");
let img = document.getElementById("bird-1");

let bird_props = bird.getBoundingClientRect();

let background = document.querySelector(".background").getBoundingClientRect();
let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");

let game_state = "Start";
img.style.display = "none";
message.classList.add("messageStyle");

document.addEventListener("keydown", (event) => {
    if(event.key == "Enter" && game_state != "Play"){
        document.querySelectorAll(".pipe_sprite").forEach((e) => {
            e.remove();
        });
        img.style.display ="block";
        bird.style.top = "40vh";
        game_state = "Play";
        message.innerHTML = "";
        score_title.innerHTML = "Score : ";
        score_val.innerHTML = "0";
        message.classList.remove("messageStyle");
        play();
    }
});


function play() {
    function move() {
        if(game_state != "Play") return;

        let pipe_sprite = document.querySelectorAll(".pipe_sprite");
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props
            bird_props = bird.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0)

        })

    }
}