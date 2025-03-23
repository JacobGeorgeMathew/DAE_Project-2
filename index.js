import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



function getSelectedModel() {
  return localStorage.getItem('selectedModel');
}

const modelName = getSelectedModel();


// Define model configurations with paths and transform settings
const modelConfigs = {
  'chair1': {
    path: 'Chair_1v2.gltf',
    path2: './public/model/',
    position: [-1, 1.5, -1],
    rotation: [-Math.PI / 2, 0, Math.PI / 0.5],
    scale: [0.004, 0.004, 0.004]
  },
  'table1': {
    path: 'scene.gltf',
    path2: './public/model/table_001/',
    position: [0, -1, 0],
    rotation: [0, Math.PI / 4, 0],
    scale: [5, 5, 5]
  },
  'sofa1': {
    path: 'sofa_001.gltf',
    path2: './public/model/sofa_001/',
    position: [0, 0, -2],
    rotation: [Math.PI / 0.5, Math.PI / 16, Math.PI / 0.5],
      scale: [5, 5, 5]
    },
    'wardrobe': {
      path: 'lounge_chair_001.gltf',
    path2: './public/model/chair_002/',
    position: [0, -2, -2],
    rotation: [Math.PI / 0.5, Math.PI / 16, Math.PI / 0.5],
      scale: [5, 5, 5]
    }
    // Add more models as needed
  };

  const modelConfig = modelConfigs[modelName];

let i = 0;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // Black background
renderer.setPixelRatio(window.devicePixelRatio);

// Enable physically correct lighting
renderer.physicallyCorrectLights = true;

// Enable shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// Add subtle ambient lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// Create a camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(4, 3, 7); // Better initial position

// Set the target point - this is the center of rotation
const rotationCenter = new THREE.Vector3(0, 1, 0); // Adjust to change rotation axis

// Enhanced orbit controls for full 360° viewing
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera movement
controls.dampingFactor = 0.05;
controls.enableZoom = true; // Allow zooming
controls.zoomSpeed = 1.0;
controls.minDistance = 2; // Allow closer zoom
controls.maxDistance = 20;
controls.enablePan = true; // Allow panning
controls.screenSpacePanning = true; // More intuitive panning
controls.autoRotate = false; // No auto rotation by default
controls.minPolarAngle = 0; // Allow viewing from any angle
controls.maxPolarAngle = Math.PI; // Full 180° vertical rotation
controls.target.copy(rotationCenter); // Set to our custom rotation center
controls.update();

// Create multiple lights for better product visualization
// Main directional light (simulates primary light source)
const mainLight = new THREE.DirectionalLight(0xffffff, 2);
mainLight.position.set(5, 5, 5);
mainLight.castShadow = true;
mainLight.shadow.mapSize.width = 1024;
mainLight.shadow.mapSize.height = 1024;
scene.add(mainLight);

// Fill light (softens shadows)
const fillLight = new THREE.DirectionalLight(0xffffff, 1);
fillLight.position.set(-5, 3, 0);
scene.add(fillLight);

// Rim light (highlights edges)
const rimLight = new THREE.DirectionalLight(0xffffff, 1);
rimLight.position.set(0, -5, -5);
scene.add(rimLight);

// Replace the textureNames array with materials array
const materials = [
  {
    name: "Wood",
    color: 0x8B4513,
    roughness: 0.8,
    metalness: 0.1,
    bumpScale: 0.1,
  },
  {
    name: "Redwood",
    color: 0xA0522D,
    roughness: 0.7,
    metalness: 0.1,
  },
  {
    name: "Mahogany",
    color: 0x800000,
    roughness: 0.6,
    metalness: 0.1,
  },
  {
    name: "Gold",
    color: 0xFFD700,
    roughness: 0.2,
    metalness: 1.0,
  },
  {
    name: "Silver",
    color: 0xC0C0C0,
    roughness: 0.3,
    metalness: 1.0,
  },
  {
    name: "Steel",
    color: 0x808080,
    roughness: 0.5,
    metalness: 1.0,
  },
  {
    name: "Diamond",
    color: 0xFFFFFF,
    roughness: 0.1,
    metalness: 0.0,
    transmission: 1.0,
  },
  {
    name: "Ruby",
    color: 0xE0115F,
    roughness: 0.2,
    metalness: 0.0,
    transmission: 0.8,
  },
  {
    name: "Emerald",
    color: 0x50C878,
    roughness: 0.2,
    metalness: 0.0,
    transmission: 0.8,
  },
  {
    name: "Plastic",
    color: 0xFFFFFF,
    roughness: 0.5,
    metalness: 0.0,
  },
  {
    name: "Leaf",
    color: 0x228B22,
    roughness: 0.9,
    metalness: 0.0,
  },
  {
    name: "Fibre",
    color: 0xF5DEB3,
    roughness: 0.8,
    metalness: 0.0,
  },
  {
    name: "Jute",
    color: 0xD2B48C,
    roughness: 0.9,
    metalness: 0.0,
  },
  {
    name: "Silk",
    color: 0xFFF0F5,
    roughness: 0.3,
    metalness: 0.0,
  },
  {
    name: "Blue Diamond Pearl",
    color: 0xADD8E6,
    roughness: 0.1,
    metalness: 0.0,
    transmission: 0.9,
  },
  {
    name: "Platinum",
    color: 0xE5E4E2,
    roughness: 0.2,
    metalness: 1.0,
  },
  {
    name: "Iron",
    color: 0x696969,
    roughness: 0.6,
    metalness: 1.0,
  },
  {
    name: "Copper",
    color: 0xB87333,
    roughness: 0.4,
    metalness: 1.0,
  },
];

