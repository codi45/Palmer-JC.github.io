// File generated with Tower of Babel version: 5.3-beta on 08/15/17
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var strands2;
(function (strands2) {
    var _B = BABYLON;
    var _M = _B.Matrix.FromValues;
    var _Q = _B.Quaternion;
    var _V = _B.Vector3;
    function CONTIG(array, offset, begin, end) {
        for(var i = 0, len = 1 + end - begin; i < len; i++) {
            array[offset + i] = begin + i;
        }
    }
    function REPEAT(array, offset, nRepeats, val) {
        for(var i = 0; i < nRepeats; i++) {
            array[offset + i] = val;
        }
    }
    var _sceneTransitionName;
    var _overriddenMillis;
    var _overriddenSound;
    var _options;

    function initScene(scene, resourcesRootDir, positionOffset, sceneTransitionName, overriddenMillis, overriddenSound, options) {
        if (!resourcesRootDir) { resourcesRootDir = "./"; }
        function MOVE(mesh, positionOffset) {
            mesh.position.addInPlace(positionOffset);
            if (mesh.isWorldMatrixFrozen) mesh.freezeWorldMatrix();
        }

        _sceneTransitionName = sceneTransitionName;
        _overriddenMillis    = overriddenMillis;
        _overriddenSound     = overriddenSound;
        _options             = options;

        scene.autoClear = true;
        scene.clearColor    = new _B.Color3(.0509,.0509,.0509);
        scene.ambientColor  = new _B.Color3(0,0,0);
        scene.gravity = new _V(0,-9.81,0);

        // define materials before meshes
        defineMaterials(scene, resourcesRootDir);

        // instance all root meshes
        var mesh;
        mesh = new Cube("Cube", scene);
        if (positionOffset) MOVE(mesh, positionOffset);

        // define cameras after meshes, incase LockedTarget is in use
        defineCameras(scene, positionOffset);

        // lights defined after meshes, so shadow gen's can also be defined
        defineLights(scene, positionOffset);

        if (sceneTransitionName && matLoaded) {
            QI.SceneTransition.perform(sceneTransitionName, waitingMeshes, overriddenMillis, overriddenSound, options);
        }
    }
    strands2.initScene = initScene;

    var waitingMeshes = [];
    var pendingTextures = 0;
    var texLoadStart = 0;
    function onTexturesLoaded(){
        if (--pendingTextures > 0) return;
        _B.Tools.Log("Texture Load delay:  " + ((_B.Tools.Now - texLoadStart) / 1000).toFixed(2) + " secs");
        if (_sceneTransitionName) QI.SceneTransition.perform(_sceneTransitionName, waitingMeshes, _overriddenMillis, _overriddenSound, _options);
        else {
            for (var i = 0, len = waitingMeshes.length; i < len; i++) {
                if (!waitingMeshes[i].initComplete) continue;
                if (typeof waitingMeshes[i].grandEntrance == "function") waitingMeshes[i].grandEntrance();
                else makeVisible(waitingMeshes[i]);
            }
        }
        waitingMeshes = [];
        _sceneTransitionName = null;
        matLoaded = true;
    }

    // QI.Mesh has similar method, using this to not require QI
    function makeVisible(mesh){
        var children = mesh.getChildMeshes();
        mesh.isVisible = true;
        for (var i = 0, len = children.length; i < len; i++) {
            children[i].isVisible = true;
        }
    }

    var aheadQueued = false;
    function matReadAhead(materialsRootDir) {
        if (aheadQueued) return;
        var txBuffer;
        var fName;

        aheadQueued = true;
    }
    strands2.matReadAhead = matReadAhead;

    var matLoaded = false;
    function defineMaterials(scene, materialsRootDir) {
        if (!materialsRootDir) { materialsRootDir = "./"; }
        if (materialsRootDir.lastIndexOf("/") + 1  !== materialsRootDir.length) { materialsRootDir  += "/"; }
        if (typeof(QI) !== "undefined") QI.TimelineControl.initialize(scene);
        if (typeof(TOWER_OF_BABEL) !== "undefined") TOWER_OF_BABEL.Preloader.SCENE = scene;
        var loadStart = _B.Tools.Now;
        matReadAhead(materialsRootDir);
        var material;
        var texture;
        var txBuffer;

        material = scene.getMaterialByID("strands2.Material");
        if (!material){
            material = new _B.StandardMaterial("strands2.Material", scene);
            material.ambientColor  = new _B.Color3(.8,.0866,.0804);
            material.diffuseColor  = new _B.Color3(.64,.0693,.0643);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        matLoaded = pendingTextures === 0;
        if (!matLoaded) texLoadStart = _B.Tools.Now;
        _B.Tools.Log("strands2.defineMaterials completed:  " + ((_B.Tools.Now - loadStart) / 1000).toFixed(2) + " secs");
    }
    strands2.defineMaterials = defineMaterials;

    var Cube = (function (_super) {
        __extends(Cube, _super);
        function Cube(name, scene, materialsRootDir, source) {
            _super.call(this, name, scene, null, source, true);

            if (!materialsRootDir) { materialsRootDir = "./"; }
            defineMaterials(scene, materialsRootDir); //embedded version check
            var cloning = source && source !== null;
            var load = _B.Tools.Now;
            var geo = 0;
            var shape = 0;
            this.position.x  = 0;
            this.position.y  = 0;
            this.position.z  = 0;
            this.rotation.x  = 0;
            this.rotation.y  = 0;
            this.rotation.z  = 0;
            this.scaling.x   = 1;
            this.scaling.y   = 1;
            this.scaling.z   = 1;
            this.hair = cloning ? child_hair(scene, this, source.hair) : child_hair(scene, this);

            this.id = this.name;
            this.billboardMode  = 0;
            this.isVisible  = false; //always false; evaluated again at bottom
            this.setEnabled(true);
            this.checkCollisions = false;
            this.receiveShadows  = false;
            this.castShadows  = false;
            this.initComplete = false;
            if (!cloning){
                geo = _B.Tools.Now;
                this.setVerticesData(_B.VertexBuffer.PositionKind, new Float32Array([
                    1,-1,-1,-1,-1,1,1,-1,1,-1,1,1,1,1,-1,1,1,1,-1,-1,-1,-1,1,-1
                ]),
                false);

                var _i;//indices & affected indices for shapekeys
                _i = new Uint32Array([0,1,2,3,4,5,5,0,2,4,6,0,6,3,1,2,3,5,0,6,1,3,7,4,5,4,0,4,7,6,6,7,3,2,1,3]);
                this.setIndices(_i);

                this.setVerticesData(_B.VertexBuffer.NormalKind, new Float32Array([
                    .5773,-.5773,-.5773,-.5773,-.5773,.5773,.5773,-.5773,.5773,-.5773,.5773,.5773,.5773,.5773,-.5773,.5773,.5773,.5773,-.5773,-.5773,-.5773,-.5773,.5773,-.5773
                ]),
                false);

                geo = (_B.Tools.Now - geo) / 1000;
                this.setMaterialByID("strands2.Material");
                this.subMeshes = [];
                new _B.SubMesh(0, 0, 8, 0, 36, this);
                if (scene._selectionOctree) {
                    scene.createOrUpdateSelectionOctree();
                }
            }
            if (this.postConstruction) this.postConstruction();
            this.initComplete = true;
            load = (_B.Tools.Now - load) / 1000;
            _B.Tools.Log("defined mesh: " + this.name + (cloning ? " (cloned)" : "") + " completed:  " + load.toFixed(2) + ", geometry:  " + geo.toFixed(2) + ", skey:  " + shape.toFixed(2) + " secs");
            if (matLoaded && !_sceneTransitionName){
                if (typeof this.grandEntrance == "function") this.grandEntrance();
                else makeVisible(this);

            } else waitingMeshes.push(this);
        }

        Cube.prototype.dispose = function (doNotRecurse) {
            _super.prototype.dispose.call(this, doNotRecurse);
            if (this.skeleton) this.skeleton.dispose();
        };
        return Cube;
    })(BABYLON.Mesh);
    strands2.Cube = Cube;

    function child_hair(scene, parent, source){
        var ret = new QI.Hair(parent.name + ".hair", scene, parent, source);
        ret.id = ret.name;
        ret.billboardMode  = parent.billboardMode;
        ret.isVisible  = false; //always false
        ret.setEnabled(parent.isEnabled() );
        ret.checkCollisions = parent.checkCollisions;
        ret.receiveShadows  = parent.receiveShadows;
        ret.castShadows = false;
        ret.skeleton = parent.skeleton;

        ret.namedColor = "PLATINUM_BLONDE";
        ret.colorSpread = .5;
        var strandNumVerts;
        strandNumVerts = new Uint32Array(2);
        REPEAT(strandNumVerts, 0, 2, 5);
        var rootRelativePositions = [.879,1,-.2698,.9763,.1248,.0014,1.2387,.6493,-.0045,1.985,.5133,.022,2.938,.5254,.0236,1,-.5115,-.9454,.9761,.1252,.0016,1.2368,.6499,-.0046,1.9815,.5153,.0219,2.9344,.5272,.0236];
        ret.assemble(strandNumVerts, rootRelativePositions, 2, 1, "");
        return ret;
    }

    function defineCameras(scene, positionOffset) {
        var camera;

        camera = new _B.ArcRotateCamera("Camera", -.7159, .8833, 11.2637, scene.getMeshByID("Cube"), scene);
        camera.setCameraRigMode(0,{interaxialDistance: .0637});
        camera.rotation = new _B.Vector3(.4615,-.8149,0);
        camera.fov = .8576;
        camera.minZ = .1;
        camera.maxZ = 100;
        camera.speed = 1;
        camera.inertia = 0.9;
        camera.checkCollisions = false;
        camera.applyGravity = false;
        camera.ellipsoid = new _B.Vector3(.2,.9,.2);
        scene.setActiveCameraByID("Camera");
    }
    strands2.defineCameras = defineCameras;

    function defineLights(scene, positionOffset) {
        var light;

        light = new _B.HemisphericLight("Hemi", new _B.Vector3(0,1,0), scene);
        light.groundColor = new _B.Color3(0,0,0);
        light.intensity = 1;
        light.diffuse = new _B.Color3(1,1,1);
        light.specular = new _B.Color3(1,1,1);
        light = new _B.PointLight("Lamp", new _B.Vector3(4.9653,4.3922,-5.4668), scene);
        if (positionOffset) light.position.addInPlace(positionOffset);
        light.intensity = 1;
        light.diffuse = new _B.Color3(1,1,1);
        light.specular = new _B.Color3(1,1,1);
        var camlight = scene.getLightByName("Lamp");
        scene.beforeCameraRender = function () {
            var cam = (scene.activeCameras.length > 0) ? scene.activeCameras[0] : scene.activeCamera;
            // move the light to match where the camera is
            camlight.position = cam.position;
            camlight.rotation = cam.rotation;
        };

    }
    strands2.defineLights = defineLights;

    function freshenShadowRenderLists(scene) {
        var renderList = [];
        for (var i = 0; i < scene.meshes.length; i++){
            if (scene.meshes[i]["castShadows"])
                renderList.push(scene.meshes[i]);
        }

        for (var i = 0; i < scene.lights.length; i++){
            if (scene.lights[i]._shadowGenerator)
                scene.lights[i]._shadowGenerator.getShadowMap().renderList = renderList;
        }
    }
    strands2.freshenShadowRenderLists = freshenShadowRenderLists;
})(strands2 || (strands2 = {}));