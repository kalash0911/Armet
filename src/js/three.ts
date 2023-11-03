import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const createScene = () => {
  const scene = new THREE.Scene();
  return scene;
}

const addLight = (scene) => {
  const light = new THREE.PointLight(0xffffff, 1000);
  light.position.set(2.5, 7.5, 15);
  scene.add(light);
}

const setCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 4;
  return camera;
}

const setControls = (camera, renderer) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  return controls;
}

export const setActiveObjectColor = (object) => {
  object.traverse( function (obj) {
    if (obj.isMesh && obj.material.color){
      obj.material.color.set(0x2293FF);
    }
  } );
}

export const resetObjectColor = (object) => {
  object.traverse( function (obj) {
    if (obj.isMesh && obj.material.color){
      obj.material.color.set(0xe8e8e8);
    }
  } );
}

export const setActiveElementObjectColor = () => {
  const activeEl = document.querySelector('.swiper-slide-active .test-item');
  if (activeEl && activeEl._loadedModelObject ) {
    setActiveObjectColor(activeEl._loadedModelObject);
  }
}

export const resetActiveElementObjectColor = () => {
  const activeEl = document.querySelector('.swiper-slide-active .test-item');
  if (activeEl && activeEl._loadedModelObject ) {
    resetObjectColor(activeEl._loadedModelObject);
  }
}

const loadObj = (scene, objPath: string, containerEl) => {
  const objLoader = new OBJLoader();
  objLoader.load(
    objPath,
    (object) => {
      containerEl._loadedModelObject = object;
      scene.add(object);
      resetObjectColor(object);
      setActiveElementObjectColor();
    },
    (xhr) => {
    },
    (error) => {
      console.log(error)
    }
  );
}

const renderModel = (props: { containerEl: HTMLElement }) => {
  const { containerEl } = props;
  const modelUrl = containerEl.dataset.modelurl;

  const scene = createScene();
  scene.background = '#F9F9F9';
  const camera = setCamera();
  addLight(scene);

  loadObj(scene, modelUrl!, containerEl);

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor( 0x000000, 0 ); // the default
  renderer.setSize(containerEl.offsetWidth, containerEl.offsetWidth);
  containerEl.appendChild(renderer.domElement);

  const controls = setControls(camera, renderer);

  window.addEventListener('resize', onWindowResize, false);
  new ResizeObserver(onWindowResize).observe(containerEl)

  function render() {
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = containerEl.offsetWidth / containerEl.offsetWidth;
    camera.updateProjectionMatrix();
    renderer.setSize(containerEl.offsetWidth, containerEl.offsetWidth);
    render();
  }

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    render();
  }

  animate();
}

export const initTreeJsModels = () => {
  const items = document.getElementsByClassName('test-item');
  [...items].forEach((item: Element) => {
    renderModel({
      containerEl: item as HTMLElement
    })
  });
}
