let body = document.querySelector('body');
let text = "ozai";
let animate = document.querySelector('.zai');
function loading() {

        setTimeout(() => {
                for (let i = 0; i < text.length; i++) {
                        setTimeout(() => {
                                animate.innerHTML += text[i];
                        }, i * 400);
                }
        }, 2000);
        setTimeout(() => {
                document.getElementsByClassName('loader')[0].style.top = '-100%';
        }, 3500);
}

let input = document.getElementById('text');
let btn = document.querySelector('.btn');
let message_container = document.querySelector('.container');
input.addEventListener('input', () => {
        if (input.value.trim() == '') {
                btn.disabled = true;
        }
        else {
                btn.disabled = false;
        }
});
btn.addEventListener('click', () => {
        let newelement = document.createElement('div');
        newelement.classList.add('right', 'inputs');
        newelement.innerHTML = input.value;
        message_container.appendChild(newelement);
        const url = 'https://infinite-gpt.p.rapidapi.com/infinite-gpt';
        const options = {
                method: 'POST',
                headers: {
                        'x-rapidapi-key': '544727a05dmshe7e455284bae3a8p1520c7jsne7ba47ff870b',
                        'x-rapidapi-host': 'infinite-gpt.p.rapidapi.com',
                        'Content-Type': 'application/json'
                },
                body: {
                        query: 'hi',
                        sysMsg: 'You are a friendly Chatbot.'
                }
        };
        async function fetchdata(){

                try {
                        const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
        } catch (error) {
                console.error(error);
        }
                }
                fetchdata();
input.value = '';
btn.disabled = true;
});