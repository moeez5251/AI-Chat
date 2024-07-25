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
        if (message_container.children.length > 2) {
                if (document.querySelector('.image')) {

                        document.querySelector('.image').remove();
                        document.querySelector('.message').classList.add('message_animate');
                        message_container.style.height = '60vh';
                        message_container.style.marginTop = '10%';
                }
        }

        let newelement = document.createElement('div');
        newelement.classList.add('right', 'inputs');
        newelement.innerHTML = input.value.trim();
        message_container.appendChild(newelement);
        let answer = document.createElement('div');
        answer.classList.add('indicator','left','inputs');
        message_container.appendChild(answer);

        const url = 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions';
        const options = {
                method: 'POST',
                headers: {
                        'x-rapidapi-key': '544727a05dmshe7e455284bae3a8p1520c7jsne7ba47ff870b',
                        'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
                        'Content-Type': 'application/json'
                },
                body: 
                JSON.stringify(
                        {
                                
                                messages: [
                                        {
                                                role: 'user',
                                                content: input.value
                                        }
                                ],
                                model: 'gpt-4-turbo-2024-04-09',
                                max_tokens: 100,
                                temperature: 0.9
                        
                })
        };
        async function fetching(){

                try {
                        const response = await fetch(url, options);
                        const result = await response.json();
                      return result.choices[0].message.content;
                } catch (error) {
                        return 'unable to connect at this moment'
                }
        }
        let main; 
function fetchDataAndStoreInGlobal() {
  fetching() .then((result) => {
      main = result.toString();
      console.log(main); 
      answer.classList.remove('indicator');

      animation(answer,main)
})
.catch((error) => {
        console.error('Error fetching data:', error);
});
}
fetchDataAndStoreInGlobal();

        input.value = '';
        btn.disabled = true;
});

function animation(element, message) {
        for (let i = 0; i < message.length; i++) {
                setTimeout(() => {
                        message_container.scrollTop=message_container.scrollHeight;
                        element.innerHTML+= message[i];
                }, i*10);
         
        }
}