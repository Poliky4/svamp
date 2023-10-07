<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  image1: String,
  image2: String,
  image3: String,
})

const activeImage = ref()

watch(
  () => props.id,
  () => (activeImage.value = null),
)
</script>

<template>
  <div class="images">
    <div class="image cap" @click="activeImage = props.image1">
      <img :src="props.image1" />
    </div>
    <div class="image hymenium" @click="activeImage = props.image2">
      <img :src="props.image2" />
    </div>
    <div class="image stipe" @click="activeImage = props.image3">
      <img :src="props.image3" />
    </div>
    <div
      class="image activeImage"
      v-if="activeImage"
      @click="activeImage = null"
    >
      <img :src="activeImage" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../style/variables.scss";
.images {
  margin-bottom: 32px;
  position: relative;
  display: grid;
  grid-template-areas:
    "b a"
    "c a";
  gap: 8px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, clamp(100px, 22vh, 200px));

  @include media(">desktop") {
    grid-template-rows: repeat(2, 200px);
  }

  .image {
    transform: scale(1);
    transition: transform 300ms;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:hover {
      transform: scale(1.05);
    }
  }

  .activeImage {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #006600;

    img {
      object-fit: contain;
    }
  }

  .cap {
    grid-area: a;
  }
  .hymenium {
    grid-area: b;
    display: flex;
    align-items: flex-start;
  }
  .stipe {
    grid-area: c;
    display: flex;
    align-items: flex-end;
  }
}
</style>
