import marked from 'marked'

const renderer = new marked.Renderer()
const _link = renderer.link

marked.setOptions({
  breaks: true,
  sanitize: true
})

renderer.link = function link(href: string, title: string, text: string): string {
  const a = _link.call(renderer, href, title, text)
  return a.replace(/^<a/, '<Anchor').replace(/<\/a>$/, '</Anchor>')
}

renderer.br = function br() {
  return '<br/>'
}

renderer.hr = function hr() {
  return '<hr/>'
}


export default function markdown(comment: string): string {
  return marked(comment, { renderer })
}
