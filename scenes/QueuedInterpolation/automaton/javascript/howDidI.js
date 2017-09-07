// File generated with VoiceSync.ts version: 1.0 on Thu Sep 07 2017
// how did i get here
// HH^6+4!SKEPTICAL@10 AW1_D IH0 D_AY1_G IH1 T_HH IY1 R_

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
        howDidI.prototype.say = function(automaton, isFirstSentence, isLastSentence) {
            var ref = this;
            var deforms = new Array(10);
            deforms[0] = new QI.VertexDeformation("FACE", "BASIS", ["AW-OW", "SKEPTICAL_TALK"], [1, 1], 216.3, null, null, {sound : ref});
            deforms[1] = new QI.VertexDeformation("FACE", "BASIS", [".", "SKEPTICAL_TALK"], [1, 1], 75, null, null, null);
            deforms[2] = new QI.VertexDeformation("FACE", "BASIS", [".", "SKEPTICAL_TALK"], [1, 1], 75, null, null, null);
            deforms[3] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "SKEPTICAL_TALK"], [1, 1], 187.5, null, null, {millisBefore: 25});
            deforms[4] = new QI.VertexDeformation("FACE", "BASIS", [".", "SKEPTICAL_TALK"], [1, 1], 75, null, null, null);
            deforms[5] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "SKEPTICAL_TALK"], [1, 1], 197.82500000000002, null, null, {millisBefore: 25});
            deforms[6] = new QI.VertexDeformation("FACE", "BASIS", [".", "SKEPTICAL_TALK"], [1, 1], 75, null, null, null);
            deforms[7] = new QI.VertexDeformation("FACE", "BASIS", ["IY", "SKEPTICAL_TALK"], [1, 1], 112.55, null, null, {millisBefore: 25});
            deforms[8] = new QI.VertexDeformation("FACE", "BASIS", ["ER-R-W", "SKEPTICAL_TALK"], [1, 1], 112.55, null, null, null);
            deforms[9] = function() { automaton.setCurrentMood("SKEPTICAL", 1, !isLastSentence); }

            if (!isFirstSentence) automaton.queueSingleEvent(new QI.Stall(300, "FACE"));
            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        var newStateNames;
        /**
         * Call this as early as possible on the mesh passed after addStockExpressions() has been called.
         */
        howDidI.prototype.precompile = function(automaton) {
            newStateNames = new Array(10);
            var faceGrp = automaton.getShapeKeyGroup("FACE");
            newStateNames[0] = faceGrp.addComboDerivedKey("BASIS", ["AW-OW", "SKEPTICAL_TALK"], [1, 1], null);
            newStateNames[1] = faceGrp.addComboDerivedKey("BASIS", [".", "SKEPTICAL_TALK"], [1, 1], null);
            newStateNames[2] = faceGrp.addComboDerivedKey("BASIS", [".", "SKEPTICAL_TALK"], [1, 1], null);
            newStateNames[3] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "SKEPTICAL_TALK"], [1, 1], null);
            newStateNames[4] = faceGrp.addComboDerivedKey("BASIS", [".", "SKEPTICAL_TALK"], [1, 1], null);
            newStateNames[5] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "SKEPTICAL_TALK"], [1, 1], null);
            newStateNames[6] = faceGrp.addComboDerivedKey("BASIS", [".", "SKEPTICAL_TALK"], [1, 1], null);
            newStateNames[7] = faceGrp.addComboDerivedKey("BASIS", ["IY", "SKEPTICAL_TALK"], [1, 1], null);
            newStateNames[8] = faceGrp.addComboDerivedKey("BASIS", ["ER-R-W", "SKEPTICAL_TALK"], [1, 1], null);
        };
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        howDidI.prototype.sayCompiled = function(automaton, isFirstSentence, isLastSentence) {
            var ref = this;
            var deforms = new Array(10);
            deforms[0] = new QI.Deformation("FACE", newStateNames[0], 1, 216.3, null, null, {sound : ref});
            deforms[1] = new QI.Deformation("FACE", newStateNames[1], 1, 75, null, null, null);
            deforms[2] = new QI.Deformation("FACE", newStateNames[2], 1, 75, null, null, null);
            deforms[3] = new QI.Deformation("FACE", newStateNames[3], 1, 187.5, null, null, {millisBefore: 25});
            deforms[4] = new QI.Deformation("FACE", newStateNames[4], 1, 75, null, null, null);
            deforms[5] = new QI.Deformation("FACE", newStateNames[5], 1, 197.82500000000002, null, null, {millisBefore: 25});
            deforms[6] = new QI.Deformation("FACE", newStateNames[6], 1, 75, null, null, null);
            deforms[7] = new QI.Deformation("FACE", newStateNames[7], 1, 112.55, null, null, {millisBefore: 25});
            deforms[8] = new QI.Deformation("FACE", newStateNames[8], 1, 112.55, null, null, null);
            deforms[9] = function() { automaton.setCurrentMood("SKEPTICAL", 1, !isLastSentence); }

            if (!isFirstSentence) automaton.queueSingleEvent(new QI.Stall(300, "FACE"));
            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        return howDidI;
    }(BABYLON.Sound));
    VoiceSync.howDidI = howDidI;
})(VoiceSync || (VoiceSync = {}));
