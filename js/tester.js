function overloadHallCalls(qty) {
  for (let i = 1; i <= qty; i++) {
    let id = "1hal" + i;
    $("#" + id + "Up").trigger("click");
    $("#" + id + "Dn").trigger("click");
  }
}
