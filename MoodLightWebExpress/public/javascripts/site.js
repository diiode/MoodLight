﻿var powerState = false;
var powerDisabled = true;

var powerToggle = $("[name='power-toggle']").bootstrapSwitch({
    size: 'small',
    wrapperClass: 'power-toggle',
    state: powerState,
    disabled: powerDisabled
});

function updatePowerToggle(data) {
    powerState = data.power;
    powerDisabled = false;
    powerToggle.bootstrapSwitch('disabled', powerDisabled);
    powerToggle.bootstrapSwitch('state', powerState);
}

// Get state of power
$.ajax({
    url: "/power",
}).done(function (data) {
    console.debug("Current power state: " + data.power);
    updatePowerToggle(data); 
});



$("[name='power-toggle']").on('switchChange.bootstrapSwitch', function (event, state) {
    console.debug("State change: " + state);
    powerState = state;
    powerDisabled = true;
    powerToggle.bootstrapSwitch('disabled', powerDisabled);
    $.ajax({
        url: "/power",
        type: "POST",
        data: JSON.stringify({ power: powerState }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    }).success(function (data){
        updatePowerToggle(data);
    })
});


var cw = Raphael.colorwheel($("#main-color-wheel-container")[0], 300, 180).color("#00F");
cw.onchange(function (color){
    var colorHsl = Raphael.rgb2hsl(color.r, color.g, color.b);
    var hslText = "H: " + colorHsl.h + ", S: " + colorHsl.s + ", L: " + colorHsl.l;
    $("#hsl-value").text(hslText);
    console.debug(color);
});