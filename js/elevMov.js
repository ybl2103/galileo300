function elevMovement(elev, dest) {
  // which car, elev obj, flr map
  var elevEle = $("#" + elev.id); // hopefully at this point, id tag already concat with '#'
  elev.dest = dest;
  dest = dest.toString(); //dict keys are strings

  /**
    if(elev.cur > elev.dest){                       //not a perfect system; sets elev direction before embarking (instead of real time updates)
        elev.dir = 'dn';
    } else if (elev.cur < elev.dest){
        elev.dir = 'up';
    } else{
        elev.dir = 'n/a';
    }
     */

  //animation sequence
  var int = setInterval(frame, 10); //this sets the animated travel speed of the elevator
  function frame() {
    //frame() is a loop that terminates when the elev reaches the destination
    if (elev.pos == elev.map[dest]) {
      //once the elev reaches the 'destination'
      clearInterval(int); //resets the interval (idrk how it works)
      elev.cur = dest; //sets the elev cur location as the destition it just arrived at
    } else {
      if (elev.cur > elev.dest) {
        //if currently above the destination, increase pos
        elev.pos++;
      } else {
        //if currently below the destination, decrease pos
        elev.pos--;
      }
      elevEle.css({ top: elev.pos + "px" }); //set whatever pos value as the top attribute of the elev div
    } //(basically, by how much to offset the elev from the top)
  }
}

//requires the elev object and accesses the 'dir' property
function elevDir(elev) {
  var up = elev.id + "Up";
  var dn = elev.id + "Dn";

  if (elev.dir == "up") {
    //if the elevator is going up, make the down arrow grey
    $("#" + up).removeClass("inactive");
    $("#" + dn).addClass("inactive");
  } else if (elev.dir == "dn") {
    $("#" + dn).removeClass("inactive");
    $("#" + up).addClass("inactive");
  } else {
    $("#" + dn).addClass("inactive");
    $("#" + up).addClass("inactive");
  }
}
