// File generated with Tower of Babel version: 5.3-beta on 07/30/17
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DevOrientationCamTest;
(function (DevOrientationCamTest) {
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
    DevOrientationCamTest.initScene = initScene;

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
    DevOrientationCamTest.matReadAhead = matReadAhead;

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

        material = scene.getMaterialByID("DevOrientationCamTest.Red");
        if (!material){
            material = new _B.StandardMaterial("DevOrientationCamTest.Red", scene);
            material.ambientColor  = new _B.Color3(1,0,0);
            material.diffuseColor  = new _B.Color3(.8,0,0);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        material = scene.getMaterialByID("DevOrientationCamTest.Yellow");
        if (!material){
            material = new _B.StandardMaterial("DevOrientationCamTest.Yellow", scene);
            material.ambientColor  = new _B.Color3(.8,.7959,.0031);
            material.diffuseColor  = new _B.Color3(.64,.6367,.0025);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        material = scene.getMaterialByID("DevOrientationCamTest.White");
        if (!material){
            material = new _B.StandardMaterial("DevOrientationCamTest.White", scene);
            material.ambientColor  = new _B.Color3(.8,.8,.8);
            material.diffuseColor  = new _B.Color3(.64,.64,.64);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        material = scene.getMaterialByID("DevOrientationCamTest.Green");
        if (!material){
            material = new _B.StandardMaterial("DevOrientationCamTest.Green", scene);
            material.ambientColor  = new _B.Color3(.0019,.448,.0079);
            material.diffuseColor  = new _B.Color3(.0015,.3584,.0063);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        material = scene.getMaterialByID("DevOrientationCamTest.Orange");
        if (!material){
            material = new _B.StandardMaterial("DevOrientationCamTest.Orange", scene);
            material.ambientColor  = new _B.Color3(.8,.2114,.005);
            material.diffuseColor  = new _B.Color3(.64,.1691,.004);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        material = scene.getMaterialByID("DevOrientationCamTest.Blue");
        if (!material){
            material = new _B.StandardMaterial("DevOrientationCamTest.Blue", scene);
            material.ambientColor  = new _B.Color3(.1236,.5287,.8);
            material.diffuseColor  = new _B.Color3(.0989,.4229,.64);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();
        var multiMaterial;
        multiMaterial = new _B.MultiMaterial("DevOrientationCamTest.Multimaterial#0", scene);
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.Red"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.Yellow"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.White"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.Green"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.Orange"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.Blue"));

        matLoaded = pendingTextures === 0;
        if (!matLoaded) texLoadStart = _B.Tools.Now;
        _B.Tools.Log("DevOrientationCamTest.defineMaterials completed:  " + ((_B.Tools.Now - loadStart) / 1000).toFixed(2) + " secs");
    }
    DevOrientationCamTest.defineMaterials = defineMaterials;

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
            this.scaling.x   = 10;
            this.scaling.y   = 10;
            this.scaling.z   = 10;

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
                    -1,1,1,1,-1,1,1,1,1,-1,-1,1,1,-1,-1,1,1,1,1,-1,1,1,1,-1,-1,-1,1,1,-1,-1,1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,1,-1,1,-1,-1,-1,1,-1,-1,-1
                    ,1,1,-1,1,-1,-1,-1,1,-1,1,1,-1,-1,1,1,1,1,1,-1,1,-1
                ]),
                false);

                var _i;//indices & affected indices for shapekeys
                _i = new Uint32Array([0,1,2,0,3,1,4,5,6,4,7,5,8,9,10,8,11,9,12,13,14,12,15,13,16,17,18,16,19,17,20,21,22,20,23,21]);
                this.setIndices(_i);

                this.setVerticesData(_B.VertexBuffer.NormalKind, new Float32Array([
                    .5773,-.5773,-.5773,-.5773,.5773,-.5773,-.5773,-.5773,-.5773,.5773,.5773,-.5773,-.5773,.5773,.5773,-.5773,-.5773,-.5773,-.5773,.5773,-.5773,-.5773,-.5773,.5773,.5773,.5773,-.5773,-.5773,.5773,.5773,-.5773,.5773,-.5773,.5773,.5773,.5773,.5773,.5773,.5773,.5773,-.5773,-.5773,.5773,-.5773,.5773,.5773,.5773,-.5773,.5773,.5773,.5773
                    ,-.5773,-.5773,.5773,-.5773,.5773,.5773,.5773,-.5773,.5773,-.5773,-.5773,.5773,.5773,-.5773,-.5773,-.5773,-.5773,-.5773,.5773,-.5773,.5773
                ]),
                false);

                geo = (_B.Tools.Now - geo) / 1000;
                this.setMaterialByID("DevOrientationCamTest.Multimaterial#0");
                this.subMeshes = [];
                new _B.SubMesh(0, 0, 4, 0, 6, this);
                new _B.SubMesh(1, 4, 4, 6, 6, this);
                new _B.SubMesh(2, 8, 4, 12, 6, this);
                new _B.SubMesh(3, 12, 4, 18, 6, this);
                new _B.SubMesh(4, 16, 4, 24, 6, this);
                new _B.SubMesh(5, 20, 4, 30, 6, this);
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
    DevOrientationCamTest.Cube = Cube;

    function defineCameras(scene, positionOffset) {
        var camera;

        camera = new _B.DeviceOrientationCamera("Camera", new _B.Vector3(0,0,0), scene);
        if (positionOffset) camera.position.addInPlace(positionOffset);
        camera.setCameraRigMode(0,{interaxialDistance: .0637});
        camera.rotation = new _B.Vector3(0,0,0);
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
    DevOrientationCamTest.defineCameras = defineCameras;

    function defineLights(scene, positionOffset) {
        var light;

        light = new _B.PointLight("Point", new _B.Vector3(0,0,0), scene);
        if (positionOffset) light.position.addInPlace(positionOffset);
        light.intensity = 1;
        light.diffuse = new _B.Color3(1,1,1);
        light.specular = new _B.Color3(1,1,1);
    }
    DevOrientationCamTest.defineLights = defineLights;

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
    DevOrientationCamTest.freshenShadowRenderLists = freshenShadowRenderLists;
})(DevOrientationCamTest || (DevOrientationCamTest = {}));