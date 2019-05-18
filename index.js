'use strict'

module.exports = function tags_plugin(md, options) {
  options = Object.assign(
    {},
    {
      containerClass: 'note-tags',
      mainClass: 'notebook',
      otherClass: ''
    },
    options
  )

  var TAGS_REGEXP = /^@(?:\((.*)\))?(?:\[(.*)\])?/m

  var tags = function(state, silent) {
    match = TAGS_REGEXP.exec(state.src)
    var token = null

    if (!match || !match[1]) {
      return false
    }
    if (silent) {
      return false
    }

    var match = TAGS_REGEXP.exec(state.src)
    if (!match || !match[1]) {
      return false
    }
    token = state.push('tags_open', 'tags', 0)
    token = state.push('tags_body', 'tags', 1)
    token.content = match[1]
    token = state.push('tags_body', 'tags', 2)
    token.content = match[2]
    token = state.push('tags_close', 'tags', -1)
    state.pos = state.posMax
    return true
  }

  md.renderer.rules.tags_open = function() {
    return `<p class="${options.containerClass}">`
  }

  md.renderer.rules.tags_body = function(tokens, index) {
    if (!tokens[index].content || tokens[index] == '') return ''
    var html = ''
    if (index == 1) {
      html += `<code class="${options.mainClass}">` + tokens[index].content + '</code> '
    } else {
      tokens[index].content.split(/\,|\|/).map(item => {
        html += `<code class="${options.otherClass}">` + item.trim() + '</code> '
      })
    }
    return html
  }

  md.renderer.rules.tags_close = function() {
    return '</p>'
  }

  md.inline.ruler.after('emphasis', 'tags', tags, options)
}
