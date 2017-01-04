// File generated with Tower of Babel version: 5.0.1 on 01/04/17
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var compTex;
(function (compTex) {
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
        new Plane("Plane", scene);

        // define cameras after meshes, incase LockedTarget is in use
        defineCameras(scene);

        // lights defined after meshes, so shadow gen's can also be defined
        defineLights(scene);
    }
    compTex.initScene = initScene;

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


        if (!scene.getMaterialByID("compTex.Material")){
            material = new B.StandardMaterial("compTex.Material", scene);
            material.ambientColor  = new B.Color3(.8,.8,.8);
            material.diffuseColor  = new B.Color3(.64,.64,.64);
            material.emissiveColor = new B.Color3(0,0,0);
            material.specularColor = new B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
            texture = new B.Texture(materialsRootDir + "Ground.jpg", scene, false, true, B.Texture.TRILINEAR_SAMPLINGMODE, onTexturesLoaded);
            pendingTextures++;
            texture.hasAlpha = true;
            texture.level = 1;
            texture.coordinatesIndex = 0;
            texture.coordinatesMode = 0;
            texture.uOffset = 0;
            texture.vOffset = 0;
            texture.uScale = 1;
            texture.vScale = 1;
            texture.uAng = 0;
            texture.vAng = 0;
            texture.wAng = 0;
            texture.wrapU = 1;
            texture.wrapV = 1;
            material.diffuseTexture = texture;
        }
        if (pendingTextures === 0) matLoaded = true;
        else texLoadStart = B.Tools.Now;
        B.Tools.Log("compTex.defineMaterials completed:  " + ((B.Tools.Now - loadStart) / 1000).toFixed(2) + " secs");
    }
    compTex.defineMaterials = defineMaterials;

    var Plane = (function (_super) {
        __extends(Plane, _super);
        function Plane(name, scene, materialsRootDir, source) {
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
            this.scaling.x   = 1;
            this.scaling.y   = 1;
            this.scaling.z   = 1;

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
                    1,0,-1,-1,0,1,-1,0,-1,1,0,1
                ]),
                false);

                this.setIndices([
                    0,1,2,0,3,1
                ]);

                this.setVerticesData(B.VertexBuffer.NormalKind, new Float32Array([
                    0,1,0,0,1,0,0,1,0,0,1,0
                ]),
                false);

                this.setVerticesData(B.VertexBuffer.UVKind, new Float32Array([
                    .9999,.0001,.0001,.9999,.0001,.0001,.9999,.9999
                ]),
                false);

                geo = (B.Tools.Now - geo) / 1000;
                this.setMaterialByID("compTex.Material");
                this.subMeshes = [];
                new B.SubMesh(0, 0, 4, 0, 6, this);
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
        return Plane;
    })(B.Mesh);
    compTex.Plane = Plane;

    function defineCameras(scene) {
                var camera;

        camera = new B.FreeCamera("Camera", new B.Vector3(0,2,0), scene);
        camera.setCameraRigMode(0,{interaxialDistance: .0637});
        camera.rotation = new B.Vector3(1.5708,-3.1416,0);
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
    compTex.defineCameras = defineCameras;

    function defineLights(scene) {
                var light;

        light = new B.PointLight("Point", new B.Vector3(0,3.2702,0), scene);
        light.intensity = 1;
        light.diffuse = new B.Color3(1,1,1);
        light.specular = new B.Color3(0,0,0);
    }
    compTex.defineLights = defineLights;

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
    compTex.freshenShadowRenderLists = freshenShadowRenderLists;
})(compTex || (compTex = {}));