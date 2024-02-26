const menu = document.getElementById('menu');
const opciones = menu.querySelectorAll('.opcion');

opciones.forEach(opcion => opcion.addEventListener('click', () => {
  opciones.forEach(opc => opc.classList.remove('resaltada'));
  opcion.classList.add('resaltada');
}));

menu.addEventListener('scroll', () => {
  const centro = menu.scrollTop + menu.offsetHeight / 2;
  
  opciones.forEach(opcion => {
    const { offsetTop, offsetHeight } = opcion;
    opcion.classList.toggle('resaltada', offsetTop <= centro && offsetTop + offsetHeight >= centro);
  });
});
