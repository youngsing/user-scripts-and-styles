// ==UserScript==
// @name        微博抖音下载助手
// @name:zh-CN  微博抖音下载助手
// @description  A tool to help you download full size images from websites
// @description:zh-CN  一个帮你从网站下载原始尺寸图片的工具
// @namespace    https://huching.net/
// @version     0.9.0
// @license     GPL-3.0
// @icon        data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTA4IDUwOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRDA1QjsiIGN4PSIyNTQiIGN5PSIyNTQiIHI9IjI1NCIvPiA8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM3Mi44LDE5NkgzNjhjLTIuNC00MC40LTM1LjYtNzIuNC03Ni40LTcyLjRjLTQsMC04LDAuNC0xMS42LDAuOGMtMTYtMjguNC00Ni00Ny42LTgwLjgtNDcuNiBjLTUxLjIsMC05Mi40LDQxLjYtOTIuNCw5Mi40YzAsMTAuOCwyLDIxLjIsNS4yLDMwLjhjLTI1LjIsMTAtNDIuOCwzNC00Mi44LDYyLjRjMCwzNi40LDI5LjYsNjYuNCw2Ni40LDY2LjRoMjM3LjIgYzM2LjQsMCw2Ni40LTI5LjYsNjYuNC02Ni40QzQzOC44LDIyNS42LDQwOS4yLDE5NiwzNzIuOCwxOTZ6Ii8+IDxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTg7IiBkPSJNMzI1LjIsMzYyLjRsLTY2LjQsNjYuNGMtMi44LDIuOC03LjIsMi44LTEwLDBsLTY2LTY2LjRjLTQuNC00LjQtMS4yLTEyLDQuOC0xMmgxNC44IGM0LDAsNy4yLTMuMiw3LjItNy4ydi05NmMwLTQsMy4yLTcuMiw3LjItNy4yaDc0LjhjNCwwLDcuMiwzLjIsNy4yLDcuMnY5NmMwLDQsMy4yLDcuMiw3LjIsNy4yaDE0LjggQzMyNi40LDM1MC40LDMyOS42LDM1OCwzMjUuMiwzNjIuNHoiLz4gPC9zdmc+IA==
// @author      huc < ht@live.se >
// @supportURL  https://github.com/hz2/user-scripts-and-styles/issues/new
// @require https://greasyfork.org/scripts/396752-hx-script-library/code/hx-script-library.js
// @resource HxLib https://greasyfork.org/scripts/396752-hx-script-library/code/hx-script-library.js
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=your.email.here@example.com&item_name=Greasy+Fork+donation
// @contributionAmount 5
// @match     *://weibo.com/*
// @match     *://*.weibo.com/*
// @match     *://*.douyin.com/*

// @noframes
// @grant          unsafeWindow
// @grant          GM_setClipboard
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_getResourceText
// @grant          GM_info
// @grant          GM_addStyle
// ==/UserScript==

// const debugLog = console.log
const debugLog = () => {}

