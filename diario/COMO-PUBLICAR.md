# Cómo publicar un artículo en el diario

No necesitas tocar `index.html` ni saber programar. Son tres pasos.

---

## 1. Crea el archivo del artículo

Copia `_plantilla.html` y renómbralo con el **slug** del artículo: el título
en minúsculas, sin tildes, sin ñ y con guiones en vez de espacios.

| Título                          | Nombre del archivo                  |
|---------------------------------|-------------------------------------|
| Por qué nos llamamos Kyodai     | `por-que-nos-llamamos-kyodai.html`  |
| Creatina: lo que sí sabemos     | `creatina-sin-mitos.html`           |
| Cómo dormir para recuperarte    | `como-dormir-para-recuperarte.html` |

> El nombre del archivo es la dirección pública del artículo y **no se debe
> cambiar después de publicarlo**: si alguien ya compartió el enlace, se rompe.

---

## 2. Escribe el artículo

Abre el archivo con cualquier editor de texto y reemplaza todo lo que está
entre `【corchetes】`. Hay marcadores en dos zonas:

- **Arriba (en el `<head>`)** — título, resumen, fecha, slug. Esto es lo que
  se ve cuando alguien comparte el enlace por WhatsApp o Instagram.
- **En el cuerpo** — el texto del artículo.

Cuando termines, **no puede quedar ningún `【` en el archivo**. Si queda alguno,
se va a ver en la página.

### Etiquetas que puedes usar

Ya tienen estilo aplicado. Cópialas y pégalas tal cual:

```html
<p class="entradilla">Primer párrafo, un punto más grande.</p>
<p>Párrafo normal.</p>

<h2>Un subtítulo <span class="jp">力</span></h2>
<h3>Subtítulo pequeño, en rojo</h3>

<strong>negrita</strong>   <em>cursiva</em>

<blockquote>Una frase para destacar.</blockquote>

<ul><li>Punto uno</li><li>Punto dos</li></ul>
<ol><li>Paso uno</li><li>Paso dos</li></ol>

<hr>

<div class="nota">
  <span class="nk">注</span>
  <p><b>Aviso.</b> Un recuadro para advertencias o aclaraciones.</p>
</div>

<figure>
  <img src="fotos/nombre-de-la-foto.jpg" alt="Describe la foto">
  <figcaption>Pie de foto</figcaption>
</figure>

<div class="tablaWrap">
  <table>
    <tr><th>Columna</th><th>Columna</th></tr>
    <tr><td>Dato</td><td>Dato</td></tr>
  </table>
</div>
```

### Si el artículo lleva fotos

Crea la carpeta `diario/fotos/` y guárdalas ahí. Usa nombres en minúsculas y
con guiones (`creatina-tarro.jpg`). Comprime las fotos antes de subirlas:
**menos de 300 KB cada una**, o la página va a cargar lenta en celular.

Escribe siempre el `alt`: es lo que lee quien no puede ver la imagen, y también
lo que lee Google.

---

## 3. Añade el artículo al índice

Abre `posts.js` y añade la ficha **arriba de todo** en la lista (el más nuevo
primero). Copia una ficha existente y cambia los datos:

```js
{
  slug:     'como-dormir-para-recuperarte',
  titulo:   'Cómo dormir para recuperarte',
  resumen:  'Una o dos frases. Es lo que se lee en el índice del diario.',
  fecha:    '2026-09-15',
  autor:    'Santiago',
  lectura:  '5 min',
  etiqueta: 'Entrenamiento',
  kanji:    '眠'
},
```

**Cuidado con estos tres detalles**, que son los que suelen romper la página:

1. La **coma final** después de `}` — tiene que estar, salvo en la última ficha.
2. Las **comillas simples** alrededor de cada texto.
3. Si el texto lleva un apóstrofo (`'`), escríbelo como `\'` o usa comillas
   dobles: `titulo: "El día que no quería"`.

El `slug` de `posts.js` tiene que ser **idéntico** al nombre del archivo (sin
`.html`). Si no coinciden, el enlace del índice lleva a un error 404.

### Etiquetas disponibles

`Filosofía` · `Entrenamiento` · `Nutrición` · `Suplementos` · `La casa`

Si necesitas una nueva, simplemente escríbela: no hay que registrarla en
ningún lado.

### Kanji de la ficha

Es la marca de agua grande de la tarjeta. Algunos que encajan:

| Kanji | Significado   | Kanji | Significado    |
|-------|---------------|-------|----------------|
| 書    | escribir      | 力    | fuerza         |
| 始    | comienzo      | 核    | núcleo         |
| 道    | camino        | 火    | fuego          |
| 鍛    | forjar        | 食    | comer          |
| 眠    | dormir        | 心    | corazón/mente  |
| 継    | continuar     | 真    | verdad         |

---

## 4. Súbelo

Desde la carpeta `kyodai.com/`:

```bash
git add . && git commit -m "diario: nuevo artículo" && git push
```

GitHub Pages tarda **1 o 2 minutos** en publicar el cambio. Si no lo ves,
recarga con `Cmd + Shift + R` para saltarte la caché del navegador.

---

## Antes de publicar, revisa

- [ ] No queda ningún `【` en el archivo.
- [ ] El `slug` de `posts.js` es igual al nombre del archivo.
- [ ] La ficha nueva está arriba y las comas están bien.
- [ ] Abriste el artículo en el navegador y se ve bien.
- [ ] Probaste el **modo claro** (botón 日 / 月 arriba a la derecha).
- [ ] Lo miraste en el celular.
- [ ] Las fotos pesan menos de 300 KB y tienen `alt`.

---

## Si algo se rompe

**El índice del diario sale vacío o incompleto** → casi siempre es un error de
sintaxis en `posts.js`. Ábrelo y revisa comas y comillas. En el navegador,
`Cmd + Option + I` → pestaña *Console* te dice la línea exacta.

**El artículo da 404** → el nombre del archivo y el `slug` no coinciden, o el
archivo no se subió (`git status` te dice qué falta).

**El artículo se ve sin estilos** → revisa que `diario.css`, `diario.js` y
`posts.js` estén en la misma carpeta que el artículo.
