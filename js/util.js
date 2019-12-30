//most upperlevel construction of a car module
function genCar(car, init, mode) {
  //needs car num, flr qty, mode
  flr = init.floorData;
  io = init.io;

  //card identifier unique to each car
  let cardID = "card" + car;

  /*
    declared 'card$' as a variable first as 
    opposed to with the 'row' div so that we 
    can manipulate the color later
    */
  var card$ = $("<div>")
    .addClass("card text-white accordion z-1 car" + car)
    .attr("id", cardID)
    .append(
      $("<div>")
        .addClass("disconnected")
        .attr("id", car + "disconnected")
        .append(
          $("<span>")
            .addClass("disconnect-label")
            .attr("id", car + "disconnect-label")
            .html("DISCONNECTED")
        )
    );

  //the col bit is the spacers between each card
  $(".row").append(
    $("<div>")
      .addClass("col-xl-3 col-sm-6 col-auto mb-3")
      .attr("id", "col" + car)
      .append(card$) //append card$ here
  );

  // C O L O R S yay
  if (car % 4 == 3) {
    card$.addClass("bg-warning");
  } else if (car % 4 == 2) {
    card$.addClass("bg-danger");
  } else if (car % 4 == 1) {
    card$.addClass("bg-success");
  } else {
    card$.addClass("bg-primary");
  }

  //generate the three parts of the card
  genHeader(car);
  genBody(car, flr);
  genFooter(car, io);

  //dynamic statuses unique to each car
  elevMode(car, mode);
}

//generates the title of the car module
function genHeader(car) {
  $("#card" + car).append(
    $("<div>")
      .addClass("card-header text-white h5 clearfix z-1")
      .append(
        $("<div>")
          .addClass("mr-5")
          .html("Car " + car) //the first car title should be 'Car 1'
      )
      .attr({
        "data-toggle": "collapse",
        "data-target": "#car" + car + "Body",
        role: "button"
      })
  );
}

//holds most of the information
function genBody(car, flr) {
  $("#card" + car).append(
    $("<div>")
      .addClass("collapse show")
      .attr({
        id: "car" + car + "Body",
        "data-parent": ".accordion.car" + car
      })
      .append(
        $("<div>")
          .addClass("card-body-car")
          .append(
            $("<div>")
              .addClass("overview")
              .attr({
                id: "overview" + car,
                "ss-container": ""
              })
          )
          .append(
            $("<div>")
              .addClass("modules")
              .attr("id", "modules" + car)
          )
      )
  );
  //condense floors per window if more than 4 cars
  // if(car >= 5){
  //     $('.card-body-car').addClass('compact');
  // }

  //body is split into 2 main parts
  //the overview (with floor btns, and elev animation)
  genHallSec(car, flr); //contains all hall buttons
  genShaftSec(car, flr); //shows where the elevator is in shaft
  genCarSec(car, flr); //contains all car call buttons
  //the modules (with elev direction, door stat, elev mode)
  genModules(car, flr);
}

//should link to a page with car specific info
function genFooter(car, io) {
  $("#card" + car).append(
    $("<a></a>")
      .addClass("card-footer text-white clearfix small z-1 btn")
      .attr({
        "data-toggle": "collapse",
        "data-target": "#car" + car + "Info",
        role: "button"
      })
      .append(
        $("<span></span>", {
          class: "float-left"
        }).html("View Details")
      )
      .append(
        $("<span></span>", {
          class: "float-right"
        }).append(
          $("<i></i>", {
            class: "fas fa-angle-right"
          })
        )
      )
  );
  genCarDetails(car, io);
}

function genCarDetails(car, io) {
  let carSet = ["Independent", "Return to L", "Elevator OFF", "Auto Door"];
  let groupSet = [
    "Up Peak",
    "Down Peak",
    "Alt. Lobby",
    "Alt. Parking",
    "Next Car Up",
    "Alt. Floor Sec"
  ];

  $("#card" + car).append(
    $("<div></div>") //this div allows for collapse functionality
      .attr({
        class: "collapse",
        id: "car" + car + "Info",
        "data-parent": ".accordion.car" + car
      })
      .append(
        $("<div></div>")
          .addClass("card-body-car") //literally here just so the collapse animation is smooth
          .append(
            $("<div>")
              .addClass("service-settings")
              .append(
                $("<div>")
                  .addClass("car-settings")
                  .each(function() {
                    for (let i = 0; i < 4; i++) {
                      let setting = settingSwitch(car, i, carSet);
                      $(this).append(setting);
                    }
                  })
              )
              .append(
                $("<div>")
                  .addClass("group-settings")
                  .each(function() {
                    for (let i = 0; i < groupSet.length; i++) {
                      let setting = settingSwitch(car, i, groupSet);
                      $(this).append(setting);
                    }
                  })
              )
              .append(
                $("<div>")
                  .addClass("configure")
                  .css("margin", "15px auto")
                  .append(
                    $("<button>")
                      .addClass("btn btn-light")
                      .text("Configure")
                      .attr("id", car + "config")
                      .on("click", function() {
                        let activeSettings = configure(car);
                        sendClick(activeSettings);
                      })
                  )
              )
          )
      )
  );
}

