document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM carregado - inicializando a aplicação");

  const preloader = document.querySelector(".preloader");
  const content = document.querySelector(".content");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCount = document.querySelector(".cart-count");
  const backToTopButton = document.querySelector(".back-to-top");
  const progressPercentage = document.querySelector(".progress-percentage");
  const loaderProgress = document.querySelector(".loader-progress");

  // Elementos do sidebar
  const sidebar = document.querySelector(".sidebar");
  const toggleSidebar = document.querySelector(".toggle-sidebar");
  const sidebarOverlay = document.querySelector(".sidebar-overlay");

  console.log("Sidebar encontrado?", sidebar !== null);
  console.log("Toggle button encontrado?", toggleSidebar !== null);
  console.log("Overlay encontrado?", sidebarOverlay !== null);

  // Adicionar botão de menu mobile no topo da página
  const header = document.querySelector("header");
  const mobileMenuToggle = document.createElement("button");
  mobileMenuToggle.className = "mobile-menu-toggle";
  mobileMenuToggle.innerHTML = "<span></span><span></span><span></span>";

  // Inserir antes do primeiro elemento no header
  if (header && header.firstChild) {
    header.insertBefore(mobileMenuToggle, header.firstChild);
  } else if (header) {
    header.appendChild(mobileMenuToggle);
  }

  // Inicializa o contador do carrinho
  let cart = 0;

  // Animação do contador de progresso para o preloader
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress++;

    if (progressPercentage) {
      progressPercentage.textContent = `${progress}%`;
    }

    if (loaderProgress) {
      loaderProgress.style.width = `${progress}%`;
    }

    if (progress >= 100) {
      clearInterval(progressInterval);

      // Quando chegar a 100%, aguarda um pouco e remove o preloader
      setTimeout(() => {
        if (preloader) {
          preloader.style.opacity = "0";

          // Mostra o conteúdo principal
          setTimeout(() => {
            preloader.style.display = "none";
            if (content) content.classList.add("visible");
          }, 1000);
        }
      }, 500);
    }
  }, 50); // Velocidade da contagem (40ms = ~4 segundos para chegar a 100%)

  // Adiciona evento aos botões "Adicionar ao Carrinho"
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      cart++;
      if (cartCount) cartCount.textContent = cart;

      // Efeito visual de adição ao carrinho
      this.textContent = "Adicionado!";
      this.style.backgroundColor = "#0aff0a";
      this.style.color = "#050724";

      // Efeito de onda no botão
      createRippleEffect(this, event);

      // Restaura o texto original após um tempo
      setTimeout(() => {
        this.textContent = "Adicionar ao Carrinho";
        this.style.backgroundColor = "";
        this.style.color = "";
      }, 1500);

      // Animação do número do carrinho
      if (cartCount) {
        cartCount.classList.add("pulse");
        setTimeout(() => {
          cartCount.classList.remove("pulse");
        }, 500);
      }
    });
  });

  // Animação para a barra de busca
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("focus", function () {
      this.style.width = "75%";
      this.style.boxShadow = "0 0 20px #00fff9";
    });

    searchInput.addEventListener("blur", function () {
      if (this.value === "") {
        this.style.width = "70%";
        this.style.boxShadow = "";
      }
    });
  }

  // Efeito de hover nos cards de produto
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.03)";
      this.style.boxShadow = "0 15px 30px rgba(191, 0, 255, 0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  // Função para criar efeito de onda nos botões
  function createRippleEffect(button, e) {
    if (!button || !e) return;

    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    button.appendChild(ripple);

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Adiciona efeito ripple aos botões
  const buttons = document.querySelectorAll(
    ".neon-button, .add-to-cart-btn, .product-details-btn"
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      createRippleEffect(this, e);
    });
  });

  // Função simplificada para alternar o sidebar
  function toggleSidebarVisibility(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    console.log("Toggle sidebar chamado");

    // Verificar se os elementos existem
    if (!sidebar || !sidebarOverlay) {
      console.error("Elementos do sidebar não encontrados!");
      return;
    }

    // Adicionar/remover classe ativa no sidebar
    sidebar.classList.toggle("active");
    console.log("Sidebar está ativo:", sidebar.classList.contains("active"));

    // Adicionar/remover classe ativa no overlay
    sidebarOverlay.classList.toggle("active");

    // Alternar classe no botão
    if (toggleSidebar) {
      toggleSidebar.classList.toggle("active");
    }

    // Alterar classe no content para ajustar margens
    if (content) {
      content.classList.toggle("sidebar-active");
    }

    // Controlar o scroll do body
    if (sidebar.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // Adicionar event listeners para controle do sidebar
  if (toggleSidebar) {
    // Garantir que não haja listeners antigos
    const newToggleBtn = toggleSidebar.cloneNode(true);
    toggleSidebar.parentNode.replaceChild(newToggleBtn, toggleSidebar);

    // Adicionar novo event listener
    newToggleBtn.addEventListener("click", toggleSidebarVisibility);
    console.log("Event listener adicionado ao botão toggle");
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleSidebarVisibility);
    console.log("Event listener adicionado ao botão mobile menu");
  }

  if (sidebarOverlay) {
    // Garantir que não haja listeners antigos
    const newOverlay = sidebarOverlay.cloneNode(true);
    sidebarOverlay.parentNode.replaceChild(newOverlay, sidebarOverlay);

    // Adicionar novo event listener
    newOverlay.addEventListener("click", toggleSidebarVisibility);
    console.log("Event listener adicionado ao overlay");
  }

  // Fechar sidebar ao pressionar a tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
      toggleSidebarVisibility();
    }
  });

  // Funcionamento do filtro de preço
  const rangeMin = document.querySelector(".range-min");
  const rangeMax = document.querySelector(".range-max");
  const minValue = document.querySelector(".min-value");
  const maxValue = document.querySelector(".max-value");

  if (rangeMin && rangeMax && minValue && maxValue) {
    // Atualizar valores mínimo e máximo
    function updateValues() {
      minValue.textContent = `R$ ${rangeMin.value}`;
      maxValue.textContent = `R$ ${rangeMax.value}`;
    }

    // Garantir que o valor mínimo não seja maior que o máximo
    rangeMin.addEventListener("input", function () {
      const min = parseInt(rangeMin.value);
      const max = parseInt(rangeMax.value);

      if (min > max) {
        rangeMin.value = max;
      }

      updateValues();
    });

    // Garantir que o valor máximo não seja menor que o mínimo
    rangeMax.addEventListener("input", function () {
      const min = parseInt(rangeMin.value);
      const max = parseInt(rangeMax.value);

      if (max < min) {
        rangeMax.value = min;
      }

      updateValues();
    });

    // Inicializar valores
    updateValues();
  }

  // Event listener para links de categoria
  const categoryLinks = document.querySelectorAll(".category-list a");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remover classe ativa de todos os links
      categoryLinks.forEach((l) => l.classList.remove("active"));

      // Adicionar classe ativa ao link clicado
      this.classList.add("active");

      // Fechar sidebar em dispositivos móveis
      if (window.innerWidth <= 992) {
        toggleSidebarVisibility();
      }
    });
  });

  // Botão resetar filtros
  const resetButton = document.querySelector(".reset-button");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      // Resetar checkboxes
      document
        .querySelectorAll(".checkbox-container input")
        .forEach((checkbox) => {
          checkbox.checked = false;
          checkbox.parentElement.style.color = "#ccc";
        });

      // Resetar radio buttons
      document
        .querySelectorAll(".radio-container input, .rating-container input")
        .forEach((radio) => {
          if (radio.value === "all" || radio.value === "5") {
            radio.checked = true;
            radio.parentElement.style.color = "#0aff0a";
          } else {
            radio.checked = false;
            radio.parentElement.style.color = "#ccc";
          }
        });

      // Resetar sliders
      if (rangeMin && rangeMax) {
        rangeMin.value = 0;
        rangeMax.value = 2000;
        updateValues();
      }
    });
  }

  // Adicionar efeito visual aos filtros selecionados
  const checkboxes = document.querySelectorAll(".checkbox-container input");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const container = this.parentElement;
      if (this.checked) {
        container.style.color = "#0aff0a";
      } else {
        container.style.color = "#ccc";
      }
    });

    // Iniciar com a cor correta
    if (checkbox.checked) {
      checkbox.parentElement.style.color = "#0aff0a";
    }
  });

  const radioButtons = document.querySelectorAll(
    ".radio-container input, .rating-container input"
  );
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", function () {
      // Resetar todas as cores no mesmo grupo
      const name = this.getAttribute("name");
      document.querySelectorAll(`input[name="${name}"]`).forEach((r) => {
        r.parentElement.style.color = "#ccc";
      });

      // Definir cor para o item selecionado
      if (this.checked) {
        this.parentElement.style.color = "#0aff0a";
      }
    });

    // Iniciar com a cor correta
    if (radio.checked) {
      radio.parentElement.style.color = "#0aff0a";
    }
  });

  // Mostrar/ocultar o botão "voltar ao topo"
  window.addEventListener("scroll", function () {
    if (backToTopButton) {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    }
  });

  // Função de rolagem suave ao topo quando o botão é clicado
  if (backToTopButton) {
    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Animar elementos quando entrarem na viewport
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".fade-in, .slide-up, .slide-down, .slide-left, .slide-right"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight * 0.9) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0) translateX(0)";
      }
    });
  };

  // Registrar evento de scroll e executar a animação inicial
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();

  // Verificação final para sidebar
  console.log("Inicialização concluída - sidebar pronto para uso");

  // ===== INICIALIZAR CARROSSEL =====
  // Chamada com um pequeno atraso para garantir que todos os elementos estejam carregados
  setTimeout(() => {
    initializeCarousel();
  }, 3500);
});

