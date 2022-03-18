const main = document.querySelector('main');
const voiceSelect = document.querySelector('#voices');
const textArea = document.querySelector('#text');
const readBtn = document.querySelector('#read');
const toggleBtn = document.querySelector('#toggle');
const closeBtn = document.querySelector('#close');

const arr = [
    {
        image: './imgs/thirsty.jpg',
        text: 'I\'m Thirsty'
    },
    {
        image: './imgs/hungry.jpg',
        text: "I'm Hungry"
      },
      {
        image: './imgs/tired.jpg',
        text: "I'm Tired"
      },
      {
        image: './imgs/hurt.jpg',
        text: "I'm Hurt"
      },
      {
        image: './imgs/happy.jpg',
        text: "I'm Happy"
      },
      {
        image: './imgs/angry.jpg',
        text: "I'm Angry"
      },
      {
        image: './imgs/sad.jpg',
        text: "I'm Sad"
      },
      {
        image: './imgs/scared.jpg',
        text: "I'm Scared"
      },
      {
        image: './imgs/outside.jpg',
        text: 'I Want To Go Outside'
      },
      {
        image: './imgs/home.jpg',
        text: 'I Want To Go Home'
      },
      {
        image: './imgs/school.jpg',
        text: 'I Want To Go To School'
      },
      {
        image: './imgs/grandpa.jpg',
        text: 'I Want To Go To Grandpas'
      }
];

arr.forEach(createBox);

//function to create speech boxes on the DOM
function createBox(section){
    const box = document.createElement('div');

    const { image, text } = section;

    box.classList.add('box');

    box.innerHTML = `
        <img src="${image}" alt="${text}"/>
        <p class="info">${text}</p>
    `;

    //speak event
    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        //Add active effect class from css
        box.classList.add('active');

        //quickly remove the box shadow class
        setTimeout(() => box.classList.remove('active'), 900);
    })

    main.appendChild(box);
}

//Initialize speech synthesis
const message = new SpeechSynthesisUtterance();

//Get voices in select
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');

        option.value = voice.name;

        option.innerText = `${voice.name} ${voice.lang}`;

        voiceSelect.appendChild(option);
    })
}

//function to set text as message
function setTextMessage(text) {
    message.text = text;
}

//function to say text
function speakText() {
    speechSynthesis.speak(message);
}

//function to set voice on change
function setVoice(e){
    message.voice = voices.find(voice => voice.name === e.target.value);
}

//when voices change
speechSynthesis.addEventListener('voiceschanged', getVoices);

//text box functionality
toggleBtn.addEventListener('click', function(){
    document.querySelector('#text-box').classList.toggle('show');
});

//close button functionality
closeBtn.addEventListener('click', function(){
    document.querySelector('#text-box').classList.remove('show');
});

//event listener on the select options, to change voice
voiceSelect.addEventListener('change', setVoice);

//Event listener to read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textArea.value);
    speakText();
});

getVoices();