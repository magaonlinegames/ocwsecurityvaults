$(".profile").fadeIn();
$(".menu-psn").hide();
$("#error").hide();

$(".profile-btn").click(
  function(){
    $(".li").hide();
    $(".profile").fadeIn();
  }
);

$(".contents-btn").click(
  function(){
    $(".li").hide();
    $(".contents").fadeIn();
  }
);

$(".custodial_records-btn").click(
  function(){
    $(".li").hide();
    $(".custodial_records").fadeIn();
  }
);

$(".payment_history-btn").click(
  function(){
    $(".li").hide();
    $(".payment_history").fadeIn();
  }
);

$(".refernece-btn").click(
  function(){
    $(".li").hide();
    $(".refernece").fadeIn();
  }
);

$(".enquiry-btn").click(
  function(){
    $(".li").hide();
    $(".enquiry").fadeIn();
  }
);


$("#error").hide();
$("#lme-in-btn").click(
  function(){
    var email = $("#email").val().toLowerCase().trim();
    var password = $("#pwd").val();
    if (email != '' && password != '') {
      console.log('DOCUMENT FOUND: 7');

      firebase.firestore().collection("VAULTSECURITY").where("email_address", "==", email)
      .get()
      .then((querySnapshot) => {
        console.log('DOCUMENT FOUND: 770');
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.id, " => ", doc.data());
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });

      $('.security').removeClass('hide');
      // getMeLogins(email);
      if (email == 'lesterconnor177@yahoo.com') {
        $('video').hide();
        $('.vaultPic').removeClass('hide');
      }
  
      setTimeout(function(){
        $("#spink").hide();
        //$(".login").hide();
  
        $('.security img').addClass('hide');
        $('.security p').text('Sign in failed. Try again with the correct credentials');
        
        setTimeout(function(){ $('.security').addClass('hide');$('.security p').text('Please wait...');},3000);
      },8000);
    }else {
      // WARNING: error;
      $("#error").show();
      setTimeout(
        function(){
          $("#error").hide();
        }, 3000
      );
    }
  }
);

var menu_check = 0;
$(".menu-psn").click(

  function(){
    if (menu_check === 0) {
      menu_check = 1;
      $("#ctls").css("height","57px");
    } else {
      menu_check = 0;
      $("#ctls").css("height","inherit");
    }
  }
);

$("#modal-q").click(
  function(){
    $(".modal-for-vw").fadeIn();
  }
);
$("#modal-x").click(
  function(){
    $(".modal-for-vw").fadeOut();
  }
);

// WARNING: CONTROLS 18/JUNE/2020

if ($(window).width() < 875) {
   $(".menu-ixr").hide();
}
else {
  $(".menu-ixr").show();
}
var menuChecker = 0;
function showMenu(){
  if (menuChecker == 0) {
    $(".menu-ixr").fadeIn();
    menuChecker = 1;
  } else {
    $(".menu-ixr").hide();
    menuChecker = 0;
  }
}
$(".menu-ixr li").click(
  function(){
    if ($(window).width() < 875) {
       $(".menu-ixr").hide();
        menuChecker = 0;
    }
    else {
      $(".menu-ixr").show();
       menuChecker = 1;
    }
  }
);

// WARNING: FORM SUBMIT IN ACCOUNTS
$(".enquiry form").submit(function(e){
  return false;
});

function getMeLogins(account){

  console.log('get me logins');

  var docRef = firebase.firestore().collection("VAULT").doc(account);

  docRef.get().then((doc) => {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  });

  
}
// let me sign in 
function signIn(){
  var email =  $("#email").val().toLowerCase().trim();
  var password = $("#pwd").val();
  var account;

  if (email != '' && password != '') {

    console.log('LOGIN:  777: '+ email);

    var docRef = firebase.firestore().collection("VAULTSECURITY").doc(email);

    docRef.get().then((doc) => {
        if (doc.exists) {
            $(".login").hide();

            console.log("Document data:", doc.data());
            account = doc.data().account;
            getVaultDetails(account);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!"+email);

            firebase.firestore().collection("VAULTSECURITY").get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " VS=> ", doc.data());
                   account = doc.data().account;
                   checkvaultimg(doc.data().vaultimg);
                   getVaultDetails(account);
              });
          });
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    $('.security').removeClass('hide');
    // getMeLogins(email); 

  }else {
    // WARNING: error;
    $("#error").show();
    setTimeout(
      function(){
        $("#error").hide();
      }, 3000
    );
  }
}


function sendMessage(){
  var email = $(".email-txt").val();
  var phoneNumber = $(".tel-txt").val();
  var message = $(".message-txt").val();

  if (email == "" || phoneNumber == "" || message == "") {
    alert("Fields can't be left blank");
  } else {
    $(".email-txt").val("");
    $(".tel-txt").val("");
    $(".message-txt").val("");
  }
}

// WARNING:  date
var currentdate = new Date();
    var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

//alert(datetime);
$(".date-time").html(datetime);


// **24
function checkvaultimg(x){
  console.log('checking vault img: '+x);
  if (x==1) {
    console.log('xx1');

    // hide display and show vault dspalia
    $('.vaultpics').addClass('hide');
    $('#vaultpic1').removeClass('hide');
  }
  if (x==0) {
    console.log('xx0');

    $('.vaultpics').addClass('hide');
    $('#vaultpic').removeClass('hide');

    $().hide();

  }
}