// O resto do seu código JavaScript permanece igual...
// Função para inicializar o carrossel
function initializeCarousel() {
  const productCards = document.querySelectorAll(".product-card");
  const featuredSection = document.querySelector(".featured-section");

  if (!featuredSection || productCards.length === 0) return;

  // Remover a grid de produtos existente
  const productsGrid = document.querySelector(".products-grid");
  if (!productsGrid) return;

  const productsParent = productsGrid.parentNode;
  productsParent.removeChild(productsGrid);

  // Remover a paginação se existir
  const paginationContainer = document.querySelector(".pagination");
  if (paginationContainer) {
    paginationContainer.parentNode.removeChild(paginationContainer);
  }

  // Criar a estrutura do carrossel
  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carousel-container";

  const carouselTrack = document.createElement("div");
  carouselTrack.className = "carousel-track";

  // Agrupar produtos em slides (3 produtos por slide)
  const productsPerSlide = 3;
  const totalSlides = Math.ceil(productCards.length / productsPerSlide);

  for (let i = 0; i < totalSlides; i++) {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    for (let j = 0; j < productsPerSlide; j++) {
      const index = i * productsPerSlide + j;
      if (index < productCards.length) {
        slide.appendChild(productCards[index].cloneNode(true));
      }
    }

    carouselTrack.appendChild(slide);
  }

  // Adicionar controles do carrossel
  const carouselControls = document.createElement("div");
  carouselControls.className = "carousel-controls";

  const prevButton = document.createElement("button");
  prevButton.className = "carousel-button prev";
  prevButton.innerHTML = "&lt;";
  prevButton.setAttribute("aria-label", "Slide anterior");

  const nextButton = document.createElement("button");
  nextButton.className = "carousel-button next";
  nextButton.innerHTML = "&gt;";
  nextButton.setAttribute("aria-label", "Próximo slide");

  carouselControls.appendChild(prevButton);
  carouselControls.appendChild(nextButton);

  // Adicionar indicadores
  const carouselIndicators = document.createElement("div");
  carouselIndicators.className = "carousel-indicators";

  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement("div");
    indicator.className =
      i === 0 ? "carousel-indicator active" : "carousel-indicator";
    indicator.dataset.slide = i;
    carouselIndicators.appendChild(indicator);
  }

  // Montar o carrossel
  carouselContainer.appendChild(carouselTrack);
  carouselContainer.appendChild(carouselControls);
  carouselContainer.appendChild(carouselIndicators);

  // Inserir o carrossel no DOM
  productsParent.appendChild(carouselContainer);

  // Variáveis para controle do carrossel
  let currentSlide = 0;

  // Função para atualizar os indicadores
  function updateIndicators() {
    const indicators = document.querySelectorAll(".carousel-indicator");
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Função para mover o carrossel
  function moveToSlide(slideIndex) {
    carouselTrack.style.transform = `translateX(-${slideIndex * 100}%)`;
    currentSlide = slideIndex;
    updateIndicators();

    // Reativar as animações dos produtos no slide atual
    const currentSlideElement = carouselTrack.children[currentSlide];
    const products = currentSlideElement.querySelectorAll(".product-card");

    products.forEach((product) => {
      product.style.opacity = "0";
      void product.offsetWidth; // Forçar reflow
      product.style.opacity = "1";
    });
  }

  // Event listeners para os botões de navegação
  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      moveToSlide(currentSlide - 1);
    } else {
      moveToSlide(totalSlides - 1); // Voltar para o último slide
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentSlide < totalSlides - 1) {
      moveToSlide(currentSlide + 1);
    } else {
      moveToSlide(0); // Voltar para o primeiro slide
    }
  });

  // Event listeners para os indicadores
  const indicators = document.querySelectorAll(".carousel-indicator");
  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const slideIndex = parseInt(indicator.dataset.slide);
      moveToSlide(slideIndex);
    });
  });

  // Auto-play opcional
  let autoPlayInterval;

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      moveToSlide(nextSlide);
    }, 5000); // Muda slide a cada 5 segundos
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Parar auto-play quando o mouse está sobre o carrossel
  carouselContainer.addEventListener("mouseenter", stopAutoPlay);
  carouselContainer.addEventListener("mouseleave", startAutoPlay);

  // Iniciar auto-play
  startAutoPlay();

  // Adicionar teclas de navegação (setas esquerda/direita)
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      if (currentSlide > 0) {
        moveToSlide(currentSlide - 1);
      } else {
        moveToSlide(totalSlides - 1);
      }
    } else if (e.key === "ArrowRight") {
      if (currentSlide < totalSlides - 1) {
        moveToSlide(currentSlide + 1);
      } else {
        moveToSlide(0);
      }
    }
  });

  // Tornar os botões do carrossel clicáveis com efeito ripple
  const carouselButtons = document.querySelectorAll(".carousel-button");
  carouselButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      createRippleEffect(this, e);
    });
  });

  // Adicionar novos event listeners aos botões "Adicionar ao Carrinho"
  const newAddToCartButtons =
    carouselContainer.querySelectorAll(".add-to-cart");
  newAddToCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const cartCount = document.querySelector(".cart-count");
      let cart = parseInt(cartCount.textContent || "0");

      cart++;
      if (cartCount) cartCount.textContent = cart;

      // Efeito visual de adição ao carrinho
      this.textContent = "Adicionado!";
      this.style.backgroundColor = "#0aff0a";
      this.style.color = "#050724";

      // Efeito de onda no botão
      createRippleEffect(this, event);

      // Restaura o texto original após um tempo
      setTimeout(() => {
        this.textContent = "Adicionar ao Carrinho";
        this.style.backgroundColor = "";
        this.style.color = "";
      }, 1500);

      // Animação do número do carrinho
      if (cartCount) {
        cartCount.classList.add("pulse");
        setTimeout(() => {
          cartCount.classList.remove("pulse");
        }, 500);
      }
    });
  });

  // Hover efeito para cartões de produto no carrossel
  const carouselProductCards =
    carouselContainer.querySelectorAll(".product-card");
  carouselProductCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.03)";
      this.style.boxShadow = "0 15px 30px rgba(191, 0, 255, 0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });
}