/*const axesHelper = new THREE.AxesHelper(5); // Length of the axes
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(10, 10); // Size and divisions
scene.add(gridHelper);


  const sphereGeometry = new THREE.SphereGeometry(0.1);
  const sphereMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
  const centerIndicator = new THREE.Mesh(sphereGeometry, sphereMaterial);
  centerIndicator.position.copy(rotationCenter);
  scene.add(centerIndicator);*/

 

  // Add this after your scene creation but before loading the model
function addLivingRoomBackground(scene) {
  // Add floor
  const floorGeometry = new THREE.PlaneGeometry(20, 20);
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xe0e0e0,
    roughness: 0.8,
    metalness: 0.2
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -2;
  floor.receiveShadow = true;
  scene.add(floor);
  
  // Add walls
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xf5f5f5,
    roughness: 0.9,
    metalness: 0.1
  });
  
  // Back wall
  const backWallGeometry = new THREE.PlaneGeometry(20, 10);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.set(0, 3, -10);
  scene.add(backWall);
  
  // Left wall
  const leftWallGeometry = new THREE.PlaneGeometry(20, 10);
  const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
  leftWall.position.set(-10, 3, 0);
  leftWall.rotation.y = Math.PI / 2;
  scene.add(leftWall);
  
  // Add a window on the back wall
  const windowFrame = new THREE.Group();
  
  const frameGeometry = new THREE.BoxGeometry(5, 3, 0.2);
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  const windowFrameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
  
  const windowGlassGeometry = new THREE.PlaneGeometry(4.7, 2.7);
  const windowGlassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0,
    metalness: 0,
    transmission: 0.95,
    transparent: true
  });
  const windowGlass = new THREE.Mesh(windowGlassGeometry, windowGlassMaterial);
  windowGlass.position.z = 0.11;
  
  windowFrame.add(windowFrameMesh);
  windowFrame.add(windowGlass);
  windowFrame.position.set(0, 3, -9.9);
  scene.add(windowFrame);
  
  // Add a plant in the corner
  const potGeometry = new THREE.CylinderGeometry(0.6, 0.4, 0.8, 32);
  const potMaterial = new THREE.MeshStandardMaterial({ color: 0xd7b27b });
  const pot = new THREE.Mesh(potGeometry, potMaterial);
  pot.position.set(-8, -1.6, -8);
  scene.add(pot);
  
  // Simple plant using spheres
  const plantMaterial = new THREE.MeshStandardMaterial({ color: 0x4ca64c });
  const plant = new THREE.Group();
  
  for (let i = 0; i < 8; i++) {
    const leafSize = 0.3 + Math.random() * 0.4;
    const leafGeometry = new THREE.SphereGeometry(leafSize, 8, 8);
    const leaf = new THREE.Mesh(leafGeometry, plantMaterial);
    leaf.position.set(
      -8 + (Math.random() * 0.8 - 0.4),
      -1 + (i * 0.4),
      -8 + (Math.random() * 0.8 - 0.4)
    );
    leaf.scale.y = 1.5;
    plant.add(leaf);
  }
  scene.add(plant);
  
  // Add a picture frame to the wall
  const pictureFrameGeometry = new THREE.BoxGeometry(3, 2, 0.1);
  const pictureFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const pictureFrame = new THREE.Mesh(pictureFrameGeometry, pictureFrameMaterial);
  pictureFrame.position.set(-6, 4, -9.8);
  scene.add(pictureFrame);
  
  const pictureGeometry = new THREE.PlaneGeometry(2.7, 1.7);
  const pictureMaterial = new THREE.MeshBasicMaterial({ color: 0xe0f0ff });
  const picture = new THREE.Mesh(pictureGeometry, pictureMaterial);
  picture.position.set(-6, 4, -9.75);
  scene.add(picture);
  
  // Update renderer to have a nicer background color
  renderer.setClearColor(0xeeeeee);
  
  return {
    setWallColor: (color) => {
      wallMaterial.color.set(color);
    },
    setFloorMaterial: (color) => {
      floorMaterial.color.set(color);
    }
  };
}

