// File generated with Tower of Babel version: 5.3-beta on 07/06/17
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var primatives;
(function (primatives) {
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

    var waitingMeshes = [];
    var pendingTextures = 0;
    function onTexturesLoaded(){
        if (--pendingTextures > 0) return;
        if (_sceneTransitionName) QI.SceneTransition.perform(_sceneTransitionName, waitingMeshes, _overriddenMillis, _overriddenSound, _options);
        else {
            for (var i = 0, len = waitingMeshes.length; i < len; i++) {
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
    primatives.matReadAhead = matReadAhead;

    var matLoaded = false;
    function defineMaterials(scene, materialsRootDir) {
        if (!materialsRootDir) { materialsRootDir = "./"; }
        if (materialsRootDir.lastIndexOf("/") + 1  !== materialsRootDir.length) { materialsRootDir  += "/"; }
        if (typeof(QI) !== "undefined") QI.TimelineControl.initialize(scene);
        if (typeof(TOWER_OF_BABEL) !== "undefined") TOWER_OF_BABEL.Preloader.SCENE = scene;
        matReadAhead(materialsRootDir);
        var material;
        var texture;
        var txBuffer;

        material = scene.getMaterialByID("primatives.red");
        if (!material){
            material = new _B.StandardMaterial("primatives.red", scene);
            material.ambientColor  = new _B.Color3(.8,.0094,.0078);
            material.diffuseColor  = new _B.Color3(.64,.0075,.0062);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        material = scene.getMaterialByID("primatives.green");
        if (!material){
            material = new _B.StandardMaterial("primatives.green", scene);
            material.ambientColor  = new _B.Color3(.0079,.8,.0541);
            material.diffuseColor  = new _B.Color3(.0063,.64,.0433);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        material = scene.getMaterialByID("primatives.Blue");
        if (!material){
            material = new _B.StandardMaterial("primatives.Blue", scene);
            material.ambientColor  = new _B.Color3(.0058,.1644,.8);
            material.diffuseColor  = new _B.Color3(.0046,.1315,.64);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        material = scene.getMaterialByID("primatives.yellow");
        if (!material){
            material = new _B.StandardMaterial("primatives.yellow", scene);
            material.ambientColor  = new _B.Color3(.7926,.8,.0023);
            material.diffuseColor  = new _B.Color3(.6341,.64,.0018);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        material = scene.getMaterialByID("primatives.pink");
        if (!material){
            material = new _B.StandardMaterial("primatives.pink", scene);
            material.ambientColor  = new _B.Color3(.7889,.0583,.8);
            material.diffuseColor  = new _B.Color3(.6311,.0466,.64);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();

        material = scene.getMaterialByID("primatives.white");
        if (!material){
            material = new _B.StandardMaterial("primatives.white", scene);
            material.ambientColor  = new _B.Color3(1,1,1);
            material.diffuseColor  = new _B.Color3(.8,.8,.8);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        } else material.markDirty();
        var multiMaterial;
        multiMaterial = new _B.MultiMaterial("primatives.Multimaterial#0", scene);
        multiMaterial.subMaterials.push(scene.getMaterialByID("primatives.red"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("primatives.green"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("primatives.Blue"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("primatives.yellow"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("primatives.pink"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("primatives.white"));

        if (pendingTextures === 0) {
            matLoaded = true; 
            if (_sceneTransitionName) QI.SceneTransition.perform(_sceneTransitionName, waitingMeshes, _overriddenMillis, _overriddenSound, _options);
        }
    }
    primatives.defineMaterials = defineMaterials;

    var ColoredCube = (function (_super) {
        __extends(ColoredCube, _super);
        function ColoredCube(name, scene, materialsRootDir, source) {
            _super.call(this, name, scene, null, source, true);

            if (!materialsRootDir) { materialsRootDir = "./"; }
            defineMaterials(scene, materialsRootDir); //embedded version check
            var cloning = source && source !== null;
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
                this.setVerticesData(_B.VertexBuffer.PositionKind, new Float32Array([
                    1,8.8045,1,1,-1.1955,-1,1,-1.1955,1,1,8.8045,1,1,8.8045,-1,1,-1.1955,-1,1,8.8045,-1,-1,-1.1955,-1,1,-1.1955,-1,1,8.8045,-1,-1,8.8045,-1,-1,-1.1955,-1,-1,8.8045,-1,-1,-1.1955,1,-1,-1.1955,-1,-1,8.8045,-1,-1,8.8045,1
                    ,-1,-1.1955,1,1,-1.1955,1,-1,8.8045,1,1,8.8045,1,1,-1.1955,1,-1,-1.1955,1,-1,8.8045,1,-1,8.8045,1,1,8.8045,-1,1,8.8045,1,-1,8.8045,1,-1,8.8045,-1,1,8.8045,-1,1,-1.1955,-1,-1,-1.1955,1,1,-1.1955,1,1,-1.1955,-1
                    ,-1,-1.1955,-1,-1,-1.1955,1
                ]),
                false);

                var _i;//indices & affected indices for shapekeys
                _i = new Uint32Array(36);
                CONTIG(_i, 0, 0, 35);
                this.setIndices(_i);

                this.setVerticesData(_B.VertexBuffer.NormalKind, new Float32Array([
                    1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0
                    ,-1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0
                    ,0,-1,0,0,-1,0
                ]),
                false);

                this.setMaterialByID("primatives.Multimaterial#0");
                this.subMeshes = [];
                new _B.SubMesh(0, 0, 6, 0, 6, this);
                new _B.SubMesh(1, 6, 6, 6, 6, this);
                new _B.SubMesh(2, 12, 6, 12, 6, this);
                new _B.SubMesh(3, 18, 6, 18, 6, this);
                new _B.SubMesh(4, 24, 6, 24, 6, this);
                new _B.SubMesh(5, 30, 6, 30, 6, this);
                if (scene._selectionOctree) {
                    scene.createOrUpdateSelectionOctree();
                }
            }
            if (this.postConstruction) this.postConstruction();
            if (matLoaded && !_sceneTransitionName){
                if (typeof this.grandEntrance == "function") this.grandEntrance();
                else makeVisible(this);

            } else waitingMeshes.push(this);
        }

        ColoredCube.prototype.dispose = function (doNotRecurse) {
            _super.prototype.dispose.call(this, doNotRecurse);
            if (this.skeleton) this.skeleton.dispose();
        };
        return ColoredCube;
    })(BABYLON.Mesh);
    primatives.ColoredCube = ColoredCube;

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
    primatives.freshenShadowRenderLists = freshenShadowRenderLists;
})(primatives || (primatives = {}));