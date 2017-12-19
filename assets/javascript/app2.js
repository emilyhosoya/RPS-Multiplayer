// Set up Firebase database
var config = {
  apiKey: "AIzaSyCduWPte0xiCq_NA5IIpYU9A3kHNmwGukg",
  authDomain: "train-scheduler-3593c.firebaseapp.com",
  databaseURL: "https://train-scheduler-3593c.firebaseio.com",
  messagingSenderId: "632387498202",
  projectId: "train-scheduler-3593c",
  storageBucket: ""
};

firebase.initializeApp(config);

// Assign the database reference to a variable named 'database'
const database = firebase.database();
const ref = database.ref();

// Lazy console.log
function log(input) {
  console.log(input);
}

// Form validation checker
function inputExists(input) {
  let input = $("input").val();

  if (input != null || input != undefined) {
    console.log(input);
    return true;
  } else {
    console.log("Missing input");
    return false;
  }
}

// --------------------------------------------------------------

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
ref.on(
  "child_added",
  function(snapshot) {
    let value = snapshot.val();
    log(value);

    // for train in trains

    // Inside the loop: Set the variables for each train
    // name = value.name;
    // destination = value.destination;
    // firstTrain = value.firstTrain;
    // frequency = value.frequency;

    // append a new table row in #train-data with tds for each value
    // $("#highest-bidder").text(highBidder);

    // If any errors are experienced, log them to console.
  },
  function(errorObject) {
    log("The read failed: " + errorObject.code);
  }
);

// --------------------------------------------------------------

// Whenever a user clicks the submit-bid button
$("#submit").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  let name = $("#name").val();
  let destination = $("#destination").val();

  let firstTrain = $("#first-train").val();
  // firstTrain.replace(/:/gi, "");
  firstTrain = moment(firstTrain, "hmm").format("HH:mm");
  let frequency = $("#frequency").val();

  let inputs = $("input");

  // inputs.forEach(element => {
  //   inputExists(element);
  // });

  // if all inputs exist
  if (name && destination && firstTrain && frequency) {
    // Save the new train in Firebase
    ref.push({
      name,
      destination,
      firstTrain,
      frequency
    });

    // Log input values
    log(
      `New train added! ${name} going to ${destination}. The first train departs at ${firstTrain} and stops every ${frequency} minutes.`
    );

    // Clear input values
    $("input").val("");

    // else if name is missing

    // else if destination is missing

    // else if firstTrain is not in the correct format
    // moment("1010", "HHmm").isValid();

    // else if frequency is not a number
  } else {
    log("Please complete all fields.");
  }
});
