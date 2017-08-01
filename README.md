# My Test Scenes #
I found I needed to both be able to commit some of my 3D scenes to be able to track changes as well as occasionally refer to some of them to others.  A Github.io repository is an ideal choice for this.

All the scenes are done using the Babylon.JS framework.  Almost all of them originate in part from Blender.  I have

## Queued Interpolation (QI) Animation System ##

### Theatrical ###
There was a need for scenes which multiple aspects of QI
#### [Whoopstopia](https://palmer-jc.github.io/scenes/whoopstopia/) ####

---

#### [Blow Me Baby](https://palmer-jc.github.io/scenes/blow_me_baby/) ####


---
#### [Point Of View Movement & Rotation](https://palmer-jc.github.io/scenes/QueuedInterpolation/POV/)####


### Shapekeys / Morphing ###
QI exports Blender shapekeys as morph targets of a `QI.ShapekeyGroup`.  There can be multiple groups per mesh, e.g. face, eyes, eyelids, left hand fingers, right hand fingers, & breasts.  In Blender, the group is designated by the name of the shapekey.  Anything preceeding '-' is the name of the group.  Each group has its own animation queue.  That means they all can be animated separately.  Here are some scenes I have kept.

#### [Finger Shapekeys](https://palmer-jc.github.io/scenes/QueuedInterpolation/finger_shapekeys/) #### 
This scene has a MakeHuman mesh, where the material for all parts, but the hands, is transparent.  There are 2 groups, one for each hand.  Fingers can easily take up 30 bones, so implementing using shapekeys is very attractive.  A must for iOS, where skeleton size is very limited.

Shapekeys are not as good as bones.  Slowdown the transitions using the controls, and you will see why.  You cannot tell the difference as long as less than 200 milli-seconds is used.

The other reason people use bones is the shear difficultly using morph targets.  Actually, bones (IK bones) are or were used to make the targets.  There is an entire workflow that has been developed.  While not technically part of `QI.Automaton`, the workflow is described at the end of its [documentation](https://github.com/BabylonJS/Extensions/tree/master/QueuedInterpolation/src/meshes/automaton#finger-shapekeys).

---
#### [Flying Carpet](https://palmer-jc.github.io/scenes/QueuedInterpolation/flying_carpet/) ####
A whole scene about a plane mesh which folds like a cloth over a table.  This scene was been co-opted to handle the testing of new features more than once, due to its simplicity.  Currently, it is also testing out [QI.Transition](https://github.com/BabylonJS/Extensions/tree/master/QueuedInterpolation/src/transitions).  The transition chosen is random, so reload the scene multiple times to see them all.

---

#### [Multi Shapekey Groups](https://palmer-jc.github.io/scenes/QueuedInterpolation/multi_shapekey_groups/) ####
A very early scene testing out having more than on `QI.ShapeKeyGroup`.

### Tools ###
QI needed some scenes to continue the development process, or test out code in a clinical way.  There are actually 2 more scenes which have not been committed yet as well.

#### [Automaton QA](https://palmer-jc.github.io/scenes/QueuedInterpolation/automaton/) ####

#### [Audio Recorder](https://palmer-jc.github.io/scenes/QueuedInterpolation/audio_recorder/) ####


### Reusable Characters & "Sets" using Dynamically Loaded JS (Read Ahead) ###

## Blender Exporter QA Scenes ##
Writing a set of exporters for Blender to BJS (JSON & JS formats) required some scenes which were kept around to observe that changes had not broken them.  The scenes do not really do all that much.  The point is that the exports keep on working.  The JS format is one actually one being run the links.  Links to the JSON versions are listed in the descriptions.

#### [Get Baked](https://palmer-jc.github.io/scenes/get_baked/) ####
This scene tests the baking of both procedural textures as well as cycles baking. [JSON](https://palmer-jc.github.io/scenes/get_baked/index_JSON.html)

---

#### [Camera Animation](https://palmer-jc.github.io/scenes/camera_anim/) ####
This tests the conversion of a Blender action to a BJS AnimationRange in the built-in animation system.  The animation is the movement of the camera amongst some blocks in a loop pattern.  [JSON](https://palmer-jc.github.io/scenes/camera_anim/index_JSON.html)

---

#### [Armature](https://palmer-jc.github.io/scenes/QueuedInterpolation/armature/) ####
The exporters also support motion capture exporting to the built-in animation system.  This is the scene used to verify it is working.  The QueuedInterpolation animation system does not use motion capture.  It uses poses exported from Blender pose libraries, switched between in Javascript. [JSON](https://palmer-jc.github.io/scenes/QueuedInterpolation/armature/index_JSON.html)

---

#### [Mesh Parenting](https://palmer-jc.github.io/scenes/QueuedInterpolation/mesh_parent/) ####
The JS file exporter generates a mesh as a sub-class for meshes without a parent.  Child meshes are generated as members of the parent mesh.  Children are generated as an instance of a mesh rather than a sub-class.  This scene has Gus the gingerbread man mesh with child meshes.  Scene also excerises shadows.

## Tests for Compressed Textures ##
For BJS 3.0, I added a feature which would allow you to use [compressed textures](http://doc.babylonjs.com/tutorials/multi-platform_compressed_textures) across multiple platforms.  There need to be a couple of scenes to test it.

#### [Compressed Textures](https://palmer-jc.github.io/scenes/compressedTextures/) ####
A single mesh with a texture that has the name of the format written into it.  A very simple test for the detection of the format to use for a given platform.

---

#### [Mansion](https://palmer-jc.github.io/scenes/mansion/) ####
This is not my scene.  It is one on the Babylon.JS website.  I was testing the batch file conversion script.

## Basic Tests / QAs / Proof of Concepts ##
#### [Device Orientation](https://palmer-jc.github.io/scenes/device_orientation/) ####
Just a box (on the inside) with different colored sides.  Convenient for running tests on iOS & Android.

---

#### [QI.Hair Proof of Concept](https://palmer-jc.github.io/scenes/hair/) ####
This proof of concept has greatly improved upon, but will keep this around until the characters are using the final result of this.

---

#### [QI.Cylinder Camera](https://palmer-jc.github.io/scenes/QueuedInterpolation/cylinder_camera/) ####
I have given up using the `BABYLON.ArcRotateCamera` for characters I have made in favor of this sub-class.  The vertical movement of the mouse moves the pivot point rather than changing the beta. This allows you to zoom your focus from head to toe.  Things came to head when I implemented my first female character with a skirt.

## Abandoned ##
#### [Eye test](https://palmer-jc.github.io/scenes/abandoned/eye_model/) ####
This scene implemented eyes as 2 separate meshes.  The origins of which were right at the center of the eye.  That enabled the trick of using billboarding to implement the eyes following the camera.  Unfortunately, moving the origin meant the eyes did not rotate properly if the skeleton rotated.  Now eyes are merged into the `QI.Automaton` mesh.  All movement is now controlled by shape keys.

---

#### [Dialog Extension](https://palmer-jc.github.io/scenes/dialog/) ####
This GUI was implemented all using meshes, so no DOM would be required.  Very similar to BJS's GUI, so not doing any further changes to this.  Most of the scenes have been converted.
