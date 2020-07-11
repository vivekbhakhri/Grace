
function SignUp(){
  
    var usrnm = document.getElementById('usrnm').value;
    var email = document.getElementById('email').value;
    var pswd = document.getElementById('pswd').value;
    var cmpswd = document.getElementById('cmpswd').value;
    var btnSignUp = document.getElementById('btnSignUp');

    var psw = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]))/;
    var database = firebase.database();
    var ref = database.ref('info');
    var data = {
      name: usrnm,
      email: email,
      password: pswd
    }
    if (pswd != cmpswd) {
      alert('Please make sure both password should be same.')
    }else{
      if (pswd.match(psw)) {
        
        
        firebase.auth().createUserWithEmailAndPassword(email, pswd).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          ref.push(data);
          window.location.replace("login.html");
        });
      }
    }

};


function SignIn(){

  var email = document.getElementById('email').value;
  var pswd = document.getElementById('pswd').value;

  firebase.auth().signInWithEmailAndPassword(email, pswd).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var email = user.email;
      alert('logged in as ' + email);
      window.location.href="men.html";
    } else { 
      console.log('not logged in');
    }
});

};

function SignOut(){
  firebase.auth().signOut().then(function() {
    window.location.href="login.html";
  }).catch(function(error) {
  });
  alert('successfully signed out');
  
}

