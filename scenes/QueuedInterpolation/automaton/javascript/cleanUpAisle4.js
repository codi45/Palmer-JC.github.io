// File generated with VoiceSync.ts version: 1.0 on Thu Sep 07 2017
// clean up aisle four
// K^4+4!GRUMPY@4 L IY1 N_AH1 P_AY1 L_F AO1 R_

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
    var cleanUpAisle4 = (function (_super) {
        __extends(cleanUpAisle4, _super);
        function cleanUpAisle4(fullPathUrl, scene, deleteOnceSaid) {
            _super.call(this, "VoiceSync", fullPathUrl, scene);
            if (deleteOnceSaid) {
                var ref = this;
                this.onended = function() { ref.dispose(); }
            }
        }
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        cleanUpAisle4.prototype.say = function(automaton, isFirstSentence, isLastSentence) {
            var ref = this;
            var deforms = new Array(11);
            deforms[0] = new QI.VertexDeformation("FACE", "BASIS", ["L", "GRUMPY_TALK"], [1, 0.4], 75, null, null, {sound : ref});
            deforms[1] = new QI.VertexDeformation("FACE", "BASIS", ["IY", "GRUMPY_TALK"], [1, 0.4], 318.75, null, null, null);
            deforms[2] = new QI.VertexDeformation("FACE", "BASIS", [".", "GRUMPY_TALK"], [1, 0.4], 75, null, null, null);
            deforms[3] = new QI.VertexDeformation("FACE", "BASIS", ["AH", "GRUMPY_TALK"], [1, 0.4], 225, null, null, {millisBefore: 75});
            deforms[4] = new QI.VertexDeformation("FACE", "BASIS", ["B-M-P", "GRUMPY_TALK"], [1, 0.4], 56.3, null, null, null);
            deforms[5] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "GRUMPY_TALK"], [1, 0.4], 262.5, null, null, {millisBefore: 75});
            deforms[6] = new QI.VertexDeformation("FACE", "BASIS", ["L", "GRUMPY_TALK"], [1, 0.4], 75, null, null, null);
            deforms[7] = new QI.VertexDeformation("FACE", "BASIS", ["F-V", "GRUMPY_TALK"], [1, 0.4], 112.5, null, null, {millisBefore: 75});
            deforms[8] = new QI.VertexDeformation("FACE", "BASIS", ["AO", "GRUMPY_TALK"], [1, 0.4], 131.25, null, null, null);
            deforms[9] = new QI.VertexDeformation("FACE", "BASIS", ["ER-R-W", "GRUMPY_TALK"], [1, 0.4], 187.55, null, null, null);
            deforms[10] = function() { automaton.setCurrentMood("GRUMPY", 0.4, !isLastSentence); }

            if (!isFirstSentence) automaton.queueSingleEvent(new QI.Stall(300, "FACE"));
            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        var newStateNames;
        /**
         * Call this as early as possible on the mesh passed after addStockExpressions() has been called.
         */
        cleanUpAisle4.prototype.precompile = function(automaton) {
            newStateNames = new Array(11);
            var faceGrp = automaton.getShapeKeyGroup("FACE");
            newStateNames[0] = faceGrp.addComboDerivedKey("BASIS", ["L", "GRUMPY_TALK"], [1, 0.4], null);
            newStateNames[1] = faceGrp.addComboDerivedKey("BASIS", ["IY", "GRUMPY_TALK"], [1, 0.4], null);
            newStateNames[2] = faceGrp.addComboDerivedKey("BASIS", [".", "GRUMPY_TALK"], [1, 0.4], null);
            newStateNames[3] = faceGrp.addComboDerivedKey("BASIS", ["AH", "GRUMPY_TALK"], [1, 0.4], null);
            newStateNames[4] = faceGrp.addComboDerivedKey("BASIS", ["B-M-P", "GRUMPY_TALK"], [1, 0.4], null);
            newStateNames[5] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "GRUMPY_TALK"], [1, 0.4], null);
            newStateNames[6] = faceGrp.addComboDerivedKey("BASIS", ["L", "GRUMPY_TALK"], [1, 0.4], null);
            newStateNames[7] = faceGrp.addComboDerivedKey("BASIS", ["F-V", "GRUMPY_TALK"], [1, 0.4], null);
            newStateNames[8] = faceGrp.addComboDerivedKey("BASIS", ["AO", "GRUMPY_TALK"], [1, 0.4], null);
            newStateNames[9] = faceGrp.addComboDerivedKey("BASIS", ["ER-R-W", "GRUMPY_TALK"], [1, 0.4], null);
        };
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        cleanUpAisle4.prototype.sayCompiled = function(automaton, isFirstSentence, isLastSentence) {
            var ref = this;
            var deforms = new Array(11);
            deforms[0] = new QI.Deformation("FACE", newStateNames[0], 1, 75, null, null, {sound : ref});
            deforms[1] = new QI.Deformation("FACE", newStateNames[1], 1, 318.75, null, null, null);
            deforms[2] = new QI.Deformation("FACE", newStateNames[2], 1, 75, null, null, null);
            deforms[3] = new QI.Deformation("FACE", newStateNames[3], 1, 225, null, null, {millisBefore: 75});
            deforms[4] = new QI.Deformation("FACE", newStateNames[4], 1, 56.3, null, null, null);
            deforms[5] = new QI.Deformation("FACE", newStateNames[5], 1, 262.5, null, null, {millisBefore: 75});
            deforms[6] = new QI.Deformation("FACE", newStateNames[6], 1, 75, null, null, null);
            deforms[7] = new QI.Deformation("FACE", newStateNames[7], 1, 112.5, null, null, {millisBefore: 75});
            deforms[8] = new QI.Deformation("FACE", newStateNames[8], 1, 131.25, null, null, null);
            deforms[9] = new QI.Deformation("FACE", newStateNames[9], 1, 187.55, null, null, null);
            deforms[10] = function() { automaton.setCurrentMood("GRUMPY", 0.4, !isLastSentence); }

            if (!isFirstSentence) automaton.queueSingleEvent(new QI.Stall(300, "FACE"));
            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        return cleanUpAisle4;
    }(BABYLON.Sound));
    VoiceSync.cleanUpAisle4 = cleanUpAisle4;
})(VoiceSync || (VoiceSync = {}));
