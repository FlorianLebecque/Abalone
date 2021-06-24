class hexagone {


  constructor(_x,  _y, _l) {
    this.x = _x;  //position x
    this.y = _y;  //position y
    //position du centre
    this.len = _l;//longeur de l'hexagone régulier
    
    this.is_hover = false;
    this.clicked = false;
    this.team = 0;
    
  }

  GetLo() {
    return sqrt(2*this.len*this.len-2*this.len*this.len*cos(2*PI/3)); //longueur d'un triangle inscri a l'hexagone
  }

  // test si la souris est dans l'hexagone
  hovering() {

    let P = 3* this.len;  //perimetre
    let air = round(sqrt(P/2*(P/2-this.len)*(P/2-this.len)*(P/2-this.len)));  //calcule de l'aire avec formule de héron

    //subdivision d'un triangle en 3, si la somme de l'aire des trois est egale a celle du grand alors la souris est dans le triangle

    //point du centre
    let xc = this.x + this.len*sin(PI/6);
    let yc = this.y + this.len*cos(PI/6);
    //point extreme gauche
    let xg = this.x - this.len*sin(PI/6);
    let yg = this.y + this.len*cos(PI/6);
    //point extreme droite
    let xd = this.x + this.len + this.len*sin(PI/6);
    let yd = this.y + this.len*cos(PI/6);
    //point haut droite
    let x2 = this.x+this.len;
    let y2 = this.y;
    //point bas droite
    let x3 = xd- this.len*sin(PI/6);
    let y3 = this.y + 2 * this.len * cos(PI/6);
    //point bas gauche
    let x4 = x3-this.len;
    let y4 = y3;

    //test chaque triangle;
    if (Collision_triangle(this.x, this.y, xg, yg, xc, yc)) {
      return true;
    }
    if (Collision_triangle(this.x, this.y, x2, y2, xc, yc)) {
      return true;
    }
    if (Collision_triangle(x2, y2, xd, yd, xc, yc)) {
      return true;
    }
    if (Collision_triangle(xg, yg, x4, y4, xc, yc)) {
      return true;
    }
    if (Collision_triangle(x4, y4, x3, y3, xc, yc)) {
      return true;
    }
    if (Collision_triangle(xd, yd, x3, y3, xc, yc)) {
      return true;
    }

    return false;
  }

  show() {

    //definit la couleur de l'hexagone
    let colorX = map(this.x, 0, width, 100, 150);  //map le x qui va entre 0 et la largeur a entre 200 et 255
    let colorY = map(this.y, 0, height, 100, 150);

    switch(this.team) {
    case 0 : 
      fill(colorY/10, colorX, colorY,255);  //petit dégrader de bleu
      break;
    case 1 : 
      fill(255, 255, 255,255);
      break;
    case 2 : 
      fill(0, 0, 0,255);
      break;
    }

    if (this.is_hover) {
      let r = map(deg, 1, 3, 50, 150);
      let g = map(deg, 1, 3, 200, 255);
      let b = map(deg, 1, 3, 50, 150);
      fill(r, g, b);
    }
    if (this.clicked) {
      fill(0, 200, 0,255);
    }

    //dessine l'hexagone
    let lx = this.x;
    let ly = this.y;
    beginShape();   
    for (let i=0; i<6; i++) {
      let nx = this.len * cos(theta*i);
      let ny = this.len* sin(theta*i);

      lx=lx+nx;
      ly=ly+ny;

      vertex(lx, ly);
    }
    endShape(CLOSE);
  }
}
