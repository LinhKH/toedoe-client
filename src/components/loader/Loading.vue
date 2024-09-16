<template>
  <div class="loader-container">
    <div class="loader">
      <span class="loader-inner box-1"></span>
      <span class="loader-inner box-2"></span>
      <span class="loader-inner box-3"></span>
      <span class="loader-inner box-4"></span>
    </div>
  </div>
</template>
<style scoped>
/* =================================================================== */

/* =================================================================== */
/* PRELOADER */
/* =================================================================== */

.loader-container {
  background-color: rgba(255, 255, 255, 0.5);
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
}

.loader {
  transform: translateX(-50%) translateY(-50%);
  position: absolute;
  left: 50%;
  top: 50%;
}

.loader .loader-inner {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #b3b3b3;
  position: absolute;
  top: 40%;
  left: 40%;
  z-index: 99999;
}

.loader .box-1 {
  animation-name: loading-1;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-delay: 0s;
}

.loader .box-2 {
  animation-name: loading-2;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-delay: 0s;
}

.loader .box-3 {
  animation-name: loading-3;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-delay: 0s;
}

.loader .box-4 {
  animation-name: loading-4;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-delay: 0s;
}

@-webkit-keyframes loading-1 {
  0% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(0, 0, 0);
  }

  20% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(150%, 150%, 0);
  }

  80% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(150%, 150%, 0);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(0, 0, 0);
  }
}

@keyframes loading-1 {
  0% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(0, 0, 0);
  }

  20% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(150%, 150%, 0);
  }

  80% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(150%, 150%, 0);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(0, 0, 0);
  }
}

@-webkit-keyframes loading-2 {
  0% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(0, 0, 0);
  }

  20% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(150%, -150%, 0);
  }

  80% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(150%, -150%, 0);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(0, 0, 0);
  }
}

@keyframes loading-2 {
  0% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(0, 0, 0);
  }

  20% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(150%, -150%, 0);
  }

  80% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(150%, -150%, 0);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(0, 0, 0);
  }
}

@-webkit-keyframes loading-3 {
  0% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(0, 0, 0);
  }

  20% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(-150%, -150%, 0);
  }

  80% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(-150%, -150%, 0);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(0, 0, 0);
  }
}

@keyframes loading-3 {
  0% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(0, 0, 0);
  }

  20% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(-150%, -150%, 0);
  }

  80% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(-150%, -150%, 0);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(0, 0, 0);
  }
}

@-webkit-keyframes loading-4 {
  0% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(0, 0, 0);
  }

  20% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(-150%, 150%, 0);
  }

  80% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(-150%, 150%, 0);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(0, 0, 0);
  }
}

@keyframes loading-4 {
  0% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(0, 0, 0);
  }

  20% {
    transform: rotate3d(0, 0, 1, 0deg) translate3d(-150%, 150%, 0);
  }

  80% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(-150%, 150%, 0);
  }

  100% {
    transform: rotate3d(0, 0, 1, 360deg) translate3d(0, 0, 0);
  }
}
</style>
