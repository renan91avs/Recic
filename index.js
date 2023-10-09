// Seleciona todos os elementos com a classe "trash" (itens de lixo) e "trash-can" (lixeiras)
const trashItems = document.querySelectorAll(".trash");
const trashCans = document.querySelectorAll(".trash-can");

// Adiciona eventos de arrastar e soltar para cada item de lixo
trashItems.forEach((item) => {
  // Quando o item de lixo começa a ser arrastado
  item.addEventListener("dragstart", dragStart);
  // Quando o item de lixo é solto
  item.addEventListener("dragend", dragEnd);
});

// Adiciona eventos de arrastar e soltar para cada lixeira
trashCans.forEach((can) => {
  // Quando um item de lixo está sendo arrastado sobre a lixeira
  can.addEventListener("dragover", dragOver);
  // Quando um item de lixo entra na área da lixeira
  can.addEventListener("dragenter", dragEnter);
  // Quando um item de lixo deixa a área da lixeira
  can.addEventListener("dragleave", dragLeave);
  // Quando um item de lixo é solto na lixeira
  can.addEventListener("drop", dragDrop);
});

// Variável para rastrear o item de lixo sendo arrastado
let draggedItem = null;

// Função chamada quando um item de lixo começa a ser arrastado
function dragStart() {
  draggedItem = this; // Define o item arrastado como o item atual
  // Define um pequeno atraso para ocultar o item arrastado (visualmente)
  setTimeout(() => (this.style.display = "none"), 0);
}

// Função chamada quando um item de lixo é solto
function dragEnd() {
  // Define um pequeno atraso para tornar o item visível novamente após o arrasto
  setTimeout(() => (this.style.display = "block"), 0);
  draggedItem = null; // Reseta o item arrastado
}

// Função chamada quando um item de lixo é arrastado sobre uma lixeira
function dragOver(e) {
  e.preventDefault(); // Impede o comportamento padrão (necessário para permitir soltar)
}

// Função chamada quando um item de lixo entra na área de uma lixeira
function dragEnter(e) {
  e.preventDefault(); // Impede o comportamento padrão
  this.style.backgroundColor = "rgba(0, 255, 0, 0.0)"; // Muda a cor de fundo da lixeira (feedback visual)
}

// Função chamada quando um item de lixo deixa a área de uma lixeira
function dragLeave() {
  this.style.backgroundColor = "rgba(0, 255, 0, 0.0)"; // Restaura a cor de fundo original da lixeira
}

// Função chamada quando um item de lixo é solto em uma lixeira
function dragDrop() {
  this.style.backgroundColor = "rgba(0, 255, 0, 0.0)"; // Restaura a cor de fundo original da lixeira

  // Verifica se a lixeira correta está sendo direcionada com base no tipo de lixo
  if (this.classList.contains(draggedItem.dataset.trashType)) {
    this.appendChild(draggedItem); // Adiciona o item arrastado à lixeira

    // Remove o item arrastado do DOM
    draggedItem.remove();
  } else {
    // Se a lixeira errada estiver sendo direcionada, retorna o item à sua posição original
    draggedItem.style.display = "block";
  }
}
