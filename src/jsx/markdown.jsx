import marked from 'marked'

const renderer = new marked.Renderer()
const _link = renderer.link

marked.setOptions({
  sanitize: true
})

renderer.link = function link(href, title, text) {
  const a = _link.call(renderer, href, title, text)
  return a.replace(/^<a/, '<a target="_blank" rel="noopener noreferrer"')
}


export default function markdown(comment) {
  return marked(comment, { renderer })
}
