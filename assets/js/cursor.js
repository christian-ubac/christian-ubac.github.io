const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
    
"#add8e6",  // Light Blue
"#b0e0e6",  // Powder Blue
"#afeeee",  // Pale Turquoise
"#87ceeb",  // Sky Blue
"#87cefa",  // Light Sky Blue
"#b0c4de",  // Light Steel Blue
"#d1e7f0",  // Alice Blue
"#e0ffff",  // Light Cyan
"#f0f8ff",  // Alice Blue
"#c6e2ff",  // Very Light Blue
"#ccffff",  // Light Aqua
"#99ccff",  // Light Sky Blue
"#a2cffe",  // Light Cornflower Blue
"#addfff",  // Lighter Blue
"#b7c9e2",  // Light Steel Blue 2
"#cae1ff",  // Light Slate Blue
"#e0ffff",  // Light Cyan 2
"#afeeee",  // Pale Turquoise 2
"#cce7ff",  // Light Blue 2
"#d3e9f3",  // Very Light Sky Blue
"#cfe2f3"  // Light Periwinkle Blue
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();