const carrossels = document.querySelectorAll('.carrossel'); // Seleciona todos os carrosséis
const prevBtns = document.querySelectorAll('.prev-btn');
const nextBtns = document.querySelectorAll('.next-btn');
const player = document.getElementById('player');

// Função para mover o carrossel
function moveCarousel(carousel, direction) {
    const items = carousel.querySelectorAll('.carrossel-item');
    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    if (direction === 'next') {
        carousel.appendChild(firstItem); // Move o primeiro item para o final
    } else if (direction === 'prev') {
        carousel.insertBefore(lastItem, items[0]); // Move o último item para o início
    }
}

// Adicionando evento de clique para os botões de navegação de todos os carrosséis
prevBtns.forEach((prevBtn, index) => {
    prevBtn.addEventListener('click', () => moveCarousel(carrossels[index], 'prev'));
});

nextBtns.forEach((nextBtn, index) => {
    nextBtn.addEventListener('click', () => moveCarousel(carrossels[index], 'next'));
});

// Função para abrir o player com o link do vídeo
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

    // Exibe o player
    player.style.display = 'block';
}

// Função para adicionar evento de clique nas imagens do carrossel
const imgs = document.querySelectorAll('.carrossel-item');
imgs.forEach(img => {
    img.addEventListener('click', () => {
        const videoUrl = img.getAttribute('onclick').split('\'')[1]; // Pega o link do vídeo diretamente
        openPlayer(videoUrl); // Abre o player com o link
    });
});

// Fecha o player quando o usuário clicar fora do iframe
player.addEventListener('click', (e) => {
    if (e.target === player) {
        player.style.display = 'none';
        player.innerHTML = ''; // Limpa o conteúdo do player
    }
});
