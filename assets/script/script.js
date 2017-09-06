
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

    //calculate current time
    var t = new Date();
    var time = t.getHours() + ":" + t.getMinutes();
    console.log("Hrs + Mins: " + time);
    console.log( new Date($.now()));



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
//lastly, adding the well at bottom, and listing all the cats:
  db.ref().orderByChild("dateAdded").limitToLast(3).on("child_added",function(snapshot){
      var tName = snapshot.val().trainName;
      var dest = snapshot.val().destination;
      var freq = snapshot.val().frequency;


      console.log("Test Snapshot: " + JSON.stringify(snapshot));

      $(".schedTable").append("<tr>" + "<td>" + tName + "</td>" + "<td>" + dest + "</td>" + "<td>" + freq + "</td>" + "</tr>");
  })

//grabs that data, throws it into the html from firebase!
// db.ref().on("value",function(snapshot){
//orderByChild = orders by date added...
  // db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added",function(snapshot){
  //   $("#nameDisplay").html(snapshot.val().name);
  //   $("#emailDisplay").html(snapshot.val().email);
  //   $("#ageDisplay").html(snapshot.val().age);
  //   $("#commentDisplay").html(snapshot.val().comment);
  // });
