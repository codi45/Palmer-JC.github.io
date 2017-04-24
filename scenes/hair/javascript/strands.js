// File generated with Tower of Babel version: 5.3.0 on 04/24/17
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var strands;
(function (strands) {
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

    function initScene(scene, resourcesRootDir) {
        if (!resourcesRootDir) { resourcesRootDir = "./"; }
        scene.autoClear = true;
        scene.clearColor    = new _B.Color3(.0509,.0509,.0509);
        scene.ambientColor  = new _B.Color3(0,0,0);
        scene.gravity = new _V(0,-9.81,0);

        // define materials & skeletons before meshes
        defineMaterials(scene, resourcesRootDir);

        // instance all root meshes
        new Cube("Cube", scene);

        // define cameras after meshes, incase LockedTarget is in use
        defineCameras(scene);

        // lights defined after meshes, so shadow gen's can also be defined
        defineLights(scene);
    }
    strands.initScene = initScene;

    var waitingMeshes = [];
    var pendingTextures = 0;
    var texLoadStart;
    function onTexturesLoaded(){
        if (--pendingTextures > 0) return;
        _B.Tools.Log("Texture Load delay:  " + ((_B.Tools.Now - texLoadStart) / 1000).toFixed(2) + " secs");
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

    var aheadQueued = false;
    function matReadAhead(scene, materialsRootDir) {
        if (!materialsRootDir) { materialsRootDir = "./"; }
        if (aheadQueued) return;
        var txBuffer;

        aheadQueued = true;
    }
    strands.matReadAhead = matReadAhead;

    var matLoaded = false;
    function defineMaterials(scene, materialsRootDir) {
        if (!materialsRootDir) { materialsRootDir = "./"; }
        if (matLoaded) return;
        if (materialsRootDir.lastIndexOf("/") + 1  !== materialsRootDir.length) { materialsRootDir  += "/"; }
        var loadStart = _B.Tools.Now;
        matReadAhead(scene, materialsRootDir);
        var material;
        var texture;
        var txBuffer;


        if (!scene.getMaterialByID("strands.brick")){
            material = new _B.StandardMaterial("strands.brick", scene);
            material.ambientColor  = new _B.Color3(.8,.0347,.0425);
            material.diffuseColor  = new _B.Color3(.64,.0278,.034);
            material.emissiveColor = new _B.Color3(0,0,0);
            material.specularColor = new _B.Color3(.5,.5,.5);
            material.specularPower = 50;
            material.alpha =  1;
            material.backFaceCulling = true;
            material.checkReadyOnlyOnce = false;
            material.maxSimultaneousLights = 4;
        }
        var multiMaterial;
        multiMaterial = new _B.MultiMaterial("strands.Multimaterial#0", scene);
        multiMaterial.subMaterials.push(scene.getMaterialByID("strands.brick"));
        multiMaterial.subMaterials.push(scene.getMaterialByID("strands.Blonde"));
        if (pendingTextures === 0) matLoaded = true;
        else texLoadStart = _B.Tools.Now;
        _B.Tools.Log("strands.defineMaterials completed:  " + ((_B.Tools.Now - loadStart) / 1000).toFixed(2) + " secs");
    }
    strands.defineMaterials = defineMaterials;

    function child_head(scene, parent, source){
        var ret = new QI.Hair(parent.name + ".head", scene, parent, source);
        ret.id = ret.name;
        ret.billboardMode  = 0;
        ret.isVisible  = false; //always false
        ret.setEnabled(true);
        ret.checkCollisions = false;
        ret.receiveShadows  = false;
        ret.castShadows  = false;

        ret.color = new _B.Color3(.64,.617,.272);
        var strandNumVerts = [20,22,22,22,22,19,19,19,19,25,21,22,22,24,22,19,20,19,20,20];
        var rootRelativePositions = [-.2698,-1,.879,.0629,.0194,.0192,.2415,.092,.0483,.4416,.1877,.0524,.642,.2833,.0248,.8425,.3601,-.0302,1.0429,.4047,-.098,1.1431,.4135,-.1307,1.2433,.414,-.1591,1.3435,.4075,-.1812,1.4437,.3961,-.1952,1.6441,.3678,-.1962,1.8445,.3453,-.1663,2.0449,.3397,-.1111,2.2453,.3595,-.039,2.4457,.409,.039,2.6461,.4885
        ,.1111,2.8463,.5932,.1663,3.0249,.7095,.1962,3.0878,.7641,.2,-.9454,-1,.5115,.0448,.0374,.0192,.1041,.0929,.036,.2435,.2365,.0541,.3864,.3922,.0425,.5293,.538,0,.6723,.6573,-.0636,.8152,.7414,-.1307,.8866,.7706,-.1591,.9581,.7929,-.1812,1.0296,.8102,-.1952,1.101,.8249,-.2,1.1725,.8394,-.1962,1.244
        ,.8554,-.1848,1.3154,.8744,-.1663,1.4583,.9263,-.1111,1.6013,1.0035,-.039,1.7442,1.1106,.039,1.8871,1.2475,.1111,2.0647,1.4526,.1764,2.1818,1.615,.199,2.2021,1.6498,.2,-.169,1,-.2164,.0039,.0306,.0098,.009,.1103,.0281,.01,.2075,.0429,.0007,.4216,.0542,-.013,.6374,.0346,-.0122,.8532,-.0145,.0182,1.069,-.0809
        ,.0842,1.2847,-.1456,.1805,1.5005,-.1893,.2354,1.6084,-.1988,.3197,1.7703,-.1962,.426,1.9861,-.1663,.5154,2.2018,-.1111,.5794,2.4176,-.039,.6137,2.6334,.039,.618,2.8492,.1111,.597,3.0648,.1663,.5787,3.1675,.1848,.5554,3.2571,.1962,.5419,3.2942,.199,.5271,3.3248,.2,-.5479,1,.4303,.0077,.0268,.0098,.0227,.0965
        ,.0281,.0358,.1817,.0429,.0532,.3692,.0542,.0663,.5581,.0346,.0939,.7471,-.0145,.1511,.936,-.0809,.244,1.125,-.1456,.3671,1.3139,-.1893,.4355,1.4084,-.1988,.5398,1.5501,-.1962,.673,1.7391,-.1663,.7892,1.928,-.1111,.8801,2.117,-.039,.9412,2.3059,.039,.9724,2.4949,.1111,.9782,2.6836,.1663,.9727,2.7736,.1848,.9605
        ,2.852,.1962,.9515,2.8845,.199,.9406,2.9113,.2,.0703,1,-.5624,.0041,.0304,.0098,.0096,.1096,.0281,.0112,.2063,.0429,.0031,.4192,.0542,-.0094,.6338,.0346,-.0074,.8483,-.0145,.0242,1.0629,-.0809,.0915,1.2775,-.1456,.189,1.492,-.1893,.2445,1.5993,-.1988,.3297,1.7602,-.1962,.4372,1.9748,-.1663,.5278,2.1894,-.1111
        ,.5931,2.404,-.039,.6286,2.6185,.039,.6341,2.8331,.1111,.6143,3.0474,.1663,.5966,3.1496,.1848,.5738,3.2386,.1962,.5605,3.2755,.199,.5459,3.3059,.2,1,-.5998,-.3506,.0326,.0038,.0098,.2214,.0419,.0429,.4498,.1047,.0542,.68,.1724,.0346,.9103,.2256,-.0145,1.1405,.2492,-.0809,1.3707,.2372,-.1456,1.601,.1949
        ,-.1893,1.8312,.1376,-.199,2.0614,.0827,-.1764,2.2916,.0422,-.1269,2.5219,.0252,-.0581,2.7521,.0373,.0196,2.9823,.0797,.0943,3.2126,.149,.1546,3.4296,.2364,.1914,3.5146,.2822,.199,3.5473,.3046,.2,1,-.8592,.2529,.0332,.0032,.0098,.225,.0383,.0429,.4571,.0974,.0542,.6911,.1613,.0346,.9251,.2108,-.0145,1.1591
        ,.2306,-.0809,1.3931,.2148,-.1456,1.6271,.1688,-.1893,1.861,.1078,-.199,2.095,.0491,-.1764,2.329,.0048,-.1269,2.563,-.016,-.0581,2.797,-.0076,.0196,3.031,.0311,.0943,3.2649,.0966,.1546,3.4855,.1805,.1914,3.5719,.2249,.199,3.6051,.2468,.2,1,.7445,.9002,.0333,.0031,.0098,.2261,.0372,.0429,.4594,.0952,.0542
        ,.6945,.1579,.0346,.9296,.2063,-.0145,1.1648,.225,-.0809,1.3999,.208,-.1456,1.635,.1608,-.1893,1.8701,.0987,-.199,2.1053,.0389,-.1764,2.3404,-.0066,-.1269,2.5755,-.0285,-.0581,2.8106,-.0213,.0196,3.0458,.0163,.0943,3.2809,.0807,.1546,3.5026,.1635,.1914,3.5894,.2074,.199,3.6227,.2292,.2,1,.4606,.1526,.0343,.0021
        ,.0098,.2327,.0306,.0429,.4728,.0817,.0542,.7149,.1376,.0346,.9569,.179,-.0145,1.1989,.1908,-.0809,1.4409,.1669,-.1456,1.683,.1129,-.1893,1.925,.0438,-.199,2.167,-.0229,-.1764,2.409,-.0752,-.1269,2.6511,-.104,-.0581,2.8931,-.1037,.0196,3.1351,-.0731,.0943,3.3772,-.0156,.1546,3.6053,.0607,.1914,3.6947,.1021,.199,3.729
        ,.1229,.2,.0213,-.108,-1,.0104,.0241,.0098,.0324,.0868,.0281,.0541,.1633,.0429,.0738,.2469,.0521,.0905,.3318,.0542,.106,.4168,.0485,.1227,.5017,.0346,.1431,.5866,.0132,.2032,.7565,-.0466,.2973,.9263,-.1147,.4258,1.0962,-.1711,.4999,1.1811,-.1893,.657,1.351,-.199,.8119,1.5208,-.1764,.9523,1.6907,-.1269
        ,1.0693,1.8606,-.0581,1.1571,2.0304,.0196,1.2145,2.2003,.0943,1.2452,2.3701,.1546,1.252,2.4537,.1764,1.2519,2.5303,.1914,1.2487,2.5638,.1962,1.2431,2.593,.199,1.2348,2.617,.2,.9838,.6418,-1,.0549,.0273,.0192,.2109,.1225,.0483,.3858,.2435,.0524,.5609,.3645,.0248,.7359,.4666,-.0302,.911,.5366,-.098,.9985,.5581
        ,-.1307,1.086,.5712,-.1591,1.1736,.5774,-.1812,1.2611,.5786,-.1952,1.3486,.5773,-.2,1.4362,.5757,-.1962,1.6112,.5786,-.1663,1.7863,.5983,-.1111,1.9614,.6434,-.039,2.1364,.7183,.039,2.3115,.8231,.1111,2.4864,.9532,.1663,2.6424,1.092,.1962,2.6973,1.1546,.2,.523,.2769,-1,.0427,.0395,.0192,.0992,.0979,.036,.232
        ,.2481,.0541,.3681,.4105,.0425,.5042,.5631,0,.6404,.6892,-.0636,.7765,.7801,-.1307,.8446,.8127,-.1591,.9127,.8383,-.1812,.9807,.859,-.1952,1.0488,.8771,-.2,1.1169,.895,-.1962,1.185,.9144,-.1848,1.253,.9368,-.1663,1.3892,.9954,-.1111,1.5253,1.0794,-.039,1.6615,1.1933,.039,1.7976,1.337,.1111,1.9667,1.5505,.1764
        ,2.0783,1.7185,.199,2.0976,1.7542,.2,-1,.0375,.1034,.0065,.028,.0098,.0183,.1009,.0281,.0276,.1899,.0429,.0365,.3858,.0542,.0382,.4846,.0485,.0477,.682,.0132,.0802,.8795,-.0466,.1467,1.077,-.1147,.2475,1.2745,-.1711,.3719,1.4719,-.1988,.4699,1.62,-.1962,.5945,1.8175,-.1663,.7022,2.015,-.1111,.7846,2.2125
        ,-.039,.8371,2.41,.039,.8598,2.6074,.1111,.8571,2.8047,.1663,.8475,2.8987,.1848,.8318,2.9807,.1962,.8214,3.0146,.199,.8092,3.0426,.2,-1,-.5181,.5485,.0339,.0407,.0192,.0728,.0944,.036,.1128,.1562,.0483,.151,.2208,.0541,.1869,.2856,.0524,.2416,.3829,.0346,.2821,.4477,.0132,.3824,.5773,-.0466,.5168
        ,.7069,-.1147,.6854,.8365,-.1711,.8777,.9662,-.1988,1.0757,1.0958,-.1914,1.2649,1.2254,-.1546,1.4348,1.355,-.0943,1.5778,1.4846,-.0196,1.6906,1.6143,.0581,1.7742,1.7439,.1269,1.8066,1.8087,.1546,1.8333,1.8725,.1764,1.8513,1.9309,.1914,1.856,1.9565,.1962,1.8573,1.9787,.199,1.8547,1.9971,.2,-1,.0872,.0412,.0055,.0289,.0098
        ,.0149,.1043,.0281,.0212,.1963,.0429,.0235,.3988,.0542,.0219,.5009,.0485,.0225,.654,.0248,.0412,.8581,-.0302,.092,1.0623,-.098,.1782,1.2664,-.1591,.2915,1.4706,-.1952,.3533,1.5726,-.2,.4757,1.7768,-.1848,.5864,1.9809,-.1414,.6757,2.185,-.0765,.7367,2.3892,0,.7674,2.5933,.0765,.7699,2.7975,.1414,.7497,2.9965
        ,.1848,.7312,3.0812,.1962,.7197,3.1163,.199,.7066,3.1453,.2,.2205,-.4044,1,.0321,.0043,.0098,.2174,.0459,.0429,.4418,.1127,.0542,.6679,.1845,.0346,.8941,.2418,-.0145,1.1202,.2695,-.0809,1.3463,.2615,-.1456,1.5725,.2234,-.1893,1.7986,.1702,-.199,2.0248,.1194,-.1764,2.2509,.0829,-.1269,2.477,.07,-.0581,2.7032
        ,.0862,.0196,2.9293,.1327,.0943,3.1554,.2061,.1546,3.3686,.2974,.1914,3.4521,.3447,.199,3.4842,.3677,.2,-.1711,.308,1,.0631,.0192,.0192,.2422,.0913,.0483,.4429,.1864,.0524,.6439,.2815,.0248,.8449,.3577,-.0302,1.0459,.4017,-.098,1.1464,.4102,-.1307,1.2468,.4104,-.1591,1.3473,.4037,-.1812,1.4478,.3919,-.1952
        ,1.6488,.3631,-.1962,1.8498,.34,-.1663,2.0508,.3339,-.1111,2.2518,.353,-.039,2.4527,.402,.039,2.6537,.4809,.1111,2.8545,.585,.1663,3.0336,.7008,.1962,3.0966,.7552,.2,.9777,.7936,1,.033,.0034,.0098,.224,.0393,.0429,.4552,.0993,.0542,.6882,.1642,.0346,.9212,.2147,-.0145,1.1542,.2355,-.0809,1.3872,.2207
        ,-.1456,1.6202,.1757,-.1893,1.8531,.1157,-.199,2.0861,.058,-.1764,2.3191,.0147,-.1269,2.5521,-.0051,-.0581,2.7851,.0043,.0196,3.0181,.0439,.0943,3.2511,.1104,.1546,3.4708,.1953,.1914,3.5568,.24,.199,3.5898,.2621,.2,-.2526,.0755,1,.0627,.0196,.0192,.2407,.0928,.0483,.4403,.189,.0524,.6401,.2853,.0248,.8398
        ,.3627,-.0302,1.0396,.408,-.098,1.1395,.4171,-.1307,1.2394,.4178,-.1591,1.3393,.4117,-.1812,1.4392,.4006,-.1952,1.639,.3729,-.1962,1.8388,.351,-.1663,2.0386,.3461,-.1111,2.2384,.3664,-.039,2.4381,.4166,.039,2.6379,.4967,.1111,2.8375,.602,.1663,3.0155,.7189,.1962,3.0782,.7737,.2,-.3021,-.225,1,.0628,.0194,.0192
        ,.2412,.0922,.0483,.4412,.1881,.0524,.6415,.2839,.0248,.8417,.3609,-.0302,1.0419,.4057,-.098,1.142,.4146,-.1307,1.2421,.4151,-.1591,1.3423,.4087,-.1812,1.4424,.3974,-.1952,1.6426,.3693,-.1962,1.8428,.347,-.1663,2.043,.3416,-.1111,2.2433,.3615,-.039,2.4435,.4113,.039,2.6437,.4909,.1111,2.8437,.5958,.1663,3.0221,.7123
        ,.1962,3.085,.7669,.2];
        ret.assemble(strandNumVerts, rootRelativePositions);
        return ret;
    }

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
            this.head = cloning ? child_head(scene, this, source.head) : child_head(scene, this);

            this.id = this.name;
            this.billboardMode  = 0;
            this.isVisible  = false; //always false; evaluated again at bottom
            this.setEnabled(true);
            this.checkCollisions = false;
            this.receiveShadows  = false;
            this.castShadows  = false;
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
                this.setMaterialByID("strands.Multimaterial#0");
                this.subMeshes = [];
                new _B.SubMesh(0, 0, 8, 0, 36, this);
                new _B.SubMesh(1, 8, 0, 36, 0, this);
                if (scene._selectionOctree) {
                    scene.createOrUpdateSelectionOctree();
                }
            }
            if (this.postConstruction) this.postConstruction();
            load = (_B.Tools.Now - load) / 1000;
            _B.Tools.Log("defined mesh: " + this.name + (cloning ? " (cloned)" : "") + " completed:  " + load.toFixed(2) + ", geometry:  " + geo.toFixed(2) + ", skey:  " + shape.toFixed(2) + " secs");
            if (matLoaded){
                if (typeof this.grandEntrance == "function") this.grandEntrance();
                else makeVisible(this);

            } else waitingMeshes.push(this);
        }
        return Cube;
    })(_B.Mesh);
    strands.Cube = Cube;

    function defineCameras(scene) {
        var camera;

        camera = new _B.ArcRotateCamera("Camera", 1.4999, 1.5529, 12.2064, scene.getMeshByID("Cube"), scene);
        camera.setCameraRigMode(0,{interaxialDistance: .0637});
        camera.rotation = new _B.Vector3(.1751,-2.9847,.0131);
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
    strands.defineCameras = defineCameras;

    function defineLights(scene) {
        var light;

        light = new _B.PointLight("Point", new _B.Vector3(-1.727,-2.4094,4.3505), scene);
        light.intensity = 1;
        light.diffuse = new _B.Color3(1,1,1);
        light.specular = new _B.Color3(1,1,1);
        var camlight = scene.getLightByName("Point");
        scene.beforeCameraRender = function () {
            var cam = (scene.activeCameras.length > 0) ? scene.activeCameras[0] : scene.activeCamera;
            // move the light to match where the camera is
            camlight.position = cam.position;
            camlight.rotation = cam.rotation;
        };

    }
    strands.defineLights = defineLights;

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
    strands.freshenShadowRenderLists = freshenShadowRenderLists;
})(strands || (strands = {}));