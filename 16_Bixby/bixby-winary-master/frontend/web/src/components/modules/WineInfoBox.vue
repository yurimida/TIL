<template>
  <div class="wine-info-box--container">
    <div class="wine-info-box--image-container">
      <img :src="info.wine_image" width=107 height=280 alt="..."/>
    </div>
    <div class="wine-info-box--description-container">
      <div class="wine-info-box--description-en-name">
        <span>{{ wineEngName }}</span>
      </div>
      <div class="wine-info-box--description-ko-name">
        <span>{{ info.wine_ko_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info'],
  computed: {
    wineEngName() {
      const string = this.info.wine_en_name.toLowerCase();
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>

<style scoped>
.wine-info-box--container {
  height: 400px;
  position: relative;
  background-color: #FFFFFF;
  transition: 1s;
  cursor: pointer;
}

.wine-info-box--container:hover {
  opacity: 0.5;
  box-shadow: 1px 1px 5px #000000;
}

.wine-info-box--image-container {
  display: flex;
  justify-content: center;
}

.wine-info-box--description-container {
  position: absolute;
  width: 100%;
  padding-top: 20px;
}

.wine-info-box--description-en-name {
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #690b22;
}

.wine-info-box--description-ko-name {
  margin-top: 20px;
  text-align: center;
  font-family: 'Sunflower', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #420101;
}

.wine-info-box--description-categories {
  font-family: 'Sunflower', sans-serif;
  font-size: 15px;
}

</style>