import marked from 'marked'

const renderer = new marked.Renderer()
const _link = renderer.link

marked.setOptions({
  sanitize: true
})

renderer.link = function link(href: string, title: string, text: string): string {
  const a = _link.call(renderer, href, title, text)
  return a.replace(/^<a/, '<Anchor').replace(/<\/a>$/, '</Anchor>')
}


export default function markdown(comment: string): string {
  return marked(comment, { renderer })
}
