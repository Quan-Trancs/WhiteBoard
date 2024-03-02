<template>
    
    <div>
        <canvas ref="canvas" id="board"
            @load="loadData"
            @mousemove="handleMouseMove" 
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
            @mouseenter="handleMouseEnter"
            @mouseleave="handleMouseLeave"
            @keydown="handleKeyDown"

            tabindex='1' 
            width="1240" height="610"
            class="bg-board rounded-xl"></canvas>
            <button class="fixed bottom-6 right-5 bg-sky-500 rounded-lg hover:bg-sky-600" @click="clear"><Icon name="material-symbols:delete-outline" color="#e2e8f0" size="2rem" class=""/></button>
    </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { drawLine, drawTriangle } from '../assets/shape.js';
import io from 'socket.io-client';
import { useToolStore, useBoardStore } from '../stores/store.ts';

const toolStore = useToolStore();
const boardStore = useBoardStore();

const timeout = ref();

const isDrawing = ref(false);
const isWriting = ref(false);

const canvas = ref(null);
const context = ref(null);

const undoHistory = ref([]);
//const redoHistory = ref([]);

//const shape = ref('pencil');
const beginPointX = ref(0);
const beginPointY = ref(0);

const writingPointX = ref(0);
const writingPointY = ref(0);

const canvasWidth = 1240;
const canvasHeight = 610;

const writingText = ref("");

const color = ref('black');
const shape = ref('pencil');
const size = ref(5);

const socket = io('http://localhost:5000');

//const props = defineProps(['color', 'size', 'shape']);

onMounted(() => {
    canvas.value = document.getElementById('board');
    context.value = canvas.value.getContext('2d');

    socket.on('canvas-data', function(data){
        const image = new Image();
        image.onload = function() {
            context.value.drawImage(image, 0, 0);
            context.value.stroke();
            const sharedImageData = context.value.getImageData(0, 0, canvasWidth, canvasHeight);
            undoHistory.value.push(sharedImageData);
        }
        image.src = data;
    })
});

setTimeout(async() => {
    socket.emit('canvas-init');   
}, 1500);

function createElement(x1, y1, x2, y2, type) {
    switch (type) {
        case "line":
            //console.log (x1, x2, y1, y2);
            context.value.beginPath();
            context.value.moveTo(x1, y1);
            context.value.lineTo(x2, y2);
            //drawLine(context.value, x1, y1, x2, y2);
            context.value.stroke();
            break;
        case "rectangle":
            context.value.beginPath();
            context.value.rect(x1, y1, x2-x1, y2-y1);
            //drawRectangle(context.value, x1, y1, x2, y2);
            context.value.stroke();
            break;
        case "isosceles triangle":
        const CENTER = x1+(x2-x1)/2;
            context.value.beginPath();
            context.value.moveTo(x1, y1);
            context.value.lineTo(x2, y1);
            context.value.lineTo(CENTER, y2);
            context.value.lineTo(x1, y1);
            //drawTriangle(context.value, x1, y1, x2, y2);
            context.value.stroke();
            break;
        default:
            throw new Error(`Type not recognised: ${type}`);
    }
};

async function handleMouseDown(event) {
    color.value = toolStore.color;
    shape.value = toolStore.shape;
    size.value = toolStore.size;

    if (shape.value == 'text') {
        const { offsetX, offsetY } = event;
        writingPointX.value = offsetX;
        writingPointY.value =offsetY;
        if (isWriting.value == true) {
            context.value.clearRect(0, 0, canvasWidth, canvasHeight);
            undoHistory.value.forEach(data => context.value.putImageData(data, 0, 0));
            context.value.fillText(writingText.value, writingPointX.value, writingPointY.value);
            return;
        }
        isWriting.value = true;
        context.value.strokeStyle = color.value;
        context.value.font = "48px serif";
        return;
    }

    isWriting.value = false;
    writingText.value = "";
    console.log (isWriting.value);
    isDrawing.value = true;
    const { offsetX, offsetY } = event;
    context.value.strokeStyle = color.value;
    context.value.lineWidth = size.value;
    context.value.beginPath(offsetX, offsetY);
    beginPointX.value = offsetX;
    beginPointY.value = offsetY;
}

