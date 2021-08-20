window.onload = function () {
  const MainArray = []
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
  let canvasdownX = 0
  let canvasdownY = 0
  let canvasmoveX = 0
  let canvasmoveY = 0
  let rectdrawbool = false
  let isDrawing = false
  let checkTime = 0

  // Fill Window Width and Height
  myCanvas.width = window.innerWidth / 2
  myCanvas.height = window.innerHeight / 2
  myCanvas2.width = window.innerWidth / 2
  myCanvas2.height = window.innerHeight / 2
  myCanvas.style.position = 'absolute'
  myCanvas.style.border = '1px solid'
  const myRect = []
  // Set Background Color
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, myCanvas.width, myCanvas.height)

  ctx2.fillStyle = color2
  ctx2.fillRect(0, 0, myCanvas2.width, myCanvas2.height)
  let coordinateClass
  let recordTimeclass
  // Mouse Event Handlers
  if (myCanvas) {
    let isDown = false
    ctx.lineWidth = 5

    $(myCanvas)
      .mousedown(function (e) {
        isDown = true
        ctx.beginPath()
        ctx2.beginPath()
        canvasdownX = e.pageX - myCanvas.offsetLeft
        canvasdownY = e.pageY - myCanvas.offsetTop
        if (recording) {
          coordinateClass = new SaveCordinate()
          coordinateClass.downCoordinate(canvasdownX, canvasdownY)
          const date = new Date()
          const hours = date.getMinutes()
          const minute = date.getHours()
          const seconds = date.getSeconds()
          const totalSec = (hours * 3600) + (minute * 60) + seconds
          coordinateClass.downTime(totalSec)
        }
        ctx.moveTo(canvasdownX, canvasdownY)
        e.preventDefault()
      })
      .mousemove(function (e) {
        if (isDown !== false) {
          canvasmoveX = e.pageX - myCanvas.offsetLeft
          canvasmoveY = e.pageY - myCanvas.offsetTop
          if (recording) {
            coordinateClass.currentCoordinate(canvasmoveX, canvasmoveY)
          }
          if (rectdrawbool) {
            rectredraw(ctx, canvasdownX, canvasdownY, canvasmoveX, canvasmoveY)
          } else {
            ctx.lineTo(canvasmoveX, canvasmoveY)
          }
          ctx.strokeStyle = '#065'
          ctx.stroke()
          // if (recording) {
          //   redraw(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop)
          // }
        }
        e.preventDefault()
      })
      .mouseup(function (e) {
        endsec = d.getTime()
        isDown = false
        ctx.closePath()
        if (recording) {
          const date = new Date()
          const hours = date.getMinutes()
          const minute = date.getHours()
          const seconds = date.getSeconds()
          const totalSec = (hours * 3600) + (minute * 60) + seconds
          coordinateClass.endTime(totalSec)
          MainArray.push(coordinateClass)
          //console.log(coordinateClass)
          coordinateClass = 0
          //console.log(MainArray)
          //console.log(`Time:${checkTime}`)
          //console.log(MainArray[0].downX)
          //console.log(MainArray[1].downX)
          e.preventDefault()
        }
      })
  }

  myCanvas.addEventListener('touchstart', (e) => {
    const coor = e.touches[0]
    ctx.beginPath()
    ctx2.beginPath()
    canvasdownX = coor.pageX - myCanvas.offsetLeft
    canvasdownY = coor.pageY - myCanvas.offsetTop
    coordinateClass = new SaveCordinate()
    coordinateClass.downCoordinate(canvasdownX, canvasdownY)
    const date = new Date()
    const hours = date.getMinutes()
    const minute = date.getHours()
    const seconds = date.getSeconds()
    const totalSec = (hours * 3600) + (minute * 60) + seconds

    coordinateClass.downTime(totalSec)
    ctx.moveTo(canvasdownX, canvasdownY)
    checkTime = 1
    e.preventDefault()
  })
  myCanvas.addEventListener('touchmove', (e) => {
    const coor = e.touches[0]
    checkTime++
    canvasmoveX = coor.pageX - myCanvas.offsetLeft
    canvasmoveY = coor.pageY - myCanvas.offsetTop
    coordinateClass.currentCoordinate(canvasmoveX, canvasmoveY)
    if (rectdrawbool) {
      rectredraw(ctx, canvasdownX, canvasdownY, canvasmoveX, canvasmoveY)
    } else {
      ctx.lineTo(canvasmoveX, canvasmoveY)
    }
    ctx.strokeStyle = '#065'
    ctx.stroke()
    if (recording) {
      redraw(e.pageX - myCanvas.offsetLeft, e.pageY - myCanvas.offsetTop)
    }
    e.preventDefault()
  })
  myCanvas.addEventListener('touchend', (e) => {
    endsec = d.getTime()
    ctx.closePath()
    const date = new Date()
    const hours = date.getMinutes()
    const minute = date.getHours()
    const seconds = date.getSeconds()
    const totalSec = (hours * 3600) + (minute * 60) + seconds
    coordinateClass.endTime(totalSec)
    MainArray.push(coordinateClass)
    console.log(coordinateClass)
    coordinateClass = 0
    console.log(MainArray)
    console.log(`Time:${checkTime}`)
    console.log(MainArray[0].downX)
    console.log(MainArray[1].downX)
    e.preventDefault()
  })

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
    j = x
  }
  function rawdraw (i, xx, yy) {
    setTimeout(function () {
      if (xx !== 0) {
        if (rectdrawbool) {
          rectredraw(ctx2, xx[0], yy[0], xx[i], yy[i])
        } else {
          ctx2.lineTo(xx[i], yy[i])
        }
        ctx2.moveTo(xx[i], yy[i])
        console.log(`${xx[i]},${yy[i]}`)

        ctx2.strokeStyle = color

        ctx2.stroke()
        ctx2.closePath()
      } else {
        ctx2.beginPath()
      }
    }, 10 * i)
  }
  const button = document.getElementById('button')
  button.addEventListener('click', () => {
    // deraw(xx, yy)
    // ctx2.closePath()
    startRedraw(MainArray)
  })
  const button2 = document.getElementById('button2')
  button2.addEventListener('click', () => {
    i = 0
    j = 0
    color = '#f23'
    color2 = '#2ff'
    ctx2.beginPath()
    ctx2.fillStyle = color2
    ctx2.fillRect(0, 0, myCanvas2.width, myCanvas2.height)
  })
  const button3 = document.getElementById('button3')
  button3.addEventListener('click', () => {
    if (!recording) {
      alert('Started Recording')
      const cuurentime = getCurrentTime()
      recordTimeclass = new RecordTime()
      recordTimeclass.starTRecording(cuurentime)
      MainArray.push(recordTimeclass)
      recordTimeclass = 0
      recording = true
    } else {
      alert('end')
      const cuurentime = getCurrentTime()
      recordTimeclass = new RecordTime()
      recordTimeclass.enDRecording(cuurentime)
      MainArray.push(recordTimeclass)
      recordTimeclass = 0
      recording = false
    }
  })
  const button4 = document.getElementById('button4')
  button4.addEventListener('click', () => {
    if (rectdrawbool === false) {
      rectdrawbool = true
    } else {
      rectdrawbool = false
    }
  })
  const button5 = document.getElementById('button5')
  button5.addEventListener('click', () => {
    alert('DOwnling')
    download(MainArray, 'Base')
  })
  function rectredraw (context, canvasdownX, canvasdownY, canvasmoveX, canvasmoveY) {
    myRect.push(new Shape(canvasdownX, canvasdownY, (canvasmoveX - canvasdownX), (canvasmoveY - canvasdownY), '#f23'))
    for (const i in myRect) {
      context.clearRect(0, 0, 800, 600)
      context.beginPath()
      context.rect(canvasdownX, canvasdownY, (canvasmoveX - canvasdownX), (canvasmoveY - canvasdownY))
      context.stroke()
      context.save()
    }
  }
  const controlDelay = 1000
  /**
  *
  * @param {*} MainArray
  * @param {*} seek
  * @returns
  * Function To Start ReDrawing Using Recursion Method
  */
  function startRedraw (MainArray, seek = 0) {
    console.log(MainArray[seek])
    if ((MainArray[seek].name === 'recordtime')) {
      const SyncyDelay = (MainArray[seek + 1].downtime - MainArray[seek].startRecording) * 1000 // in seconds delay
      console.log(SyncyDelay)
      seek++
      console.log(`seek${seek}`)
      return setTimeout(() => {
        startRedraw(MainArray, seek)
      }, SyncyDelay)
    } else {
      // sync deplay are not proper calcuated need something more specific
      const SyncyDelay = Math.max((MainArray[seek + 1].downtime - MainArray[seek].downtime), 1000)
      console.log(`SyncyDelay:${SyncyDelay}`)
      if (seek === MainArray.length) {
        return
      }
      CanvasRedraw(MainArray[seek])
      seek++
      console.log(`seek${seek}`)
      return setTimeout(() => {
        startRedraw(MainArray, seek)
      }, SyncyDelay)
    }
  }

  function CanvasRedraw (MainArray) {
    const MainArrayLenght = MainArray.getLenght()
    ctx2.beginPath()
    ctx2.moveTo(MainArray.downX, MainArray.downY)
    console.log(MainArray.downX)
    ctx2.lineWidth = 5
    ctx2.beginPath()
    return whiteBoardRedraw(MainArray, MainArrayLenght)
  }

  function whiteBoardRedraw (MainArray, MainArrayLenght, secondarySeek = 0) {
    const delay = (MainArray.checkTime())
    isDrawing = false
    setTimeout(function () {
      if (MainArrayLenght !== 0) {
        ctx2.lineTo(MainArray.x[secondarySeek], MainArray.y[secondarySeek])
        ctx2.moveTo(MainArray.x[secondarySeek], MainArray.y[secondarySeek])
        // console.log(`${MainArray.x[secondarySeek]},${MainArray.y[secondarySeek]}`)
        ctx2.strokeStyle = color
        ctx2.stroke()
        MainArrayLenght -= 1
        secondarySeek += 1
        return whiteBoardRedraw(MainArray, MainArrayLenght, secondarySeek)
      }
    }, delay)
  }
}
function Shape (x, y, w, h, fill) {
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  this.fill = fill
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

// commenting

// Try something new Bit dynamic approch this should work bitch
// idea is to declare a class that store the values of coordinate on touch down
class SaveCordinate {
  constructor () {
    this.x = []
    this.y = []
    this.downX = 0
    this.downY = 0
    this.currY = 0
    this.currX = 0
    this.downtime = 0
    this.endtime = 0
    this.time = 0
    this.name = 'savecoordinate'
  }

  downCoordinate (downX, downY) {
    this.downX = downX
    this.downY = downY
  }

  currentCoordinate (currX, currY) {
    this.currX = currX
    this.currY = currY
    this.x.push(this.currX)
    this.y.push(this.currY)
  }

  downTime (downtime) {
    this.downtime = downtime
    console.log(this.downTime)
  }

  endTime (endtime) {
    this.endtime = endtime
  }

  displayCoordinate () {
    console.log(this.x, this.y)
  }

  getLenght () {
    const lenght = (this.x.length + this.y.length) / 2
    return lenght
  }

  checkTime () {
    // console.log(this.downtime)
    // console.log(this.endtime)
    return (this.endtime - this.downtime)
  }
}
function download (data, filename) {
  data = JSON.stringify(data)
  const file = new Blob([data], { type: 'text/plain' })
  if (window.navigator.msSaveOrOpenBlob) // IE10+
  {
    window.navigator.msSaveOrOpenBlob(file, filename)
  } else { // Others
    const a = document.createElement('a')
    const url = URL.createObjectURL(file)
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    setTimeout(function () {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 0)
  }
}
class RecordTime {
  constructor () {
    this.startRecording = 0
    this.endRecording = 0
    this.name = 'recordtime'
  }

  starTRecording (startRecording) {
    this.startRecording = startRecording
  }

  enDRecording (endRecording) {
    this.endRecording = endRecording
  }
}
function getCurrentTime () {
  const date = new Date()
  const hours = date.getMinutes()
  const minute = date.getHours()
  const seconds = date.getSeconds()
  const totalSec = (hours * 3600) + (minute * 60) + seconds
  return totalSec
}
