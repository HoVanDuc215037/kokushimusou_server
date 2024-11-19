$(document).on("click", ".get-btn", function () {
  var string_item_count = $(this).parent().find(".order-count-num").val();
  var float_item_count = parseFloat(string_item_count);
  var string_new_item_count = (float_item_count + 1).toString();
  $(this).parent().find(".order-count-num").val(string_new_item_count);
  $(this).parent().find(".order-count-num").trigger("change");
});

$(document).on("click", ".throw-btn", function () {
  var string_item_count = $(this).parent().find(".order-count-num").val();
  var float_item_count = parseFloat(string_item_count) - 1;
  if (float_item_count >= 0) {
    var string_new_item_count = float_item_count.toString();
    $(this).parent().find(".order-count-num").val(string_new_item_count);
  };
  $(this).parent().find(".order-count-num").trigger("change");
});

$(document).on("change", ".order-count-num", function () {
  let string_order_value = $(this).val();
  let this_detail = $(this).parent().find(".order-count-num");
  string_order_value = checkInputIsNumber(string_order_value, this_detail);
  if (string_order_value !== "error") {
    let float_order_value = parseFloat(string_order_value);
    let string_fooddrink_cost = $(this).parent().parent().find(".fooddrink-cost").text().split('k')[0];
    // console.log("fooddrink cost:",string_fooddrink_cost);
    let float_fooddrink_cost = parseFloat(string_fooddrink_cost) * 1000;
    let totalcost = float_fooddrink_cost * float_order_value;
    let output_totalcoststring = formatDotCost(totalcost);
    $(this).parent().parent().parent().find(".totalcost").text(output_totalcoststring);

    if (float_order_value == 0) {
      $(this).parent().find(".throw-btn").attr("src", "../images/none_substract.png");
    };
    if (float_order_value > 0) {
      $(this).parent().find(".throw-btn").attr("src", "../images/subtract.png");
    }
    let output_cost = updateTotalCost();
    $(".total-order-cost").text(output_cost);
  } else {
    alert("Giá trị nhập phải là một số. Hãy nhập lại!");
  }
});

function updateTotalCost() {
  let total_cost = 0;
  let list_order_cost = $(".totalcost");

  let string_cost = "";
  let float_cost = 0;
  for (var i = 0; i < list_order_cost.length; i++) {
    let dot_string_cost = list_order_cost[i].innerHTML.split('đ')[0];
    // console.log("dot string 1:", dot_string_cost);
    string_cost = formatNoDotCost(dot_string_cost);
    // console.log("stringcost 2", string_cost);
    if (string_cost !== "") {
      float_cost = parseFloat(string_cost);
      // console.log("intcost 3", float_cost);
      total_cost += float_cost;
    }
  }
  let output_cost = formatDotCost(total_cost);
  return output_cost;
}

function formatDotCost(float_cost) {
  let string_cost = (float_cost).toString();
  let output_cost = "";
  let thousand = 1;
  for (var i = string_cost.length - 1; i >= 0; i--) {
    if (thousand == 4) {
      output_cost += ".";
      thousand = 1;
    }
    output_cost += string_cost[i];
    thousand++;
  }
  output_cost = reverseString(output_cost);
  output_cost += "đ";
  console.log("format 4:", string_cost, float_cost, output_cost);
  return output_cost;
}

function formatNoDotCost(string_cost) {
  let output_cost = "";
  let arr_unit = string_cost.split('.');
  for (var i = 0; i < arr_unit.length; i++) {
    output_cost += arr_unit[i];
  }
  // output_cost = (parseFloat(output_cost) / 1000).toString();
  // for (var i = 0; i < string_cost.length; i++){
  //   if (string_cost[i] !== ".") {
  //     output_cost += string_cost[i];
  //   }
  // }
  // console.log("format no dot cost ", output_cost, "input", string_cost);
  return output_cost;
}

function reverseString(string) {
  let out_put_string = "";
  for (var i = string.length - 1; i >= 0; i--) {
    out_put_string += string[i];
  }
  // out_put_string = (parseFloat(out_put_string) / 1000).toString();
  return out_put_string;
}

function resetCost() {

}

function checkInputIsNumber(input_string, component) {
  // console.log(component);
  // return;
  for (var i = 0; i < input_string.length; i++) {
    if (input_string[i] !== "0" && input_string[i] !== "1" && input_string[i] !== "2"
      && input_string[i] !== "3" && input_string[i] !== "4" && input_string[i] !== "5"
      && input_string[i] !== "6" && input_string[i] !== "7" && input_string[i] !== "8" && input_string[i] !== "9") {
      $(component).parent().find(".throw-btn").attr("src", "../images/none_substract.png");
      $(component).parent().parent().parent().find(".totalcost-container").find(".totalcost").val("0");
      $(component).parent().parent().parent().find(".totalcost-container").find(".totalcost").text("0đ");
      $(component).val("0");
      let output_cost = updateTotalCost();
      $(".total-order-cost").text(output_cost);
      return "error";
    }
  }
  return input_string;
}