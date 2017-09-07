// File generated with VoiceSync.ts version: 1.0 on Thu Sep 07 2017
// get me the hell out of here
// G^3+4!ANGRY@10 EH1 T_M IY1_DH AH0_HH^6 EH1 L_AW1 T_AH1 V_HH IY1 R_

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
    var getMeOut = (function (_super) {
        __extends(getMeOut, _super);
        function getMeOut(fullPathUrl, scene, deleteOnceSaid) {
            _super.call(this, "VoiceSync", fullPathUrl, scene);
            if (deleteOnceSaid) {
                var ref = this;
                this.onended = function() { ref.dispose(); }
            }
        }
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        getMeOut.prototype.say = function(automaton, isFirstSentence, isLastSentence) {
            var ref = this;
            var deforms = new Array(16);
            deforms[0] = new QI.VertexDeformation("FACE", "BASIS", ["AE-EH", "ANGRY_TALK"], [1, 1], 365.9, null, null, {sound : ref});
            deforms[1] = new QI.VertexDeformation("FACE", "BASIS", [".", "ANGRY_TALK"], [1, 1], 75, null, null, null);
            deforms[2] = new QI.VertexDeformation("FACE", "BASIS", ["B-M-P", "ANGRY_TALK"], [1, 1], 100, null, null, {millisBefore: 100});
            deforms[3] = new QI.VertexDeformation("FACE", "BASIS", ["IY", "ANGRY_TALK"], [1, 1], 300, null, null, null);
            deforms[4] = new QI.VertexDeformation("FACE", "BASIS", [".", "ANGRY_TALK"], [1, 1], 75, null, null, null);
            deforms[5] = new QI.VertexDeformation("FACE", "BASIS", ["DH-TH", "ANGRY_TALK"], [1, 1], 75, null, null, {millisBefore: 100});
            deforms[6] = new QI.VertexDeformation("FACE", "BASIS", [".", "ANGRY_TALK"], [1, 1], 75, null, null, null);
            deforms[7] = new QI.VertexDeformation("FACE", "BASIS", ["AE-EH", "ANGRY_TALK"], [1, 1], 175, null, null, {millisBefore: 100});
            deforms[8] = new QI.VertexDeformation("FACE", "BASIS", ["L", "ANGRY_TALK"], [1, 1], 25, null, null, null);
            deforms[9] = new QI.VertexDeformation("FACE", "BASIS", ["AW-OW", "ANGRY_TALK"], [1, 1], 207.725, null, null, {millisBefore: 25});
            deforms[10] = new QI.VertexDeformation("FACE", "BASIS", [".", "ANGRY_TALK"], [1, 1], 75, null, null, null);
            deforms[11] = new QI.VertexDeformation("FACE", "BASIS", ["AH", "ANGRY_TALK"], [1, 1], 175, null, null, {millisBefore: 25});
            deforms[12] = new QI.VertexDeformation("FACE", "BASIS", ["F-V", "ANGRY_TALK"], [1, 1], 37.5, null, null, null);
            deforms[13] = new QI.VertexDeformation("FACE", "BASIS", ["IY", "ANGRY_TALK"], [1, 1], 112.55, null, null, {millisBefore: 25});
            deforms[14] = new QI.VertexDeformation("FACE", "BASIS", ["ER-R-W", "ANGRY_TALK"], [1, 1], 112.55, null, null, null);
            deforms[15] = function() { automaton.setCurrentMood("ANGRY", 1, !isLastSentence); }

            if (!isFirstSentence) automaton.queueSingleEvent(new QI.Stall(300, "FACE"));
            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        var newStateNames;
        /**
         * Call this as early as possible on the mesh passed after addStockExpressions() has been called.
         */
        getMeOut.prototype.precompile = function(automaton) {
            newStateNames = new Array(16);
            var faceGrp = automaton.getShapeKeyGroup("FACE");
            newStateNames[0] = faceGrp.addComboDerivedKey("BASIS", ["AE-EH", "ANGRY_TALK"], [1, 1], null);
            newStateNames[1] = faceGrp.addComboDerivedKey("BASIS", [".", "ANGRY_TALK"], [1, 1], null);
            newStateNames[2] = faceGrp.addComboDerivedKey("BASIS", ["B-M-P", "ANGRY_TALK"], [1, 1], null);
            newStateNames[3] = faceGrp.addComboDerivedKey("BASIS", ["IY", "ANGRY_TALK"], [1, 1], null);
            newStateNames[4] = faceGrp.addComboDerivedKey("BASIS", [".", "ANGRY_TALK"], [1, 1], null);
            newStateNames[5] = faceGrp.addComboDerivedKey("BASIS", ["DH-TH", "ANGRY_TALK"], [1, 1], null);
            newStateNames[6] = faceGrp.addComboDerivedKey("BASIS", [".", "ANGRY_TALK"], [1, 1], null);
            newStateNames[7] = faceGrp.addComboDerivedKey("BASIS", ["AE-EH", "ANGRY_TALK"], [1, 1], null);
            newStateNames[8] = faceGrp.addComboDerivedKey("BASIS", ["L", "ANGRY_TALK"], [1, 1], null);
            newStateNames[9] = faceGrp.addComboDerivedKey("BASIS", ["AW-OW", "ANGRY_TALK"], [1, 1], null);
            newStateNames[10] = faceGrp.addComboDerivedKey("BASIS", [".", "ANGRY_TALK"], [1, 1], null);
            newStateNames[11] = faceGrp.addComboDerivedKey("BASIS", ["AH", "ANGRY_TALK"], [1, 1], null);
            newStateNames[12] = faceGrp.addComboDerivedKey("BASIS", ["F-V", "ANGRY_TALK"], [1, 1], null);
            newStateNames[13] = faceGrp.addComboDerivedKey("BASIS", ["IY", "ANGRY_TALK"], [1, 1], null);
            newStateNames[14] = faceGrp.addComboDerivedKey("BASIS", ["ER-R-W", "ANGRY_TALK"], [1, 1], null);
        };
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        getMeOut.prototype.sayCompiled = function(automaton, isFirstSentence, isLastSentence) {
            var ref = this;
            var deforms = new Array(16);
            deforms[0] = new QI.Deformation("FACE", newStateNames[0], 1, 365.9, null, null, {sound : ref});
            deforms[1] = new QI.Deformation("FACE", newStateNames[1], 1, 75, null, null, null);
            deforms[2] = new QI.Deformation("FACE", newStateNames[2], 1, 100, null, null, {millisBefore: 100});
            deforms[3] = new QI.Deformation("FACE", newStateNames[3], 1, 300, null, null, null);
            deforms[4] = new QI.Deformation("FACE", newStateNames[4], 1, 75, null, null, null);
            deforms[5] = new QI.Deformation("FACE", newStateNames[5], 1, 75, null, null, {millisBefore: 100});
            deforms[6] = new QI.Deformation("FACE", newStateNames[6], 1, 75, null, null, null);
            deforms[7] = new QI.Deformation("FACE", newStateNames[7], 1, 175, null, null, {millisBefore: 100});
            deforms[8] = new QI.Deformation("FACE", newStateNames[8], 1, 25, null, null, null);
            deforms[9] = new QI.Deformation("FACE", newStateNames[9], 1, 207.725, null, null, {millisBefore: 25});
            deforms[10] = new QI.Deformation("FACE", newStateNames[10], 1, 75, null, null, null);
            deforms[11] = new QI.Deformation("FACE", newStateNames[11], 1, 175, null, null, {millisBefore: 25});
            deforms[12] = new QI.Deformation("FACE", newStateNames[12], 1, 37.5, null, null, null);
            deforms[13] = new QI.Deformation("FACE", newStateNames[13], 1, 112.55, null, null, {millisBefore: 25});
            deforms[14] = new QI.Deformation("FACE", newStateNames[14], 1, 112.55, null, null, null);
            deforms[15] = function() { automaton.setCurrentMood("ANGRY", 1, !isLastSentence); }

            if (!isFirstSentence) automaton.queueSingleEvent(new QI.Stall(300, "FACE"));
            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        return getMeOut;
    }(BABYLON.Sound));
    VoiceSync.getMeOut = getMeOut;
})(VoiceSync || (VoiceSync = {}));
