// File generated with VoiceSync.ts version: 1.0 on Thu Sep 07 2017
// I'm melting
// AY11^4+4!CRYING@10 M_M EH1 L T IH1 NG_

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
    var iAmMelting = (function (_super) {
        __extends(iAmMelting, _super);
        function iAmMelting(fullPathUrl, scene, deleteOnceSaid) {
            _super.call(this, "VoiceSync", fullPathUrl, scene);
            if (deleteOnceSaid) {
                var ref = this;
                this.onended = function() { ref.dispose(); }
            }
        }
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        iAmMelting.prototype.say = function(automaton, isFirstSentence, isLastSentence) {
            var ref = this;
            var deforms = new Array(8);
            deforms[0] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "CRYING_TALK"], [1, 1], 262.5, null, null, {sound : ref});
            deforms[1] = new QI.VertexDeformation("FACE", "BASIS", ["B-M-P", "CRYING_TALK"], [1, 1], 75, null, null, null);
            deforms[2] = new QI.VertexDeformation("FACE", "BASIS", ["B-M-P", "CRYING_TALK"], [1, 1], 75, null, null, {millisBefore: 75});
            deforms[3] = new QI.VertexDeformation("FACE", "BASIS", ["AE-EH", "CRYING_TALK"], [1, 1], 225, null, null, null);
            deforms[4] = new QI.VertexDeformation("FACE", "BASIS", ["L", "CRYING_TALK"], [1, 1], 75, null, null, null);
            deforms[5] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "CRYING_TALK"], [1, 1], 312, null, null, null);
            deforms[6] = new QI.VertexDeformation("FACE", "BASIS", [".", "CRYING_TALK"], [1, 1], 75, null, null, null);
            deforms[7] = function() { automaton.setCurrentMood("CRYING", 1, !isLastSentence); }

            if (!isFirstSentence) automaton.queueSingleEvent(new QI.Stall(300, "FACE"));
            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        var newStateNames;
        /**
         * Call this as early as possible on the mesh passed after addStockExpressions() has been called.
         */
        iAmMelting.prototype.precompile = function(automaton) {
            newStateNames = new Array(8);
            var faceGrp = automaton.getShapeKeyGroup("FACE");
            newStateNames[0] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "CRYING_TALK"], [1, 1], null);
            newStateNames[1] = faceGrp.addComboDerivedKey("BASIS", ["B-M-P", "CRYING_TALK"], [1, 1], null);
            newStateNames[2] = faceGrp.addComboDerivedKey("BASIS", ["B-M-P", "CRYING_TALK"], [1, 1], null);
            newStateNames[3] = faceGrp.addComboDerivedKey("BASIS", ["AE-EH", "CRYING_TALK"], [1, 1], null);
            newStateNames[4] = faceGrp.addComboDerivedKey("BASIS", ["L", "CRYING_TALK"], [1, 1], null);
            newStateNames[5] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "CRYING_TALK"], [1, 1], null);
            newStateNames[6] = faceGrp.addComboDerivedKey("BASIS", [".", "CRYING_TALK"], [1, 1], null);
        };
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        iAmMelting.prototype.sayCompiled = function(automaton, isFirstSentence, isLastSentence) {
            var ref = this;
            var deforms = new Array(8);
            deforms[0] = new QI.Deformation("FACE", newStateNames[0], 1, 262.5, null, null, {sound : ref});
            deforms[1] = new QI.Deformation("FACE", newStateNames[1], 1, 75, null, null, null);
            deforms[2] = new QI.Deformation("FACE", newStateNames[2], 1, 75, null, null, {millisBefore: 75});
            deforms[3] = new QI.Deformation("FACE", newStateNames[3], 1, 225, null, null, null);
            deforms[4] = new QI.Deformation("FACE", newStateNames[4], 1, 75, null, null, null);
            deforms[5] = new QI.Deformation("FACE", newStateNames[5], 1, 312, null, null, null);
            deforms[6] = new QI.Deformation("FACE", newStateNames[6], 1, 75, null, null, null);
            deforms[7] = function() { automaton.setCurrentMood("CRYING", 1, !isLastSentence); }

            if (!isFirstSentence) automaton.queueSingleEvent(new QI.Stall(300, "FACE"));
            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        return iAmMelting;
    }(BABYLON.Sound));
    VoiceSync.iAmMelting = iAmMelting;
})(VoiceSync || (VoiceSync = {}));
