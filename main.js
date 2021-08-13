window.onload = function () {
  const arr = []
  const xx = []
  const yy = []
  let recording = false
  const start = false
  let color = '#fff'
  let color2 = '#000'
  let i = 0
  let j = 0
  const d = new Date()
  const n = d.getTime()
  d.getSeconds()
  let startsec
  let endsec
  const myCanvas = document.getElementById('myCanvas')
  const ctx = myCanvas.getContext('2d')
  const myCanvas2 = document.getElementById('myCanvas2')
  const ctx2 = myCanvas2.getContext('2d')
  startsec = d.getTime()

  // Fill Window Width and Height
  myCanvas.width = window.innerWidth / 2
  myCanvas.height = window.innerHeight / 2
  myCanvas2.width = window.innerWidth / 2
  myCanvas2.height = window.innerHeight / 2
  myCanvas.style.position = 'absolute'
  myCanvas.style.border = '1px solid'

  // Set Background Color
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height)

  ctx2.fillStyle = color2
  ctx2.fillRect(0, 0, myCanvas2.width, myCanvas2.height)

  // Mouse Event Handlers
  if (myCanvas) {
    let isDown = false
    let canvasX, canvasY
    ctx.lineWidth = 5

    $(myCanvas)
      .mousedown(function (e) {
        isDown = true
        ctx.beginPath()
        ctx2.beginPath()
        canvasX = e.pageX - myCanvas.offsetLeft
        canvasY = e.pageY - myCanvas.offsetTop

        ctx.moveTo(canvasX, canvasY)
      })
      .mousemove(function (e) {
        if (isDown !== false) {
          canvasX = e.pageX - myCanvas.offsetLeft
          canvasY = e.pageY - myCanvas.offsetTop
          ctx.lineTo(canvasX, canvasY)
          ctx.strokeStyle = '#065'
          ctx.stroke()
          if (recording) {
            redraw(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop)
          }
        }
      })
      .mouseup(function (e) {
        endsec = d.getTime()
        isDown = false
        ctx.closePath()
        console.log(startsec)
        console.log(endsec)
      })
  }

  // Touch Events Handlers
  draw = {
    started: false,
    start: function (evt) {
      ctx.beginPath()
      ctx.moveTo(
        evt.touches[0].pageX,
        evt.touches[0].pageY
      )

      this.started = true
    },
    move: function (evt) {
      if (this.started) {
        ctx.lineTo(
          evt.touches[0].pageX,
          evt.touches[0].pageY
        )

        ctx.strokeStyle = '#000'
        ctx.lineWidth = 5
        ctx.stroke()
      }
    },
    end: function (evt) {
      this.started = false
    }
  }

  // Touch Events
  myCanvas.addEventListener('touchstart', draw.start, false)
  myCanvas.addEventListener('touchend', draw.end, false)
  myCanvas.addEventListener('touchmove', draw.move, false)

  // Disable Page Move
  document.body.addEventListener('touchmove', function (evt) {
    evt.preventDefault()
  }, false)
  function redraw (x, y) {
    xx.push(x)
    yy.push(y)
  }

  function deraw (xx, yy) {
    ctx2.lineWidth = 5
    ctx2.beginPath()
    const x = xx.length
    console.log(i)
    i = j 
    console.log(`${i}`)
    while (i !== x) {
      rawdraw(i, xx, yy)
      i++
    }
    j = x;
  }
  function rawdraw (i, xx, yy) {
    setTimeout(function () {
      if (xx !== 0) {
        ctx2.lineTo(xx[i], yy[i])
        ctx2.moveTo(xx[i], yy[i])
        console.log(`${xx[i]},${yy[i]}`)

        ctx2.strokeStyle = color

        ctx2.stroke()
        ctx2.closePath()
      } else {
        ctx2.beginPath()
      }
    }, 15 * i)
  }
  const button = document.getElementById('button')
  button.addEventListener('click', () => {
    deraw(xx, yy)
    ctx2.closePath()
  })
  const button2 = document.getElementById('button2')
  button2.addEventListener('click', () => {
    i = 0
    j= 0;
    color = '#f23'
    color2 = '#2ff'
    ctx2.beginPath()
    ctx2.fillStyle = color2
    ctx2.fillRect(0, 0, myCanvas2.width, myCanvas2.height)
  })
  const button3 = document.getElementById('button3')
  button3.addEventListener('click', () => {
    recording = true
  })
}
// const button = document.getElementById('button')
// button.addEventListener('click', () => {
//   for (let i = 1; i <= xx.length; ++i) { doSetTimeout(i) }
// })
// function doSetTimeout (i) {
//   setTimeout(function () {
//     console.log(`${xx[i]},${xx[i]}`)
//     deraw(xx[i], yy[i])
//     ctx2.beginPath()
//   }, 500 * i)
// }