function handleMouseEnter(event) {
    isDrawing.value = boardStore.isDrawing;
    const { offsetX, offsetY } = event;
    context.value.moveTo( offsetX, offsetY )
}

function handleMouseLeave() {
    boardStore.setDrawing(isDrawing.value);
}

function handleMouseMove(event) {
    if(!isDrawing.value) return;

    const { offsetX, offsetY } = event;
    switch (shape.value) {
        case 'pencil':
            //console.log('pencil')
            context.value.lineTo(offsetX, offsetY);
            context.value.stroke();
            break;
        case 'eraser':
            context.value.strokeStyle = "white";
            //console.log('eraser')
            context.value.lineTo(offsetX, offsetY);
            context.value.stroke();
            break;
        default:
            context.value.clearRect(0, 0, canvasWidth, canvasHeight);
            undoHistory.value.forEach(data => context.value.putImageData(data, 0, 0));
            createElement(beginPointX.value, beginPointY.value, offsetX, offsetY, shape.value);
    }

    if(timeout.value != undefined) clearTimeout(timeout.value);
    timeout.value = setTimeout(function(){
        const ImageData = canvas.value.toDataURL("image/png");
        socket.emit('canvas-data', ImageData);
    }, 1000)
}

function handleMouseUp() {
    if (isWriting.value == false) {
        isDrawing.value = false;
        const mouseUpImageData = context.value.getImageData(0, 0, canvasWidth, canvasHeight);
        undoHistory.value.push(mouseUpImageData);
        const ImageData = canvas.value.toDataURL("image/png");
        socket.emit('canvas-data', ImageData);
    }
}

function handleKeyDown(event) {
    const keyCode = event.keyCode || event.which;
    const key = event.key;
    if (isWriting.value == true) {    
        if (key == 'Enter') {
            handleEnterPressed();
        } 
        else {
            if (keyCode == 46 || keyCode == 8) {
                writingText.value = writingText.value.slice(0, -1);                
            } else if (
            (keyCode >= 48 && keyCode <= 90) ||    // Alphanumeric keys
            (keyCode >= 96 && keyCode <= 111) ||   // Numpad keys
            (keyCode >= 186 && keyCode <= 192) ||  // Special characters on US keyboards
            (keyCode >= 219 && keyCode <= 222)     // Special characters on US keyboards
            ) {
                writingText.value += key
            }
            context.value.clearRect(0, 0, canvasWidth, canvasHeight);
            undoHistory.value.forEach(data => context.value.putImageData(data, 0, 0));
            context.value.fillText(writingText.value, writingPointX.value, writingPointY.value);
        }
    }
}

function handleEnterPressed() {
    isWriting.value = false;
    writingText.value = "";
    const enterPressedImageData = context.value.getImageData(0, 0, canvasWidth, canvasHeight);
    undoHistory.value.push(enterPressedImageData);
    const ImageData = canvas.value.toDataURL("image/png");
    socket.emit('canvas-data', ImageData);
}

/*function handleKeyDown(event) {
    if (event.ctrlKey && event.key === 'z') {
        undoLastDrawing();
    } else if (event.ctrlKey && event.shiftKey && event.key === 'Z') {
        redoLastDrawing();
    }
};*/

/*function undoLastDrawing() {
    if (undoHistory.value.length > 0) {
        const undoAction = undoHistory.value.pop(); // Choose the last item (latest drawing)
        if (undoAction) {
        redoHistory.value.push(undoAction);
        }
        context.value.clearRect(0, 0, canvasWidth, canvasHeight);
        undoHistory.value.forEach(data => context.value.putImageData(data, 0, 0)); // Redraw the canvas excluding the last drawing
    }
};*/

/*function redoLastDrawing() {
    if (redoHistory.value.length > 0) {
        const redoAction = redoHistory.value.pop(); // Choose the last undo item (latest undo drawing)
        if (redoAction) {
        undoHistory.value.push(redoAction);
        }
        context.value.putImageData(redoAction, 0, 0); // Redraw the last drawing
    }
};*/

function clear() {
    context.value.clearRect(0, 0, canvasWidth, canvasHeight);
    const ImageData = canvas.value.toDataURL("image/png");
    socket.emit('canvas-data', ImageData);
}
</script>
  
<style>
.bg-board {
    background-color: white;
}

.loading-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
}
</style>