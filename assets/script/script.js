
  var config = {
      apiKey: "AIzaSyB3CMdmeXYDz1sDFpj4JieJ6Cjvi9ehuAU",
      authDomain: "trainscheduledm-70315.firebaseapp.com",
      databaseURL: "https://trainscheduledm-70315.firebaseio.com",
      projectId: "trainscheduledm-70315",
      storageBucket: "",
      messagingSenderId: "415415412563"
    };
    firebase.initializeApp(config);
    //declaring some initial variables:
    var db = firebase.database();
    var trainName = "";
    var destination = "";
    var frequency = 0;
    var nextArr = 0;
    var minAway = 0;

    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // // ...
    // });

  //adding on click event - grabbing inputs from form inputs:
  $("#addTrain").on("click", function() {
      event.preventDefault();
      trainName = $("#nameInput").val().trim();
      destination = $("#destinationInput").val().trim();
      firstTrainTime = $("#timeInput").val().trim();
      frequency = $("#frequencyInput").val().trim();

      //utilizing push - enables add multiple records vs set:
      db.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      $("#nameInput").val("");
      $("#destinationInput").val("");
      $("#timeInput").val("");
      $("#frequencyInput").val("");
  });
  //adding on child_added event - each time new train added, this fires:
  //can add .limitToLast() after orderByChild
  db.ref().orderByChild("dateAdded").limitToLast(5).on("child_added",function(snapshot){
      //creating variables based on database information:
      var tName = snapshot.val().trainName;
      var dest = snapshot.val().destination;
      var freq = snapshot.val().frequency;
      var currTime = firebase.database.ServerValue.TIMESTAMP;

      //First Train Time:
      var first = moment(snapshot.val().firstTrainTime, "hhmm").format("HH:mm");
      // First Time (pushed back 1 year to make sure it comes before current time) in UNIX format here
          // console.log("FIRST: " + first);
      var firstTimeConverted = moment(first, "hh:mm").subtract(1, "years");
          // console.log("FIRST TIME CONVERTED: " + firstTimeConverted);
      // Current Time
      var currentTime = moment();
          // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          // console.log("DIFFERENCE IN TIME: " + diffTime);
      // Time apart (remainder)
      var tRemainder = diffTime % freq;
          // console.log(tRemainder);
      // Minute Until Train
      var tMinutesTillTrain = freq - tRemainder;
          // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
          // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      // console.log("Test Snapshot + Date Added: " + JSON.stringify(snapshot.dateAdded));
      $(".schedTable").append("<tr>" +
          "<td>"+tName+"</td>" +
          "<td>"+dest+"</td>" +
          "<td>"+freq+"</td>"+
          "<td>"+nextTrain+"</td>" +
          "<td>"+tMinutesTillTrain+"</td>" +
          "</tr>");
      $(".spotlightTrain").html(tName + "!");
  })
