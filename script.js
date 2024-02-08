/*
    Observador de eventos
    ToLowerCase, pois por padrão é maiscula e salvamos tudo minusculas, tanto audio como css 
*/
document.body.addEventListener('keyup', (event)=>{
    playSound(event.code.toLowerCase())
})

/*
    Selecionado a classe composer e o button e observar quando houver um click
    Pegando um som com o valor das letrar clicadas
*/
document.querySelector('.composer button').addEventListener('click', ()=>{
    let song = document.querySelector('#input').value

    if (song != ''){ // Verificar se som tem algo digitado e tranformar em uma Aray, sendo cada letra digitada um indice 
        let songArray = song.split('')
        playComposition(songArray) // Manda o Array para esta função
    }
})

// (`s_${key}`), para tocar o audio baseado na tecla digitada
function playSound(sound){
    let audioELement = document.querySelector(`#s_${sound}`) // Audio = Letra tocada
    let keyElement = document.querySelector(`div[data-key="${sound}"]`) // Letra tocada = Audio

    // Ao encontrar a tela apertada tocar o audio
    if (audioELement){
        audioELement.currentTime = 0 // Não espera acabar o audio se for tocado mais de uma vez em seguida
        audioELement.play()
    }

    if (keyElement){
        keyElement.classList.add('active') // Assim que for tocada a letra recebe a classe 'active'

        setTimeout(()=>{
            keyElement.classList.remove('active') // Após 300 miliseg perde a classe 'active' 
        }, 300)
    }
}

// Para tocar sua Array da sua composição criada  
function playComposition(songArray){
    let wait = 0 
    
    for (let songItem of songArray){
        setTimeout(()=>{ // Esta tocando toda a Array e esta com diferença de tempo e adicionando +250 para cada, pois o JS e muito rapido
            playSound(`key${songItem}`)
        }, wait)

        wait += 250
    }
}

document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        const keyData = key.getAttribute('data-key'); // Obtém o atributo data-key do elemento clicado
        playSound(keyData.toLowerCase()); // Toca o som associado à tecla clicada
    });
});