//used for button tgl (on/off visual cues)
function colorChange(btn) {
  var button = document.getElementsByClassName(btn).style.borderColor;

  if (button !== "white") {
    document.getElementById(btn).style.borderColor = "white";
  } else if (button === "white") {
    document.getElementById(btn).style.borderColor = "#6c757d";
  }
}

//collapses the side nav bar
function tglSideBar() {
  $("body").toggleClass("sidebar-toggled");
  $(".sidebar").toggleClass("toggled");
}

function genHallBtn(car, flr, idx) {
  //takes in the car #, the flr #, and the flr status
  var id = car + "hal" + idx;
  var btnBox = $("<div></div>", {
    //make a button box; container for flr label, up/down buttons
    class: "btn-box"
  })
    .append(
      $("<div>", {
        //flr label
        text: flr.floorMarkings[idx]
      }).addClass("floorLabel car" + car) //class name; floorLabel and car#
    )
    .append(" ") //spacer for A E S T H E T I C
    .append(
      $("<button></button>", {
        //UP BUTTON
        class: "btn btn-icon flr" + idx + "Up car" + car //"btn btn-icon" - styling; "floor1Up" - button tgl; "car1" - car specificity
      })
        .attr("id", id + "Up") //ya fr a lot of tags; classes AND ID. i think it might be necessary tho
        .append(
          $("<i></i>", {
            class: "fas fa-arrow-circle-up"
          })
        )
    )
    .append(
      $("<button></button>", {
        //DOWN BUTTON
        class: "btn btn-icon flr" + idx + "Dn car" + car
      })
        .attr("id", id + "Dn")
        .append(
          $("<i></i>", {
            class: "fas fa-arrow-circle-down"
          })
        )
    )
    .on("click", "button", function() {
      //let classTags = $(this).attr("class"); //grabs the element so we can alter its appearance
      //btnClick(classTags, 0); //does the actual turning on and off; also, logic with the rear doors
      sendClick($(this).attr("id"));
    });
  $(document).ready(function() {
    hallMask(flr.hallMask, idx); //sets hall mask; disables buttons that are inaccessible on the specific floor
  });
  let res = $(btnBox)[0]; //convert jquery object to html element
  return res; //returns this to genHallSec, and there it is appended to the html doc
}

function genCarBtn(car, flr, idx) {
  //takes in the car, the flr number, and the flr status
  var id = car + "car" + idx;
  let floor = flr.floorMarkings[idx];
  var btnBox = $("<div></div")
    .addClass("btn-box") //buttons go into the container "btn-box"
    .append(
      $("<button></button>", {
        class: "btn btn-car car" + car,
        text: floor
      }).attr("id", id)
    )
    .css("text-align", "left")
    .on("click", "button", function() {
      //built in js elev response lol; only for car calls rn tho
      sendClick(id);
      // if (
      //   $(this).hasClass("carBtnClicked") ||
      //   $(this).hasClass("rearCarBtnClicked")
      // ) {
      //   elevMovement(cars[car - 1], idx); //index is car-1 because the display car labels start from 1 (instead of 0)
      //   elevDir(cars[car - 1]); //but the car objects are stored in a list with regular indices
      // }
    })
    .append(" ") //spacer for A E S T H E T I C
    .append(
      $("<div>")
        .addClass("timer-box")
        .attr("id", car + "Eta" + idx + "UpBox")
        .append(
          $("<div>")
            .addClass("timer up")
            .attr("id", car + "Eta" + idx + "Up")
        )
    )
    .append(
      $("<div>")
        .addClass("timer-box")
        .attr("id", car + "Eta" + idx + "DnBox")
        .append(
          $("<div>")
            .addClass("timer down")
            .attr("id", car + "Eta" + idx + "Dn")
        )
    );
  $(document).ready(function() {
    carMask(car, flr.carMask, idx);
  });
  let res = $(btnBox)[0];
  return res;
}

function hallMask(hallMask, idx) {
  if (hallMask.UF[idx] == 0) {
    $(".flr" + idx + "Up").attr("disabled", "");
  }
  if (hallMask.DF[idx] == 0) {
    $(".flr" + idx + "Dn").attr("disabled", "");
  }
}

function carMask(car, carMask, idx) {
  let mask = carMask[car];
  if (mask.F[idx] == 0) {
    $("#" + car + "car" + idx).attr("disabled", "");
  }
  if (mask.F[idx] == 0) {
    $("#" + car + "car" + idx).attr("disabled", "");
  }
}