//the first partition of the "overview" portion of the card-body
function genHallSec(car, flr) {
  let mask = flr.floorMarkings;
  let qty = Object.keys(mask).length;

  $("#overview" + car).append(
    $("<div></div>") //create & append 'partition' div to each overview
      .addClass("partition car" + car) //the 'car'+car specifies which car (it's an identifier)
  );
  for (let i = qty; i > 0; i--) {
    //counting backwards bc numbers decrease as they are added
    let btnBox = genHallBtn(car, flr, i); //GOTO: buttons.js; generates up/down hall call buttons
    $(".partition.car" + car).append(btnBox); //append each pair to the 'partition'
  }
}

function genShaftSec(num, flr) {
  let qty = Object.keys(flr.floorMarkings).length;

  let id = "car" + num;
  let height = 50 * qty + 20; //each btn-box is about 50px and then 15px for A E S T H E T I C
  var overview = $("#overview" + num).append(
    $("<div>")
      .addClass("elevShaft")
      .attr("id", "elevShaft" + num)
      .append(
        $("<div></div>")
          .addClass("elev")
          .attr("id", id)
      )
      .css("height", height + "px")
  );

  let res = $(overview)[0];
  return res;
}

function genCarSec(car, flr) {
  let qty = Object.keys(flr.floorMarkings).length;

  $("#overview" + car).append(
    $("<div>", {
      class: "partition carCall car" + car //added class to differentiate between the two partitions
    })
  );
  for (let i = qty; i > 0; i--) {
    let btnBox = genCarBtn(car, flr, i); //GOTO: buttons.js; generates car call buttons
    $(".partition.carCall.car" + car).append(btnBox);
  }
}

//generates the right most portion of the card body
function genModules(car, flr) {
  let id = car + "car";
  $("#modules" + car)
    //elevator direction
    .append(
      $("<div>", {
        class: "arrow-house"
      })
        .append(
          $("<i>", {
            class: "fas fa-chevron-up fa-lg inactive"
          }).attr("id", id + "Up")
        )
        .append(
          $("<i>", {
            class: "fas fa-chevron-down fa-lg inactive"
          }).attr("id", id + "Dn")
        )
    )
    //door open / close
    .append(
      $("<div></div>")
        .addClass("doorStat")
        .append(
          $("<i>")
            .attr("id", id + "door")
            .addClass("fas fa-door-closed fa-2x")
        )
    )
    .append(
      $("<div>")
        .addClass("doorLoc")
        .attr("id", car + "DoorLoc")
        .html("front")
    )
    //elev mode
    .append(
      $("<div></div>", {
        class: "elevMode"
      }).attr("id", id + "Mode")
    )
    //tgl rear calls
    .append(
      $("<label></label>", {
        class: "switch"
      })
        .append(
          $("<input>", {
            type: "checkbox"
          }).attr("id", car + "togR")
        )
        .append(
          $("<span>", {
            class: "slider round"
          })
        )
        .on("change", "input", function() {
          tglRear(car, flr);
          // sendClick($(this).attr("id"));
        })
    )
    .append(
      $("<div>")
        .addClass("velocity-box")
        .append(
          $("<div>")
            .addClass("velocity-value")
            .append(
              $("<span>")
                .attr("id", car + "Velocity")
                .html("vel")
                .css("font-size", "22px")
            )
        )
        .append(
          $("<div>")
            .addClass("velocity-units")
            .append(
              $("<span>")
                .attr("id", car + "VelUnits")
                .html("FPM")
                .css("font-size", "8px")
            )
        )
    )
    .append(
      $("<div>")
        .addClass("position-box anchor")
        .append(
          $("<div>")
            .addClass("position-label")
            .html("POS: ")
        )
        .append(
          $("<div>")
            .addClass("position-value font-weight-bold")
            .attr("id", car + "Position")
            .html("")
        )
    );
}

//requires car num and the mode
function elevMode(car, mode) {
  var id = car + "car";
  $(document).ready(function() {
    if (mode == 0) {
      $("#" + id + "Mode").html("AUT");
    } else if (mode == 1) {
      $("#" + id + "Mode").html("INS");
    } else if (mode == 2) {
      $("#" + id + "Mode").html("BLU");
    }
  });
}

//generates the pixel height of the card body based on number of floors
function floorView(range) {
  let height = range * 50 + 15;
  $(document).ready(function() {
    $(".card-body-car").css("max-height", height + "px");
  });
}

function flrConversion(qty) {
  // takes in num of floors; output dictionary of flr and pxl pairs
  map = [];
  for (let i = 0; i < qty; i++) {
    map[qty - i] = 17 + 50 * i; //each floor is about 50 px apart (may be exact, not sure) and offset by 15px (begin pos)
  }
  return map;
}

function makeElev(id, flr, mode) {
  //elevator object
  let qty = Object.keys(flr.floorMarkings).length;
  var map = flrConversion(qty);
  var elev = {
    id: id,
    map: map, //this is a dictionary of floor and pixel mappings
    cur: qty, //current floor the elev is at; starts at the top
    dest: 0, //default destination (level 1 or Lobby or whatever)
    pos: 15, //this is the pixel position (15px from the top)
    dir: "dn",
    mode: mode //not used rn, but for later when there are individual modes
  }; //(right now, mode is set for the entire group)
  return elev;
}
