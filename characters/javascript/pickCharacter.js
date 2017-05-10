// commented out version, for when running locally to develop a new character.  Only Edge allows texture file:// urls where there are  ../'s
//var jukeBox = new QI.Preloader("../../../characters/javascript/", "../../../characters/images/");

var jukeBox = new QI.Preloader("https://palmer-jc.github.io/characters/javascript/", "https://palmer-jc.github.io/characters/images/");

jukeBox.addCharacter(new QI.Character("Nate"    , "Nate.min.js", "Nate_Male_muscle_13290"));
jukeBox.addCharacter(new QI.Character("owm"     , "owm.min.js" , "Owm_Body"));
//jukeBox.addCharacter(new QI.Character("ywf"     , "ywf.min.js" , "Ywf_Female_generic"));

jukeBox.addBust     (new QI.Character("NateBust", "NateBust.min.js", "Nate_Male_muscle_13290"));
jukeBox.addBust     (new QI.Character("owmBust" , "owmBust.min.js" , "Owm_Body"));
//jukeBox.addBust     (new QI.Character("ywfBust" , "ywfBust.min.js" , "Ywf_Female_generic"));