// Função para criar efeito de onda nos botões (duplicada para uso no carrossel)
function createRippleEffect(button, e) {
  if (!button || !e) return;

  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  button.appendChild(ripple);

  const rect = button.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ripple.style.left = x + "px";
  ripple.style.top = y + "px";

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Adicione este código ao seu arquivo script.js

// Função para atualizar os contadores regressivos
function updateCountdowns() {
  const countdowns = document.querySelectorAll(".countdown");

  countdowns.forEach((countdown) => {
    // Verificar se já tem um timestamp atribuído
    if (!countdown.dataset.endTime) {
      // Gerar um tempo aleatório entre 1 e 24 horas no futuro
      const hoursToAdd = Math.floor(Math.random() * 23) + 1;
      const minutesToAdd = Math.floor(Math.random() * 60);
      const secondsToAdd = Math.floor(Math.random() * 60);

      const endTime = new Date();
      endTime.setHours(endTime.getHours() + hoursToAdd);
      endTime.setMinutes(endTime.getMinutes() + minutesToAdd);
      endTime.setSeconds(endTime.getSeconds() + secondsToAdd);

      countdown.dataset.endTime = endTime.getTime();
    }

    // Calcular tempo restante
    const now = new Date().getTime();
    const endTime = parseInt(countdown.dataset.endTime);
    const timeLeft = endTime - now;

    if (timeLeft <= 0) {
      // Tempo expirado
      countdown.textContent = "Expirado!";
      countdown.parentElement.style.color = "#ff3333";

      // Adicionar classe para estilo expirado
      countdown.parentElement.classList.add("expired");

      // Desabilitar o botão
      const button = countdown
        .closest(".promo-card")
        .querySelector(".promo-button");
      if (button) {
        button.disabled = true;
        button.textContent = "Expirado";
        button.style.backgroundColor = "#333";
        button.style.color = "#888";
        button.style.borderColor = "#444";
        button.style.cursor = "not-allowed";
      }

      return;
    }

    // Calcular horas, minutos e segundos
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Formatar e exibir o tempo restante
    countdown.textContent =
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0");

    // Adicionar classe pulsante quando estiver perto de acabar
    if (timeLeft < 1000 * 60 * 60) {
      // Menos de 1 hora
      countdown.parentElement.classList.add("ending-soon");
    }
  });
}

// Função para inicializar os produtos em promoção
function initializePromoProducts() {
  const promoButtons = document.querySelectorAll(".promo-button");
  if (promoButtons.length === 0) return;

  // Adicionar efeito ripple aos botões de promoção
  promoButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Verificar se a função createRippleEffect existe
      if (typeof createRippleEffect === "function") {
        createRippleEffect(this, e);
      }

      // Efeito visual de adição ao carrinho
      this.textContent = "Adicionado!";
      this.style.backgroundColor = "#0aff0a";
      this.style.color = "#050724";

      // Atualizar contagem do carrinho
      const cartCount = document.querySelector(".cart-count");
      if (cartCount) {
        let cart = parseInt(cartCount.textContent || "0");
        cart++;
        cartCount.textContent = cart;

        // Animação do número do carrinho
        cartCount.classList.add("pulse");
        setTimeout(() => {
          cartCount.classList.remove("pulse");
        }, 500);
      }

      // Restaura o texto original após um tempo
      setTimeout(() => {
        this.textContent = "Aproveitar";
        this.style.backgroundColor = "";
        this.style.color = "";
      }, 1500);
    });
  });

  // Inicializar e atualizar os contadores regressivos
  updateCountdowns();
  setInterval(updateCountdowns, 1000);

  // Adicionar efeito de hover 3D aos cards
  const promoCards = document.querySelectorAll(".promo-card");
  promoCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / 20; // divide by a factor to control tilt amount
      const moveY = (y - centerY) / 20;

      this.style.transform = `translateY(-15px) scale(1.05) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;

      // Add dynamic shadow based on mouse position
      this.style.boxShadow = `${moveX}px ${moveY}px 30px rgba(191, 0, 255, 0.4)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";

      // Small animation to smooth the transition back
      setTimeout(() => {
        this.style.transition =
          "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      }, 50);
    });

    card.addEventListener("mouseenter", function () {
      this.style.transition = "all 0.1s ease";
    });
  });
}

