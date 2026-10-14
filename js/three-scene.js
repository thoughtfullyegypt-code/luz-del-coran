/**
 * Luz del Corán - 3D Interactive WebGL Experience
 * Features:
 * - 3D Holy Quran (Mushaf) with procedurally generated luxury leather & gold leaf textures
 * - Traditional Wooden Book Stand (Rahl / Rehal) in rich carved mahogany wood
 * - Interactive states: Closed luxury book or Open reading mode
 * - Ethereal floating celestial golden particles
 * - Orbit, tilt, and lighting response to mouse & touch
 */

class Quran3DScene {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.isOpen = true; // start open to be instantly impressive
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.bookGroup = null;
        this.standGroup = null;
        this.particles = null;
        this.lights = [];
        this.targetRotationY = 0.25;
        this.targetRotationX = 0.2;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isDragging = false;
        this.previousMousePosition = { x: 0, y: 0 };
        this.clock = new THREE.Clock();

        this.init();
    }

    init() {
        // 1. Scene setup
        this.scene = new THREE.Scene();

        // 2. Camera setup
        const width = this.container.clientWidth || 600;
        const height = this.container.clientHeight || 550;
        this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
        this.camera.position.set(0, 2.2, 5.8);

        // 3. Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.15;
        this.container.appendChild(this.renderer.domElement);

        // 4. Lights
        this.setupLights();

        // 5. Build 3D Objects
        this.bookGroup = new THREE.Group();
        this.bookGroup.position.set(0, 0.45, 0);
        this.scene.add(this.bookGroup);

        this.buildQuranModel();
        this.buildWoodenStand();
        this.buildParticles();

        // 6. Event Listeners
        this.setupEvents();

        // 7. Render loop
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    setupLights() {
        // Ambient celestial light
        const ambientLight = new THREE.AmbientLight(0x0f2a22, 1.2);
        this.scene.add(ambientLight);

        // Main warm golden spotlight from above (mimicking mosque lantern / Noor)
        const goldSpot = new THREE.SpotLight(0xffdf88, 3.2);
        goldSpot.position.set(3, 6, 4);
        goldSpot.angle = Math.PI / 4;
        goldSpot.penumbra = 0.6;
        goldSpot.castShadow = true;
        goldSpot.shadow.mapSize.width = 1024;
        goldSpot.shadow.mapSize.height = 1024;
        goldSpot.shadow.bias = -0.001;
        this.scene.add(goldSpot);
        this.lights.push(goldSpot);

        // Soft emerald rim light from behind for magical depth
        const emeraldRim = new THREE.DirectionalLight(0x10b981, 1.4);
        emeraldRim.position.set(-4, 3, -4);
        this.scene.add(emeraldRim);

        // Subtle warm fill light from front-left
        const fillLight = new THREE.PointLight(0xd4af37, 1.5, 12);
        fillLight.position.set(-2, 2, 3);
        this.scene.add(fillLight);
        this.lights.push(fillLight);
    }

    /**
     * Procedural canvas texture generator for the Holy Quran cover
     * Rich emerald Moroccan leather with engraved gold leaf Islamic geometric arabesques
     */
    generateCoverTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1440;
        const ctx = canvas.getContext('2d');

        // Base emerald green gradient
        const bgGrad = ctx.createRadialGradient(512, 720, 100, 512, 720, 800);
        bgGrad.addColorStop(0, '#0a3a28');
        bgGrad.addColorStop(0.7, '#06261a');
        bgGrad.addColorStop(1, '#03140e');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Fine leather grain simulation
        ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        for (let i = 0; i < 40000; i++) {
            const rx = Math.random() * canvas.width;
            const ry = Math.random() * canvas.height;
            ctx.fillRect(rx, ry, 1.5, 1.5);
        }

        // Gold framing borders
        ctx.strokeStyle = '#e6ca65';
        ctx.lineWidth = 14;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

        ctx.strokeStyle = '#997321';
        ctx.lineWidth = 4;
        ctx.strokeRect(70, 70, canvas.width - 140, canvas.height - 140);

        ctx.strokeStyle = '#f5e49c';
        ctx.lineWidth = 2;
        ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160);

        // Corner Arabesque Ornaments
        const corners = [
            [85, 85],
            [canvas.width - 85, 85],
            [85, canvas.height - 85],
            [canvas.width - 85, canvas.height - 85]
        ];
        corners.forEach(([cx, cy]) => {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.fillStyle = '#d4af37';
            ctx.beginPath();
            ctx.arc(0, 0, 45, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffe894';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();
        });

        // Center Islamic Medallion (Shamsa)
        const centerX = 512;
        const centerY = 720;

        ctx.save();
        ctx.translate(centerX, centerY);

        // Outer sunburst rays
        for (let i = 0; i < 32; i++) {
            ctx.rotate((Math.PI * 2) / 32);
            ctx.fillStyle = i % 2 === 0 ? '#d4af37' : '#997321';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(24, 260);
            ctx.lineTo(-24, 260);
            ctx.closePath();
            ctx.fill();
        }

        // Inner scalloped medallion
        ctx.beginPath();
        ctx.arc(0, 0, 220, 0, Math.PI * 2);
        ctx.fillStyle = '#06261a';
        ctx.fill();
        ctx.strokeStyle = '#fceda2';
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 195, 0, Math.PI * 2);
        ctx.fillStyle = '#0a3a28';
        ctx.fill();
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Calligraphic central text: القرآن الكريم
        ctx.fillStyle = '#ffeaa7';
        ctx.font = 'bold 78px "Amiri", "Scheherazade New", serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 12;
        ctx.fillText('القرآن الكريم', 0, -15);

        const isEn = (window.currentLanguage === 'en');
        ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#d4af37';
        ctx.letterSpacing = '6px';
        ctx.fillText(isEn ? 'THE HOLY QURAN' : 'EL SAGRADO CORÁN', 0, 70);

        ctx.restore();

        const texture = new THREE.CanvasTexture(canvas);
        texture.anisotropy = 8;
        return texture;
    }

    /**
     * Generates the Open Pages Texture (Surah Al-Fatihah with Spanish translation banner)
     */
    generateOpenPagesTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 2048;
        canvas.height = 1440;
        const ctx = canvas.getContext('2d');

        // Aged antique parchment color
        ctx.fillStyle = '#fbf7ee';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Center spine shadow
        const spineGrad = ctx.createLinearGradient(960, 0, 1088, 0);
        spineGrad.addColorStop(0, 'rgba(0,0,0,0)');
        spineGrad.addColorStop(0.5, 'rgba(40, 25, 10, 0.35)');
        spineGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = spineGrad;
        ctx.fillRect(960, 0, 128, canvas.height);

        // Draw Left and Right page borders
        const drawPage = (offsetX, isRight) => {
            ctx.save();
            ctx.translate(offsetX, 0);

            // Gilded border
            ctx.strokeStyle = '#c59b27';
            ctx.lineWidth = 8;
            ctx.strokeRect(60, 60, 904, 1320);

            ctx.strokeStyle = '#0b3b2c';
            ctx.lineWidth = 3;
            ctx.strokeRect(75, 75, 874, 1290);

            // Top Header Cartouche
            ctx.fillStyle = '#06261a';
            ctx.fillRect(150, 100, 724, 90);
            ctx.strokeStyle = '#d4af37';
            ctx.lineWidth = 4;
            ctx.strokeRect(150, 100, 724, 90);

            ctx.fillStyle = '#ffeaa7';
            ctx.font = 'bold 42px "Amiri", serif';
            ctx.textAlign = 'center';
            ctx.fillText(isRight ? 'سُورَةُ الفَاتِحَة' : 'آيَةُ الكُرْسِيّ', 512, 160);

            if (isRight) {
                // Bismillah
                ctx.fillStyle = '#0a2318';
                ctx.font = 'bold 46px "Amiri", serif';
                ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 512, 270);

                // Verses of Al-Fatiha
                const verses = [
                    'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿١﴾',
                    'الرَّحْمَٰنِ الرَّحِيمِ ﴿٢﴾',
                    'مَالِكِ يَوْمِ الدِّينِ ﴿٣﴾',
                    'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٤﴾',
                    'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٥﴾',
                    'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ ﴿٦﴾',
                    'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾'
                ];

                ctx.font = '34px "Amiri", serif';
                ctx.fillStyle = '#111827';
                let startY = 360;
                verses.forEach((v) => {
                    ctx.fillText(v, 512, startY);
                    startY += 78;
                });

                // Spanish Translation box at the bottom
                ctx.fillStyle = 'rgba(11, 59, 44, 0.08)';
                ctx.fillRect(100, 960, 824, 340);
                ctx.strokeStyle = '#c59b27';
                ctx.lineWidth = 2;
                ctx.strokeRect(100, 960, 824, 340);

                const isEn = (window.currentLanguage === 'en');
                ctx.fillStyle = '#06261a';
                ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
                ctx.fillText(isEn ? 'ENGLISH TRANSLATION (AL-FĀTIHA):' : 'TRADUCCIÓN AL ESPAÑOL (AL-FÁTIHA):', 512, 1000);

                ctx.fillStyle = '#374151';
                ctx.font = 'italic 18px "Plus Jakarta Sans", serif';
                const spLines = isEn ? [
                    '1. In the name of God, the Entirely Merciful, the Especially Merciful.',
                    '2. [All] praise is due to God, Lord of the worlds.',
                    '3. The Entirely Merciful, the Especially Merciful, 4. Sovereign of the Day of Recompense.',
                    '5. It is You we worship and You we ask for help.',
                    '6. Guide us to the straight path,',
                    '7. the path of those upon whom You have bestowed favor.'
                ] : [
                    '1. En el nombre de Dios, el Compasivo, el Misericordioso.',
                    '2. Alabado sea Dios, Señor de todos los mundos.',
                    '3. El Compasivo, el Misericordioso, 4. Soberano del Día del Juicio.',
                    '5. Solo a Ti adoramos y solo a Ti pedimos ayuda.',
                    '6. Guíanos por el camino recto,',
                    '7. el camino de quienes has colmado con Tu gracia.'
                ];
                let spY = 1045;
                spLines.forEach(l => {
                    ctx.fillText(l, 512, spY);
                    spY += 40;
                });
            } else {
                // Ayat Al-Kursi Preview
                ctx.fillStyle = '#0a2318';
                ctx.font = 'bold 44px "Amiri", serif';
                ctx.fillText('اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', 512, 280);

                const lines = [
                    'لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ﴿٢٥٥﴾',
                    'مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ',
                    'وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ',
                    'وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ',
                    'وَهُوَ الْعَلِيُّ الْعَظِيمُ'
                ];
                ctx.font = '31px "Amiri", serif';
                let startY = 380;
                lines.forEach((l) => {
                    ctx.fillText(l, 512, startY);
                    startY += 82;
                });

                // Commentary box
                ctx.fillStyle = 'rgba(11, 59, 44, 0.08)';
                ctx.fillRect(100, 960, 824, 340);
                ctx.strokeStyle = '#c59b27';
                ctx.lineWidth = 2;
                ctx.strokeRect(100, 960, 824, 340);

                const isEn = (window.currentLanguage === 'en');
                ctx.fillStyle = '#06261a';
                ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
                ctx.fillText(isEn ? 'THE THRONE VERSE (AYAT AL-KURSI):' : 'EL VERSÍCULO DEL TRONO (AYAT AL-KURSI):', 512, 1000);

                ctx.fillStyle = '#374151';
                ctx.font = 'italic 18px "Plus Jakarta Sans", serif';
                const spLines2 = isEn ? [
                    '"God! There is no deity except Him, the Ever-Living, the Sustainer.',
                    'Neither drowsiness overtakes Him nor sleep.',
                    'To Him belongs whatever is in the heavens and the earth...',
                    'His Kursi extends over the heavens and the earth,',
                    'and their preservation tires Him not. And He is the Most High, the Most Great."'
                ] : [
                    '"¡Dios! No hay más divinidad que Él, el Viviente, el Subsistente.',
                    'Ni la somnolencia ni el sueño se apoderan de Él.',
                    'Suyo es cuanto hay en los cielos y en la tierra...',
                    'Su Trono abarca los cielos y la tierra,',
                    'y Su custodia no le abruma. Él es el Altísimo, el Grandioso."'
                ];
                let spY2 = 1045;
                spLines2.forEach(l => {
                    ctx.fillText(l, 512, spY2);
                    spY2 += 40;
                });
            }

            ctx.restore();
        };

        // Left page (isRight: false)
        drawPage(0, false);
        // Right page (isRight: true)
        drawPage(1024, true);

        const texture = new THREE.CanvasTexture(canvas);
        texture.anisotropy = 8;
        return texture;
    }

    /**
     * Builds the 3D book model
     */
    buildQuranModel() {
        this.coverTexture = this.generateCoverTexture();
        this.openPagesTexture = this.generateOpenPagesTexture();

        // 1. Open Quran Mode Model (Two sloped wings with curved spine)
        this.openModel = new THREE.Group();

        // Leather Cover Backing
        const coverMat = new THREE.MeshStandardMaterial({
            color: 0x07281c,
            roughness: 0.35,
            metalness: 0.25
        });

        // Golden Page Edges
        const goldEdgeMat = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.85,
            roughness: 0.25
        });

        const pagesMat = new THREE.MeshStandardMaterial({
            map: this.openPagesTexture,
            roughness: 0.7,
            metalness: 0.05
        });

        // Right Wing (angled at ~18 degrees)
        const wingWidth = 1.6;
        const wingHeight = 2.25;
        const wingThickness = 0.16;

        // Right Page Mesh
        const rightGroup = new THREE.Group();
        const rightGeom = new THREE.BoxGeometry(wingWidth, wingThickness, wingHeight);

        // Customize UV mapping so right wing gets right half of openPagesTexture
        const rightMesh = new THREE.Mesh(rightGeom, [
            goldEdgeMat, // right edge
            goldEdgeMat, // left edge (near spine)
            pagesMat,    // top (pages)
            coverMat,    // bottom (leather cover)
            goldEdgeMat, // front edge
            goldEdgeMat  // back edge
        ]);
        rightMesh.position.set(wingWidth / 2, 0, 0);
        rightMesh.castShadow = true;
        rightMesh.receiveShadow = true;
        rightGroup.add(rightMesh);
        rightGroup.rotation.z = -0.22; // tilt right page
        rightGroup.position.set(0.08, 0.05, 0);
        this.openModel.add(rightGroup);

        // Left Wing
        const leftGroup = new THREE.Group();
        const leftMesh = new THREE.Mesh(rightGeom, [
            goldEdgeMat,
            goldEdgeMat,
            pagesMat,
            coverMat,
            goldEdgeMat,
            goldEdgeMat
        ]);
        leftMesh.position.set(-wingWidth / 2, 0, 0);
        leftMesh.castShadow = true;
        leftMesh.receiveShadow = true;
        leftGroup.add(leftMesh);
        leftGroup.rotation.z = 0.22; // tilt left page
        leftGroup.position.set(-0.08, 0.05, 0);
        this.openModel.add(leftGroup);

        // Book Spine & Centerfold ribbon bookmark
        const spineGeom = new THREE.CylinderGeometry(0.12, 0.12, wingHeight, 16, 1, false, 0, Math.PI);
        const spineMesh = new THREE.Mesh(spineGeom, coverMat);
        spineMesh.rotation.x = Math.PI / 2;
        spineMesh.position.set(0, -0.06, 0);
        this.openModel.add(spineMesh);

        // Green/Gold Silk Bookmark Ribbon (hanging over the pages)
        const ribbonCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0.15, -1.0),
            new THREE.Vector3(0.15, 0.1, 0.0),
            new THREE.Vector3(0.3, 0.02, 1.0),
            new THREE.Vector3(0.35, -0.25, 1.35)
        ]);
        const ribbonGeom = new THREE.TubeGeometry(ribbonCurve, 20, 0.035, 8, false);
        const ribbonMat = new THREE.MeshStandardMaterial({
            color: 0x10b981,
            roughness: 0.3,
            metalness: 0.4
        });
        const ribbonMesh = new THREE.Mesh(ribbonGeom, ribbonMat);
        this.openModel.add(ribbonMesh);

        // 2. Closed Quran Mode Model
        this.closedModel = new THREE.Group();
        const closedBookGeom = new THREE.BoxGeometry(2.4, 0.42, 3.2);

        const closedCoverFront = new THREE.MeshStandardMaterial({
            map: this.coverTexture,
            roughness: 0.35,
            metalness: 0.3
        });
        const closedCoverBack = new THREE.MeshStandardMaterial({
            color: 0x06261a,
            roughness: 0.4,
            metalness: 0.2
        });

        const closedMesh = new THREE.Mesh(closedBookGeom, [
            goldEdgeMat,      // right page edges
            coverMat,          // spine
            closedCoverFront,  // top cover (beautiful medallion)
            closedCoverBack,   // back cover
            goldEdgeMat,       // front page edges
            goldEdgeMat        // back page edges
        ]);
        closedMesh.castShadow = true;
        closedMesh.receiveShadow = true;
        this.closedModel.add(closedMesh);
        this.closedModel.visible = false; // start with open view

        this.bookGroup.add(this.openModel);
        this.bookGroup.add(this.closedModel);
    }

    /**
     * Builds the traditional wooden Islamic Rihl / Book Stand
     */
    buildWoodenStand() {
        this.standGroup = new THREE.Group();

        // Carved Dark Mahogany Wood Texture & Material
        const woodMat = new THREE.MeshStandardMaterial({
            color: 0x3d2010,
            roughness: 0.55,
            metalness: 0.15
        });

        const goldInlayMat = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            roughness: 0.3,
            metalness: 0.7
        });

        // Two interlocking X-planks
        const plankGeom = new THREE.BoxGeometry(3.6, 0.09, 2.5);

        // Plank 1 (slanted left to right)
        const plank1 = new THREE.Mesh(plankGeom, woodMat);
        plank1.rotation.z = 0.35;
        plank1.position.set(0, -0.45, 0);
        plank1.castShadow = true;
        plank1.receiveShadow = true;
        this.standGroup.add(plank1);

        // Plank 2 (slanted right to left)
        const plank2 = new THREE.Mesh(plankGeom, woodMat);
        plank2.rotation.z = -0.35;
        plank2.position.set(0, -0.45, 0);
        plank2.castShadow = true;
        plank2.receiveShadow = true;
        this.standGroup.add(plank2);

        // Carved Islamic arch cutouts at the base feet
        const footGeom = new THREE.BoxGeometry(0.5, 0.4, 2.4);
        const foot1 = new THREE.Mesh(footGeom, woodMat);
        foot1.position.set(-1.6, -1.0, 0);
        this.standGroup.add(foot1);

        const foot2 = new THREE.Mesh(footGeom, woodMat);
        foot2.position.set(1.6, -1.0, 0);
        this.standGroup.add(foot2);

        // Gold Inlay details along edges of stand
        const trimGeom = new THREE.CylinderGeometry(0.02, 0.02, 2.5, 8);
        const trim1 = new THREE.Mesh(trimGeom, goldInlayMat);
        trim1.rotation.x = Math.PI / 2;
        trim1.position.set(-1.7, -0.15, 0);
        this.standGroup.add(trim1);

        const trim2 = new THREE.Mesh(trimGeom, goldInlayMat);
        trim2.rotation.x = Math.PI / 2;
        trim2.position.set(1.7, -0.15, 0);
        this.standGroup.add(trim2);

        this.standGroup.position.set(0, 0, 0);
        this.bookGroup.add(this.standGroup);
    }

    /**
     * Ethereal Floating Particles (Golden Stardust)
     */
    buildParticles() {
        const particleCount = 450;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 1] = (Math.random() - 0.2) * 8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            scales[i] = Math.random() * 0.08 + 0.02;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Create glowing spark texture
        const sparkCanvas = document.createElement('canvas');
        sparkCanvas.width = 64;
        sparkCanvas.height = 64;
        const sctx = sparkCanvas.getContext('2d');
        const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 235, 160, 1)');
        grad.addColorStop(0.3, 'rgba(212, 175, 55, 0.8)');
        grad.addColorStop(0.8, 'rgba(16, 185, 129, 0.2)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        sctx.fillStyle = grad;
        sctx.fillRect(0, 0, 64, 64);

        const sparkTexture = new THREE.CanvasTexture(sparkCanvas);

        const material = new THREE.PointsMaterial({
            size: 0.16,
            map: sparkTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    toggleBookState() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.openModel.visible = true;
            this.closedModel.visible = false;
            this.standGroup.visible = true;
        } else {
            this.openModel.visible = false;
            this.closedModel.visible = true;
            this.standGroup.visible = false;
        }
        return this.isOpen;
    }

    updateLanguageTextures() {
        const newOpenTexture = this.generateOpenPagesTexture();
        const newCoverTexture = this.generateCoverTexture();

        // Update open book pages material
        if (this.openModel) {
            this.openModel.traverse((child) => {
                if (child.isMesh && Array.isArray(child.material)) {
                    if (child.material[2] && child.material[2].map) {
                        child.material[2].map = newOpenTexture;
                        child.material[2].needsUpdate = true;
                    }
                }
            });
        }

        // Update closed book cover material
        if (this.closedModel) {
            this.closedModel.traverse((child) => {
                if (child.isMesh && Array.isArray(child.material)) {
                    if (child.material[2] && child.material[2].map) {
                        child.material[2].map = newCoverTexture;
                        child.material[2].needsUpdate = true;
                    }
                }
            });
        }
    }

    resetView() {
        this.targetRotationY = 0.25;
        this.targetRotationX = 0.2;
    }

    setupEvents() {
        const dom = this.container;

        // Mouse Drag Orbit
        dom.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.previousMousePosition = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const deltaX = e.clientX - this.previousMousePosition.x;
                const deltaY = e.clientY - this.previousMousePosition.y;

                this.targetRotationY += deltaX * 0.007;
                this.targetRotationX = Math.max(-0.4, Math.min(0.8, this.targetRotationX + deltaY * 0.005));

                this.previousMousePosition = { x: e.clientX, y: e.clientY };
            } else {
                // Subtle interactive mouse parallax
                const rect = dom.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                this.mouseX = x;
                this.mouseY = y;
            }
        });

        // Touch Drag for Mobile
        dom.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this.isDragging = true;
                this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (this.isDragging && e.touches.length === 1) {
                const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
                const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

                this.targetRotationY += deltaX * 0.008;
                this.targetRotationX = Math.max(-0.4, Math.min(0.8, this.targetRotationX + deltaY * 0.006));

                this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        }, { passive: true });

        // Window resize
        window.addEventListener('resize', () => {
            const width = this.container.clientWidth;
            const height = this.container.clientHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
    }

    animate() {
        requestAnimationFrame(this.animate);

        const elapsedTime = this.clock.getElapsedTime();

        // Smooth damping rotation
        if (this.bookGroup) {
            // Gentle hovering levitation
            const hoverOffset = Math.sin(elapsedTime * 1.5) * 0.06;
            this.bookGroup.position.y = 0.45 + hoverOffset;

            // Subtle auto-turn if user is not actively dragging
            if (!this.isDragging) {
                this.targetRotationY += 0.0018;
            }

            // Interpolate toward target rotation
            this.bookGroup.rotation.y += (this.targetRotationY + this.mouseX * 0.15 - this.bookGroup.rotation.y) * 0.05;
            this.bookGroup.rotation.x += (this.targetRotationX - this.mouseY * 0.1 - this.bookGroup.rotation.x) * 0.05;
        }

        // Float particles
        if (this.particles) {
            this.particles.rotation.y = elapsedTime * 0.03;
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 1; i < positions.length; i += 3) {
                positions[i] += Math.sin(elapsedTime + i) * 0.002;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Global initialization helper
window.initQuran3D = function(containerId) {
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not yet loaded, retrying...');
        setTimeout(() => window.initQuran3D(containerId), 200);
        return null;
    }
    return new Quran3DScene(containerId);
};
