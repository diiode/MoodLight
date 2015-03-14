var powerState = false;
var powerDisabled = true;

var powerToggle = $("[name='power-toggle']").bootstrapSwitch({
    size: 'small',
    wrapperClass: 'power-toggle',
    state: false,
    disabled: true
});

function updatePowerToggle(data) {
    powerState = data;
    powerDisabled = false;
    powerToggle.bootstrapSwitch('disabled', powerDisabled);
    powerToggle.bootstrapSwitch('state', data);
}


//$.ajax({
//    url: "/status",
//}).success(function (data) {
//    console.debug("Status, power:" + data.power);
//    updatePowerToggle(data.power);
//});


$("[name='power-toggle']").on('switchChange.bootstrapSwitch', function (event, state) {
    //console.debug("State change: " + state);
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
        updatePowerToggle(data.power);
    })
});


var cw = Raphael.colorwheel($("#main-color-wheel-container")[0], 300, 180).color("#F00");
cw.onchange(function (color){
    var colorHsl = Raphael.rgb2hsl(color.r, color.g, color.b);
    var hslText = "H: " + colorHsl.h.toFixed(3) + ", S: " + colorHsl.s.toPrecision(2) + ", L: " + colorHsl.l.toPrecision(2);
    $("#hsl-value").text(hslText);
    $(".info-display").css("background-color", "rgb(" + 
        Math.floor(color.r) + ", " + 
        Math.floor(color.g) + ", " + 
        Math.floor(color.b) + ")");
    $.ajax({
        url: "/hsl",
        type: "POST",
        data: JSON.stringify({ hue: colorHsl.h, sat: colorHsl.s, lum: colorHsl.l }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    })
    //console.debug(color);
});

// Get state of power
$.ajax({
    url: "/power",
}).done(function (data) {
    //console.debug("Current power state: " + data.power);
    updatePowerToggle(data.power);
});

// Get HSL value
$.ajax({
    url: "/hsl",
}).done(function (data) {
    //console.debug(data);
    var hexColor = Raphael.hsl(data.hue, data.sat, data.lum);
    cw.color(hexColor);
})
