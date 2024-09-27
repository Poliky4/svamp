<script setup>
import { computed, ref, watch } from "vue"

const props = defineProps({
  id: String,
  image1: String,
  image2: String,
  image3: String,
})

const images = computed(() => [props.image1, props.image2, props.image3]);

const activeImage = ref()

function previousImage() {
  const activeImageIndex = images.value.indexOf(activeImage.value)
  const previousImage = images.value[activeImageIndex - 1] || images.value[2];
  activeImage.value = previousImage;
}

function nextImage() {
  const activeImageIndex = images.value.indexOf(activeImage.value)
  const nextImage = images.value[activeImageIndex + 1] || images.value[0];
  activeImage.value = nextImage;
}

watch(
  () => props.id,
  () => (activeImage.value = null),
)
</script>

<template>
  <div class="images">
    <div v-if="!activeImage" class="image cap" @click="activeImage = props.image1">
      <img :src="props.image1" />
    </div>
    <div v-if="!activeImage" class="image hymenium" @click="activeImage = props.image2">
      <img :src="props.image2" />
    </div>
    <div v-if="!activeImage" class="image stipe" @click="activeImage = props.image3">
      <img :src="props.image3" />
    </div>
    <div v-if="activeImage" class="image activeImage">
      <div @click="previousImage()" class="previous">◄</div>
      <img @click="activeImage = null" :src="activeImage" />
      <div @click="nextImage()" class="next">►</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../style/variables.scss";
.images {
  margin-bottom: 16px;
  position: relative;
  display: grid;
  grid-template-areas:
    "b a"
    "c a";
  gap: 8px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, clamp(100px, 16vh, 200px));

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

  .previous, .next {
    position: absolute;
    $size: 32px;
    width: $size;
    height:$size;
    border-radius: 999px;
    background-color: rgb(0, 0, 0, 0.7);
    color: #888888;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }

  .previous {
    top: 50%;
    left: 16px;
  }

  .next {
    top: 50%;
    right: 16px;
  }
}
</style>
