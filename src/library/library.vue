<script setup>
import { ref } from "vue"

import Dropdown from "../components/dropdown.vue"
import Question from "../question/question.vue"
import Images from "../question/images.vue"
import Characteristics from "../question/characteristics.vue"
import Divider from "../question/divider.vue"
import Button from "../components/button.vue"
import questions from "../data/selectedQuestions.json"

const filteredQuestions = ref(questions)
const question = ref()
const name = ref("")

const onInput = (value) => {
  const regex = new RegExp(value, "i")
  filteredQuestions.value = questions.filter((question) => {
    return regex.test(question.name)
  })

  name.value = value
}

const onOptionClick = (selectedQuestion) => {
  question.value = selectedQuestion
  name.value = `${selectedQuestion.name} (${selectedQuestion.scientificName})`
}
</script>

<template>
  <div>
    <Question v-bind="question">
      <Dropdown
        :modelValue="name"
        class="dropdown"
        placeholder="Välj en svamp!"
        :options="filteredQuestions"
        @click="onOptionClick"
        @input="onInput"
        :labelRenderer="(option) => `${option.name} (${option.scientificName})`"
      />
      <div class="content" v-if="question">
        <Images v-bind="question" />
        <Divider />
        <Characteristics v-bind="question" />
        <Divider />
        <Button
          v-if="question.edible"
          positive
          class="edibility"
          :class="[{ invalid: edibleError, valid: edibleCorrect }]"
        >
          Ätlig
        </Button>
        <Button
          v-if="!question.edible"
          negative
          class="edibility"
          :class="[{ invalid: poisonousError, valid: poisonousCorrect }]"
        >
          Giftig
        </Button>
      </div>
    </Question>
  </div>
</template>

<style scoped lang="scss">
.content {
  margin-top: 32px;

  .edibility {
    margin: 0 auto;
  }
}
</style>
