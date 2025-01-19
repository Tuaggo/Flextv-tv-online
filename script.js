const carrossel = document.querySelector('.carrossel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const items = document.querySelectorAll('.carrossel-item');
const player = document.getElementById('player');

let currentIndex = 0;

// Atualiza o carrossel para mostrar o item ativo
function updateCarrossel() {
    const itemWidth = items[0].clientWidth + 10; // Largura da imagem + espaçamento
    const offset = currentIndex * itemWidth;
    carrossel.style.transform = `translateX(-${offset}px)`;
}

// Fecha o player quando o usuário clicar fora do iframe
player.addEventListener('click', (e) => {
    if (e.target === player) {
        player.style.display = 'none';
        player.innerHTML = ''; // Limpa o conteúdo do player
    }
});

// Adiciona o evento de clique nas imagens
const imgs = document.querySelectorAll('.carrossel-img');
imgs.forEach(img => {
    img.addEventListener('click', () => {
        const videoUrl = img.getAttribute('data-video'); // Pega o link do vídeo
        openPlayer(videoUrl); // Abre o player com o link
    });
});

// Botão "Anterior"
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarrossel();
    }
});

// Botão "Próximo"
nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
        currentIndex++;
        updateCarrossel();
    }
});

// Atualiza o carrossel ao carregar a página
updateCarrossel();

// Função para abrir o player com o link fornecido
function openPlayer(videoUrl) {
    const playerDiv = document.getElementById('player');
    
    // Cria um iframe para o player
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.frameBorder = "0";
    iframe.allow = "encrypted-media";
    iframe.allowFullscreen = true; // Permite que o iframe tenha a opção de tela cheia
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    
    // Limpa o conteúdo da div do player antes de adicionar o novo iframe
    playerDiv.innerHTML = '';
    
    // Adiciona o iframe na div player
    playerDiv.appendChild(iframe);

    // Adiciona evento de clique para ativar tela cheia no iframe
    iframe.addEventListener('click', function() {
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen(); // Para navegadores que suportam
        } else if (iframe.mozRequestFullScreen) { // Firefox
            iframe.mozRequestFullScreen();
        } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari e Opera
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) { // Internet Explorer / Edge
            iframe.msRequestFullscreen();
        }
    });
}

// Bloqueia links que tentam abrir novas guias
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links da página
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        // Verifica se o link tem o atributo 'target="_blank"'
        if (link.getAttribute('target') === '_blank') {
            // Adiciona um evento para impedir o comportamento de abrir nova guia
            link.addEventListener('click', function(event) {
                event.preventDefault();  // Impede que o link seja aberto
                console.log('Bloqueado abrir nova guia: ', link.href);
            });
        }
    });
});

// Bloqueia links dentro do iframe para evitar abrir novas guias
document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.querySelector('iframe');

    if (iframe) {
        // Adiciona evento de captura de cliques dentro do iframe
        iframe.contentWindow.document.addEventListener('click', function(event) {
            const clickedElement = event.target;
            
            // Verifica se o elemento clicado é um link
            if (clickedElement.tagName.toLowerCase() === 'a') {
                // Se o link tentar abrir em uma nova guia, bloqueia
                if (clickedElement.getAttribute('target') === '_blank') {
                    event.preventDefault();
                    console.log('Bloqueado abrir nova guia dentro do iframe: ', clickedElement.href);
                }
            }
        });
    }
});

// Dentro do conteúdo do iframe
document.addEventListener('click', function(event) {
    const target = event.target;
    
    if (target.tagName.toLowerCase() === 'a' && target.getAttribute('target') === '_blank') {
        event.preventDefault(); // Bloqueia a ação de abrir nova guia
        window.top.postMessage({ action: 'blocked-link', url: target.href }, '*');
    }
});
window.addEventListener('message', function(event) {
    if (event.data.action === 'blocked-link') {
        console.log('Link bloqueado no iframe:', event.data.url);
        // Aqui você pode até mostrar um alerta ou log para ver qual link foi bloqueado
    }
});
