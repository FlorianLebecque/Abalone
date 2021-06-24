let container = document.querySelector('#gamearea')

var PI = Math.PI;

let hex = [];  //tableau d'hexagone
let sel_hex = [];

//taille du tableau
let max_tab_i = 9;
let max_tab_j = 9;

//taille la plus grande entre la hauteur et la largeur de l'écran
let max_len;

//tableau des score, un pour le joueur 1 et l'autre pour le joueur 2
let score = [];

//constante
let  theta = PI/3;  //60°

//Tour du joueur,
let cur_teamPlay = 1;

//hexagone (sur la gauche) permet de visualiser le tour du joueur
let team_H;

//Button hexagonal pour recommencer une parti
let BtNouveau;
let BtStart;
let BtMenu;
let BtAbout; 

//etat dans lequel se trouve le jeux  
let state = 0;   //0 menu  1 jeu   2 fin du jeu  3 about



function setup() {
  //size(1680,1050);
  var canvas = createCanvas(container.clientWidth, container.clientHeight, P2D);
  canvas.parent('gamearea')
  frameRate(60);
  //fullScreen();

  //surface.setSize(1920,1080);

  //max_len egale au plus grand coté de l'écran
  if (height<=width) {
    max_len = height;
  } else {
    max_len = width;
  }

  //créé le tableau d'hexagone
  hex = [];
  //initialise le tableau;
  hex = ini_hex(hex);

  let l = sqrt(max_len*max_len/(162*(1-cos(2*PI/3))));  //longueur du coté de l'hexagone
  let lo = sqrt(2*l*l-2*l*l*cos(2*PI/3));  //longueur d'un des triangles inscrit dans l'hexagone
  let ny = lo*cos(PI/3); 

  team_H  = new hexagone(2*ny, height/2-ny, l);
  team_H.team = 1;

  //initialisation des buttons
  BtNouveau = new hexaBtn(
    1.5*  sqrt(2*l*l-2*l*l*cos(2*PI/3)), //position x
    height-(1.2*  sqrt(2*l*l-2*l*l*cos(2*PI/3))), //position y
    l
  );
  BtNouveau.text = "Nouvelle partie";
  BtNouveau.textHeight = max_len*0.015;

  BtStart = new hexaBtn(width*0.33333 - l/2, height*0.6, l);
  BtStart.text = "Commencer";
  BtStart.textHeight = max_len*0.015;  

  BtAbout = new hexaBtn(width*0.66666 - l/2, height*0.6, l);
  BtAbout.text = "A propos";
  BtAbout.textHeight = max_len*0.015;


  BtMenu = new hexaBtn(BtNouveau.x + lo+40, BtNouveau.y, l);
  BtMenu.text = "Menu";
  BtMenu.textHeight = max_len*0.015;
}


//variable global pour degrader lorsque le souris est sur un hexagone
let deg = 2;
let sense = 1;

//boucle d'affichage
function draw() {
  stroke(200, 200, 200);
  background(0, 20, 30);
  //permet de faire un dégrader clignotant
  deg += sense * 0.1;
  if ((deg>3)||(deg<1)) {
    sense = -1 * sense;
  }
  switch(state) {
  case 0:  
    Menu();
    break;
  case 1:  
    Game();
    break;
  case 2:  
    endGame();
    break;
  case 3:  
    about();
    break;
  }
}

//au click de la souris
function mousePressed() {
  if (mouseButton==LEFT) {
    if(state == 1){
    Selection_hexagone();
    }
    

    //click sur les buttons
    if (BtNouveau.is_hover) {  //si on click sur nouvelle parti
      ResetLevel();
    } else if (BtStart.is_hover) {
      BtStart.is_hover = false;
      ResetLevel();
      state = 1;
    } else if (BtMenu.is_hover) {
      BtMenu.is_hover = false;
      state = 0;
    } else if (BtAbout.is_hover) {
      BtAbout.is_hover = false;
      state = 3;
    }
  } else if (mouseButton == RIGHT) {
    if (sel_hex.length>0) {
      dep_hex();
    }
  }
}

