function connectToSocket() {
  var loc = window.location;
  var wsStart = "ws://";
  var endpoint = wsStart + loc.host + "/ws" + loc.pathname;
  console.log(endpoint);
  var socket = new WebSocket(endpoint);

  socket.onmessage = function(e) {
    msg = e["data"];
    // console.log(msg);
    parseCmd(msg);
  };
  socket.onopen = function(e) {
    console.log("we connocted baby", e);
    socket.send("galileo: " + loc.pathname);
  };
  socket.onerror = function(e) {
    console.log("big error whoops", e);
  };
  socket.onclose = function(e) {
    console.log("we out bois", e);
  };

  return socket;
}

function parseCmd(cmd) {
  let split = cmd.split(" ");
  let origin = split[0]; // coms or galileo
  let type = split[1]; // type: command, alert, or analytic
  let msg = split[2]; // actual directive command or message
  let info = split[3]; // front/rear, seconds remaining, etc
  if (msg) {
    var car = msg[0];
  }

  if (origin == "coms:" && type == "$$") {
    if (msg.includes("Door")) {
      setDoorStat(car, info);
    } else if (msg.includes("Eta")) {
      setEta(msg, info);
    } else if (msg.includes("Dir")) {
      setElevDir(car, info);
    } else if (msg.includes("Mode")) {
      setElevMode(car, info);
    } else if (msg.includes("Vel")) {
      setVelocity(car, info);
    } else if (msg.includes("Pix")) {
      setPixPos(car, info);
    } else if (msg.includes("Mrk")) {
      setMarking(car, info);
    } else if (msg.includes("Pul") || msg.includes("Pos")) {
      console.log("WIP");
    } else if (msg.includes("/")) {
      console.log(msg);
    } else {
      setBtnCall(car, msg, info);
    }
    socket.send("confirm: " + msg);
  } else if (type == ">>") {
    if (msg.includes("onnected")) {
      setConnection(car, msg);
    }
  }
}

function sendClick(id) {
  //id of the button clicked (datatype: string)
  socket.send("galileo: " + id);
}

function remoteClick(id) {
  // socket.send("echo: ");
  let loc = 0;
  if (id[1] == "c") {
    loc = 1;
  }
  btnClick(id, loc);
  // $("#" + id).trigger("click");
}

function setBtnCall(car, msg, info) {
  let rearTgl = car + "togR";
  if (
    (info == "F" && !$("#" + rearTgl).is(":checked")) ||
    (info == "R" && $("#" + rearTgl).is(":checked")) ||
    info == null
  ) {
    remoteClick(msg);
  } else {
    $("#" + rearTgl).trigger("click");
    remoteClick(msg);
    $("#" + rearTgl).trigger("click");
  }
}

//this function will need the car num and a switch
//probably will have to change this from append to tgl class
function setDoorStat(car, info) {
  let door = car + "cardoor";
  let loc = car + "DoorLoc";

  if (info.includes("0")) {
    $("#" + door).removeClass("fa-door-open");
    $("#" + door).addClass("fa-door-closed");
  } else {
    $("#" + door).removeClass("fa-door-closed");
    $("#" + door).addClass("fa-door-open");
  }

  if (info.includes("F")) {
    $("#" + loc).html("front");
  } else {
    $("#" + loc).html("rear");
  }
}

function setEta(msg, info) {
  $("#" + msg).html(info);
}

function setElevDir(car, info) {
  let up = car + "carUp";
  let dn = car + "carDn";

  if (info.includes("Up")) {
    $("#" + up).removeClass("inactive");
    $("#" + dn).addClass("inactive");
  } else if (info.includes("Dn")) {
    $("#" + dn).removeClass("inactive");
    $("#" + up).addClass("inactive");
  } else {
    $("#" + dn).addClass("inactive");
    $("#" + up).addClass("inactive");
  }
}

function setElevMode(car, info) {
  let id = car + "carMode";
  $("#" + id).html(info);
}

function setVelocity(car, info) {
  let id = car + "Velocity";
  $("#" + id).text(info);
}

function setConnection(car, msg) {
  if (msg[1] == "D") {
    $("#" + car + "disconnected").addClass("disconnected");
    $("#" + car + "disconnect-label")
      .addClass("disconnect-label")
      .html("DISCONNECTED");
  } else if (msg[1] == "C") {
    $("#" + car + "disconnected").removeClass("disconnected");
    $("#" + car + "disconnect-label")
      .removeClass("disconnect-label")
      .html("");
  }
}

function setPixPos(car, info) {
  let id = "#car" + car;
  $(id).css({ top: info + "px" });
}

function setMarking(car, info) {
  let id = "#" + car + "Position";
  $(id).html(info);
}