const head = document.getElementsByTagName('head')
head[0].insertAdjacentHTML(
  'beforeend',
  `<style type="text/css">
.hx-download-original-livephotos-tool{
  position: absolute;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTA4IDUwOCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+IDxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRDA1QjsiIGN4PSIyNTQiIGN5PSIyNTQiIHI9IjI1NCIvPiA8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM3Mi44LDE5NkgzNjhjLTIuNC00MC40LTM1LjYtNzIuNC03Ni40LTcyLjRjLTQsMC04LDAuNC0xMS42LDAuOGMtMTYtMjguNC00Ni00Ny42LTgwLjgtNDcuNiBjLTUxLjIsMC05Mi40LDQxLjYtOTIuNCw5Mi40YzAsMTAuOCwyLDIxLjIsNS4yLDMwLjhjLTI1LjIsMTAtNDIuOCwzNC00Mi44LDYyLjRjMCwzNi40LDI5LjYsNjYuNCw2Ni40LDY2LjRoMjM3LjIgYzM2LjQsMCw2Ni40LTI5LjYsNjYuNC02Ni40QzQzOC44LDIyNS42LDQwOS4yLDE5NiwzNzIuOCwxOTZ6Ii8+IDxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTg7IiBkPSJNMzI1LjIsMzYyLjRsLTY2LjQsNjYuNGMtMi44LDIuOC03LjIsMi44LTEwLDBsLTY2LTY2LjRjLTQuNC00LjQtMS4yLTEyLDQuOC0xMmgxNC44IGM0LDAsNy4yLTMuMiw3LjItNy4ydi05NmMwLTQsMy4yLTcuMiw3LjItNy4yaDc0LjhjNCwwLDcuMiwzLjIsNy4yLDcuMnY5NmMwLDQsMy4yLDcuMiw3LjIsNy4yaDE0LjggQzMyNi40LDM1MC40LDMyOS42LDM1OCwzMjUuMiwzNjIuNHoiLz4gPC9zdmc+IA==);
  background-size: cover;
  width: 50px;
  height: 50px;
  cursor: pointer;
  opacity: .5;
  transform: scale(.75);
  transition: all cubic-bezier(0.18, 0.89, 0.32, 1.28) 250ms;
}
.hx-download-original-livephotos-tool.white{
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9ImluaGVyaXQiIGltcGxpY2l0LWNvbnNlbnQtc291cmNlPSJ0cnVlIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEuMDEyMiAwIDAgMS4wMTIyIC0yOC42ODQgLTMuNDMzOSkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjMiPgogIDxjaXJjbGUgY3g9IjQwLjE5NCIgY3k9IjE1LjI0OCIgcj0iOC45ODI0Ii8+CiAgPHBhdGggZD0ibTQ1IDE3LTQuNTMzIDMuNTQ3Yy0wLjE2NjU5IDAuMTMwMzUtMC4zODQ2MSAwLjE0OTU3LTAuNTM0MTggMGwtNC41NjY0LTMuNTQ3Yy0wLjIzNTA0LTAuMjM1MDQtMC4wNjQxLTAuNjQxMDIgMC4yNTY0MS0wLjY0MTAyaDIuNDM2MmMwLjIxMzY3IDAgMC4zODQ2MS0wLjE3MDk0IDAuMzg0NjEtMC4zODQ2MXYtNS43MzI5YzAtMC4yMTM2NyAwLjE3MDk0LTAuMzg0NjEgMC4zODQ2MS0wLjM4NDYxaDIuNzAzNmMwLjIxMzY3IDAgMC4zODQ2MSAwLjE3MDk0IDAuMzg0NjEgMC4zODQ2MXY1LjczMjljMCAwLjIxMzY3IDAuMTcwOTQgMC4zODQ2MSAwLjM4NDYxIDAuMzg0NjFoMi40NjM5YzAuMjk5MTQgMCAwLjQ5NjgyIDAuNDM2MTggMC4yMzUwNCAwLjY0MTAyeiIvPgogPC9nPgo8L3N2Zz4K);
  width: 24px;
  height: 24px;
}
.hx-download-original-livephotos-tool:hover {
  opacity:1;
  transform: scale(.9);
}
.hx-download-original-livephotos-tool:active {
  opacity:.8;
  transform: scale(.7)  rotateZ(360deg);
}
</style>`
)

console.warn(
  'Welcome to %c \ud83d\ude48\ud83d\ude49\ud83d\ude4a\u0020\u0048\u007a\u00b2\u0020\u0053\u0063\u0072\u0069\u0070\u0074\u0020\u004c\u0069\u0062\u0072\u0061\u0072\u0079 %c v0.06 ',
  'background-color:teal;color: white;border:1px solid teal;border-radius: 4px 0 0 4px;border-left-width:0;padding:1px;margin:2px 0;font-size:1.1em',
  'background-color:#777;color: white;border:1px solid #777;border-radius: 0 4px 4px 0;border-right-width:0;padding:1px;margin:5px 0;'
)

