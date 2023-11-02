// ==UserScript==
// @name        微博抖音下载助手
// @name:zh-CN  微博抖音下载助手
// @description  A tool to help you download full size images from websites
// @description:zh-CN  一个帮你从网站下载原始尺寸图片的工具
// @namespace    https://huching.net/
// @version     0.10.0
// @license     GPL-3.0
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAulBMVEUAAADm8//m8v/p7f3m8//m8//m8//l9P/m9P/l8v/m8//m8v/m8v/n9P/m8//j9v/j/Pzm8//m8//n8//m8//m8v/o8v/m8v/m9//S3unZ5fDX5O/m8//d7fXT3+na5vHb5/PT3+vZ5fHX4u/X5e/U4OvV4ezm8//P2+bxVD/8b1j7bVbrwcLmkorq2uDuxMPe6vbV4u3p4ejwcGDo6vPk09jtycrXwMPwt7PcsbHzopnmnZboh3zxVUDGQB87AAAAJ3RSTlMAv2MM8tikinBO+Mu2dGgbCvnq5dWOTDwf/aDnsCr4eG3u18vBt7FjKVg4AAAB4ElEQVRYw6TSx27DMBBF0Uf13m1p4f1T7BTECZIg5f9/K/DKI0GFos6elwPMYI4dBr6nXMdxlecHoY1N8iyJOBAlWQ5NRRpzUpwW0GDVnFVbWHNsuKg5YkmnuEp1mNVW1FC1mGGV1FJamHSgtgMmnLjBae5/8xksbmRhoC25UdlC6CpuVsl7UDSgxP3SyP2qGxppTDcw3kRR01Bd4CalsRQ3MY3FAJBzhxxAxh0yAAl3SAA74g6RjZAD788jjyNXDoQIKH2fRy4PY2+UAvgUPs4zAemHgg+PwpdO4PeVdx4UhatG4O+zFwUFl9LLeuCp70XBhcPFwmXivSw4/7XXyQrCQBCE4QkxmyevScjiOoOtEBAPvv+LCXNLh/wtBOde33G6KgIgyDI/E3Yu8yjIIj8XMpd4FETnlZC43KMgKq+F3BUeBVF5LRSu9CiIymuhdJVHQVReC5VL9yiIymshjR8KCIL5cIxfGgmC+dDET5UEwXzo4rdOgmC+xcMSBaF8aKzT9rgL5evUPK7v5+sTVt/th/M+hfXXH7Bg2MKAFccWWixZtlB3WPNsYcSiaQtXrLq2cMaybQsnrPu2cMHBYQsNTR5bqAcaXbbQdsbsY6EftwzPqW42Tt/0D+N78/z/AjGD6r7utJrFAAAAAElFTkSuQmCC
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

