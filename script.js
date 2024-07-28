let body = document.querySelector("body");
let text = "ozai";
let animate = document.querySelector(".zai");

function loading() {
        setTimeout(() => {
                for (let i = 0; i < text.length; i++) {
                        setTimeout(() => {
                                animate.innerHTML += text[i];
                        }, i * 400);
                }
        }, 2000);
        setTimeout(() => {
                document.getElementsByClassName("loader")[0].style.top = "-100%";
        }, 3500);
}
let AI = localStorage.getItem("BOT");

if (AI === null || AI === "") {
        localStorage.setItem("BOT", "");
} else {
        let local = JSON.parse(localStorage.getItem("BOT"));
        // console.log(local);
        let container = document.querySelector(".container");
        for (let i = 0; i < local.bot.length; i++) {
                let new_element0 = document.createElement("div");
                let new_element1 = document.createElement("div");
                new_element0.innerHTML = local.command[i];
                new_element1.innerHTML = local.bot[i];
                new_element0.classList.add("inputs", "right");
                new_element1.classList.add("inputs", "left");
                container.appendChild(new_element0);
                container.appendChild(new_element1);
        }
}

let input = document.getElementById("text");
let btn = document.querySelector(".btn");
let message_container = document.querySelector(".container");

input.addEventListener("input", () => {
        input.value.trim() === "" ? (btn.disabled = true) : (btn.disabled = false);
});

btn.addEventListener("click", () => {
        let newelement = document.createElement("div");
        newelement.classList.add("right", "inputs");
        newelement.innerHTML = input.value.trim();
        message_container.appendChild(newelement);
        let answer = document.createElement("div");
        answer.classList.add("indicator", "left", "inputs");
        message_container.appendChild(answer);

        const url =
                "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions";
        const options = {
                method: "POST",
                headers: {
                        "x-rapidapi-key": "6f3d356613msh297728a391c575ap149f05jsnf273894f8b95",
                        "x-rapidapi-host":
                                "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
                        "Content-Type": "application/json",
                },
                body: JSON.stringify({
                        messages: [
                                {
                                        role: "user",
                                        content: input.value,
                                },
                        ],
                        model: "gpt-4-turbo-2024-04-09",
                        max_tokens: 100,
                        temperature: 0.9,
                }),
        };
        async function fetching() {
                try {
                        const response = await fetch(url, options);
                        const result = await response.json();
                        return result.choices[0].message.content;
                } catch (error) {
                        return "unable to connect at this moment";
                }
        }
        let main;
        function fetchDataAndStoreInGlobal() {
                fetching()
                        .then((result) => {
                                main = result.toString();
                                //       console.log(main);
                                answer.classList.remove("indicator");
                                animation(answer, main);
                                let bot_answers = document.querySelectorAll(".left");
                                let message = document.querySelectorAll(".right");
                                let object = {
                                        bot: [],
                                        command: [],
                                };
                                for (let i = 0; i < bot_answers.length; i++) {
                                        object.bot[i] = bot_answers[i].innerHTML;
                                        object.command[i] = message[i].innerHTML;
                                }
                                localStorage.setItem("BOT", JSON.stringify(object));
                        })
                        .catch((error) => {
                                console.error("Error fetching data:", error);
                        });
        }
        fetchDataAndStoreInGlobal();

        input.value = "";
        btn.disabled = true;
});

function animation(element, message) {
        for (let i = 0; i < message.length; i++) {
                setTimeout(() => {
                        message_container.scrollTop = message_container.scrollHeight;
                        element.innerHTML += message[i];
                }, i * 10);
        }
}
