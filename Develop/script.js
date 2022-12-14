const currentDate = $("#currentDay");
const currentTime = $("#currentTime");
const container = $("#schedule");

// Add 24 rows for debugging purposes
start = 8;
end = 18;

// building a container to create timeblocks
const scheduleContainer = () => {

  // creates new Bootstrap classes
  const timeEl = $("<div></div>").addClass("row time-block");
  const hourEl = $("<div></div>").addClass("col-1 hour");
  const description = $("<textarea></textarea>")
    .addClass("description col-10 h-5 p-5")
    .attr("id", "textarea")
    .attr("placeholder", "Event description...");
  const saveBtn = $("<button></button>")
    .addClass("col-1 saveBtn")
    .html("<i class='fas fa-save'> Save </i>");
  // For Loop for creating timeblocks and populating textarea
  for (let i = start; i < end; i++) {
    record = localStorage.getItem(i);
    timeEl.html(
      hourEl
        .html(
          "<span>" +
            moment().set("hour", i).format("h a").toUpperCase() +
            "</span>"
        )
        .add(description)
        .add(saveBtn),
      description.text(record),
      saveBtn
    );
    container.append(
      timeEl.clone().attr("id", moment().set("hour", i).format("H"))
    );
  }
};

//This function changes the color of timeblocks
const changeColor = (start, end) => {
  const current = parseInt(moment().format("H")); // current hour
  let element = "";
  // range of start = 8, end = 17
  for (let i = start; i < end; i++) {
    // determines colors of textarea by finding css classes
    if (i < current) {
      element = "past";
    } else if (i == current) {
      element = "present";
    } else {
      element = "future";
    }
    $(String("#" + i))
      .find("textarea")
      .removeClass()
      .addClass(element)
      .addClass("col-10");
  }
};

// This function displays time at the top of the page
const displayTime = () => {
  // function to display time
  const date = moment().format("dddd, MMMM Do");
  const time = moment().format("hh:mm a");

  currentDate.text(date);
  currentTime.text(time);

  // Call function to change colors of the textarea
  changeColor(start, end);
};

// Saves to localStorage on click
$(".container").on("click", "button", function () {
  const saveAlert = $("<button></button>")
    .addClass("alert alert-success fade-in")
    .html("Event has been saved!");

  container.append(saveAlert);

  const key = $(this).parent().attr("id");
  const value = $(this).siblings("#textarea").val();
  localStorage.setItem(key, value);
});

// Run the functions
scheduleContainer();
setInterval(displayTime(), 500);
