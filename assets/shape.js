export function drawLine(context, startX, startY, endX, endY) {
    context.beginPath(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
  }
  
  export function drawTriangle(context, startX, startY, endX, endY) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
    context.stroke();
  }