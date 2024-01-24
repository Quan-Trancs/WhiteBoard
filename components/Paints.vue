<template>
    <div ref="toolBox" class="sidebar">
            <div ref="colorPicker">
                <input type="color" v-model="color" @change="setColor" class="w-8 h-8 bg-transparent">
            </div>
            <div ref="sizePicker" class="">
                <select v-model="size" @change="setSize" class="appearance-none text-white bg-transparent text-2xl text-center">
                    <option default value="5" class="text-black">5px</option>
                    <option value="10" class="text-black">10px</option>
                    <option value="15" class="text-black">15px</option>
                    <option value="20" class="text-black">20px</option>
                    <option value="25" class="text-black">25px</option>
                    <option value="30" class="text-black">30px</option> 
                </select>
            </div>
            <div v-if="shape !== 'pencil'" class="py-3 hover:bg-gray-950" @click="setShape('pencil')"><img src="../public/pencil.png" alt="pencil"/></div>
            <div v-if="shape === 'pencil'" class="py-3 bg-gray-950" @click="setShape('pencil')"><img src="../public/pencil.png" alt="pencil"/></div>
            <div class="dropdown">
                <div v-if="shape === 'pencil'" class="px-1 py-4 text-white hover:bg-gray-950"><img src="../public/line.png" alt="line"/></div>
                <div v-if="shape === 'line'" class="px-1 py-4 text-white bg-gray-950"><img src="../public/line.png" alt="line"/></div>
                <div v-if="shape === 'rectangle'" class="px-1 py-4 text-white bg-gray-950"><img src="../public/rectangle.png" alt="rectangle" class="object-cover"/></div>
                <div class="dropdown-content">
                    <a href="#" class="block p-2 hover:bg-gray-200" @click="setShape('line')"><img src="../public/line.png" alt="line" class="object-cover w-20"/></a>
                    <a href="#" class="block p-2 hover:bg-gray-200" @click="setShape('rectangle')"><img src="../public/rectangle.png" alt="rectangle" class="object-cover w-20"/></a>
                    <a href="#" class="block p-2 hover:bg-gray-200">Option 3</a>
                </div>
            </div>
        </div>
</template>

<script setup>
import {ref} from 'vue';
import { useToolStore } from '../stores/store.ts';

const toolStore = useToolStore();

const color = ref('#000000');
const shape = ref('pencil');
const size = ref(5);

function setColor() {
    toolStore.setColor(color.value);
}

function setShape(input) {
    shape.value = input;
    console.log(shape.value);
    toolStore.setShape(shape.value);
}

function setSize() {
    toolStore.setSize(size.value);
}
</script>

<style>
.sidebar {
    width: 6%;
    min-height: 40%;
    background-color: #2a2b33;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
</style>