const iconData =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAulBMVEUAAADm8//m8v/p7f3m8//m8//m8//l9P/m9P/l8v/m8//m8v/m8v/n9P/m8//j9v/j/Pzm8//m8//n8//m8//m8v/o8v/m8v/m9//S3unZ5fDX5O/m8//d7fXT3+na5vHb5/PT3+vZ5fHX4u/X5e/U4OvV4ezm8//P2+bxVD/8b1j7bVbrwcLmkorq2uDuxMPe6vbV4u3p4ejwcGDo6vPk09jtycrXwMPwt7PcsbHzopnmnZboh3zxVUDGQB87AAAAJ3RSTlMAv2MM8tikinBO+Mu2dGgbCvnq5dWOTDwf/aDnsCr4eG3u18vBt7FjKVg4AAAB4ElEQVRYw6TSx27DMBBF0Uf13m1p4f1T7BTECZIg5f9/K/DKI0GFos6elwPMYI4dBr6nXMdxlecHoY1N8iyJOBAlWQ5NRRpzUpwW0GDVnFVbWHNsuKg5YkmnuEp1mNVW1FC1mGGV1FJamHSgtgMmnLjBae5/8xksbmRhoC25UdlC6CpuVsl7UDSgxP3SyP2qGxppTDcw3kRR01Bd4CalsRQ3MY3FAJBzhxxAxh0yAAl3SAA74g6RjZAD788jjyNXDoQIKH2fRy4PY2+UAvgUPs4zAemHgg+PwpdO4PeVdx4UhatG4O+zFwUFl9LLeuCp70XBhcPFwmXivSw4/7XXyQrCQBCE4QkxmyevScjiOoOtEBAPvv+LCXNLh/wtBOde33G6KgIgyDI/E3Yu8yjIIj8XMpd4FETnlZC43KMgKq+F3BUeBVF5LRSu9CiIymuhdJVHQVReC5VL9yiIymshjR8KCIL5cIxfGgmC+dDET5UEwXzo4rdOgmC+xcMSBaF8aKzT9rgL5evUPK7v5+sTVt/th/M+hfXXH7Bg2MKAFccWWixZtlB3WPNsYcSiaQtXrLq2cMaybQsnrPu2cMHBYQsNTR5bqAcaXbbQdsbsY6EftwzPqW42Tt/0D+N78/z/AjGD6r7utJrFAAAAAElFTkSuQmCC'

const head = document.getElementsByTagName('head')
head[0].insertAdjacentHTML(
  'beforeend',
  `<style type="text/css">
.hx-download-original-livephotos-tool{
  position: absolute;
  background-image: url(${iconData});
  background-size: cover;
  width: 36px;
  height: 36px;
  cursor: pointer;
  opacity: .5;
  transition: all cubic-bezier(0.18, 0.89, 0.32, 1.28) 250ms;
}
.hx-download-original-livephotos-tool.white{
  background-image: url(${iconData});
  width: 36px;
  height: 36px;
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
      className: 'hx-download-original-livephotos-tool ' + className,
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
  const exist = parent2.querySelector('.hx-download-original-livephotos-tool')
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
      } else if (target.tagName == 'VIDEO' && isWeiboNode(parent)) {
        //适用于新版微博

        const link = target.src
        const downloadBtn = findChildByClassName(
          parent.parentElement,
          'hx-download-original-livephotos-tool'
        )

        if (downloadBtn) {
          updateVideoLink(downloadBtn, link)
        } else {
          const style = 'top: 4px;left: 4px;'
          const cfg = { parent, link, style }
          createVideoDom(cfg)
        }
      }
    })
  } else if (hostname === 'www.douyin.com') {
    window.addEventListener('mouseover', ({ target }) => {
      if (target.tagName === 'VIDEO') {
        const src = (target.querySelector('source') || target.querySelector('video')).src

        let name = lastItem(
          src
            .split('?')[0]
            .split('/')
            .filter((x) => x)
        )

        let nickname = ''
        let videoDesc = ''
        const parent = target.parentElement?.parentElement
        if (parent) {
          nickname = parent.querySelector('[data-e2e="feed-video-nickname"]')?.textContent
          if (nickname && nickname.startsWith('@')) {
            nickname = nickname.slice(1)
          }

          videoDesc = parent.querySelector('[data-e2e="video-desc"]')?.textContent
          if (videoDesc && videoDesc.startsWith('展开')) {
            videoDesc = videoDesc.slice(2)
          }

          if (nickname && videoDesc) {
            name = nickname + '_' + videoDesc
          } else if (nickname) {
            name = nickname + '_' + name
          }

          const vidEl = parent.querySelector('div[data-e2e-aweme-id]')
          if (vidEl) {
            const vid = vidEl.getAttribute('data-e2e-aweme-id')
            if (vid) {
              name += '_' + vid
            }
          }
        }

        const cfg = {
          link: src,
          style: 'right: 59px;top: 35px;',
          title: '下载视频',
          target,
          postion: 'beforeEnd',
          name,
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