const openDown = (url, e, name) => {
  e && e.preventDefault()
  e && e.stopPropagation()

  const downBlobUrl = (blobUrl) => {
    let el = document.createElement('a')
    el.setAttribute('href', blobUrl)
    if (name) {
      el.setAttribute('download', name)
    }
    if (document.createEvent) {
      const event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      el.dispatchEvent(event)
    } else {
      el.click()
    }
  }

  if (url.startsWith('blob')) {
    downBlobUrl(url)
    return
  }

  fetch(url, {
    mode: 'cors',
  })
    .then((resp) => resp.blob())
    .then((r) => {
      const blobUrl = URL.createObjectURL(r)
      downBlobUrl(blobUrl)
    })
    .catch((err) => {
      console.log('Request failed', err)
    })
}

const hostname = window.location.hostname

const lastItem = (arr) => (arr.length ? arr[arr.length - 1] : '')

const createDom = (cfg) => {
  const {
    parent,
    link,
    name,
    title,
    className = '',
    style = '',
    target,
    postion = 'afterEnd',
  } = cfg

  const genDomDL = (dom) => {
    let domDL = dom || document.createElement('a')
    Object.assign(domDL, {
      title: title || '下载原始图片',
      className: 'hx-download-original-images-tool ' + className,
      style: style,
      href: link,
    })
    domDL.onclick = (e) => {
      e && e.preventDefault()
      e && e.stopPropagation()
      const newName = name || lastItem(link.split('/'))
      openDown(link, e, newName)
    }
    return domDL
  }

  let parent2 = parent
  if (!parent && target) {
    parent2 = target.parentElement
  }
  // if (['afterEnd', 'beforeBegin'].includes(postion)) {
  //   parent2 = target.parentElement.parentElement
  // }
  const exist = parent2.querySelector('.hx-download-original-images-tool')
  if (exist) {
    genDomDL(exist)
  } else {
    parent2.insertAdjacentElement(postion, genDomDL())
  }
}

const init = () => {
  if (hostname.includes('weibo')) {
    window.addEventListener('mouseover', ({ target }) => {
      const parent = target.parentElement

      if (target.tagName == 'IMG' && isWeiboNode(parent)) {
        handleWeiboLivePhotos(target)
      }
      //适用于新版微博？忘记了。。。
      // else if (target.tagName == 'VIDEO' && isWeiboNode(parent)) {
      //   const link = target.src
      //   const downloadBtn = findChildByClassName(
      //     parent.parentElement,
      //     'hx-download-original-livephotos-tool'
      //   )
      //   if (downloadBtn) {
      //     updateVideoLink(downloadBtn, link)
      //   } else {
      //     const style = 'top: 120px;right: 10px;'
      //     const cfg = {
      //       parent,
      //       link,
      //       style,
      //     }
      //     createVideoDom(cfg)
      //   }
      // }
    })
  } else if (hostname === 'www.douyin.com') {
    window.addEventListener('mouseover', ({ target }) => {
      if (target.tagName === 'VIDEO') {
        const src = (target.querySelector('source') || target.querySelector('video')).src
        let style = 'right: 30px;top: 45px;'

        const cfg = {
          link: src,
          style,
          title: '下载视频',
          target,
          postion: 'beforeEnd',
          name: lastItem(
            src
              .split('?')[0]
              .split('/')
              .filter((x) => x)
          ),
        }
        createDom(cfg)
      }
    })
  }
}

setTimeout(() => {
  init()
}, 1600)

function isWeiboNode(dom) {
  const getNodeValue = (el) =>
    el.attributes['node-type'] && el.attributes['node-type'].nodeValue
  if (
    getNodeValue(dom.parentElement) === 'artwork_box' ||
    getNodeValue(dom) === 'img_box' ||
    dom.className.includes('woo-picture-main') ||
    dom.className.includes('woo-picture-slot') ||
    dom.className.includes('imgInstance')
  ) {
    return true
  } else {
    return false
  }
}

function createVideoDom(cfg) {
  const { parent, link, name, className = '', style = '', postion = 'afterEnd' } = cfg

  let domDL = document.createElement('a')
  Object.assign(domDL, {
    title: '下载LivePhoto',
    className: 'hx-download-original-livephotos-tool',
    style: style,
    href: link,
    download: '',
  })
  const newName = name || lastItem(decodeURIComponent(link).split('/'))
  domDL.onclick = (e) => openDown(link, e, newName)
  const next = parent && parent.nextElementSibling
  if (next && next.className.includes('hx-download-original-livephotos-tool')) {
    next = domDL
  } else {
    parent.insertAdjacentElement(postion, domDL)
  }
}

