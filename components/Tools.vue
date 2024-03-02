<template>
    <div ref="toolBox" class="sidebar sticky left-0 rounded-2xl glass">
            <div ref="file" class="flex my-1 w-full justify-center">
                <Icon name="teenyicons:book-outline" color="white" size="1rem" class="my-3"/>
            </div>
            <div ref="shape" class="dropdown my-1 w-full">
                <div v-if="tool === 'pencil'" class="w-fill text-white hover:bg-sky-600 flex justify-center"><Icon name="material-symbols:shape-line-outline" color="white" size="1rem"  class="my-3"/></div>
                <div v-if="tool !== 'pencil'" class="w-fill text-white bg-sky-600 flex justify-center"><Icon name="material-symbols:shape-line-outline" color="white" size="1rem" class="my-3"/></div>
                <div class="dropdown-content">
                    <a href="#" class="block p-2 hover:bg-gray-200" @click="setShape('line')"><img src="../public/line.png" alt="line" class="object-cover w-20"/></a>
                    <a href="#" class="block p-2 hover:bg-gray-200" @click="setShape('rectangle')"><img src="../public/rectangle.png" alt="rectangle" class="object-cover w-20"/></a>
                    <a href="#" class="block p-2 hover:bg-gray-200">Option 3</a>
                </div>
            </div>
            <div ref="upload" class="flex my-1 w-full justify-center">
                <Icon name="simple-line-icons:cloud-upload" color="white" size="1rem" class="my-3"/>
            </div>
            <div ref="text" class="flex my-1 w-full justify-center">
                <Icon name="cil:text" color="white" size="1rem"  class="my-3"/>
            </div>
            <div ref="text" class="dropdown my-1 w-full">
                <div v-if="tool !== 'text'" class="w-fill text-white hover:bg-sky-600 flex justify-center" @click="setShape('text')"><Icon name="cil:text" color="white" size="1rem"  class="my-3"/></div>
                <div v-if="tool === 'text'" class="w-fill text-white bg-sky-600 flex justify-center"><Icon name="cil:text" color="white" size="1rem" class="my-3"/></div>
                <div class="dropdown-content">
                    <a href="#" class="block p-2 hover:bg-gray-200" @click="setShape('text')"><img src="../public/line.png" alt="line" class="object-cover w-20"/></a>
                    <a href="#" class="block p-2 hover:bg-gray-200" @click="setShape('text')"><img src="../public/rectangle.png" alt="rectangle" class="object-cover w-20"/></a>
                    <a href="#" class="block p-2 hover:bg-gray-200">Option 3</a>
                </div>
            </div>
            <div ref="paint" class="dropdown my-1 w-full">
                <div v-if="tool !== 'pencil'" class="w-fill text-white hover:bg-sky-600 flex justify-center" @click="setShape('pencil')"><Icon name="la:paint-brush" color="white" size="1rem"  class="my-3"/></div>
                <div v-if="tool === 'pencil'" class="w-fill text-white bg-sky-600 flex justify-center"><Icon name="la:paint-brush" color="white" size="1rem" class="my-3"/></div>
            </div>
            <div ref="eraser" class="dropdown my-1 w-full">
                <div v-if="tool !== 'eraser'" class="w-fill text-white hover:bg-sky-600 flex justify-center" @click="setShape('eraser')"><Icon name="tabler:eraser" color="white" size="1rem"  class="my-3"/></div>
                <div v-if="tool === 'eraser'" class="w-fill text-white bg-sky-600 flex justify-center"><Icon name="tabler:eraser" color="white" size="1rem" class="my-3"/></div>
            </div>
            <div ref="delete" class="flex my-1 w-full justify-center">
                <Icon name="material-symbols:delete-outline" color="white" size="1rem"  class="my-3" @click="clear"/>
            </div>
        </div>
</template>

<script setup>
import {ref} from 'vue';
import { useToolStore } from '../stores/store.ts';

const toolStore = useToolStore();

const color = ref('#000000');
const size = ref(5);

const tool = ref('pencil');

function setColor() {
    toolStore.setColor(color.value);
}

function setShape(input) {
    tool.value = input;
    console.log(tool.value);
    toolStore.setShape(tool.value);
}

function setSize() {
    toolStore.setSize(size.value);
}
</script>

<style scoped>
.sidebar {
    width: 50px;
    min-height: 100%;
    background-color: #0ea5e9;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dropdown {
    position: relative;
    display: inline-block;
    align-items: center;
}

.dropdown .tool {
    display: none;
    position: absolute;
    background-color: #fff;
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
    top: 0;
    left: 100%;
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

.glass {
    backdrop-filter: blur(4px);
    bg-opacity: 1;
}
</style>