function Game() {
  //affiche les hexagones et test si la souris est dedans
  for (let i = 0; i<max_tab_i; i++) {
    let maxj = - abs(i-4)+9;
    for (let j = 0; j<maxj; j++) {
      hex[i][j].is_hover = hex[i][j].hovering();
      hex[i][j].show();
    }
  }

  //button pour démarrer une nouvelle parti
  BtNouveau.is_hover = BtNouveau.hovering();
  BtNouveau.show();
  BtMenu.is_hover = BtMenu.hovering();
  BtMenu.show();

  //hexagone indicateur du tour
  team_H.team = cur_teamPlay;
  team_H.show();

  fill(255);
  textAlign(LEFT);
  textSize(max_len*0.05);
  text("score :", hex[4][8].x+2*hex[0][0].len, hex[4][8].y+max_len*0.05);
  textSize(max_len*0.03);
  text("Blanc : "+score[0], hex[4][8].x+2*hex[0][0].len, hex[4][8].y+3*max_len*0.03);
  text("Noir : "+score[1], hex[4][8].x+2*hex[0][0].len, hex[4][8].y+5*max_len*0.03);
}

function endGame() {
  fill(255); 
  let tSize = round(max_len*0.3);
  textAlign(CENTER);
  textSize(tSize);
  text("Abalone", width/2, tSize);  

  line(0, tSize+15, width, tSize+15);

  tSize = round(max_len*0.05);
  textSize(tSize);
  textAlign(LEFT);
  text("Le score : ", width*0.2, height*0.35, width*0.6, height*0.1);

  tSize = round(max_len*0.03);
  textSize(tSize);
  text("joueur 1 : "+score[0], width*0.2, height*0.41, width*0.6, height*0.1);
  text("joueur 2 : "+score[1], width*0.2, height*0.45, width*0.6, height*0.1);

  tSize = round(max_len*0.08);
  textSize(tSize);
  textAlign(CENTER);
  text("VICTOIRE", width/2, height/2);

  if (score[0]>score[1]) {
    text("BLANC", width/2, 2*height/3);
  } else {
    text("NOIR", width/2, 2*height/3);
  }

  BtMenu.is_hover = BtMenu.hovering();
  BtMenu.show();
}

function about() {
  fill(255); 
  let tSize = round(max_len*0.3);
  textAlign(CENTER);
  textSize(tSize);
  text("Abalone", width/2, tSize);  

  line(0, tSize+15, width, tSize+15);

  tSize = round(max_len*0.03);
  textSize(tSize);
  textAlign(LEFT);
  text("Abalone est un jeu de stratégie, dans lequel il faut deplacer ses pions de manière à faire tomber ceux de son adversaire.", width*0.2, height*0.35, width*0.6, height*0.1);
  text("Les règles du jeu sont disponibles sur https://fr.wikipedia.org/wiki/Abalone_(jeu).", width*0.2, height*0.44, width*0.6, height*0.1);

  text("Adaptation du jeu en Processing par Lebecque Florian, www.processing.org", width*0.2, height*0.6, width*0.6, height*0.1);

  BtMenu.is_hover = BtMenu.hovering();
  BtMenu.show();
}

function Menu() {
  fill(255); 
  let tSize = round(max_len*0.3);
  textAlign(CENTER);
  textSize(tSize);
  text("Abalone", width/2, tSize);  

  line(0, tSize+15, width, tSize+15);

  BtAbout.is_hover = BtAbout.hovering();
  BtStart.is_hover = BtStart.hovering();
  BtAbout.show();
  BtStart.show();
}

function ResetLevel() {
  score[0] = 0;
  score[1] = 0;
  cur_teamPlay = 1;
  for (let i = 0; i<max_tab_i; i++) {  //pour chaque ligne;
    let maxj = - abs(i-4)+9;
    for (let j = 0; j< maxj; j++) {
      hex[i][j].team = 0;
      //position des billes blanche;
      if ((i<2)||((i==2)&&((j>1)&&(j<5)))) {
        hex[i][j].team = 1;
      }
      //position des billes noir;
      if (((i>6))||((i==6)&&((j>1)&&(j<5)))) {
        hex[i][j].team = 2;
      }
    }
  }
}
