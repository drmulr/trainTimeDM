
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
      db.ref().set({
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
  db.ref().on("value",function(snapshot){
    console.log("Test Snapshot: " + JSON.stringify(snapshot));
    // $(".schedTable").append('<tr><td>test 2</td></tr>')
    $(".schedTable").append("<tr>" + "<td>" + snapshot.val().trainName + "</td>" + "<td>" + snapshot.val().destination + "</td>" + "<td>" + snapshot.val().frequency + "</td>" + "</tr>");
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
