$(document).ready(function() {
  let config = {
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

  // Initial Values
  let name = "";
  let destination = "";
  let firstTrain;
  let frequency = 0;
  let minutesAway = 0;

  // Update time every 1 min
  function moveTime() {
    setInterval(function() {
      console.log("1 min has passed");
    }, 60000);
  }

  ref.on(
    "child_added",
    function(snapshot) {
      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      // Change the HTML to reflect
      name = snapshot.val().name;
      destination = snapshot.val().destination;
      firstTrain = snapshot.val().firstTrain;
      frequency = snapshot.val().frequency;

      let now = moment();
      firstTrain = moment(firstTrain, "HH:mm");
      let timeSinceFirstTrain = now.diff(firstTrain, "minutes");
      let minutesAway = timeSinceFirstTrain % frequency;
      let nextTrain = moment()
        .add(minutesAway, "minutes")
        .format("h:mm A");

      console.log(
        `It is now ${now}. The first train was at ${firstTrain}. It has been ${timeSinceFirstTrain} minutes since the first train left. The next train will depart at ${nextTrain}.`
      );

      let print = `
      <tr>
            <td scope="row">${name}</td>
            <td>${destination}</td>
            <td>${frequency}</td>
            <td>${nextTrain}</td>
            <td>${minutesAway}</td>
        </tr>`;
      $("#train-data").append(print);
      // Handle the errors
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );

  $("#submit").on("click", function(event) {
    event.preventDefault();

    name = $("#name")
      .val()
      .trim();
    destination = $("#destination")
      .val()
      .trim();
    firstTrain = $("#first-train")
      .val()
      .trim();
    frequency = $("#frequency")
      .val()
      .trim();

    ref.push({
      name,
      destination,
      firstTrain,
      frequency
    });
  });

  // Initialize the app
  moveTime();
});

$("button").on("click", function(event) {
  console.log("Button clicked");
});
