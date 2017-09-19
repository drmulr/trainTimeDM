  //
  // var config = {
  //   apiKey: "AIzaSyB3CMdmeXYDz1sDFpj4JieJ6Cjvi9ehuAU",
  //   authDomain: "trainscheduledm-70315.firebaseapp.com",
  //   databaseURL: "https://trainscheduledm-70315.firebaseio.com",
  //   projectId: "trainscheduledm-70315",
  //   storageBucket: "trainscheduledm-70315.appspot.com",
  //   messagingSenderId: "415415412563"
  // };
  // firebase.initializeApp(config);



    const txtEmail = document.getElementById("txtEmail");
    const txtPassword = document.getElementById("txtPassword");
    const btnLogin = document.getElementById("btnLogin");
    const btnSignUp = document.getElementById("btnSignUp");
    const btnLogout = document.getElementById("btnLogout");

  btnLogin.addEventListener("click", e => {
    //get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

  });

  btnSignUp.addEventListener("click", e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));

  });

  btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
  })


  //add realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
      btnLogout.classList.remove("hide");
    } else {
      console.log("Not Logged In");
      btnLogout.classList.add("hide");
    }
  });
