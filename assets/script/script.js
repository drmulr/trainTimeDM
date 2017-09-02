
var config = {
  apiKey: "AIzaSyC4a0HpUaFFTgi-BL7ZgkK5cuAuIRmxdw8",
  authDomain: "mullup-d4b17.firebaseapp.com",
  databaseURL: "https://mullup-d4b17.firebaseio.com",
  projectId: "mullup-d4b17",
  storageBucket: "mullup-d4b17.appspot.com",
  messagingSenderId: "133159445436"
};
firebase.initializeApp(config);
  var db = firebase.database();
  var name = "";
  var email = "";
  var age = 0;
  var comment = "";


//click submit. grabbing the values of each input, assigning them a variable on click
  $("#addUser").on("click", function() {
    event.preventDefault();
    name = $("#nameInput").val().trim();
    email = $("#emailInput").val().trim();
    age = $("#ageInput").val().trim();
    comment = $("#commentInput").val().trim();
//throwing that information at firebase to hold on  to
    // db.ref().set({
      //instead of set, we need to use something else to get all members' info...
      //need use push - allows us to store data within unique keys
    db.ref().push({
      name: name,
      email: email,
      age: age,
      comment: comment,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
//lastly, adding the well at bottom, and listing all the cats:
  // db.ref().on("child_added",function(snapshot){
  //   $(".well").append("<p>" + snapshot.val().name + "</p");
  //   $(".well").append("<p>" + snapshot.val().email + "</p");
  //   $(".well").append("hr");
  // })

//grabs that data, throws it into the html from firebase!
// db.ref().on("value",function(snapshot){
//orderByChild = orders by date added...
  db.ref().orderByChild("dateAdded").limitToLast(1).on("child_added",function(snapshot){
    $("#nameDisplay").html(snapshot.val().name);
    $("#emailDisplay").html(snapshot.val().email);
    $("#ageDisplay").html(snapshot.val().age);
    $("#commentDisplay").html(snapshot.val().comment);
  });
