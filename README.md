# My Test Scenes #
It became necessary to be able to both commit some of my 3D scenes to a repository to track changes as well as occasionally refer to some of them to others.  A Github.io repository is an ideal choice for this.

All the scenes are done using the Babylon.JS framework.  Almost all of them also originate in part from Blender.  I have been working on a pair of exporters for Blender.  One exports JSON formatted file with a .babylon extension.  The other, called Tower of Babel, exports Javascript modules with in-line geometry.  Beyond ensuring that there is a script tag for the file, there is no formal loading process.  You just write `var mesh = new moduleNm.meshClass('name', scene ...);`.

`moduleNm.meshClass` is generated as a sub-class of `BABYLON.Mesh`.  You can even specify the base class in Blender to inherit from.  This means you might write a Typescript super class to have methods to handle things in an OO manner.

## Queued Interpolation (QI) Animation System ##
The OO properties of the Javascript exporter are used to implement the QI animation system.  There is a `QI.Mesh` class which should be indicated as the base class in Blender for each mesh wishing to use it.  The most notable feature of QI is queuing of animations in advance, then just forgetting about them at the application level.

There are many scenes in the development of QI in this repository in several categories.

### Theatrical ###
There was a need for scenes where multiple aspects of QI were integrated in something that did not like a tool.  Working on these involved important use testing, bug finding, and demo aspects.  Not to mention, I also need some time to get some scene development experience.

#### [Whoopstopia](https://palmer-jc.github.io/scenes/whoopstopia/) ####
This scene, implemented for QI 1.0, was a real world test for:
- Skeleton interpolation
- Camera animation
- Timeline play speed
- Using a `BABYLON.HighlightLayer` for a flashing neon effect on the swinging sign (Not currently working in BJS 3.0)

The most difficult skeleton routine I could think of was the opening pass of the floor routine of Simone Biles.  It was difficult tracking rotation after the first "flip",.  This caused the need to be able to specify `absoluteMovement` and `absoluteRotation` options for a `MotionEvent`.  Parts of the routine are clearly tortured, but hey, did she jump over a fire? ;-)

