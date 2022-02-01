var currentDay = $("#currentDay");
var hourArray = [];
var blockContainer = $(".container");
var showDay = moment().format('dddd, MMMM Do YYYY');

currentDay.text(showDay);

createHours();
createBlocks();
setData();
createEvents();
colorHours();

// Add event listeners and handle input, storage of new user entries
$(document).on("click", "button", function () {
    var userInput = $(this).parent().find("textarea").val();
    var textRow = $(this).parent().find("textarea").attr("data-row");

    var dayPlanner = JSON.parse(localStorage.getItem("dayPlanner"));

    var newEvent = new Object();
    newEvent.currentDay = showDay;
    newEvent.row = textRow;
    newEvent.text = userInput;

    dayPlanner.unshift(newEvent);
    dayPlanner = removeDuplicates(dayPlanner, "row");
    dayPlanner.sort(function (x, y) {
        return x.row - y.row;
    });
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));

    function removeDuplicates(array, key) {
        var lookup = {};
        var result = [];
        $.each(array, function (i, value) {
            if (!lookup[value[key]]) {
                lookup[value[key]] = true;
                result.push(value);
            };
        });
        return result;
    };
});

// // Make hours 9-5
function createHours() {
    for (var i = 0; i < 9; i++) {
        var hour = moment().hour(i + 9).format("h a");
        hourArray.push(hour);
    };
};

// // Makes a row for each hour, slams them into the container, and sets up their columns
function createBlocks() {
    $.each(hourArray, function (i, value) {
        var createRow = $("<div>");
        createRow.addClass("row timeblock").attr("id", "row" + i);
        blockContainer.append(createRow);

        var hourColumn = $("<div>");
        hourColumn.addClass("col-1 hour").text(value).attr("data-hour", i + 9);
        $("#row" + i).append(hourColumn);

        var eventColumn = $("<textarea>");
        eventColumn.addClass("col-10 description").attr("id", "text" + i).attr("data-row", i);
        $("#row" + i).append(eventColumn);

        var saveButtonColumn = $("<button>");
        saveButtonColumn.addClass("col-1 saveBtn").html("<i class=\"far fa-save\"></i>");
        $("#row" + i).append(saveButtonColumn);
    });
};

// Load saved events from local storage
function createEvents() {
    var display = JSON.parse(localStorage.getItem("dayPlanner"));
    $("textarea").empty;
    $.each(hourArray, function (i, value) {
        $("#text" + i).text(display[i].text);
    });
};

// Set up the local storage entry when needed (blank/new day/etc.)
function setData() {
    var storage = JSON.parse(localStorage.getItem("dayPlanner"));
    if (storage === undefined || storage === null || storage[0].currentDay !== showDay) {
        storage = [];
        $.each(hourArray, function (i, value) {
            var tempObject = new Object();
            tempObject.currentDay = showDay;
            tempObject.row = i;
            tempObject.text = "";
            storage.push(tempObject);
            localStorage.setItem("dayPlanner", JSON.stringify(storage));
        });
    };
    localStorage.setItem("dayPlanner", JSON.stringify(storage));
};

// // Apply classes to hour blocks so they will be color-coded by the CSS
function colorHours() {
    $.each(hourArray, function (i, value) {
        if ( moment().isAfter(moment().hour(9 + i)) ) {
            $("#text" + i).addClass("past");
        } else if ( moment().isSame(moment().hour(9 + i)) ) {
            $("#text" + i).addClass("present");
        } else if ( moment().isBefore(moment().hour(9 + i)) ) {
            $("#text" + i).addClass("future");
        };
    });
};
