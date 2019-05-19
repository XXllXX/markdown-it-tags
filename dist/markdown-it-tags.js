(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitTags = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

module.exports = function tags_plugin(md, options) {
  options = Object.assign({}, {
    containerClass: 'note-tags',
    mainClass: 'notebook',
    otherClass: ''
  }, options);

  var TAGS_REGEXP = /^@(?:\((.*)\))?(?:\[(.*)\])?/m;

  var tags = function tags(state, silent) {
    match = TAGS_REGEXP.exec(state.src);
    var token = null;

    if (!match || !match[1]) {
      return false;
    }
    if (silent) {
      return false;
    }

    var match = TAGS_REGEXP.exec(state.src);
    if (!match || !match[1]) {
      return false;
    }
    token = state.push('tags_open', 'tags', 0);
    token = state.push('tags_body', 'tags', 1);
    token.content = match[1];
    token = state.push('tags_body', 'tags', 2);
    token.content = match[2];
    token = state.push('tags_close', 'tags', -1);
    state.pos = state.posMax;
    return true;
  };

  md.renderer.rules.tags_open = function () {
    return '<p class="' + options.containerClass + '">';
  };

  md.renderer.rules.tags_body = function (tokens, index) {
    if (!tokens[index].content || tokens[index] == '') return '';
    var html = '';
    if (index == 1) {
      html += '<code class="' + options.mainClass + '">' + tokens[index].content + '</code> ';
    } else {
      tokens[index].content.split(/\,|\|/).map(function (item) {
        html += '<code class="' + options.otherClass + '">' + item.trim() + '</code> ';
      });
    }
    return html;
  };

  md.renderer.rules.tags_close = function () {
    return '</p>';
  };

  md.inline.ruler.after('emphasis', 'tags', tags, options);
};

},{}]},{},[1])(1)
});