// Chamar a inicialização após o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
  // Chamar depois de um curto atraso para garantir que todos os elementos estejam carregados
  setTimeout(() => {
    initializePromoProducts();
  }, 3500); // Depois do preloader
});

// Adicione este código ao seu arquivo JavaScript

// Função para atualizar o endereço salvo no header
function initializeAddressSelection() {
  const deliveryAddress = document.querySelector(".delivery-address");
  const addressText = document.querySelector(".address-text");

  if (!deliveryAddress || !addressText) return;

  // Verificar se há um endereço salvo no localStorage
  const savedAddress = localStorage.getItem("deliveryAddress");
  if (savedAddress) {
    addressText.textContent = savedAddress;
  }

  // Adicionar evento de clique para abrir um modal de seleção de endereço
  deliveryAddress.addEventListener("click", openAddressModal);
}

// Função para abrir o modal de seleção de endereço
function openAddressModal() {
  // Criar o modal
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";

  const modalContent = document.createElement("div");
  modalContent.className = "address-modal";

  // Conteúdo do modal
  modalContent.innerHTML = `
      <div class="modal-header">
        <h3>Selecione o endereço de entrega</h3>
        <button class="close-modal">&times;</button>
      </div>
      <div class="modal-body">
        <div class="address-list">
          <div class="address-item saved">
            <input type="radio" name="address" id="address1" value="Escolha local de entrega" checked>
            <label for="address1">
              <strong>Seu Nome</strong><br>
              Rua Exemplo, 123 - Bairro<br>
              Cidade - Estado, CEP 01234-567<br>
              <span class="default-badge">Padrão</span>
            </label>
          </div>
          <div class="address-item">
            <input type="radio" name="address" id="address2" value="Escolha local de entrega">
            <label for="address2">
              <strong>Casa da Amante</strong><br>
              Avenida Corporativa, 456 - Centro Empresarial<br>
              Cidade - Estado, CEP 98765-432
            </label>
          </div>
        </div>
        <button class="add-address-btn">+ Adicionar novo endereço</button>
      </div>
      <div class="modal-footer">
        <button class="neon-button save-address">Usar este endereço</button>
      </div>
    `;

  // Adicionar o modal ao DOM
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  // Adicionar eventos aos botões
  const closeButton = modalContent.querySelector(".close-modal");
  const saveButton = modalContent.querySelector(".save-address");
  const addAddressBtn = modalContent.querySelector(".add-address-btn");

  // Evento para fechar o modal
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modalOverlay);
  });

  // Evento para salvar o endereço selecionado
  saveButton.addEventListener("click", () => {
    const selectedAddress = modalContent.querySelector(
      'input[name="address"]:checked'
    ).value;
    document.querySelector(".address-text").textContent = selectedAddress;
    localStorage.setItem("deliveryAddress", selectedAddress);
    document.body.removeChild(modalOverlay);
  });

  // Evento para o botão de adicionar novo endereço
  addAddressBtn.addEventListener("click", () => {
    alert("Funcionalidade de adicionar endereço será implementada em breve!");
  });

  // Fechar o modal ao clicar fora dele
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
    }
  });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Chamar a função de inicialização do endereço após um curto atraso
  setTimeout(() => {
    initializeAddressSelection();
  }, 3500); // Após o preloader
}); // Adicione este código ao seu arquivo JavaScript

// Função para atualizar o endereço salvo no header
function initializeAddressSelection() {
  const deliveryAddress = document.querySelector(".delivery-address");
  const addressText = document.querySelector(".address-text");

  if (!deliveryAddress || !addressText) return;

  // Verificar se há um endereço salvo no localStorage
  const savedAddress = localStorage.getItem("deliveryAddress");
  if (savedAddress) {
    addressText.textContent = savedAddress;
  }

  // Adicionar evento de clique para abrir um modal de seleção de endereço
  deliveryAddress.addEventListener("click", openAddressModal);
}

