// File generated with VoiceSync.ts version: 1.0-beta on Tue Sep 05 2017
// where am i
// W^4+4!SCARED@4 EH1 R_AE1 M_AY1_

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
    var whereAmI = (function (_super) {
        __extends(whereAmI, _super);
        function whereAmI(fullPathUrl, scene, deleteOnceSaid) {
            _super.call(this, "VoiceSync", fullPathUrl, scene);
            if (deleteOnceSaid) {
                var ref = this;
                this.onended = function() { ref.dispose(); }
            }
        }
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        whereAmI.prototype.say = function(automaton, isLastSentence) {
            var ref = this;
            var deforms = new Array(7);
            deforms[0] = new QI.VertexDeformation("FACE", "BASIS", ["ER-R-W", "SCARED_NM"], [1, 0.4], 56.3, null, null, {millisBefore: 150, sound : ref});
            deforms[1] = new QI.VertexDeformation("FACE", "BASIS", ["AE-EH", "SCARED_NM"], [1, 0.4], 225, null, null, null);
            deforms[2] = new QI.VertexDeformation("FACE", "BASIS", ["ER-R-W", "SCARED_NM"], [1, 0.4], 56.3, null, null, null);
            deforms[3] = new QI.VertexDeformation("FACE", "BASIS", ["AE-EH", "SCARED_NM"], [1, 0.4], 262.5, null, null, {millisBefore: 75});
            deforms[4] = new QI.VertexDeformation("FACE", "BASIS", ["B-M-P", "SCARED_NM"], [1, 0.4], 75, null, null, null);
            deforms[5] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "SCARED_NM"], [1, 0.4], 262.5, null, null, {millisBefore: 75});
            deforms[6] = function() { automaton.setCurrentMood("SCARED", 0.4, !isLastSentence); }

            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        var newStateNames;
        /**
         * Call this as early as possible on the mesh passed after addStockExpressions() has been called.
         */
        whereAmI.prototype.precompile = function(automaton) {
            newStateNames = new Array(7);
            var faceGrp = automaton.getShapeKeyGroup("FACE");
            newStateNames[0] = faceGrp.addComboDerivedKey("BASIS", ["ER-R-W", "SCARED_NM"], [1, 0.4], null);
            newStateNames[1] = faceGrp.addComboDerivedKey("BASIS", ["AE-EH", "SCARED_NM"], [1, 0.4], null);
            newStateNames[2] = faceGrp.addComboDerivedKey("BASIS", ["ER-R-W", "SCARED_NM"], [1, 0.4], null);
            newStateNames[3] = faceGrp.addComboDerivedKey("BASIS", ["AE-EH", "SCARED_NM"], [1, 0.4], null);
            newStateNames[4] = faceGrp.addComboDerivedKey("BASIS", ["B-M-P", "SCARED_NM"], [1, 0.4], null);
            newStateNames[5] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "SCARED_NM"], [1, 0.4], null);
        };
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        whereAmI.prototype.sayCompiled = function(automaton, isLastSentence) {
            var ref = this;
            var deforms = new Array(7);
            deforms[0] = new QI.Deformation("FACE", newStateNames[0], 1, 56.3, null, null, {millisBefore: 150, sound : ref});
            deforms[1] = new QI.Deformation("FACE", newStateNames[1], 1, 225, null, null, null);
            deforms[2] = new QI.Deformation("FACE", newStateNames[2], 1, 56.3, null, null, null);
            deforms[3] = new QI.Deformation("FACE", newStateNames[3], 1, 262.5, null, null, {millisBefore: 75});
            deforms[4] = new QI.Deformation("FACE", newStateNames[4], 1, 75, null, null, null);
            deforms[5] = new QI.Deformation("FACE", newStateNames[5], 1, 262.5, null, null, {millisBefore: 75});
            deforms[6] = function() { automaton.setCurrentMood("SCARED", 0.4, !isLastSentence); }

            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        return whereAmI;
    }(BABYLON.Sound));
    VoiceSync.whereAmI = whereAmI;
})(VoiceSync || (VoiceSync = {}));
