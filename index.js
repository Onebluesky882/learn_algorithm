const render = document.getElementById('code_block')
// const text =  'hello'
// render.textContent = text


async function loadMarkdown( ) {
  const res =  await fetch('./block.md')
  const markdown = await res.text()
  const html = marked.parse(markdown)
    render.innerHTML = html;
}

loadMarkdown()