// Função para abrir o modal de seleção de endereço
function openAddressModal() {
  // Criar o modal
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";

  const modalContent = document.createElement("div");
  modalContent.className = "address-modal";

  // Conteúdo do modal
  modalContent.innerHTML = `
    <div class="modal-header">
      <h3>Selecione o endereço de entrega</h3>
      <button class="close-modal">&times;</button>
    </div>
    <div class="modal-body">
      <div class="address-list">
        <div class="address-item saved">
          <input type="radio" name="address" id="address1" value="Seu Nome - CEP 01234-567" checked>
          <label for="address1">
            <strong>Seu Nome</strong><br>
            Rua Exemplo, 123 - Bairro<br>
            Cidade - Estado, CEP 01234-567<br>
            <span class="default-badge">Padrão</span>
          </label>
        </div>
        <div class="address-item">
          <input type="radio" name="address" id="address2" value="Local de entrega">
          <label for="address2">
            <strong>Trabalho</strong><br>
            Avenida Corporativa, 456 - Centro Empresarial<br>
            Cidade - Estado, CEP 98765-432
          </label>
        </div>
      </div>
      <button class="add-address-btn">+ Adicionar novo endereço</button>
    </div>
    <div class="modal-footer">
      <button class="neon-button save-address">Usar este endereço</button>
    </div>
  `;

  // Adicionar o modal ao DOM
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);

  // Adicionar eventos aos botões
  const closeButton = modalContent.querySelector(".close-modal");
  const saveButton = modalContent.querySelector(".save-address");
  const addAddressBtn = modalContent.querySelector(".add-address-btn");

  // Evento para fechar o modal
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modalOverlay);
  });

  // Evento para salvar o endereço selecionado
  saveButton.addEventListener("click", () => {
    const selectedAddress = modalContent.querySelector(
      'input[name="address"]:checked'
    ).value;
    document.querySelector(".address-text").textContent = selectedAddress;
    localStorage.setItem("deliveryAddress", selectedAddress);
    document.body.removeChild(modalOverlay);
  });

  // Evento para o botão de adicionar novo endereço
  addAddressBtn.addEventListener("click", () => {
    alert("Funcionalidade de adicionar endereço será implementada em breve!");
  });

  // Fechar o modal ao clicar fora dele
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
    }
  });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Chamar a função de inicialização do endereço após um curto atraso
  setTimeout(() => {
    initializeAddressSelection();
  }, 3500); // Após o preloader
});