//to toggle buttons for rear calls
//TODO: if rear call called, there should be a visual ticker
//      that says there is a rear call even when REAR view is
//      toggled off
//************************************************ COMPLETED
//TODO: disable locked out hall and car buttons based on the
//      position of the Rear Switch toggle
//************************************************ COMPLETED
function tglRear(car, flr) {
  //all the 'car' vars are for identifying the button groups for specific cars
  //variables for toggling car buttons
  let cab = flr.carMask[car];
  let rear = cab["R"];
  let front = cab["F"];
  let count = 0;
  //variables for toggle hall buttons
  let UF = flr.hallMask.UF;
  let UR = flr.hallMask.UR;
  let DF = flr.hallMask.DF;
  let DR = flr.hallMask.DR;

  sendClick(car + "togR");

  if ($("#" + car + "togR").is(":checked")) {
    $(".floorLabel.car" + car).each(function() {
      if (!$(this).hasClass("rear")) {
        $(this)
          .append("R")
          .addClass("rear"); //appends the "R" to the floorlabel
      }
    });

    $(".btn-icon.car" + car).each(function() {
      count++;

      $(this).toggleClass("rear"); //the next two lines tgl "rear" classes so they can be maniuplated by class selectors later
      $(".flr" + count + "Up").each(function() {
        if (UR[count] == 0) {
          $(this).attr("disabled", "");
        } else {
          $(this).removeAttr("disabled", "");
        }
      });
      $(".flr" + count + "Dn").each(function() {
        if (DR[count] == 0) {
          $(this).attr("disabled", "");
        } else {
          $(this).removeAttr("disabled", "");
        }
      });
    });

    count = 0;
    $(".btn-car.car" + car).each(function() {
      count++;
      $(this).toggleClass("rear"); //access the btn-box (goes through btn-car -> parent since btn-box doesn't have specifying classes)
      $("<span></span>", {
        //this appends a 'R' span to the carButton btn-box
        class: "rearLbl car" + car
      })
        .html("R")
        .insertBefore($("#" + car + "Eta" + count + "UpBox"));

      //tgl 'disabled' attr on car buttons
      $("#" + car + "car" + count).each(function() {
        if (rear[count] == 0) {
          $(this).attr("disabled", "");
        } else {
          $(this).removeAttr("disabled", "");
        }
      });
    });
  } else {
    //basically removes everything when switch is toggled back off
    $(".floorLabel.car" + car).each(function() {
      //here is probably where the logic would go for preserving the visual signifier for pressed rear buttons
      let str = $(this).text();
      str = str.substring(0, str.length - 1);
      $(this)
        .html(str)
        .removeClass("rear");
    });
    $(".btn-icon.car" + car).each(function() {
      count++;
      $(this).toggleClass("rear"); //the next two lines tgl "rear" classes so they can be maniuplated by class selectors later
      $(".flr" + count + "Up").each(function() {
        if (UF[count] == 0) {
          $(this).attr("disabled", "");
        } else {
          $(this).removeAttr("disabled", "");
        }
      });
      $(".flr" + count + "Dn").each(function() {
        if (DF[count] == 0) {
          $(this).attr("disabled", "");
        } else {
          $(this).removeAttr("disabled", "");
        }
      });
    });

    count = 0;
    $(".btn-car.car" + car).each(function() {
      $(this).toggleClass("rear"); //access the btn-box (goes through btn-car -> parent since btn-box doesn't have specifying classes)
      $(".rearLbl.car" + car).remove();

      //tgl 'disabled' attr on car buttons
      count++;
      $("#" + car + "car" + count).each(function() {
        if (front[count] == 0) {
          $(this).attr("disabled", "");
        } else {
          $(this).removeAttr("disabled", "");
        }
      });
    });
  }
}

function btnClick(selector, loc) {
  //selector is the element; loc is car (1) vs hall (0)
  let n = $("#" + selector).attr("class");
  let m;
  if (n.includes(" ")) {
    m = n.split(" ");
  }

  if (loc) {
    if (m.includes("rear")) {
      $("#" + selector).toggleClass("rearCarBtnClicked");
    } else {
      $("#" + selector).toggleClass("carBtnClicked");
    }
  } else {
    let id = m[2]; //floorID is the third class tag; we need it to turn it on/off
    if (m.includes("rear")) {
      $("." + id).toggleClass("rearBtnClicked");
    } else {
      $("." + id).toggleClass("btnClicked");
    }
  }
}

function genSwitch(book, count) {
  //book = dictionary of names; count = index of name
  let toggle = $("<div></div>")
    .addClass("io-switch-box float-left")
    .append(
      $("<label></label>", {
        class: "switch-vertical"
      })
        .append(
          $("<input>", {
            type: "checkbox"
          })
        )
        .append(
          $("<span>", {
            class: "slider round vertical " + Object.keys(book)[count]
          })
        )
    )
    .append(
      $("<span></span>")
        .text(Object.keys(book)[count])
        .css("display", "inline-block")
        .css("font-size", "8pt")
    );
  return toggle;
}

function genInspBtn(book, count) {
  let btn = $("<div></div>")
    .addClass("io-switch-box float-left")
    .append(
      $("<div></div>", {
        class: "insp-button-case"
      }).append(
        $("<button>", {
          type: "button",
          class: "btn insp-btn carBtnClicked"
        })
      )
    )
    .append(
      $("<span></span>")
        .text(Object.keys(book)[count])
        .css("display", "inline-block")
        .css("font-size", "8pt")
    );
  return btn;
}

function settingSwitch(car, idx, book) {
  let tmp = book[idx].replace(/\s+/g, "");

  let setting = $("<div>")
    .addClass("setting-label")
    .append(
      $("<div>")
        .addClass("setting-tgl car" + car)
        .append(
          $("<label>")
            .addClass("switch")
            .css("margin", "0")
            .append(
              $("<input>", {
                type: "checkbox"
              }).attr("id", car + tmp)
            )
            .append($("<span>").addClass("slider round"))
        )
    )
    .append(
      $("<p>")
        .text(book[idx])
        .css({
          padding: "14px 0",
          display: "inline-block",
          "font-size": "14px"
        })
    );

  return setting;
}

function configure(car) {
  let activeArray = [];
  $(".setting-tgl.car" + car).each(function() {
    let target = $(this)
      .children()
      .children();
    if (target.is(":checked")) {
      let name = target.attr("id");
      activeArray.push(name);
    }
  });
  if (activeArray.length == 0) {
    return "All Settings Default";
  }
  return activeArray;
}
