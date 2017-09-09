
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

  db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added",function(snapshot){
      var tName = snapshot.val().trainName;
      var dest = snapshot.val().destination;
      var freq = snapshot.val().frequency;
        console.log("Frequency: " + freq + " min");
      var currTime = firebase.database.ServerValue.TIMESTAMP;
      //First Train Time:
      var first = moment(snapshot.val().firstTrainTime, "hmm").format("HH:mm");
        console.log("First Train Time: " + first);
      //Current Time:
      var now = moment().format("HH:mm");
        console.log("Now: " + now);
        console.log("Now + interval: " + moment().add(freq, 'm').format("HH:mm"));


      //calculate current time
      // var t = new Date();
      // var time = t.getHours() + ":" + t.getMinutes();
      // console.log("Hrs + Mins: " + time);
      // console.log( new Date($.now()));
      // console.log("Current Time: " + JSON.stringify(currTime));


      // var a = moment();
      //   console.log("Moment: " + a.format());
      //   console.log("Now plus 1 month: " + a.add(1, "month").format());
      // console.log("hours + min: " + a.hours() + a.minutes());


      // console.log("Test Snapshot + Date Added: " + JSON.stringify(snapshot.dateAdded));
      $(".schedTable").append("<tr>" + "<td>" + tName + "</td>" + "<td>" + dest + "</td>" + "<td>" + freq +
      "<td>"+now+"</td>" + "<td>"+(now+"+"+freq)+"</td>"+ "</tr>");

      //need calculate future time based on firstTrainTime and frequency
  })
