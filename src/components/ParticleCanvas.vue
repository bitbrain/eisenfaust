<template>
  <div class="particle-container" ref="container">
    <canvas ref="canvas" :style="{ width: cssWidth + 'px', height: cssHeight + 'px' }"></canvas>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParticleCanvas',
  props: {
    particles: {
      type: Number,
      default: 400
    },
    delay: {
      type: Number,
      default: 800
    },
    life: {
      type: Number,
      default: 1000
    },
    velocity: {
      type: Number,
      default: 0.1
    },
    startColor: {
      type: String,
      default: 'var(--ember-800)'
    },
    endColor: {
      type: String,
      default: 'var(--ember-700)'
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      cssWidth: 0,
      cssHeight: 0,
      context: null,
      particleArray: [],
      currentTime: 0,
      lastTime: 0,
      delta: 0,
      animationId: null,
      startColorRGB: { r: 20, g: 150, b: 255 },
      endColorRGB: { r: 30, g: 160, b: 255 },
      pixelRatio: 1
    }
  },
  mounted() {
    this.pixelRatio = window.devicePixelRatio || 1
    this.parseColors()
    this.setupCanvas()
    this.initParticles()
    this.startAnimation()
    
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    this.stopAnimation()
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    startColor() {
      this.parseColors()
      this.initParticles()
    },
    endColor() {
      this.parseColors()
      this.initParticles()
    }
  },
  methods: {
    parseColors() {
      // Parse start color
      this.startColorRGB = this.parseColor(this.startColor)
      
      // Parse end color
      this.endColorRGB = this.parseColor(this.endColor)
    },
    
    parseColor(colorValue) {
      const temp = document.createElement('div')
      temp.style.color = colorValue
      document.body.appendChild(temp)
      const computedColor = getComputedStyle(temp).color
      document.body.removeChild(temp)
      
      const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
      if (match) {
        return {
          r: parseInt(match[1], 10),
          g: parseInt(match[2], 10),
          b: parseInt(match[3], 10)
        }
      }
      return { r: 0, g: 0, b: 0 }
    },
    
    setupCanvas() {
      const container = this.$refs.container
      // Set CSS dimensions (the visual size)
      this.cssWidth = container.clientWidth + 400
      this.cssHeight = container.clientHeight + 400
      
      // Set actual canvas dimensions (multiplied by pixel ratio for high DPI)
      this.width = Math.floor(this.cssWidth * this.pixelRatio)
      this.height = Math.floor(this.cssHeight * this.pixelRatio)
      
      const canvas = this.$refs.canvas
      canvas.width = this.width
      canvas.height = this.height
      
      // Position the canvas with CSS
      canvas.style.left = '-200px'
      canvas.style.top = '-200px'
      
      // Get context and scale it
      this.context = canvas.getContext('2d')
      this.context.scale(this.pixelRatio, this.pixelRatio)
    },
    
    handleResize() {
      this.stopAnimation()
      this.setupCanvas()
      this.initParticles()
      this.startAnimation()
    },
    
    initParticles() {
      this.particleArray = []
      
      for (let i = 0; i < this.particles; i++) {
        let size = 1
        
        if (Math.random() < 0.4) {
          size = Math.random() * 2 + 1
        }
        
        const particle = new Particle(
          0, 0, 
          this.startColorRGB.r, this.startColorRGB.g, this.startColorRGB.b,
          this.endColorRGB.r, this.endColorRGB.g, this.endColorRGB.b,
          size
        )
        const behavior = new ParticleBehavior(particle, this.delay, this.realignParticle.bind(this))
        particle.behavior = behavior
        this.realignParticle(particle)
        
        this.particleArray.push(particle)
      }
    },
    
    realignParticle(particle) {
      // Use CSS dimensions for calculations as context is scaled
      particle.x = Math.random() * this.cssWidth / 1.5 + (((this.cssWidth - this.cssWidth / 1.5) / 2))
      particle.y = Math.random() * this.cssHeight / 4 + this.cssHeight / 3 * 1.5
      particle.a = 0
      particle.transitionProgress = 0
    },
    
    startAnimation() {
      this.currentTime = Date.now()
      this.lastTime = this.currentTime
      this.renderingLoop()
    },
    
    stopAnimation() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId)
        this.animationId = null
      }
    },
    
    renderingLoop() {
      this.lastTime = this.currentTime
      this.currentTime = Date.now()
      this.delta = this.currentTime - this.lastTime
      
      // Clear with CSS dimensions since context is scaled
      this.context.clearRect(0, 0, this.cssWidth, this.cssHeight)
      
      for (let i = 0; i < this.particleArray.length; i++) {
        this.particleArray[i].update(this.delta)
        this.particleArray[i].draw(this.context)
      }
      
      this.animationId = requestAnimationFrame(this.renderingLoop.bind(this))
    }
  }
}