#### [Blow Me, Baby](https://palmer-jc.github.io/scenes/blow_me_baby/) ####
This was put together from a request for demos which came out for the [2017 Khronos / Siggraph conference](https://www.khronos.org/webgl/wiki/Presentations#SIGGRAPH_2017_WebGL_BOF).  The theme was "Birds of a Feather".  Butterflies looked a lot more believable flying in place then birds.

#### [Point Of View Movement & Rotation](https://palmer-jc.github.io/scenes/QueuedInterpolation/POV/) ####
This is a very early scene to verify how integrating POV movement & rotation worked together.  Those cubes are merely moving "forward" as viewed from behind the front of it.  Also, tested the Timeline fixed frame rate capability.  No such MP4 output capability, well yet.

### Shapekeys / Morphing ###
QI exports Blender shapekeys as morph targets of a `QI.ShapekeyGroup` class.  There can be multiple groups per mesh, e.g. face, eyes, eyelids, left hand fingers, right hand fingers, & breasts.  In Blender, the group is designated by the name of the shapekey.  Anything preceding '-' is the name of the group.  Each group has its own animation queue.  That means they all can be animated separately.  Here are some scenes I have made.

#### [Finger Shapekeys](https://palmer-jc.github.io/scenes/QueuedInterpolation/finger_shapekeys/) ####
This scene has a MakeHuman mesh, where the material, except for the hands, is transparent.  There are 2 shapekey groups, one for each hand.  Fingers can easily take up 30 bones, so implementing using shapekeys is very attractive.  This is a must for iOS, where skeleton size is very limited.

Shapekeys are not as good as bones for finger.  Slow down the transitions using the controls, and you will see why.  You cannot tell the difference as long as no more than 200 milli-seconds is taken.

The other reason people use bones is the shear difficulty using morph targets for fingers.  Actually, bones (IK bones) are or were used to make the targets.  There is an entire work flow that has been developed.  While not technically part of `QI.Automaton`, the work flow is described at the end of its [documentation](https://github.com/BabylonJS/Extensions/tree/master/QueuedInterpolation/src/meshes/automaton#finger-shapekeys).

#### [Flying Carpet](https://palmer-jc.github.io/scenes/QueuedInterpolation/flying_carpet/) ####
This is a whole scene about a plane mesh with one morph target, where it folds like a cloth over a table.  This scene was been co-opted to handle the testing of new features more than once, due to its simplicity.  Currently, it is also testing out [QI.Transition](https://github.com/BabylonJS/Extensions/tree/master/QueuedInterpolation/src/transitions).  The transition chosen is at random, so reload the scene multiple times to see them all.

#### [Multi Shapekey Groups](https://palmer-jc.github.io/scenes/QueuedInterpolation/multi_shapekey_groups/) ####
A very early scene testing out having more than on `QI.ShapeKeyGroup`.  It demonstrates the conflict that can occur when 2 groups share some vertices.

### Tools ###
QI needed some scenes to continue the development process, or test out code in a clinical way.  There are actually 2 more scenes which have not been committed yet as well.

#### [Automaton QA](https://palmer-jc.github.io/scenes/QueuedInterpolation/automaton/) ####
The [QI.Automaton](https://github.com/BabylonJS/Extensions/tree/master/QueuedInterpolation/src/meshes/automaton) class deals with all the shapekey groups used for facial expressions.  This scene tries to test all aspects of that in addition to developing the expressions.  The busts of cross scene reusable characters are used.

#### [Audio Recorder](https://palmer-jc.github.io/scenes/QueuedInterpolation/audio_recorder/) ####
This scene takes a loaded .wav file or microphone input and generates an in-line .js or .ts file.  The QI uses some stock sounds.  This allows sound to be placed directly in code, making deployment of a library referencing sounds simple.

### Reusable Characters & "Sets" using Dynamically Loaded JS (Read Ahead) ###
The characters directory does not contain any complete scenes, but rather has the exports of makehuman characters & their busts.  This means multiple scenes can use the same meshes.

Beyond the implications of re-usability for this or other repos, .js files also easily allow for dynamically being added to a scene, since there is no "load" like for a JSON file.  Further, downloading files in browsers is not done in the UI thread, so things might be retrieved in advance of them being needed.  The exported .js even have a small entry point to bring down the data for textures in advance as well.

The sets directory (not yet committed) contains sections or chunks of scenes, which can added on to an existing scene.  These too can be downloaded in advance.

## Blender Exporter QA Scenes ##
Writing a set of exporters for Blender to BJS (JSON & JS formats) required some scenes which were kept around to observe that changes had not broken them.  The scenes do not really do all that much.  The point is that the exports keep on working.  The JS format is the one which is actually being run by the links.  Links to the JSON format versions are listed in the descriptions.

#### [Get Baked](https://palmer-jc.github.io/scenes/get_baked/) ####
This scene tests the baking of both procedural textures as well as the baking of cycles materials. [JSON](https://palmer-jc.github.io/scenes/get_baked/index_JSON.html)

#### [Camera Animation](https://palmer-jc.github.io/scenes/camera_anim/) ####
This tests the conversion of a Blender animation action to a BJS AnimationRange in the built-in animation system.  The animation is the movement of the camera amongst some blocks in a loop pattern.  [JSON](https://palmer-jc.github.io/scenes/camera_anim/index_JSON.html)

#### [Armature](https://palmer-jc.github.io/scenes/QueuedInterpolation/armature/) ####
The exporters also support motion capture exporting to the built-in animation system.  This is the scene used to verify it is working.  The QueuedInterpolation animation system does not use motion capture.  It uses poses exported from a Blender pose libraries, switched between in Javascript. [JSON](https://palmer-jc.github.io/scenes/QueuedInterpolation/armature/index_JSON.html)

#### [Mesh Parenting](https://palmer-jc.github.io/scenes/QueuedInterpolation/mesh_parent/) ####
The JS file exporter generates a mesh as a sub-class, for meshes without a parent.  Child meshes are generated as members of the parent mesh.  Children are generated as an instance of a mesh rather than a sub-class.  This scene has Gus the gingerbread man mesh with child meshes.  Scene also exercises shadows.

## Tests for Compressed Textures ##
For BJS 3.0, I added a feature which would allow you to use [compressed textures](http://doc.babylonjs.com/tutorials/multi-platform_compressed_textures) across multiple platforms.  There needed to be a couple of scenes to test it.

#### [Compressed Textures](https://palmer-jc.github.io/scenes/compressedTextures/) ####
A scene with a single mesh with a texture that has the name of the texture format written into it.  A very simple test for the detection of the format to use for a given platform.

#### [Mansion](https://palmer-jc.github.io/scenes/mansion/) ####
This is not my scene.  It is one on the Babylon.JS website.  I was testing the batch file conversion script for textures.

## Basic Tests / QAs / Proof of Concepts ##
#### [Device Orientation](https://palmer-jc.github.io/scenes/device_orientation/) ####
Just a box (on the inside) with different colored sides.  Convenient for running tests on iOS & Android.

#### [QI.Hair Proof of Concept](https://palmer-jc.github.io/scenes/hair/) ####
This proof of concept has been greatly improved upon since it was made, but will keep this around until the characters are using the final result of this.

#### [QI.Cylinder Camera](https://palmer-jc.github.io/scenes/QueuedInterpolation/cylinder_camera/) ####
I have given up using the `BABYLON.ArcRotateCamera` for characters I have made in favor of this sub-class of it.  The vertical movement of the mouse moves the pivot point rather than changing the beta. This allows you to zoom your focus from head to toe.  Things came to head when I implemented my first female character with a skirt.

## Abandoned ##
#### [Eye test](https://palmer-jc.github.io/scenes/abandoned/eye_model/) ####
This scene implemented eyes as 2 separate meshes.  The origins of each eye were at the center of the eye.  That enabled the trick of using billboarding to implement the eyes following the camera.  Unfortunately, moving the origin also meant the eyes did not move with the body, if the skeleton rotated.  Now eyes are merged into the `QI.Automaton` mesh on export.  All eye movement is now controlled by shape keys.

#### [Dialog Extension](https://palmer-jc.github.io/scenes/dialog/) ####
This GUI was implemented using all using meshes, so no DOM would be required.  Very similar to BJS's new GUI, so not doing any further changes to this.  Most of the scenes have been converted to use `BABYLON.GUI`.
