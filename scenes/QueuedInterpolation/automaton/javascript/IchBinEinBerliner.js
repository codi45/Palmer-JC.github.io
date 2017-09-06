// File generated with VoiceSync.ts version: 1.0-beta on Sun Sep 03 2017
// fish bin mine berlin feeder
// IH11^4+4!HAPPY@6 SH_B IH1 N_AY1^3 N_B^3 ER0 L IH1 N ER0_

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
    var IchBinEinBerliner = (function (_super) {
        __extends(IchBinEinBerliner, _super);
        function IchBinEinBerliner(fullPathUrl, scene, deleteOnceSaid) {
            _super.call(this, "VoiceSync", fullPathUrl, scene);
            if (deleteOnceSaid) {
                var ref = this;
                this.onended = function() { ref.dispose(); }
            }
        }
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        IchBinEinBerliner.prototype.say = function(automaton, isLastSentence) {
            var ref = this;
            var deforms = new Array(13);
            deforms[0] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "HAPPY_NM"], [1, 0.6], 206.3, null, null, {sound : ref});
            deforms[1] = new QI.VertexDeformation("FACE", "BASIS", ["CH-JH-SH-ZH", "HAPPY_NM"], [1, 0.6], 112.5, null, null, null);
            deforms[2] = new QI.VertexDeformation("FACE", "BASIS", ["B-M-P", "HAPPY_NM"], [1, 0.6], 112.5, null, null, {millisBefore: 75});
            deforms[3] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "HAPPY_NM"], [1, 0.6], 262.55, null, null, null);
            deforms[4] = new QI.VertexDeformation("FACE", "BASIS", [".", "HAPPY_NM"], [1, 0.6], 56.3, null, null, null);
            deforms[5] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "HAPPY_NM"], [1, 0.6], 375, null, null, {millisBefore: 75});
            deforms[6] = new QI.VertexDeformation("FACE", "BASIS", [".", "HAPPY_NM"], [1, 0.6], 75, null, null, null);
            deforms[7] = new QI.VertexDeformation("FACE", "BASIS", ["B-M-P", "HAPPY_NM"], [1, 0.6], 150, null, null, {millisBefore: 100});
            deforms[8] = new QI.VertexDeformation("FACE", "BASIS", ["ER-R-W", "HAPPY_NM"], [1, 0.6], 75, null, null, null);
            deforms[9] = new QI.VertexDeformation("FACE", "BASIS", ["L", "HAPPY_NM"], [1, 0.6], 100, null, null, null);
            deforms[10] = new QI.VertexDeformation("FACE", "BASIS", ["AY-IH", "HAPPY_NM"], [1, 0.6], 225, null, null, null);
            deforms[11] = new QI.VertexDeformation("FACE", "BASIS", ["ER-R-W", "HAPPY_NM"], [1, 0.6], 225, null, null, null);
            deforms[12] = function() { automaton.setCurrentMood("HAPPY", 0.6, !isLastSentence); }

            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        var newStateNames;
        /**
         * Call this as early as possible on the mesh passed after addStockExpressions() has been called.
         */
        IchBinEinBerliner.prototype.precompile = function(automaton) {
            newStateNames = new Array(13);
            var faceGrp = automaton.getShapeKeyGroup("FACE");
            newStateNames[0] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[1] = faceGrp.addComboDerivedKey("BASIS", ["CH-JH-SH-ZH", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[2] = faceGrp.addComboDerivedKey("BASIS", ["B-M-P", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[3] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[4] = faceGrp.addComboDerivedKey("BASIS", [".", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[5] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[6] = faceGrp.addComboDerivedKey("BASIS", [".", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[7] = faceGrp.addComboDerivedKey("BASIS", ["B-M-P", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[8] = faceGrp.addComboDerivedKey("BASIS", ["ER-R-W", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[9] = faceGrp.addComboDerivedKey("BASIS", ["L", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[10] = faceGrp.addComboDerivedKey("BASIS", ["AY-IH", "HAPPY_NM"], [1, 0.6], null);
            newStateNames[11] = faceGrp.addComboDerivedKey("BASIS", ["ER-R-W", "HAPPY_NM"], [1, 0.6], null);
        };
        /**
         * @returns QI.MotionEvent[], so these may be further paired with other events using syncPartner() or option.requireCompletionOf.
         */
        IchBinEinBerliner.prototype.sayCompiled = function(automaton, isLastSentence) {
            var ref = this;
            var deforms = new Array(13);
            deforms[0] = new QI.Deformation("FACE", newStateNames[0], 1, 206.3, null, null, {sound : ref});
            deforms[1] = new QI.Deformation("FACE", newStateNames[1], 1, 112.5, null, null, null);
            deforms[2] = new QI.Deformation("FACE", newStateNames[2], 1, 112.5, null, null, {millisBefore: 75});
            deforms[3] = new QI.Deformation("FACE", newStateNames[3], 1, 262.55, null, null, null);
            deforms[4] = new QI.Deformation("FACE", newStateNames[4], 1, 56.3, null, null, null);
            deforms[5] = new QI.Deformation("FACE", newStateNames[5], 1, 375, null, null, {millisBefore: 75});
            deforms[6] = new QI.Deformation("FACE", newStateNames[6], 1, 75, null, null, null);
            deforms[7] = new QI.Deformation("FACE", newStateNames[7], 1, 150, null, null, {millisBefore: 100});
            deforms[8] = new QI.Deformation("FACE", newStateNames[8], 1, 75, null, null, null);
            deforms[9] = new QI.Deformation("FACE", newStateNames[9], 1, 100, null, null, null);
            deforms[10] = new QI.Deformation("FACE", newStateNames[10], 1, 225, null, null, null);
            deforms[11] = new QI.Deformation("FACE", newStateNames[11], 1, 225, null, null, null);
            deforms[12] = function() { automaton.setCurrentMood("HAPPY", 0.6, !isLastSentence); }

            automaton.queueEventSeries(new QI.EventSeries(deforms, 1, 1, "FACE"));
            return deforms;
        };
        return IchBinEinBerliner;
    }(BABYLON.Sound));
    VoiceSync.IchBinEinBerliner = IchBinEinBerliner;
})(VoiceSync || (VoiceSync = {}));