function updateVideoLink(dom, link) {
  debugLog('update video link: ', link)
  dom.href = link
  const newName = lastItem(decodeURIComponent(link).split('/'))
  dom.onclick = (e) => openDown(link, e, newName)
}

function findParentByNodeType(element, nodeType) {
  if (element) {
    if (element.getAttribute('node-type') === nodeType) {
      return element
    }

    return findParentByNodeType(element.parentElement, nodeType)
  }

  return null
}

function findChildByAttributeType(element, attribute, attributeType) {
  if (element) {
    if (element.getAttribute(attribute) === attributeType) {
      return element
    }
    for (const child of element.children) {
      const ele = findChildByAttributeType(child, attribute, attributeType)
      if (ele) {
        return ele
      }
    }
  }

  return null
}

function findChildByClassName(element, className) {
  if (element) {
    if (element.classList.contains(className)) {
      return element
    }

    for (const child of element.children) {
      const ele = findChildByClassName(child, className)
      if (ele) {
        return ele
      }
    }
  }

  return null
}

function createLivephotosDom(cfg) {
  const {
    targetElement,
    link,
    title = '下载Live Photo中的视频',
    className = '',
    style = '',
    postion = 'afterEnd',
  } = cfg

  debugLog('live photo link: ', link)

  // const newName = lastItem(link.split('/'))
  let domDL = document.createElement('a')
  // domDL.onclick = (e) => openDown(link, e, newName)
  Object.assign(domDL, {
    title,
    className: 'hx-download-original-livephotos-tool ' + className,
    style,
    href: link,
    download: '',
  })

  targetElement.insertAdjacentElement(postion, domDL)
}

// 只支持信息流界面
function handleWeiboLivePhotos(target) {
  const parent = target.parentElement
  // 等下载原图按钮先创建
  const imageTools = parent && parent.nextElementSibling
  if (!imageTools || !imageTools.className.includes('hx-download-original-images-tool')) {
    return
  }

  const videoElement = imageTools.nextElementSibling
  if (
    videoElement &&
    videoElement.className.includes('hx-download-original-livephotos-tool')
  ) {
    // LivePhoto下载按钮已创建
    debugLog('LivePhoto下载按钮已创建')
    return
  }

  const expandMediaBox = findParentByNodeType(
    target.parentElement,
    'feed_list_media_disp'
  )
  const mediaWrap = expandMediaBox && expandMediaBox.nextElementSibling
  // 多张图片
  let media = findChildByAttributeType(mediaWrap, 'node-type', 'fl_pic_list')
  if (!media) {
    // 单张图片
    const liElement = findChildByAttributeType(
      mediaWrap,
      'action-type',
      'feed_list_media_img'
    )
    if (liElement) {
      media = liElement
    } else {
      return
    }
  }

  // 在action-data中查找pic_video
  const params = new URLSearchParams(media.getAttribute('action-data'))
  if (params.length === 0 || !params.has('pic_video')) {
    return
  }

  // ['pic_video=0:001AoK92jx07RbvJZkCA0f0f0100J66i0k01,1:000ANIGsjx07RbvKenAc0f0f0100zSvi0k01']
  const videos = params
    .get('pic_video')
    .split(',')
    .map(
      (v) =>
        `https://video.weibo.com/media/play?livephoto=https://us.sinaimg.cn/${v.substring(
          2
        )}.mov`
    )

  debugLog('videos: ', videos)

  for (const [index, video] of videos.entries()) {
    // 直接按顺序放左上角
    const style = `top: ${40 + 60 * index}px;left: 10px;`
    const cfg = {
      targetElement: imageTools,
      title: `下载Livephoto${index + 1}`,
      link: video,
      // className: 'hx-download-original-livephotos-tool',
      style,
    }
    createLivephotosDom(cfg)
  }
}