// Funções para os botões do header
document.addEventListener("DOMContentLoaded", function () {
  // Selecionar todos os botões do header
  const headerButtons = document.querySelectorAll("nav ul li a.neon-button");

  // Selecionar cada botão específico
  const homeButton = document.querySelector("nav ul li a[href='#']");
  const categoriesButton = headerButtons[1];
  const offersButton = headerButtons[2];
  const accountButton = headerButtons[3];
  const cartButton = document.querySelector(".cart");

  // Função para o botão Home
  if (homeButton) {
    homeButton.addEventListener("click", function (e) {
      e.preventDefault();
      // Rolar para o topo da página
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      // Exibir uma mensagem de boas-vindas
      showNotification("Seja bem vindo!");
    });
  }

  // Função para o botão Categorias
  if (categoriesButton) {
    categoriesButton.addEventListener("click", function (e) {
      e.preventDefault();
      // Rolar até a seção de categorias
      const categoriesSection = document.querySelector(".categories-section");
      if (categoriesSection) {
        categoriesSection.scrollIntoView({ behavior: "smooth" });

        // Adiciona uma classe para destacar a seção por um momento
        categoriesSection.classList.add("highlighted-section");
        setTimeout(() => {
          categoriesSection.classList.remove("highlighted-section");
        }, 1500);
      }
    });
  }

  // Função para o botão Ofertas
  if (offersButton) {
    offersButton.addEventListener("click", function (e) {
      e.preventDefault();
      // Rolar até a seção de promoções
      const promoSection = document.querySelector(".promo-section");
      if (promoSection) {
        promoSection.scrollIntoView({ behavior: "smooth" });

        // Adiciona uma classe para destacar a seção por um momento
        promoSection.classList.add("highlighted-section");
        setTimeout(() => {
          promoSection.classList.remove("highlighted-section");
        }, 1500);
      }
    });
  }

  // Função para o botão Conta
  if (accountButton) {
    accountButton.addEventListener("click", function (e) {
      e.preventDefault();
      // Abre um modal de login/registro
      openAccountModal();
    });
  }

  // Função para o botão Carrinho
  if (cartButton) {
    cartButton.addEventListener("click", function (e) {
      e.preventDefault();
      // Abre o carrinho de compras
      openCartModal();
    });
  }

  // Função para criar e exibir um modal de conta
  function openAccountModal() {
    // Criar o modal
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    const modalContent = document.createElement("div");
    modalContent.className = "account-modal";

    // Conteúdo do modal
    modalContent.innerHTML = `
            <div class="modal-header">
                <h3>Minha Conta</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="account-tabs">
                    <button class="tab-button active" data-tab="login">Login</button>
                    <button class="tab-button" data-tab="register">Cadastro</button>
                </div>
                
                <div class="tab-content" id="login-tab">
                    <form class="login-form">
                        <div class="form-group">
                            <label for="login-email">E-mail</label>
                            <input type="email" id="login-email" placeholder="Seu e-mail" required>
                        </div>
                        <div class="form-group">
                            <label for="login-password">Senha</label>
                            <input type="password" id="login-password" placeholder="Sua senha" required>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-container">
                                <input type="checkbox" id="remember-me">
                                <span class="checkmark"></span>
                                Lembrar-me
                            </label>
                        </div>
                        <button type="submit" class="neon-button full-width">Entrar</button>
                        <div class="forgot-password">
                            <a href="#">Esqueceu sua senha?</a>
                        </div>
                    </form>
                </div>
                
                <div class="tab-content hidden" id="register-tab">
                    <form class="register-form">
                        <div class="form-group">
                            <label for="register-name">Nome Completo</label>
                            <input type="text" id="register-name" placeholder="Seu nome completo" required>
                        </div>
                        <div class="form-group">
                            <label for="register-email">E-mail</label>
                            <input type="email" id="register-email" placeholder="Seu e-mail" required>
                        </div>
                        <div class="form-group">
                            <label for="register-password">Senha</label>
                            <input type="password" id="register-password" placeholder="Crie uma senha" required>
                        </div>
                        <div class="form-group">
                            <label for="register-confirm-password">Confirmar Senha</label>
                            <input type="password" id="register-confirm-password" placeholder="Confirme sua senha" required>
                        </div>
                        <div class="form-group">
                            <label class="checkbox-container">
                                <input type="checkbox" id="terms-agree" required>
                                <span class="checkmark"></span>
                                Concordo com os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>
                            </label>
                        </div>
                        <button type="submit" class="neon-button full-width">Criar Conta</button>
                    </form>
                </div>
            </div>
        `;

    // Adicionar o modal ao DOM
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Adicionar funcionalidade às abas
    const tabButtons = modalContent.querySelectorAll(".tab-button");
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remover classe ativa de todos os botões
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        // Adicionar classe ativa ao botão clicado
        this.classList.add("active");

        // Esconder todos os conteúdos de aba
        const tabContents = modalContent.querySelectorAll(".tab-content");
        tabContents.forEach((content) => content.classList.add("hidden"));

        // Mostrar o conteúdo da aba selecionada
        const tabId = this.getAttribute("data-tab") + "-tab";
        document.getElementById(tabId).classList.remove("hidden");
      });
    });

    // Adicionar funcionalidade aos formulários
    const loginForm = modalContent.querySelector(".login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        // Simulação de login - em um caso real, você enviaria para o servidor
        console.log("Tentativa de login:", email);

        // Simular sucesso no login
        showNotification("Login realizado com sucesso!");
        document.body.removeChild(modalOverlay);

        // Mudar o texto do botão de conta para o e-mail do usuário (versão curta)
        const accountBtn = document.querySelector("nav ul li a:nth-child(4)");
        if (accountBtn) {
          // Pegar apenas a parte antes do @ do email
          const username = email.split("@")[0];
          accountBtn.innerHTML = username;
        }
      });
    }

    const registerForm = modalContent.querySelector(".register-form");
    if (registerForm) {
      registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const confirmPassword = document.getElementById(
          "register-confirm-password"
        ).value;

        // Verificar se as senhas coincidem
        if (password !== confirmPassword) {
          showNotification("As senhas não coincidem!", "error");
          return;
        }

        // Simulação de cadastro - em um caso real, você enviaria para o servidor
        console.log("Tentativa de cadastro:", name, email);

        // Simular sucesso no cadastro
        showNotification("Cadastro realizado com sucesso!");
        document.body.removeChild(modalOverlay);
      });
    }

    // Adicionar evento para fechar o modal
    const closeButton = modalContent.querySelector(".close-modal");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        document.body.removeChild(modalOverlay);
      });
    }

    // Fechar o modal ao clicar fora dele
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    });
  }

  // Função para criar e exibir um modal de carrinho
  function openCartModal() {
    // Obter a contagem atual do carrinho
    const cartCountElement = document.querySelector(".cart-count");
    const itemCount = parseInt(cartCountElement.textContent) || 0;

    // Criar o modal
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    const modalContent = document.createElement("div");
    modalContent.className = "cart-modal";

    // Gerar HTML condicional baseado no número de itens no carrinho
    let cartItemsHTML = "";

    if (itemCount > 0) {
      // Gerar itens aleatórios do carrinho baseados na contagem
      for (let i = 0; i < itemCount; i++) {
        const randomProduct = getRandomProduct();
        cartItemsHTML += `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${randomProduct.image}" alt="${
          randomProduct.name
        }">
                        </div>
                        <div class="cart-item-details">
                            <h4>${randomProduct.name}</h4>
                            <p class="cart-item-price">R$ ${randomProduct.price.toFixed(
                              2
                            )}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn minus">-</button>
                                <span class="quantity">1</span>
                                <button class="quantity-btn plus">+</button>
                            </div>
                        </div>
                        <button class="remove-item">&times;</button>
                    </div>
                `;
      }
    }

    // Conteúdo do modal
    modalContent.innerHTML = `
            <div class="modal-header">
                <h3>Seu Carrinho (${itemCount})</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                ${
                  itemCount === 0
                    ? `<div class="empty-cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0.0.24.24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <p>Seu carrinho está vazio</p>
                        <button class="neon-button">Continuar Comprando</button>
                    </div>`
                    : `<div class="cart-items">
                        ${cartItemsHTML}
                    </div>
                    <div class="cart-summary">
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>R$ ${(itemCount * 299.99).toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span>Frete:</span>
                            <span>${
                              itemCount > 0 ? "R$ 25,00" : "R$ 0,00"
                            }</span>
                        </div>
                        <div class="summary-row discount">
                            <span>Desconto:</span>
                            <span>-R$ ${(itemCount * 29.99).toFixed(2)}</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total:</span>
                            <span>R$ ${(itemCount * 270.0 + 25).toFixed(
                              2
                            )}</span>
                        </div>
                        
                        <div class="coupon-code">
                            <input type="text" placeholder="Código de cupom">
                            <button class="apply-coupon">Aplicar</button>
                        </div>
                        
                        <button class="neon-button checkout-button">Finalizar Compra</button>
                        <button class="continue-shopping">Continuar Comprando</button>
                    </div>`
                }
            </div>
        `;

    // Adicionar o modal ao DOM
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Adicionar funcionalidade aos botões do carrinho se houver itens
    if (itemCount > 0) {
      // Botões de quantidade
      const quantityButtons = modalContent.querySelectorAll(".quantity-btn");
      quantityButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const quantityElement = this.parentElement.querySelector(".quantity");
          let quantity = parseInt(quantityElement.textContent);

          if (this.classList.contains("plus")) {
            quantity++;
          } else if (this.classList.contains("minus") && quantity > 1) {
            quantity--;
          }

          quantityElement.textContent = quantity;

          // Recalcular os totais (simplificado para este exemplo)
          updateCartTotals();
        });
      });

      // Botões de remover item
      const removeButtons = modalContent.querySelectorAll(".remove-item");
      removeButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const cartItem = this.closest(".cart-item");
          cartItem.classList.add("removing");

          setTimeout(() => {
            cartItem.remove();

            // Atualizar a contagem do carrinho
            const newCount = document.querySelectorAll(".cart-item").length;
            cartCountElement.textContent = newCount;
            modalContent.querySelector(
              ".modal-header h3"
            ).textContent = `Seu Carrinho (${newCount})`;

            // Se o carrinho ficar vazio, atualizar o conteúdo
            if (newCount === 0) {
              modalContent.querySelector(".modal-body").innerHTML = `
                                <div class="empty-cart">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0.0.24.24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                    <p>Seu carrinho está vazio</p>
                                    <button class="neon-button">Continuar Comprando</button>
                                </div>
                            `;

              // Adicionar evento ao botão de continuar comprando
              const continueBtn = modalContent.querySelector(
                ".empty-cart .neon-button"
              );
              if (continueBtn) {
                continueBtn.addEventListener("click", () => {
                  document.body.removeChild(modalOverlay);
                });
              }
            } else {
              // Recalcular os totais
              updateCartTotals();
            }
          }, 300);
        });
      });

      // Botão de checkout
      const checkoutButton = modalContent.querySelector(".checkout-button");
      if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
          showNotification("Redirecionando para o checkout...");

          // Simular redirecionamento
          setTimeout(() => {
            document.body.removeChild(modalOverlay);
          }, 1500);
        });
      }

      // Botão de continuar comprando
      const continueButton = modalContent.querySelector(".continue-shopping");
      if (continueButton) {
        continueButton.addEventListener("click", function () {
          document.body.removeChild(modalOverlay);
        });
      }

      // Botão de aplicar cupom
      const applyCouponButton = modalContent.querySelector(".apply-coupon");
      if (applyCouponButton) {
        applyCouponButton.addEventListener("click", function () {
          const couponInput = modalContent.querySelector(".coupon-code input");
          const couponCode = couponInput.value.trim();

          if (couponCode) {
            if (couponCode.toUpperCase() === "TECHMARKET10") {
              showNotification("Cupom aplicado com sucesso: 10% de desconto!");
              // Atualizar o desconto no resumo
              updateCartTotals(0.1);
              couponInput.disabled = true;
              applyCouponButton.disabled = true;
              applyCouponButton.textContent = "Aplicado";
            } else {
              showNotification("Cupom inválido!", "error");
            }
          } else {
            showNotification("Digite um código de cupom!", "error");
          }
        });
      }
    } else {
      // Se o carrinho estiver vazio, adicionar evento ao botão de continuar comprando
      const continueButton = modalContent.querySelector(
        ".empty-cart .neon-button"
      );
      if (continueButton) {
        continueButton.addEventListener("click", function () {
          document.body.removeChild(modalOverlay);
        });
      }
    }

    // Função para recalcular os totais do carrinho
    function updateCartTotals(extraDiscount = 0) {
      const cartItems = modalContent.querySelectorAll(".cart-item");
      let subtotal = 0;
      let baseDiscount = 0;

      cartItems.forEach((item) => {
        const priceText = item.querySelector(".cart-item-price").textContent;
        const price = parseFloat(
          priceText.replace("R$ ", "").replace(",", ".")
        );
        const quantity = parseInt(item.querySelector(".quantity").textContent);

        subtotal += price * quantity;
        baseDiscount += price * 0.1 * quantity; // Desconto base de 10%
      });

      const shipping = cartItems.length > 0 ? 25 : 0;
      const totalDiscount = baseDiscount + subtotal * extraDiscount;
      const total = subtotal - totalDiscount + shipping;

      // Atualizar os valores no resumo
      modalContent.querySelector(
        ".summary-row:nth-child(1) span:last-child"
      ).textContent = `R$ ${subtotal.toFixed(2)}`;
      modalContent.querySelector(
        ".summary-row:nth-child(2) span:last-child"
      ).textContent = `R$ ${shipping.toFixed(2)}`;
      modalContent.querySelector(
        ".summary-row:nth-child(3) span:last-child"
      ).textContent = `-R$ ${totalDiscount.toFixed(2)}`;
      modalContent.querySelector(
        ".summary-row:nth-child(4) span:last-child"
      ).textContent = `R$ ${total.toFixed(2)}`;
    }

    // Função para gerar produtos aleatórios
    function getRandomProduct() {
      const products = [
        {
          name: "Teclado Mecânico RGB",
          price: 299.99,
          image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
        },
        {
          name: "Mouse Gamer 16000 DPI",
          price: 249.99,
          image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
        },
        {
          name: "Monitor Gamer 144Hz",
          price: 1499.99,
          image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
        },
        {
          name: "Headset 7.1 Surround",
          price: 349.99,
          image: "https://images.unsplash.com/photo-1599669454699-248893623440",
        },
      ];

      return products[Math.floor(Math.random() * products.length)];
    }

    // Adicionar evento para fechar o modal
    const closeButton = modalContent.querySelector(".close-modal");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        document.body.removeChild(modalOverlay);
      });
    }

    // Fechar o modal ao clicar fora dele
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay);
      }
    });
  }

  // Função para mostrar notificações toast
  function showNotification(message, type = "success") {
    // Verificar se já existe um sistema de notificações
    let notificationContainer = document.querySelector(
      ".notification-container"
    );

    // Se não existir, criar um
    if (!notificationContainer) {
      notificationContainer = document.createElement("div");
      notificationContainer.className = "notification-container";
      document.body.appendChild(notificationContainer);

      // Adicionar estilo CSS inline (você pode mover isso para seu arquivo CSS)
      const style = document.createElement("style");
      style.textContent = `
                .notification-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                }
                
                .notification {
                    background-color: rgba(10, 10, 40, 0.9);
                    color: white;
                    padding: 15px 20px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
                    display: flex;
                    align-items: center;
                    min-width: 280px;
                    max-width: 320px;
                    transform: translateX(400px);
                    animation: slideIn 0.3s forwards;
                    position: relative;
                }
                
                .notification.success {
                    border-left: 4px solid var(--success-color);
                }
                
                .notification.error {
                    border-left: 4px solid #ff3333;
                }
                
                .notification-icon {
                    margin-right: 15px;
                    font-size: 1.5rem;
                }
                
                .notification-message {
                    flex: 1;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: #ccc;
                    font-size: 1rem;
                    cursor: pointer;
                    margin-left: 10px;
                }
                
                @keyframes slideIn {
                    to {
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideOut {
                    to {
                        transform: translateX(400px);
                    }
                }
                
                .highlighted-section {
                    animation: highlight 1.5s;
                }
                
                @keyframes highlight {
                    0% {
                        box-shadow: 0 0 0 rgba(0, 255, 249, 0);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(0, 255, 249, 0.8);
                    }
                    100% {
                        box-shadow: 0 0 0 rgba(0, 255, 249, 0);
                    }
                }
                
                /* Estilos para as abas de Login/Registro */
                .account-tabs {
                    display: flex;
                    margin-bottom: 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .tab-button {
                    background: none;
                    border: none;
                    color: #ccc;
                    padding: 10px 20px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    position: relative;
                }
                
                .tab-button.active {
                    color: var(--secondary-color);
                }
                
                .tab-button.active::after {
                    content: "";
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: var(--secondary-color);
                    box-shadow: 0 0 10px var(--secondary-color);
                }
                
                .tab-content {
                    transition: all 0.3s ease;
                }
                
                .tab-content.hidden {
                    display: none;
                }
                
                /* Estilos para os formulários */
                .form-group {
                    margin-bottom: 20px;
                }
                
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    color: #eee;
                }
                
                .form-group input {
                    width: 100%;
                    padding: 12px;
                    background-color: rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    border-radius: 5px;
                    transition: all 0.3s ease;
                }
                
                .form-group input:focus {
                    border-color: var(--secondary-color);
                    box-shadow: 0 0 10px rgba(0, 255, 249, 0.3);
                    outline: none;
                }
                
                .forgot-password {
                    text-align: center;
                    margin-top: 15px;
                }
                
                .forgot-password a {
                    color: #ccc;
                    text-decoration: none;
                    font-size: 0.9rem;
                    transition: color 0.3s ease;
                }
                
                .forgot-password a:hover {
                    color: var(--secondary-color);
                    text-decoration: underline;
                }
                
                /* Estilos para o modal do carrinho */
                .cart-modal {
                    width: 90%;
                    max-width: 600px;
                    max-height: 80vh;
                }
                
                .empty-cart {
                    text-align: center;
                    padding: 40px 20px;
                }
                
                .empty-cart svg {
                    color: #555;
                    margin-bottom: 20px;
                }
                
                .empty-cart p {
                    color: #ccc;
                    margin-bottom: 20px;
                    font-size: 1.1rem;
                }
                
                .cart-items {
                    max-height: 300px;
                    overflow-y: auto;
                    margin-bottom: 20px;
                }
                
                .cart-item {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                }
                
                .cart-item.removing {
                    transform: translateX(100%);
                    opacity: 0;
                }
                
                .cart-item-image {
                    width: 80px;
                    height: 80px;
                    overflow: hidden;
                    border-radius: 5px;
                    margin-right: 15px;
                }
                
                .cart-item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .cart-item-details {
                    flex: 1;
                }
                
                .cart-item-details h4 {
                    color: var(--secondary-color);
                    margin-bottom: 5px;
                }
                
                .cart-item-price {
                    color: white;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                
                .cart-item-quantity {
                    display: flex;
                    align-items: center;
                }
                
                .quantity-btn {
                    width: 30px;
                    height: 30px;
                    background-color: rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .quantity-btn:hover {
                    background-color: var(--secondary-color);
                    color: var(--primary-color);
                }
                
                .quantity {
                    margin: 0 10px;
                    min-width: 20px;
                    text-align: center;
                }
                
                .remove-item {
                    background: none;
                    border: none;
                    color: #ccc;
                    font-size: 1.2rem;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                
                .remove-item:hover {
                    color: #ff3333;
                }
                
                .cart-summary {
                    padding: 20px;
                    background-color: rgba(0, 0, 0, 0.2);
                    border-radius: 5px;
                }
                
                .summary-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    color: #ccc;
                }
                
                .summary-row.discount {
                    color: #ff3333;
                }
                
                .summary-row.total {
                    font-size: 1.2rem;
                    font-weight: bold;
                    color: white;
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .coupon-code {
                    display: flex;
                    margin: 20px 0;
                }
                
                .coupon-code input {
                    flex: 1;
                    padding: 10px;
                    background-color: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    border-radius: 5px 0 0 5px;
                }
                
                .apply-coupon {
                    padding: 10px 15px;
                    background-color: var(--secondary-color);
                    color: var(--primary-color);
                    border: none;
                    border-radius: 0 5px 5px 0;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .apply-coupon:hover {
                    background-color: var(--accent-color);
                    color: white;
                }
                
                .checkout-button {
                    width: 100%;
                    padding: 12px;
                    margin-bottom: 10px;
                    font-size: 1.1rem;
                }
                
                .continue-shopping {
                    width: 100%;
                    padding: 10px;
                    background: none;
                    border: none;
                    color: #ccc;
                    cursor: pointer;
                    transition: color 0.3s ease;
                }
                
                .continue-shopping:hover {
                    color: var(--secondary-color);
                    text-decoration: underline;
                }
            `;
      document.head.appendChild(style);
    }

    // Criar a notificação
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;

    // Ícone baseado no tipo
    const icon = type === "success" ? "✓" : "✕";

    // Conteúdo da notificação
    notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-message">${message}</div>
            <button class="notification-close">&times;</button>
        `;

    // Adicionar ao container
    notificationContainer.appendChild(notification);

    // Adicionar evento para fechar a notificação
    const closeButton = notification.querySelector(".notification-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        notification.style.animation = "slideOut 0.3s forwards";
        setTimeout(() => {
          notificationContainer.removeChild(notification);
        }, 300);
      });
    }

    // Auto-remover após 5 segundos
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOut 0.3s forwards";
        setTimeout(() => {
          if (notification.parentNode) {
            notificationContainer.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }
});
