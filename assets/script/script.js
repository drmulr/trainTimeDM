
  var config = {
      apiKey: "AIzaSyB3CMdmeXYDz1sDFpj4JieJ6Cjvi9ehuAU",
      authDomain: "trainscheduledm-70315.firebaseapp.com",
      databaseURL: "https://trainscheduledm-70315.firebaseio.com",
      projectId: "trainscheduledm-70315",
      storageBucket: "",
      messagingSenderId: "415415412563"
    };
    firebase.initializeApp(config);

//config data accurate for trains above.

    var db = firebase.database();
    var trainName = "";
    var destination = "";
    var frequency = 0;
    var nextArr = 0;
    var minAway = 0;

//click submit. grabbing the values of each input, assigning them a variable on click
  $("#addTrain").on("click", function() {
      event.preventDefault();
      trainName = $("#nameInput").val().trim();
      destination = $("#destinationInput").val().trim();
      firstTrainTime = $("#timeInput").val().trim();
      frequency = $("#frequencyInput").val().trim();

      //need use push - allows us to store data within unique keys
      db.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
      console.log(trainName);
      console.log(destination);
      console.log(firstTrainTime);
      console.log(frequency);
  });

  db.ref().orderByChild("dateAdded").limitToLast(5).on("child_added",function(snapshot){
      var tName = snapshot.val().trainName;
      var dest = snapshot.val().destination;
      var freq = snapshot.val().frequency;
        console.log("Frequency: " + freq + " min");
      var currTime = firebase.database.ServerValue.TIMESTAMP;
      //First Train Time:
      var first = moment(snapshot.val().firstTrainTime, "hmm").format("HH:mm");
        console.log("First Train Time: " + first);
      //Current Time:
      var now = moment().format("HH:mm:ss");
        console.log("Now: " + now);
        console.log("Now + interval: " + moment().add(freq, 'm').format("HH:mm:ss"));

      var m = moment([7, 15, 16]);
      console.log("To String: " + m.toString());

      console.log(moment().add("minute", now).toString());

      // var d = moment.duration(freq, "minutes");
      // console.log("Duration in Min: " + d);

      //BELOW GRABBED FROM ACTIVITIES
      // Assumptions
      var tFrequency = freq;
      // Time is 3:30 AM
      var firstTime = first;
      // First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
          console.log(firstTimeConverted);
      // Current Time
      var currentTime = moment();
          console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          console.log("DIFFERENCE IN TIME: " + diffTime);
      // Time apart (remainder)
      var tRemainder = diffTime % tFrequency;
          console.log(tRemainder);
      // Minute Until Train
      var tMinutesTillTrain = tFrequency - tRemainder;
          console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
          console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




      // console.log("Test Snapshot + Date Added: " + JSON.stringify(snapshot.dateAdded));
      $(".schedTable").append("<tr>" + "<td>" + tName + "</td>" + "<td>" + dest + "</td>" + "<td>" + freq +
      "<td>"+ nextTrain +"</td>" + "<td>"+ tMinutesTillTrain +"</td>"+ "</tr>");

      //need calculate future time based on firstTrainTime and frequency


  })
