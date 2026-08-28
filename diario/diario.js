/* ════════════════════════════════════════════════════════════════
   兄弟 KYODAI — EL DIARIO · comportamiento compartido
   Se carga con `defer` al final del <head> de cada artículo.
   El tema ya se aplicó antes de pintar (script en línea del <head>);
   aquí solo se alterna, se guarda y se sincroniza el icono.
   ════════════════════════════════════════════════════════════════ */
(function(){
  var raiz = document.documentElement;
  function actual(){ return raiz.getAttribute('data-theme') === 'light' ? 'light' : 'dark'; }

  function sincronizar(){
    var claro = actual() === 'light';
    /* El botón muestra el destino: 日 = ir al día, 月 = ir a la noche */
    Array.prototype.forEach.call(document.querySelectorAll('.themeBtn .tIcon'), function(i){
      i.textContent = claro ? '月' : '日';
    });
    Array.prototype.forEach.call(document.querySelectorAll('.themeBtn'), function(b){
      b.setAttribute('title', claro ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
    });
    var meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (meta) meta.setAttribute('content', claro ? '#F2F0EA' : '#000000');
  }

  window.Tema = {
    actual: actual,
    alternar: function(){
      var t = actual() === 'light' ? 'dark' : 'light';
      raiz.setAttribute('data-theme', t);
      try { localStorage.setItem('kyodai-theme', t); } catch(e){}
      sincronizar();
    }
  };

  function iniciar(){
    sincronizar();

    /* Año del pie */
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

    /* Barra de progreso de lectura */
    var barra = document.getElementById('progreso');
    if (barra){
      var pendiente = false;
      var pintar = function(){
        pendiente = false;
        var alto = document.documentElement.scrollHeight - innerHeight;
        var frac = alto > 0 ? Math.min(1, Math.max(0, scrollY / alto)) : 0;
        barra.style.transform = 'scaleX(' + frac.toFixed(4) + ')';
      };
      var pedir = function(){
        if (pendiente) return;
        pendiente = true;
        requestAnimationFrame(pintar);
      };
      addEventListener('scroll', pedir, {passive:true});
      addEventListener('resize', pedir);
      /* Al volver a la pestaña, requestAnimationFrame estuvo detenido:
         se repinta directo para que la barra no quede desfasada. */
      document.addEventListener('visibilitychange', function(){
        if (!document.hidden) pintar();
      });
      addEventListener('pageshow', pintar);
      pintar();
    }

    /* Enlaces "anterior / siguiente" a partir de diario/posts.js.
       Si el artículo tiene <div id="vecinos" data-slug="..."> se rellena solo. */
    var caja = document.getElementById('vecinos');
    if (caja && window.KYODAI_POSTS && window.KYODAI_POSTS.length){
      var posts = window.KYODAI_POSTS.slice().sort(function(a,b){
        return String(b.fecha).localeCompare(String(a.fecha));
      });
      var slug = caja.getAttribute('data-slug');
      var i = posts.findIndex(function(p){ return p.slug === slug; });
      var partes = [];
      if (i > 0)                    partes.push(enlace(posts[i-1], 'Más reciente'));
      if (i > -1 && i < posts.length-1) partes.push(enlace(posts[i+1], 'Anterior'));
      caja.innerHTML = partes.join('');
    }
    function enlace(p, etiqueta){
      return '<a class="btn" href="' + p.slug + '.html">' + etiqueta + ' · ' +
             p.titulo.replace(/[&<>"]/g, function(c){
               return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
             }) + '</a>';
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
