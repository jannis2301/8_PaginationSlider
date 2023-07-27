// data array
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

// Get the slider and thumb elements
const slider = document.querySelector('.Pagination__slider')
const thumb = document.querySelector('.Pagination__thumb')
const label = document.querySelector('.Pagination__label')
const prevBtn = document.querySelector('.Pagination__prev')
const nextBtn = document.querySelector('.Pagination__next')

// Set the initial value and range of the slider
const minRange = 0
const maxRange = alphabet.length - 1
let currentValue = 0

// Function to update the thumb position and display the value
const updateSlider = () => {
  // Calculate the percentage of the current value relative to the range
  const percentage = ((currentValue - minRange) / (maxRange - minRange)) * 100

  // Move the thumb and set its value display
  thumb.style.left = percentage + '%'
  label.style.left = percentage + '%'

  // Update the label to show the current value
  label.innerText = alphabet[currentValue]
}

// Function to handle the slider value change
const handleSliderChange = (e) => {
  const sliderCoords = slider.getBoundingClientRect()
  let clientX
  if (e.touches) {
    // For touch events, use the first touch's clientX
    clientX = e.touches[0].clientX
  } else {
    // For mouse events, use clientX directly
    clientX = e.clientX
  }
  const percentage = (clientX - sliderCoords.left) / sliderCoords.width
  currentValue = Math.round(minRange + percentage * (maxRange - minRange))

  // Limit the maximum value to 100
  if (currentValue > maxRange) currentValue = maxRange
  if (currentValue < minRange) currentValue = minRange

  updateSlider()
}

const handlePrevBtn = () => {
  currentValue -= 1
  if (currentValue < minRange) {
    currentValue = maxRange
  }
  updateSlider()
}

const handleNextBtn = () => {
  currentValue += 1
  if (currentValue > maxRange) {
    currentValue = minRange
  }
  updateSlider()
}

const setToBegin = () => {
  currentValue = minRange
  updateSlider()
}
const setToEnd = () => {
  currentValue = maxRange
  updateSlider()
}

const handleKeyboard = (e) => {
  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      handlePrevBtn()
      break
    case 'ArrowRight':
    case 'ArrowDown':
      handleNextBtn()
      break
    case 'Home':
      setToBegin()
      break
    case 'End':
      setToEnd()
      break
    default:
      return
  }
}

const init = () => {
  // Add event listeners
  slider.addEventListener('mousedown', () => {
    document.addEventListener('mousemove', handleSliderChange)
  })
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', handleSliderChange)
  })
  slider.addEventListener(
    'touchstart',
    () => {
      document.addEventListener('touchmove', handleSliderChange)
    },
    { passive: true }
  )
  document.addEventListener(
    'touchend',
    () => {
      document.removeEventListener('touchmove', handleSliderChange)
    },
    { passive: true }
  )
  prevBtn.addEventListener('click', handlePrevBtn)
  nextBtn.addEventListener('click', handleNextBtn)
  window.addEventListener('keydown', handleKeyboard)
  // Initial setup
  updateSlider()
}

window.addEventListener('DOMContentLoaded', init)
