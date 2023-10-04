<template>
  <div class="loading">
    <div class="loading-text">
      <span class="loading-text-words">A</span>
      <span class="loading-text-words">L</span>
      <span class="loading-text-words">L</span>
      <span class="loading-text-words">E</span>
      <span class="loading-text-words">G</span>
      <span class="loading-text-words">R</span>
      <span class="loading-text-words">I</span>
      <span class="loading-text-words">A</span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
@import url(https://fonts.googleapis.com/css?family=Quattrocento+Sans);
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 9999;
}

.loading-text {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 80px;
  font-weight: medium;
  span {
    display: inline-block;
    margin: 0 5px;
    color: #e64926;
    font-family: "Cormorant Garamond", sans-serif;
    @for $i from 0 through 7 {
      &:nth-child(#{$i + 1}) {
        filter: blur(0px);
        animation: blur-text 1.5s (calc($i / 5)) + s infinite linear alternate;
      }
    }
  }
}

@keyframes blur-text {
  0% {
    filter: blur(0px);
  }
  100% {
    filter: blur(4px);
  }
}
</style>
