// HelloTriangle.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

function main() {
  const canvas = document.getElementById('webgl');
  const x = canvas.getContext('2d');

  x.fillStyle = 'black';
  x.fillRect(0, 0, canvas.width, canvas.height);

  let v1 = new Vector3([2.25, 2.25, 0]);
  drawVector(v1, "red");

}

function drawVector(v, color) {
  const canvas = document.getElementById('webgl');
  const ctx = canvas.getContext('2d');

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy);

  ctx.lineTo(
    cx + v.elements[0] * 20,
    cy - v.elements[1] * 20
  );

  ctx.stroke();
}


function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0, 0.5,   -0.5, -0.5,   0.5, -0.5
  ]);
  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  return n;
}

function handleDrawEvent() {
  const canvas = document.getElementById('webgl');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const xInput = document.getElementById('x1Input');
  const yInput = document.getElementById('y1Input');
  const x2Input = document.getElementById('x2Input');
  const y2Input = document.getElementById('y2Input');
  const v2 = new Vector3([parseFloat(x2Input.value), parseFloat(y2Input.value), 0]);

  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + v2.elements[0] * 20, cy - v2.elements[1] * 20);
  ctx.stroke();
  const v = new Vector3([parseFloat(xInput.value), parseFloat(yInput.value), 0]);

  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + v.elements[0] * 20, cy - v.elements[1] * 20);
  ctx.stroke();
}

function handleDrawOperationEvent() {
  const canvas = document.getElementById('webgl');
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const x1 = parseFloat(document.getElementById('x1Input').value);
  const y1 = parseFloat(document.getElementById('y1Input').value);
  const v1 = new Vector3([x1, y1, 0]);

  const x2 = parseFloat(document.getElementById('x2Input').value);
  const y2 = parseFloat(document.getElementById('y2Input').value);
  const v2 = new Vector3([x2, y2, 0]);

  drawVector(v1, "red");
  drawVector(v2, "blue");

  // Read operation + scalar
  const op = document.getElementById('operationSelector').value;
  const s = parseFloat(document.getElementById('scalarInput').value);

  if (op === "add") {
    const v3 = new Vector3(v1.elements); // copy of v1
    v3.add(v2);
    drawVector(v3, "green");
  } 
  
  else if (op === "subtract") {
    const v3 = new Vector3(v1.elements); // copy of v1
    v3.sub(v2);
    drawVector(v3, "green");
  } 
  
  else if (op === "multiply") {
    const v3 = new Vector3(v1.elements);
    const v4 = new Vector3(v2.elements);
    v3.mul(s);
    v4.mul(s);
    drawVector(v3, "green");
    drawVector(v4, "green");
  } 
  
  else if (op === "divide") {
    const v3 = new Vector3(v1.elements);
    const v4 = new Vector3(v2.elements);
    v3.div(s);
    v4.div(s);
    drawVector(v3, "green");
    drawVector(v4, "green");
  }

  else if (op === "anglebetween") {
    const dot = Vector3.dot(v1, v2);
    const mag1 = v1.magnitude();
    const mag2 = v2.magnitude();
    if (mag1 > 0 && mag2 > 0) {
      const angle = Math.acos(dot / (mag1 * mag2));
      const angleDegrees = angle * 180 / Math.PI;
      console.log("Angle between vectors:", angleDegrees);
    }
  }

  else if (op === "area") {
    const cross = Vector3.cross(v1, v2);
    const area = 0.5 * cross.magnitude();
    console.log("Area of the triangle:", area);
  }

  else if (op === "magnitude") {
    console.log("Magnitude v1:", v1.magnitude());
    console.log("Magnitude v2:", v2.magnitude());
    return;
  }

  else if (op === "normalize") {
    const v3 = new Vector3(v1.elements);
    const v4 = new Vector3(v2.elements);
    v3.normalize();
    v4.normalize();
    drawVector(v3, "green");
    drawVector(v4, "green");
  }

}
