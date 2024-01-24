<template>
    <div ref="container" 
    @mouseup="handleMouseUp"
    class="h-screen w-screen bg-wall flex">
        <div ref="toolContainer" class="">
            <Paints class="absolute top-0 left-4 w-20 ml-1 rounded-lg"/>
        </div>
        <div ref="boardContainer" class="flex h-[100%] w-[100%] justify-center items-center">
            <Board/>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { useBoardStore } from '../stores/store.ts';

const boardStore = useBoardStore();

function handleMouseUp() {
    boardStore.setDrawing(false);
}

</script>

<style scoped>
.bg-wall {
 background-image: url("../public/wallBackground.png");
}
</style>