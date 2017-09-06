// File generated with VoiceSync.ts version: 1.0-beta on Tue Sep 05 2017
// how did i get here.
// HH^3+4!SKEPTICAL@10 AW1_D IH1 D_AY1_G EH1 T_HH IY1 R._

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var VoiceSync;
(function (VoiceSync) {
    /**
     * Call this as early as possible, so the sound can already be downloaded.
     * Passing in full path, in case decided to convert .WAV to .MP3, or otherwise need to change name of file
     */
    var howDidI = (function (_super) {
        __extends(howDidI, _super);
        function howDidI(fullPathUrl, scene, deleteOnceSaid) {
            _super.call(this, "VoiceSync", fullPathUrl, scene);
            if (deleteOnceSaid) {
                var ref = this;
                this.onended = function() { ref.dispose(); }
            }
        }
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        howDidI.prototype.say = function(automaton, isLastSentence) {
            var ref = this;
            var deforms = new Array(12);
            deforms[0] = new QI.VertexDeformation("FACE", "BASIS", ["AW-OW", "SKEPTICAL_NM"], [1, 1], 415, null, null, {sound : ref});
            deforms[1] = new QI.VertexDeformation("FACE", "BASIS", [".", "SKEPTICAL_NM"], [1, 1], 75, null, null, null);
            deforms[2] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "SKEPTICAL_NM"], [1, 1], 425, null, null, {millisBefore: 100});
            deforms[3] = new QI.VertexDeformation("FACE", "BASIS", [".", "SKEPTICAL_NM"], [1, 1], 75, null, null, null);
            deforms[4] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "SKEPTICAL_NM"], [1, 1], 300, null, null, {millisBefore: 100});
            deforms[5] = new QI.VertexDeformation("FACE", "BASIS", [".", "SKEPTICAL_NM"], [1, 1], 75, null, null, null);
            deforms[6] = new QI.VertexDeformation("FACE", "BASIS", ["AE-EH", "SKEPTICAL_NM"], [1, 1], 365.9, null, null, {millisBefore: 100});
            deforms[7] = new QI.VertexDeformation("FACE", "BASIS", [".", "SKEPTICAL_NM"], [1, 1], 75, null, null, null);
            deforms[8] = new QI.VertexDeformation("FACE", "BASIS", ["IY", "SKEPTICAL_NM"], [1, 1], 225, null, null, {millisBefore: 100});
            deforms[9] = new QI.VertexDeformation("FACE", "BASIS", ["ER-R-W", "SKEPTICAL_NM"], [1, 1], 225, null, null, null);
            deforms[10] = new QI.VertexDeformation("FACE", "BASIS", [".", "SKEPTICAL_NM"], [1, 1], 75, null, null, null);
            deforms[11] = function() { automaton.setCurrentMood("SKEPTICAL", 1, !isLastSentence); }

            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        var newStateNames;
        /**
         * Call this as early as possible on the mesh passed after addStockExpressions() has been called.
         */
        howDidI.prototype.precompile = function(automaton) {
            newStateNames = new Array(12);
            var faceGrp = automaton.getShapeKeyGroup("FACE");
            newStateNames[0] = faceGrp.addComboDerivedKey("BASIS", ["AW-OW", "SKEPTICAL_NM"], [1, 1], null);
            newStateNames[1] = faceGrp.addComboDerivedKey("BASIS", [".", "SKEPTICAL_NM"], [1, 1], null);
            newStateNames[2] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "SKEPTICAL_NM"], [1, 1], null);
            newStateNames[3] = faceGrp.addComboDerivedKey("BASIS", [".", "SKEPTICAL_NM"], [1, 1], null);
            newStateNames[4] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "SKEPTICAL_NM"], [1, 1], null);
            newStateNames[5] = faceGrp.addComboDerivedKey("BASIS", [".", "SKEPTICAL_NM"], [1, 1], null);
            newStateNames[6] = faceGrp.addComboDerivedKey("BASIS", ["AE-EH", "SKEPTICAL_NM"], [1, 1], null);
            newStateNames[7] = faceGrp.addComboDerivedKey("BASIS", [".", "SKEPTICAL_NM"], [1, 1], null);
            newStateNames[8] = faceGrp.addComboDerivedKey("BASIS", ["IY", "SKEPTICAL_NM"], [1, 1], null);
            newStateNames[9] = faceGrp.addComboDerivedKey("BASIS", ["ER-R-W", "SKEPTICAL_NM"], [1, 1], null);
            newStateNames[10] = faceGrp.addComboDerivedKey("BASIS", [".", "SKEPTICAL_NM"], [1, 1], null);
        };
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        howDidI.prototype.sayCompiled = function(automaton, isLastSentence) {
            var ref = this;
            var deforms = new Array(12);
            deforms[0] = new QI.Deformation("FACE", newStateNames[0], 1, 415, null, null, {sound : ref});
            deforms[1] = new QI.Deformation("FACE", newStateNames[1], 1, 75, null, null, null);
            deforms[2] = new QI.Deformation("FACE", newStateNames[2], 1, 425, null, null, {millisBefore: 100});
            deforms[3] = new QI.Deformation("FACE", newStateNames[3], 1, 75, null, null, null);
            deforms[4] = new QI.Deformation("FACE", newStateNames[4], 1, 300, null, null, {millisBefore: 100});
            deforms[5] = new QI.Deformation("FACE", newStateNames[5], 1, 75, null, null, null);
            deforms[6] = new QI.Deformation("FACE", newStateNames[6], 1, 365.9, null, null, {millisBefore: 100});
            deforms[7] = new QI.Deformation("FACE", newStateNames[7], 1, 75, null, null, null);
            deforms[8] = new QI.Deformation("FACE", newStateNames[8], 1, 225, null, null, {millisBefore: 100});
            deforms[9] = new QI.Deformation("FACE", newStateNames[9], 1, 225, null, null, null);
            deforms[10] = new QI.Deformation("FACE", newStateNames[10], 1, 75, null, null, null);
            deforms[11] = function() { automaton.setCurrentMood("SKEPTICAL", 1, !isLastSentence); }

            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        return howDidI;
    }(BABYLON.Sound));
    VoiceSync.howDidI = howDidI;
})(VoiceSync || (VoiceSync = {}));
