  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBo71rjAaVRW77iiVh3kZLWRF37bIdMUh4",
    authDomain: "first-project-d55ab.firebaseapp.com",
    databaseURL: "https://first-project-d55ab.firebaseio.com",
    projectId: "first-project-d55ab",
    storageBucket: "",
    messagingSenderId: "558582273656",
    appId: "1:558582273656:web:1f264d6969532e3510ff8d",
    measurementId: "G-T7M9VJVQXK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    // retrieving input values
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "hh:mm:ss a").subtract(1, "years").format("hh:mm a");
    var frequency = $("#frequency").val().trim();
    console.log('first train button value: ', firstTrain);
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination,
      start: firstTrain,
      frequency
  };
  
    // Uploads employee data to the database
    console.log('new train: ' + newTrain);
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newEmp.name);
    console.log(newEmp.role);
    console.log(newEmp.start);
    console.log(newEmp.rate);
  
    alert("Train Succesfully Added!");
  
    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#desitnation").val("");
    $("#first-train").val("");
    $("#frequency").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = moment(childSnapshot.val().start, 'hh:mm a');
    var frequency = childSnapshot.val().frequency;
  

    // Math for determining time
    var timeRemainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minAway = frequency - timeRemainder;
    var nextArrival = moment().add(minAway, "m").format("hh:mm A");
    console.log('timeRemainder: ', timeRemainder);
    console.log('minAway: ', minAway);
    console.log('nextArrival: ', nextArrival);
    console.log('firstTrain: ', firstTrain);
    console.log('frequency: ', frequency);


    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(firstTrain.format('hh:mm a')),
        $("<td>").text(frequency),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway),

    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});