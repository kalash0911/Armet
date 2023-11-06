import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { isMobile } from './is-mobile.ts';

const DEFAULT_OBJECT_COLOR = 0xb8b8b8;
const ACTIVE_OBJECT_COLOR = 0x2293ff;

const MODEL_CONTAINER_CLASS_NAME = 'threejs-model-container';
const ACTIVE_CONTAINER_CLASS_NAME = 'swiper-slide-active';

const objList: any[] = [];

const getModelsQualityPixelRatio = (resolution: number) : number => {
  return isMobile
    ? resolution / 2
    : resolution * 2;
};

const createScene = () => {
  const scene = new THREE.Scene();
  return scene;
};

const addLight = (scene: any) => {
  const light = new THREE.PointLight(0xffffff, 1000);
  light.position.set(2.5, 7.5, 15);
  scene.add(light);
};

const setCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.z = 4;
  return camera;
};

const getMaterial = (color: string | number) => {
  const material = new THREE.MeshStandardMaterial();
  material.color.set(color);
  material.roughness = 0.25;
  // @ts-ignore
  material.specular = 0.6;
  return material;
};

const setControls = (camera: any, renderer: any) => {
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed *= -2;

  return controls;
};

export const setActiveObjectColor = (object: any) => {
  object.traverse((obj: any) => {
    if (obj.isMesh && obj.material.color) {
      obj.material = getMaterial(ACTIVE_OBJECT_COLOR);
    }
  });
};

export const resetObjectColor = (object: any) => {
  object.traverse((obj: any) => {
    if (obj.isMesh && obj.material.color) {
      obj.material = getMaterial(DEFAULT_OBJECT_COLOR);
    }
  });
};

const getActiveElement = (): Element | null => {
  return document.querySelector(`.${ACTIVE_CONTAINER_CLASS_NAME} .${MODEL_CONTAINER_CLASS_NAME}`);
}

export const setActiveElementObjectColor = () => {
  const activeEl = getActiveElement();
  // @ts-ignore
  if (activeEl && activeEl._loadedModelObject) {
    // @ts-ignore
    setActiveObjectColor(activeEl._loadedModelObject);
  }
};

export const resetActiveElementObjectColor = () => {
  const activeEl = getActiveElement();
  // @ts-ignore
  if (activeEl && activeEl._loadedModelObject) {
    // @ts-ignore
    resetObjectColor(activeEl._loadedModelObject);
  }
};

const loadObj = (
  scene: any,
  objPath: string,
  containerEl: any,
) => {
  const objLoader = new OBJLoader();
  objLoader.load(
    objPath,
    (object: any) => {
      containerEl._loadedModelObject = object;
      scene.add(object);
      resetObjectColor(object);
      setActiveElementObjectColor();

      object.traverse((obj: any) => {
        if (obj.isMesh) {
          objList.push(obj);
        }
      });
    },
    () => {},
    (error: any) => {
      console.log(error);
    },
  );
};

const renderModel = (props: { containerEl: HTMLElement }) => {
  const { containerEl } = props;
  const modelUrl = containerEl.dataset.modelurl;

  const scene = createScene();

  const hdrUrl =
    'files/machine_shop_BW.hdr';
  new RGBELoader().load(hdrUrl, (texture: any) => {
    const gen = new THREE.PMREMGenerator(renderer);
    const envMap = gen.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    // @ts-ignore
    scene.background = '#F9F9F9';

    objList.forEach((obj) => {
      obj.material.roughnessMap = texture;
    })

    texture.dispose();
    gen.dispose();
  });

  const camera = setCamera();
  addLight(scene);

  const renderer = new THREE.WebGLRenderer({ antialias: true });

  loadObj(scene, modelUrl!, containerEl);

  renderer.setClearColor(0x000000, 0); // the default
  renderer.setPixelRatio(getModelsQualityPixelRatio(window.devicePixelRatio));
  renderer.setSize(containerEl.offsetWidth, containerEl.offsetWidth, true);
  containerEl.appendChild(renderer.domElement);

  const controls = setControls(camera, renderer);

  window.addEventListener('resize', onWindowResize, false);
  new ResizeObserver(onWindowResize).observe(containerEl);

  function render() {
    renderer.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = containerEl.offsetWidth / containerEl.offsetWidth;
    camera.updateProjectionMatrix();
    renderer.setSize(containerEl.offsetWidth, containerEl.offsetWidth, true);
    render();
  }

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    render();
  }

  animate();
};

export const initTreeJsModels = () => {
  const items = document.getElementsByClassName(MODEL_CONTAINER_CLASS_NAME);
  [...items].forEach((item: Element) => {
    renderModel({
      containerEl: item as HTMLElement,
    });
  });
};