// Add this after scene creation but before model loading
const roomControls = addLivingRoomBackground(scene);

const loader = new GLTFLoader().setPath(modelConfig.path2);

// Global variable to store the chair mesh
let chairMesh;

// Function to create and apply material
function applyMaterial(materialIndex) {
  const materialData = materials[materialIndex];
  
  // Create a new material with the specified properties
  const material = new THREE.MeshPhysicalMaterial({
    color: materialData.color,
    roughness: materialData.roughness,
    metalness: materialData.metalness,
    transmission: materialData.transmission || 0,
    clearcoat: materialData.clearcoat || 0,
    clearcoatRoughness: materialData.clearcoatRoughness || 0,
    ior: materialData.ior || 1.5, // Index of refraction
    reflectivity: materialData.reflectivity || 0.5,
  });
  
  // Apply the material to all meshes in the chair
  if (chairMesh) {
    chairMesh.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  }
  
  // Update the material name display
  const materialNameElement = document.getElementById('material-name');
  if (materialNameElement) {
    materialNameElement.textContent = materialData.name;
  }
}

// Global function to change material randomly
window.Change = function() {
  // Select a random material index
  i = Math.floor(Math.random() * materials.length);
  
  // Apply the random material
  applyMaterial(i);
};

// Global function to go to next material
window.NextTexture = function() {
  // Increment material index, wrapping around to 0 when it reaches the end
  i = (i + 1) % materials.length;
  
  // Apply the next material
  applyMaterial(i);
};

// Global function to go to previous material
window.PreviousTexture = function() {
  // Decrement material index, wrapping around to the last index when it goes below 0
  i = (i - 1 + materials.length) % materials.length;
  
  // Apply the previous material
  applyMaterial(i);
};

// Function to auto-rotate the model
window.ToggleRotation = function() {
  controls.autoRotate = !controls.autoRotate;
  const rotateButton = document.getElementById('rotate-button');
  if (rotateButton) {
    if (controls.autoRotate) {
      rotateButton.textContent = 'Stop Rotation';
    } else {
      rotateButton.textContent = 'Auto Rotate';
    }
  }
};

// Function to reset camera to initial position
window.ResetView = function() {
  camera.position.set(4, 3, 7);
  controls.target.copy(rotationCenter);
  controls.update();
};

// Load the 3D model
loader.load(modelConfig.path, (gltf) => {
  console.log('Model Loaded:', gltf.scene);
  chairMesh = gltf.scene;
  
  // Position the chair relative to the rotation center
  chairMesh.position.set(...modelConfig.position);
  chairMesh.position.y -= 0.5; // Adjust to center the chair on the rotation point
  
  chairMesh.rotation.set(...modelConfig.rotation);
  chairMesh.scale.set(...modelConfig.scale);



// Load the 3D model
/*loader.load('Chair_1v2.gltf', (gltf) => {
  console.log('Model Loaded:', gltf.scene);
  chairMesh = gltf.scene;*/
  
  // Position the chair relative to the rotation center
  /*chairMesh.position.copy(rotationCenter);
  chairMesh.position.y -= 0.5; // Adjust to center the chair on the rotation point
  
  chairMesh.rotation.set(-Math.PI / 2, 0, 0);
  chairMesh.scale.set(0.005, 0.005, 0.005);*/

  // Apply initial material
  applyMaterial(i);

  // Enable shadows for all meshes
  chairMesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  scene.add(chairMesh);

  // Hide loading screen
  document.getElementById('progress-container').style.display = 'none';
}, (xhr) => {
  // Update loading progress
  const percent = Math.floor(xhr.loaded / xhr.total * 100);
  document.getElementById('progress').textContent = `Loading Model: ${percent}%`;
}, (error) => {
  console.error(error);
  document.getElementById('progress').textContent = 'Error Loading Model';
});

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Required for damping and auto-rotation
  renderer.render(scene, camera);
}

animate();