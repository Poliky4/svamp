<script setup>
import { ref, watch, onMounted } from "vue"
import JSConfetti from "js-confetti"

import Question from "../question/question.vue"
import Images from "../question/images.vue"
import Characteristics from "../question/characteristics.vue"
import Divider from "../question/divider.vue"
import Button from "../components/button.vue"
import Dropdown from "../components/dropdown.vue"
import data from "../data/data.json"
import questions from "../data/selectedQuestions.json"
import * as animate from "./animation"

const question = ref(questions[Math.floor(Math.random() * questions.length)])
const oldQuestion = ref()

const wrapperRef = ref()
const nextButtonRef = ref()

const confetti = ref()

const matchingOptions = ref(data)

const name = ref("")
const selectedOption = ref()
const nameError = ref(false)
const nameCorrect = ref(false)
const edibleError = ref(false)
const edibleCorrect = ref(false)
const poisonousError = ref(false)
const poisonousCorrect = ref(false)

const done = ref(false)

onMounted(() => {
  if (!confetti.value) {
    confetti.value = new JSConfetti()
  }
})

watch(
  () => done.value,
  (newValue) => {
    if (newValue === true) {
      animate.jump(nextButtonRef.value.$el, 300)
    }
  },
)

const _nextQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length)
  let next = questions[randomIndex]
  if (next.name === question.value.name) {
    next = questions[randomIndex + 1] || questions[0]
  }
  oldQuestion.value = question.value
  question.value = next
}

const resetValidation = () => {
  nameError.value = false
  edibleError.value = false
  edibleCorrect.value = false
  poisonousError.value = false
  poisonousCorrect.value = false
}

function nextQuestion() {
  const duration = 200
  animate.exitRight(wrapperRef.value, duration)

  setTimeout(() => {
    name.value = ""
    done.value = false
    resetValidation()
    filterOptions()
    _nextQuestion()
  }, duration / 2)

  // setTimeout(() => {
  //   animate.enterLeft(wrapperRef.value, duration);
  // }, duration * 0.66);
}

const filterOptions = () => {
  if (name.value.length) {
    const nameReg = new RegExp(name.value, "gi")
    matchingOptions.value = data.filter(
      (o) => nameReg.test(o.name) || nameReg.test(o.scientificName),
    )
  }

  if (!name.value.length) {
    matchingOptions.value = data
  }
}

const onNameChange = (newName) => {
  name.value = newName // TODO: turn into v-model again
  selectedOption.value = null
  filterOptions()
  resetValidation()
}

const onDropdownOpen = () => {
  filterOptions()
  resetValidation()
}

const onOptionClick = (option) => {
  name.value = `${option.name} (${option.scientificName})`
  selectedOption.value = option
}

const onAnswerClick = (edible) => {
  resetValidation()

  const isNameCorrect = selectedOption.value?.id === question.value.id
  const isEdibleCorrect = edible === question.value.edible

  if (isNameCorrect && isEdibleCorrect) {
    sprayConfetti()
    done.value = true
    return
  }

  animate.wiggle(wrapperRef.value, 300)

  if (isNameCorrect) {
    nameCorrect.value = true
  } else {
    nameError.value = true
  }

  if (isEdibleCorrect) {
    if (edible) {
      // edibleCorrect.value = true;
    } else {
      // poisonousCorrect.value = true;
    }
  } else {
    if (edible) {
      edibleError.value = true
    } else {
      poisonousError.value = true
    }
  }
}

function sprayConfetti() {
  confetti.value?.addConfetti()
}
</script>

<template>
  <div class="quiz" ref="wrapperRef">
    <Question v-bind="question" :options="data" :next="nextQuestion">
      <Images v-bind="question" />
      <!-- <Divider /> -->
      <Characteristics v-bind="question" />
      <!-- <Divider /> -->
      <div class="input">
        <Dropdown
          dropdownClass="a"
          placeholder="Namn"
          :openUp="true"
          :options="matchingOptions"
          :invalid="nameError"
          :valid="nameCorrect"
          :modelValue="name"
          @click="onOptionClick"
          @input="onNameChange"
          @open="onDropdownOpen"
          :labelRenderer="
            (option) => `${option.name} (${option.scientificName})`
          "
        />
        <Button
          positive
          class="b button"
          :class="[{ invalid: edibleError, valid: edibleCorrect }]"
          @click="onAnswerClick(true)"
        >
          Ätlig
        </Button>
        <Button ref="nextButtonRef" class="c button next" @click="nextQuestion">
          <span v-if="!done">Skippa</span>
          <span v-if="done">Nästa</span>
        </Button>
        <Button
          negative
          class="d button"
          :class="[{ invalid: poisonousError, valid: poisonousCorrect }]"
          @click="onAnswerClick(false)"
        >
          Giftig
        </Button>
      </div>
    </Question>
  </div>
</template>

<style scoped lang="scss">
@import "../style/variables.scss";
.quiz {
  height: 100%;
}
:deep(.input) {
  margin-top: auto;
  margin-bottom: 32px;

  display: grid;
  grid-template-areas:
    "a a a a a"
    "b b c d d";
  grid-template-columns: repeat(auto, 4);
  grid-template-rows: 60px 60px;
  gap: 16px;

  .a {
    grid-area: a;
  }
  .b {
    grid-area: b;
  }
  .c {
    grid-area: c;
  }
}

.button {
  &.valid {
    border: 2px solid black;
    box-shadow: green 0 0 4px 4px;
  }
  &.invalid {
    border: 2px solid black;
    box-shadow: red 0 0 4px 4px;
  }
  &.next {
    margin: 0 auto;
  }
}
</style>
