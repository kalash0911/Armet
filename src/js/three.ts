import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// @ts-ignore
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const createScene = () => {
  const scene = new THREE.Scene();
  return scene;
}

const addLight = (scene: any) => {
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

const setControls = (camera: any, renderer: any) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  return controls;
}

export const setActiveObjectColor = (object: any) => {
  object.traverse( (obj: any) => {
    if (obj.isMesh && obj.material.color){
      obj.material.color.set(0x2293FF);
    }
  } );
}

export const resetObjectColor = (object: any) => {
  object.traverse((obj: any) => {
    if (obj.isMesh && obj.material.color){
      obj.material.color.set(0xe8e8e8);
    }
  } );
}

export const setActiveElementObjectColor = () => {
  const activeEl = document.querySelector('.swiper-slide-active .test-item');
  // @ts-ignore
  if (activeEl && activeEl._loadedModelObject ) {
    // @ts-ignore
    setActiveObjectColor(activeEl._loadedModelObject);
  }
}

export const resetActiveElementObjectColor = () => {
  const activeEl = document.querySelector('.swiper-slide-active .test-item');
  // @ts-ignore
  if (activeEl && activeEl._loadedModelObject ) {
    // @ts-ignore
    resetObjectColor(activeEl._loadedModelObject);
  }
}

const loadObj = (scene: any, objPath: string, containerEl: any) => {
  const objLoader = new OBJLoader();
  objLoader.load(
    objPath,
    (object: any) => {
      containerEl._loadedModelObject = object;
      scene.add(object);
      resetObjectColor(object);
      setActiveElementObjectColor();
    },
    () => {
    },
    (error: any) => {
      console.log(error)
    }
  );
}

const renderModel = (props: { containerEl: HTMLElement }) => {
  const { containerEl } = props;
  const modelUrl = containerEl.dataset.modelurl;

  const scene = createScene();
  // @ts-ignore
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