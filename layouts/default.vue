<template>
    <div ref="container" class="h-screen w-screen bg-wall">
        <input type="text" v-model="inputValue" @input="handleInput" />
        <div ref="boardContainer" class="flex h-[540px] w-[1200px] justify-center items-center">
            <Board :color="color" :size="size" :shape="shape"/>
        </div>
        <div ref="toolBox" class="flex">
            <div ref="colorPicker">color: 
                <input type="color" v-model="color" @change="setColor"/>
            </div>
            <div ref="sizePicker" class="ml-5">size: 
                <select v-model="size" @change="setSize">
                    <option default>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                    <option>30</option> 
                </select>
            </div>
            <div ref="shapePicker" class="ml-5">shape: 
                <select v-model="shape" @change="setShape">
                    <option default>pencil</option>
                    <option>line</option>
                    <option>rectangle</option>
                    <option>isosceles triangle</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { useToolStore } from '../stores/store.ts';

const inputValue = ref('');

const handleInput = () => {
  // Access the updated value through inputValue
  console.log(shape.value);
};

const toolStore = useToolStore();

const color = ref('#000000');
const shape = ref('pencil');
const size = ref(5);

function setColor() {
    toolStore.setColor(color.value);
}

function setShape() {
    console.log(shape.value);
    toolStore.setShape(shape.value);
}

function setSize() {
    toolStore.setSize(size.value);
}

</script>

<style scoped>
.bg-wall {
 background-image: url("../public/wallBackground.png");
}
</style>