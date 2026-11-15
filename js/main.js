// Menu móvel, destaque da seção atual e animação de entrada.
(function () {
  'use strict';

  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');

  function fecharMenu() {
    if (!burger || !menu) return;
    menu.classList.remove('aberto');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
  }

  if (burger && menu) {
    burger.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto');
      burger.setAttribute('aria-expanded', String(aberto));
      burger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') fecharMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') fecharMenu();
    });
  }

  // Ano no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Animação de entrada (sem IntersectionObserver, tudo aparece de uma vez)
  var itens = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visivel');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    itens.forEach(function (el) { io.observe(el); });
  } else {
    itens.forEach(function (el) { el.classList.add('visivel'); });
  }

  // Destaque do link da seção visível
  var links = document.querySelectorAll('.menu a');
  var secoes = [];
  links.forEach(function (a) {
    var alvo = document.querySelector(a.getAttribute('href'));
    if (alvo) secoes.push({ link: a, alvo: alvo });
  });

  function atualizar() {
    var pos = window.scrollY + 120;
    var atual = null;
    secoes.forEach(function (s) {
      if (s.alvo.offsetTop <= pos) atual = s;
    });
    links.forEach(function (a) { a.classList.remove('ativo'); });
    if (atual) atual.link.classList.add('ativo');
  }
  window.addEventListener('scroll', atualizar, { passive: true });
  atualizar();
})();
