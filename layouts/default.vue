<template>
    <div ref="container" 
    @mouseup="handleMouseUp"
    class="h-screen w-screen bg-wall flex">
        <div ref="toolContainer" class="z-1 absolute top-0 left-1">
            <div class="ml-2">
                <button class="my-3 w-10 h-10 text-white bg-sky-400 hover:bg-sky-500 focus:ring-4 focus:ring-sky-500 font-medium rounded-full text-sm dark:bg-sky-600 dark:hover:bg--sky-600 focus:outline-none dark:focus:ring-sky-600" type="button" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation"
                @click="toggleSidebar()">
                    <Icon name="teenyicons:book-outline" color="white" size="1rem" />
                </button>
            </div>
            <div class="tool-slide-container">
                <transition name="tool-slide">
                    <Tools v-if="toolsOpen" class="w-10"/>  
                </transition>
            </div>
        </div>
        <div ref="boardContainer" class=" flex h-[100%] w-[100%] justify-center items-center">
            <Board/>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { useBoardStore } from '../stores/store.ts';

const boardStore = useBoardStore();
const toolsOpen = ref(false);

function handleMouseUp() {
    boardStore.setDrawing(false);
}

function toggleSidebar() {
    toolsOpen.value = !toolsOpen.value;
}
</script>

<style scoped>
.bg-wall {
 background-color: #0ea5e9;
}

.tool-slide-container {
}

.tool-slide-leave-active {
  transition: all 0.5s ease-out;
}
.tool-slide-enter-active {
  transition: all 0.5s ease-out;
}

.tool-slide-enter-from, .tool-slide-leave-to {
  transform: translateY(-100%);
}
</style>