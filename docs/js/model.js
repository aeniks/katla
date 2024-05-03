// --- //   Model Information:
// --- //   * title:	smile tears
// --- //   * source:	https://sketchfab.com/3d-models/smile-tears-17399ba9bfad4e00988fd8524c12aca9
// --- //   * author:	Kawsar (https://sketchfab.com/Khsuzan)
// --- //   
// --- //   Model License:
// --- //   * license type:	CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
// --- //   * requirements:	Author must be credited. Commercial use is allowed.
// --- //   
// --- //   If you use this 3D model in your project be sure to copy paste this credit wherever you share it:
// --- //   This work is based on "smile tears" (https://sketchfab.com/3d-models/smile-tears-17399ba9bfad4e00988fd8524c12aca9) by Kawsar (https://sketchfab.com/Khsuzan) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)	



	let container;
	let camera;
	let renderer;
	let scene;
	let smiley;

	function init() {

		container = document.querySelector(".scene");

		//Create scene
		scene = new THREE.Scene();
		//scene.background = new THREE.Color(0xdddddd);

		const fov = 99;

		const aspect = window.innerWidth / window.innerHeight;
		const near = 2;
		const far = 100;

		//Camera setup
		camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 8;

    
    
    //Lights setup
    ambientLight = new THREE.AmbientLight(0xffffff, 4,1000);
		scene.add(ambientLight);

		directionalLight = new THREE.DirectionalLight(0xffffff, 4, .1);
		directionalLight.position.set(2, 2, 2);
		directionalLight.castShadow = true;
		scene.add(directionalLight);



		//Renderer
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});

		renderer.setSize(container.clientWidth, container.clientHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		container.appendChild(renderer.domElement);



		const loadingManager = new THREE.LoadingManager(() => {

			const loadingScreen = document.getElementById('loading-screen');
      
			loadingScreen.classList.add('finished');      

			loadingScreen.addEventListener('transitionend', onTransitionEnd);

		});

		function onTransitionEnd(event) {

			const element = event.target;
			element.remove();
  
      document.body.classList.add('ready');
      
		}



		//Load Model
		let loader = new THREE.GLTFLoader(loadingManager);

		loader.load("kkkk.glb", function (gltf) {
			scene.add(gltf.scene);      
			smiley = gltf.scene.children[0];
			smiley.scale.set(4, 4, 4);
      run();
			render();     
		});
        
	}

  function run() {
    
    gsap.to(smiley.rotation, {
      z: "+=0",  
      duration: 1
    })
    
    gsap.to(smiley.rotation, {
      z: "+=6.3",
      x: '+=3',
      y: '+=6.3',
      ease: 'none',
      immediateRender: false,
      scrollTrigger: {
        
        trigger: '.sec-1',
        start: 'top top',
        end: 'bottom top',
        scrub: 5,
        
      }
    })
    
    gsap.to(smiley.position, {
      x: "+=12.0",
      y: "+=12.0",
      ease: 'none',
      immediateRender: false,
      scrollTrigger: {
        
        trigger: '.sec-2',
        start: 'top top',
        end: 'bottom top',
        scrub: 15,
        
      }
    })
    
  }

	function render() {
		//requestAnimationFrame(animate); // using gsap.ticker instead of this
    //smiley.rotation.z += 0.005; // just for testing
    
		renderer.render(scene, camera);
	}

  gsap.ticker.add(render)

	init();





	function onWindowResize() {
		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.clientHeight);
	}

	window.addEventListener("resize", onWindowResize);