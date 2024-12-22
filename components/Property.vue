<template>
    <div ref="header" class="relative flex h-16 item-center">
        <div ref="name" class="flex ml-32 w-[400px] content-center">
            <h1 class="boardNameFont text-xl text-bold w-[165px]">White Board: </h1> 
            <p v-if="!isChangeName" @click="changeName()" class="min-w-5 font-bold text-xl self-center tracking-wider">{{boardName}}</p>
            <input v-if="isChangeName" type="text" v-model="boardName" @change="changeName()" @keyup.enter="changeName()" class="h-7 border-2 border-gray-400 rounded-lg" />
        </div>
        <div ref="properetiesBox" class="header-bar sticky left-0 rounded-2xl glass ml-96 mr-10">
            <div ref="color" class="flex my-1 w-full justify-center mr-3 ml-3">
                <color-picker v-model="selectedColor" @change="setColor(selectedColor)"></color-picker>
            </div>
            <div ref="font" class="dropdown my-1 w-full mr-3">
                <div class="w-fill text-white hover:bg-sky-600 flex justify-center"><Icon name="material-symbols:font-download-outline" color="white" size="1.5rem"  class="my-3"/></div>
                <div class="dropdown-content w-16">
                    <a v-if="!italic" href="#" class="block p-2 hover:bg-sky-400 flex justify-center" @click="setItalic(true)">
                        <Icon name="solar:text-italic-square-broken" color="white" size="1.5rem"  class="my-3"/>
                    </a>
                    <a v-if="italic" href="#" class="block p-2 bg-sky-400 flex justify-center" @click="setItalic(false)">
                        <Icon name="solar:text-italic-square-broken" color="white" size="1.5rem"  class="my-3"/>
                    </a>

                    <a v-if="!underline" href="#" class="block p-2 hover:bg-sky-400 flex justify-center" @click="setUnderline(true)">
                        <Icon name="solar:text-underline-cross-broken" color="white" size="1.5rem"  class="my-3"/>
                    </a>
                    <a v-if="underline" href="#" class="block p-2 bg-sky-400 flex justify-center" @click="setUnderline(false)">
                        <Icon name="solar:text-underline-cross-broken" color="white" size="1.5rem"  class="my-3"/>
                    </a>

                    <a v-if="!bold" href="#" class="block p-2 hover:bg-sky-400 flex justify-center" @click="setBold(true)">
                        <Icon name="solar:text-bold-square-broken" color="white" size="1.5rem"  class="my-3"/>
                    </a>
                    <a v-if="bold" href="#" class="block p-2 bg-sky-400 flex justify-center" @click="setBold(false)">
                        <Icon name="solar:text-bold-square-broken" color="white" size="1.5rem"  class="my-3"/>
                    </a>
                </div>
            </div>
            <div ref="style-size" class="flex my-1 w-full justify-center mr-5">
                <select v-model="selectedFont" class="h-5 text-black self-center" @change="setFont()">
                    <option v-for="font in systemFonts" :key="font" :value="font">{{ font }}</option>
                </select>
                <input v-model="size" placeholder="size" @change="setSize()" class="h-5 w-5 ml-2 self-center"/>
            </div>
        </div>
    </div>
</template>

<script setup >
import {ref} from 'vue';
import { useToolStore } from '../stores/store.ts';
import 'primevue/resources/themes/aura-light-green/theme.css'

const toolStore = useToolStore();

const selectedFont = ref('Arial');
const systemFonts = ref([
  'Arial', 'Helvetica', 'Tahoma', 'Verdana', 'Times New Roman',
  'Georgia', 'Courier New', 'Lucida Console', 'Impact', 'Arial Black',
  'Comic Sans MS', 'Trebuchet MS', 'Palatino', 'Garamond', 'Book Antiqua',
  'Lucida Sans Unicode', 'Arial Narrow', 'Century Gothic', 'Franklin Gothic Medium',
  'Baskerville', 'Copperplate', 'Brush Script MT', 'Curlz MT', 'Snap ITC',
  'Papyrus', 'Segoe UI', 'Segoe Print', 'Segoe Script', 'Rockwell',
  'Arial Rounded MT', 'Calibri', 'Cambria', 'Candara', 'Consolas',
  'Constantia', 'Corbel', 'Ebrima', 'Gabriola', 'Candara', 'Verdana',
  'Euphemia', 'Segoe Print', 'Segoe UI', 'Segoe UI Historic', 'Segoe UI Emoji',
  'Segoe UI Symbol', 'Yu Gothic', 'Yu Gothic UI', 'MS Gothic', 'MS PGothic',
  'MS UI Gothic', 'MS Sans Serif', 'MS Serif', 'MV Boli', 'Comic Sans MS',
  'Wingdings', 'Wingdings 2', 'Wingdings 3', 'Segoe MDL2 Assets', 'Courier',
  'Courier New', 'Lucida Console', 'Lucida Sans Typewriter', 'Andale Mono',
  'Monaco', 'OCR A Std', 'OCR B Std', 'Consolas', 'Lucida Console', 'Lucida Sans Typewriter',
  'monospace', 'Courier New', 'monospace', 'Segoe UI', 'Tahoma', 'Geneva',
  'Helvetica', 'sans-serif', 'Arial Black', 'Impact', 'Charcoal', 'Lucida Sans Unicode',
  'Lucida Grande', 'Tahoma', 'Geneva', 'Trebuchet MS', 'Verdana', 'Geneva', 'Lucida Grande'
]);

const color = ref('#FF0000');
var size = 5;

const italic = ref(false);
const underline = ref(false);
const bold = ref(false);

const tool = ref('pencil');

const boardName = ref('testName');
const isChangeName = ref(false);

function changeName() {
    isChangeName.value = !isChangeName.value;
}

function setColor(input) {
    color.value = "#" + input;
    toolStore.setColor(color.value);
}

function setSize() {
    if (size > 99) {
        size = 99;
    }
    toolStore.setSize(size);
}

function setItalic(input) {
    italic.value = input;
    toolStore.setFontStyleItalic(input);
}
function setUnderline(input) {
    underline.value = input;
    toolStore.setFontStyleUnderline(input);
}
function setBold(input) {
    bold.value = input;
    toolStore.setFontStyleBold(input);
}

function setFont() {
    toolStore.setFont(selectedFont.value);
    console.log(selectedFont);
}
</script>

<style scoped>
.header-bar {
    min-height: 0px;
    background-color: #0ea5e9;
    display: flex;
    align-items: center;
}

.color-selector {
    position: absolute;
    background-color: #0284c7;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    top: 100%;
    left: 0;
}

.dropdown {
    position: relative;
    display: inline-block;
    align-items: center;
}

.dropdown .tool {
    display: none;
    position: absolute;
    background-color: #0284c7;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    top: 0;
    left: 100%;
}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #0ea5e9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    left: -7%;
    top: 100%;
}

.dropdown:hover .dropdown-content {
    display: block;
    overflow: hidden;
    animation: slideInFromTop 0.3s;
}

@keyframes slideInFromTop {
    0% {
    height: 0;
    }
    100% {
    height: 120px;
    }
}

.boardNameFont {
    font-family: Lato;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 100%;
    display: flex;
    align-items: center;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: #0565f5;
}

.flex-wrap {
    align-content: center;
}
</style>