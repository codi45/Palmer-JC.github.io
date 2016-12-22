// File generated with Tower of Babel version: 5.0.1 on 12/22/16
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DevOrientationCamTest;
(function (DevOrientationCamTest) {
    var B = BABYLON;
    var M = B.Matrix.FromValues;
    var Q = B.Quaternion;
    var V = B.Vector3;

    function initScene(scene, resourcesRootDir) {
        if (!resourcesRootDir) { resourcesRootDir = "./"; }
        scene.autoClear = true;
        scene.clearColor    = new B.Color3(.0509,.0509,.0509);
        scene.ambientColor  = new B.Color3(0,0,0);
        scene.gravity = new B.Vector3(0,-9.81,0);

        // define materials & skeletons before meshes
        defineMaterials(scene, resourcesRootDir);

        // instance all root meshes
        new Cube("Cube", scene);

        // define cameras after meshes, incase LockedTarget is in use
        defineCameras(scene);

        // lights defined after meshes, so shadow gen's can also be defined
        defineLights(scene);
    }
    DevOrientationCamTest.initScene = initScene;

    var waitingMeshes = [];
    var pendingTextures = 0;
    var texLoadStart;
    function onTexturesLoaded(){
        if (--pendingTextures > 0) return;
        B.Tools.Log("Texture Load delay:  " + ((B.Tools.Now - texLoadStart) / 1000).toFixed(2) + " secs");
        for (var i = 0, len = waitingMeshes.length; i < len; i++){
            if (typeof waitingMeshes[i].grandEntrance == "function") waitingMeshes[i].grandEntrance();
            else makeVisible(waitingMeshes[i]);
        }
        waitingMeshes = [];
        matLoaded = true;
    }

    function makeVisible(mesh){
        var children = mesh.getChildMeshes();
        mesh.isVisible = true;
        for (var i = 0, len = children.length; i < len; i++){
            children[i].isVisible = true;
        }
    }

    var matLoaded = false;
    function defineMaterials(scene, materialsRootDir) {
        if (!materialsRootDir) { materialsRootDir = "./"; }
        if (matLoaded) return;
        if (materialsRootDir.lastIndexOf("/") + 1  !== materialsRootDir.length) { materialsRootDir  += "/"; }
        var loadStart = B.Tools.Now;
        var material;
        var texture;


        if (!scene.getMaterialByID("DevOrientationCamTest.Red")){
            material = new B.StandardMaterial("DevOrientationCamTest.Red", scene);
            material.ambientColor  = new B.Color3(1,0,0);
            material.diffuseColor  = new B.Color3(.8,0,0);
            material.emissiveColor = new B.Color3(0,0,0);
            material.specularColor = new B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        }

        if (!scene.getMaterialByID("DevOrientationCamTest.Yellow")){
            material = new B.StandardMaterial("DevOrientationCamTest.Yellow", scene);
            material.ambientColor  = new B.Color3(.8,.7959,.0031);
            material.diffuseColor  = new B.Color3(.64,.6367,.0025);
            material.emissiveColor = new B.Color3(0,0,0);
            material.specularColor = new B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        }

        if (!scene.getMaterialByID("DevOrientationCamTest.White")){
            material = new B.StandardMaterial("DevOrientationCamTest.White", scene);
            material.ambientColor  = new B.Color3(.8,.8,.8);
            material.diffuseColor  = new B.Color3(.64,.64,.64);
            material.emissiveColor = new B.Color3(0,0,0);
            material.specularColor = new B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        }

        if (!scene.getMaterialByID("DevOrientationCamTest.Green")){
            material = new B.StandardMaterial("DevOrientationCamTest.Green", scene);
            material.ambientColor  = new B.Color3(.0019,.448,.0079);
            material.diffuseColor  = new B.Color3(.0015,.3584,.0063);
            material.emissiveColor = new B.Color3(0,0,0);
            material.specularColor = new B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        }

        if (!scene.getMaterialByID("DevOrientationCamTest.Orange")){
            material = new B.StandardMaterial("DevOrientationCamTest.Orange", scene);
            material.ambientColor  = new B.Color3(.8,.2114,.005);
            material.diffuseColor  = new B.Color3(.64,.1691,.004);
            material.emissiveColor = new B.Color3(0,0,0);
            material.specularColor = new B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        }

        if (!scene.getMaterialByID("DevOrientationCamTest.Blue")){
            material = new B.StandardMaterial("DevOrientationCamTest.Blue", scene);
            material.ambientColor  = new B.Color3(.1236,.5287,.8);
            material.diffuseColor  = new B.Color3(.0989,.4229,.64);
            material.emissiveColor = new B.Color3(0,0,0);
            material.specularColor = new B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        }
        var multiMaterial;
        multiMaterial = new B.MultiMaterial("DevOrientationCamTest.Multimaterial#0", scene);
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.Red"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.Yellow"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.White"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.Green"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.Orange"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("DevOrientationCamTest.Blue"));
        if (pendingTextures === 0) matLoaded = true;
        else texLoadStart = B.Tools.Now;
        B.Tools.Log("DevOrientationCamTest.defineMaterials completed:  " + ((B.Tools.Now - loadStart) / 1000).toFixed(2) + " secs");
    }
    DevOrientationCamTest.defineMaterials = defineMaterials;

    var Cube = (function (_super) {
        __extends(Cube, _super);
        function Cube(name, scene, materialsRootDir, source) {
            _super.call(this, name, scene, null, source, true);

            if (!materialsRootDir) { materialsRootDir = "./"; }
            defineMaterials(scene, materialsRootDir); //embedded version check
            var cloning = source && source !== null;
            var load = B.Tools.Now;
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
            if (!cloning){
                geo = B.Tools.Now;
                this.setVerticesData(B.VertexBuffer.PositionKind, new Float32Array([
                    -1,1,1,1,-1,1,1,1,1,-1,-1,1,1,-1,-1,1,1,1,1,-1,1,1,1,-1,-1,-1,1,1,-1,-1,1,-1,1,-1,-1,-1,-1,-1,-1,-1,1,1,-1,1,-1,-1,-1,1,-1,-1,-1
                    ,1,1,-1,1,-1,-1,-1,1,-1,1,1,-1,-1,1,1,1,1,1,-1,1,-1
                ]),
                false);

                this.setIndices([
                    0,1,2,0,3,1,4,5,6,4,7,5,8,9,10,8,11,9,12,13,14,12,15,13,16,17,18,16,19,17,20,21,22,20,23,21
                ]);

                this.setVerticesData(B.VertexBuffer.NormalKind, new Float32Array([
                    .5773,-.5773,-.5773,-.5773,.5773,-.5773,-.5773,-.5773,-.5773,.5773,.5773,-.5773,-.5773,.5773,.5773,-.5773,-.5773,-.5773,-.5773,.5773,-.5773,-.5773,-.5773,.5773,.5773,.5773,-.5773,-.5773,.5773,.5773,-.5773,.5773,-.5773,.5773,.5773,.5773,.5773,.5773,.5773,.5773,-.5773,-.5773,.5773,-.5773,.5773,.5773,.5773,-.5773,.5773,.5773,.5773
                    ,-.5773,-.5773,.5773,-.5773,.5773,.5773,.5773,-.5773,.5773,-.5773,-.5773,.5773,.5773,-.5773,-.5773,-.5773,-.5773,-.5773,.5773,-.5773,.5773
                ]),
                false);

                geo = (B.Tools.Now - geo) / 1000;
                this.setMaterialByID("DevOrientationCamTest.Multimaterial#0");
                this.subMeshes = [];
                new B.SubMesh(0, 0, 4, 0, 6, this);
                new B.SubMesh(1, 4, 4, 6, 6, this);
                new B.SubMesh(2, 8, 4, 12, 6, this);
                new B.SubMesh(3, 12, 4, 18, 6, this);
                new B.SubMesh(4, 16, 4, 24, 6, this);
                new B.SubMesh(5, 20, 4, 30, 6, this);
                if (scene._selectionOctree) {
                    scene.createOrUpdateSelectionOctree();
                }
            }
            if (this.postConstruction) this.postConstruction();
            load = (B.Tools.Now - load) / 1000;
            B.Tools.Log("defined mesh: " + this.name + (cloning ? " (cloned)" : "") + " completed:  " + load.toFixed(2) + ", geometry:  " + geo.toFixed(2) + ", skey:  " + shape.toFixed(2) + " secs");
            if (matLoaded){
                if (typeof this.grandEntrance == "function") this.grandEntrance();
                else makeVisible(this);

            } else waitingMeshes.push(this);
        }
        return Cube;
    })(B.Mesh);
    DevOrientationCamTest.Cube = Cube;

    function defineCameras(scene) {
        var camera;

        camera = new B.DeviceOrientationCamera("Camera", new B.Vector3(0,0,0), scene);
        camera.setCameraRigMode(0,{interaxialDistance: .0637});
        camera.rotation = new B.Vector3(0,0,0);
        camera.fov = .8576;
        camera.minZ = .1;
        camera.maxZ = 100;
        camera.speed = 1;
        camera.inertia = 0.9;
        camera.checkCollisions = false;
        camera.applyGravity = false;
        camera.ellipsoid = new B.Vector3(.2,.9,.2);
        scene.setActiveCameraByID("Camera");
    }
    DevOrientationCamTest.defineCameras = defineCameras;

    function defineLights(scene) {
        var light;

        light = new B.PointLight("Point", new B.Vector3(0,0,0), scene);
        light.intensity = 1;
        light.diffuse = new B.Color3(1,1,1);
        light.specular = new B.Color3(1,1,1);
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