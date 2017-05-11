// commented out version, for when running locally to develop a new character or set.  Only Edge allows texture file:// urls where there are  ../'s
//var rootPath = "../../..";
var rootPath = "https://palmer-jc.github.io";

var characterJukebox = new TOWER_OF_BABEL.Preloader(rootPath + "/characters/javascript/", rootPath + "/characters/images/");

characterJukebox.addCharacter(new TOWER_OF_BABEL.Character("Nate"    , "Nate.min.js", "Nate_Male_muscle_13290"));
characterJukebox.addCharacter(new TOWER_OF_BABEL.Character("owm"     , "owm.min.js" , "Owm_Body"));
//characterJukebox.addCharacter(new TOWER_OF_BABEL.Character("ywf"     , "ywf.min.js" , "Ywf_Female_generic"));

characterJukebox.addBust     (new TOWER_OF_BABEL.Character("NateBust", "NateBust.min.js", "Nate_Male_muscle_13290"));
characterJukebox.addBust     (new TOWER_OF_BABEL.Character("owmBust" , "owmBust.min.js" , "Owm_Body"));
//characterJukebox.addBust     (new TOWER_OF_BABEL.Character("ywfBust" , "ywfBust.min.js" , "Ywf_Female_generic"));
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
var setJukebox = new TOWER_OF_BABEL.Preloader(rootPath + "/sets/javascript/", rootPath + "/sets/images/");
characterJukebox.addSceneChunk(new TOWER_OF_BABEL.SceneChunk("concertHall", "concertHall.min.js"));