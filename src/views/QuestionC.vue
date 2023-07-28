<script setup>
import { reactive } from 'vue'

let inputBlocks = reactive({
  blocks: [
    /* {
      "token": "PERSON_NAME",
      "type": "text",
      "props": {
        "title": "Enter Name",
        "required": true,
        "placeholder": "John Doe"
      }
    },
    {
      "token": "IS_PERSON_MINOR",
      "type": "checkbox",
      "props": {
        "title": "Is The Current Person Minor?",
        "default": false
      }
    },
    {
      "token": "PERSON_DOB",
      "type": "date",
      "props": {
        "title": "Enter DOB",
        "required": "IS_PERSON_MINOR",
        "placeholder": "e.g. 01/01/2002"
      }
    } */
  ]
})

const copyBlocks = async () => {
  try {
    const textToCopy = `{
      "token": "PERSON_NAME",
      "type": "text",
      "props": {
        "title": "Enter Name",
        "required": true,
        "placeholder": "John Doe"
      }
    },
    {
      "token": "IS_PERSON_MINOR",
      "type": "checkbox",
      "props": {
        "title": "Is The Current Person Minor?",
        "default": false
      }
    },
    {
      "token": "PERSON_DOB",
      "type": "date",
      "props": {
        "title": "Enter DOB",
        "required": "IS_PERSON_MINOR",
        "placeholder": "e.g. 01/01/2002"
      }
    }`
    await navigator.clipboard.writeText(textToCopy)
    console.log('Content copied to clipboard')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

let inputValues = reactive({})

let isValidJSONArray = (jsonString) => {
  try {
    JSON.parse(JSON.stringify(jsonString))
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

let formBlocksInputHandler = (e) => {
  let jsonArr = e.target.innerText
  if (!isValidJSONArray(jsonArr)) {
    console.log('Not A Valid JSON')
    return
  }
  jsonArr = JSON.parse(JSON.stringify(jsonArr))

  inputBlocks.blocks = Array.isArray(jsonArr) ? jsonArr : [jsonArr]

  if (!Array.isArray(inputBlocks.blocks)) {
    console.log('Not A Valid Array!')
    return
  }

  inputBlocks.blocks = JSON.parse(`[${inputBlocks.blocks[0]}]`)

  //[{"asdaw":"asdawdaw"}]
  /* inputValues = []
  for (let block of inputBlocks.blocks) {

    let blockToPush = block
    blockToPush.value = ''
    inputValues.push(blockToPush)
  } */
}

let handleFormSubmit = () => {
  let result = {}
  for (const eachInput of inputBlocks.blocks) {
    let isRequired = eachInput.props.required
    let dependencyValue = ''

    if (typeof isRequired === 'string') {
      for (const eachInput_inner of inputBlocks.blocks)
        if (eachInput_inner.token == isRequired) dependencyValue = eachInput_inner.value

      if (dependencyValue && !eachInput.value)
        return alert(`${eachInput.token} cannot be empty because ${isRequired} is TRUE!`)
    }

    if (eachInput.value == '' && isRequired) return alert(eachInput.token + ' cannot be empty')

    result[eachInput.token] = eachInput.value
  }
  alert(JSON.stringify(result))
}
</script>
<template>
  <div class="que-c">
    <div class="data">
      <h1>Enter The Blocks Below :</h1>
      <p @click.stop.prevent="copyBlocks" class="copy-blocks">Click To Copy A Sample!</p>
      <pre contenteditable class="blocks" @input="formBlocksInputHandler"></pre>
    </div>
    <div class="form">
      <div class="input" v-for="(eachBlock, index) in inputBlocks.blocks" :key="eachBlock.token">
        <label :for="eachBlock.token" v-if="eachBlock.token">{{ eachBlock.props.title }}</label>
        <input
          :type="eachBlock.type"
          v-bind="{ ...eachBlock.props }"
          :id="eachBlock.token"
          v-if="eachBlock.token"
          v-model="eachBlock.value"
        />
        {{ eachBlock.value }}
      </div>
      <button type="submit" @click.prevent.stop="handleFormSubmit" v-if="inputBlocks.blocks[0]">
        Submit
      </button>
    </div>
  </div>
</template>
<style scoped>
.que-c {
  width: 100%;
  min-height: calc(100% - 70px);
  color: white;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 35px;
}
.copy-blocks {
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  width: max-content;
  margin-bottom: 15px;
}
.copy-blocks:hover {
  text-decoration: underline;
}
.data {
  margin: 20px 0;
  width: 50%;
}
.data > .blocks {
  min-height: 200px;
  max-height: 450px;
  min-width: 45ch;
  max-width: 65ch;
  background: #2f2f2f;
  padding: 10px;
  border-radius: 5px;
  overflow-y: scroll;
}
hr {
  width: 90vw;
  border-radius: 2px;
}
.form {
  max-width: 550px;
  font-size: 1.25rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
}
.form > .input {
  padding: 10px;
  transition: all 0.25s ease-in-out;
}
label {
  margin: 5px 15px;
}
button {
  font-size: 1.5rem;
  align-self: center;
  margin: 30px;
  background: rgb(0, 191, 255);
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
}
</style>