class Particle {
  constructor(x, y, startR, startG, startB, endR, endG, endB, size) {
    this.x = x
    this.y = y
    this.size = size
    this.startR = startR
    this.startG = startG
    this.startB = startB
    this.endR = endR
    this.endG = endG
    this.endB = endB
    this.currentR = startR
    this.currentG = startG
    this.currentB = startB
    this.a = 0.0
    this.behavior = null
    this.flare = 0
    this.transitionProgress = 0 // 0 to 1, represents color transition progress
  }
  
  update(delta) {
    this.behavior.update(delta)
    
    // Update current color based on transition progress
    this.currentR = this.startR + (this.endR - this.startR) * this.transitionProgress
    this.currentG = this.startG + (this.endG - this.startG) * this.transitionProgress
    this.currentB = this.startB + (this.endB - this.startB) * this.transitionProgress
  }
  
  draw(context) {
    let flareFactor = Math.random() * 0.005
    flareFactor *= (Math.random() < 0.5) ? -1 : 1
    this.flare += flareFactor
    
    context.globalAlpha = this.a + this.flare
    context.fillStyle = `rgba(${Math.round(this.currentR)}, ${Math.round(this.currentG)}, ${Math.round(this.currentB)}, ${this.a})`
    context.beginPath()
    context.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2 * Math.PI, false)
    context.fill()
  }
}

class ParticleBehavior {
  constructor(particle, baseDelay, realignCallback) {
    this.delay = 0
    this.veloX = 0
    this.startVelocity = 0.15 * Math.random() + 0.05
    this.delayRange = baseDelay + Math.random() * 20000
    this.opacityFactor = Math.random() * 0.01
    this.life = 0
    this.maxLife = 10000
    this.maxOpacity = 0.15 + 0.7 * Math.random()
    this.particle = particle
    this.baseDelay = baseDelay
    this.realignCallback = realignCallback
  }
  
  update(delta) {
    if (this.delay > this.delayRange) {
      this.life += delta
      this.particle.y -= delta * this.startVelocity * Math.random()
      
      // Update color transition progress
      this.particle.transitionProgress = Math.min(1, this.life / (this.maxLife * 0.5))
      
      if (this.life < 5000) {
        if (this.particle.a < this.maxOpacity) {
          this.particle.a += this.opacityFactor
        }
      } else {
        this.particle.a -= this.opacityFactor
        if (this.particle.a < 0) {
          this.particle.a = 0
        }
      }
      
      const factorX = Math.random() * 0.05 * (Math.random() > 0.5 ? 1 : -1)
      this.veloX += factorX
      this.particle.x += this.veloX
      
      if (this.particle.y < 0 || this.particle.a === 0) {
        this.realignCallback(this.particle)
        this.delay = 0
        this.delayRange = this.baseDelay + Math.random() * 20000
        this.veloX = 0
        this.life = 0
        this.maxOpacity = 0.2 + 0.4 * Math.random()
      }
    } else {
      this.delay += delta
    }
  }
}
</script>

<style scoped>
.particle-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
}
</style>
