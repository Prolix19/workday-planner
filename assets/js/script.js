// Just adding the acceptance criteria below, for my reference
// Will try to remember to strip it out before the end

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

// Code begins here:

// Set up global variables
var currentDay = $("#currentDay");
var hourArray = [];
var blockContainer = $(".container");
var showDay = moment().format("dddd, MMMM Do YYYY");

currentDay.text(showDay);

// Make hours 9-5
var createHours = function() {
    for (var i = 0; i < 9; i++) {
        var hour = moment().hour(i + 9).format("h a");
        hourArray.push(hour);
    };
};

// Apply classes to hour blocks so they will be color-coded by the CSS
var colorHours = function() {
    $.each(hourArray, function (i) {
        if ( moment().isSame( moment().hour(9 + i) ) ) {
            $("#text" + i).addClass("present");
        } else if ( moment().isBefore( moment().hour(9 + i) ) ) {
            $("text" + i).addClass("#future");
        } else if ( moment().isAfter( moment().hour(9 + i) ) ) {
            $("text" + i).addClass("past");
        };
    });
};