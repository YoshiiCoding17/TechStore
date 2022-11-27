const swiper = new Swiper('.swiper', {
    preloadImages: false,
    lazy: true,
    direction: 'horizontal',
    loop: true,
    effect: 'coverflow',
    coverflowEffect: {
    rotate: 50,
    slideShadows: true,
    },
    autoplay:{
        delay:3000,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });