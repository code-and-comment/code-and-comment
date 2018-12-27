import { Base64 } from 'js-base64'


export function createViewUrl(git, path, comments, location = window.location) {
  const data = {
    git,
    path,
    comments,
  }
  const data_string = Base64.encodeURI(JSON.stringify(data))
  return `${location.origin}${location.pathname}#/view?data=${data_string}`
}
