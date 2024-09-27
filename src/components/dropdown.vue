<script setup>
import { ref, computed, watch } from "vue"
import Input from "./input.vue"

const props = defineProps({
  placeholder: String,
  modelValue: String,
  valid: Boolean,
  invalid: Boolean,
  dropdownClass: String,
  options: Array,
  labelKey: String,
  labelRenderer: Function,
  openUp: Boolean,
})

const emits = defineEmits(["input", "click", "open", "close"])

const open = ref(false)
const optionsRef = ref()

const onInput = (e) => {
  emits("input", e.target.value)
}
const onOptionClick = (option) => {
  emits("click", option)
  open.value = false
}
const onOpen = () => {
  emits("open")
  open.value = true
}
const onClose = () => {
  if (open.value) emits("close")
  open.value = false
}
const onFocus = (e) => {
  e.target.select()
}

const showOptions = computed(() => open.value && !!props.options.length)

const sortedOptions = computed(() =>
  props.openUp ? [...props.options].reverse() : props.options,
)

watch(
  () => [props.options, props.openUp],
  () => {
    if (props.openUp && optionsRef.value) {
      optionsRef.value.scrollTop = 10000
    }
  },
)
</script>

<template>
  <div class="backdrop" v-if="showOptions" @click="onClose" />
  <div
    class="dropdown"
    :class="[dropdownClass, { open: showOptions, up: openUp }]"
  >
    <Input
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :invalid="invalid"
      :valid="valid"
      @input="onInput"
      @click="onOpen"
      @focus="onFocus"
    />
    <div
      :ref="
        (el) => {
          optionsRef = el
        }
      "
      class="options"
      :class="{ up: openUp }"
    >
      <div
        v-if="showOptions"
        class="option"
        @click="onOptionClick(option)"
        v-for="option of sortedOptions"
      >
        <span>
          {{ labelKey ? option[labelKey] : labelRenderer?.(option) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.dropdown {
  position: relative;

  input {
    width: 100%;
    height: 100%;
  }
  &.open {
    z-index: 1001;

    &:not(.up) {
      input {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    }
    &.up {
      input {
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
      }
    }
  }

  .options {
    position: absolute;
    width: 100%;
    // max-height: 172px;
    max-height: 220px;
    // max-height: min(220px, 25vh);
    z-index: 10;
    background-color: white;
    overflow-y: auto;

    &:not(.up) {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    &.up {
      bottom: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    .option {
      width: 100%;
      text-align: start;
      padding: 8px 16px;
      font-size: 22px;
      cursor: pointer;

      &:hover {
        font-weight: bold;
      }

      span {
        pointer-events: none;
      }
    }
  }
}
</style>
