const currentDate = $("#currentDay");
const currentTime = $("#currentTime");
const container = $("#schedule");

// Add 24 rows for debugging purposes
start = 8;
end = 17;

// building a container
const scheduleContainer = () => {

     // creates new classes
     const timeEl = $("<div></div>")
         .addClass("row time-block");
     const hourEl = $("<div></div>")
         .addClass("col-1 hour");
     const description = $("<textarea></textarea>")
         .addClass("description col-10 h-5 p-5")
         .attr("id", "textarea")
         .attr("placeholder", "Event description...")
     const saveBtn = $("<button></button>")
         .addClass("col-1 saveBtn")
         .html("<i class='fas fa-save'> Save </i>");
    // For Loop for creating time blocks and populating textarea
     for (let i = start; i < end; i++) { 
        key = [];
        key = localStorage.key(i);
        record = (localStorage.getItem(key));

         timeEl
             .html(
                 hourEl.html(
                     "<span>" +(moment().set('hour', i).format('h a')).toUpperCase()+ "</span>")
                     .add(description)
                     .add(saveBtn),
                 description
                    .text(record),
                 saveBtn
             );
         container.append(
             timeEl.clone() .attr("id", (moment().set('hour', i).format('H')))
         );
     };

 };
 

 const changeColor = (start, end) => {
    const current = parseInt(moment().format('H')); // current hour
    let element = ""; 
    // range of start = 0, end = 24
    for (let i = start; i < end; i++) {
        // determines colors of textarea by finding css classes
        if (i < current) {
            element = "past";
        } else if (i == current) {
            element = "present";
        } else {
            element = "future";
        };
        $(String("#" + i)).find("textarea") 
            .removeClass()
            .addClass(element)
            .addClass("col-10")
    };
};

const displayTime = () => { // function to display time
    const date = moment().format("dddd, MMMM Do");
    const time = moment().format("hh:mm a");

    currentDate.text(date);
    currentTime.text(time);
    
    // updates textarea colors every second
    if (moment().format('s') == '0' || moment().format('s') == '1')
        changeColor(start, end);
    
};

// Save to localStorage on click
$(".container").on('click', 'button', function () {
    const value = $(this).siblings("#textarea").val();
    const key = $(this).parent().attr("id");
    localStorage.setItem(key, value);
    if(localStorage.getItem)
});

// this verifies there is scheduleContainer
scheduleContainer();
setInterval(displayTime, 1000);
