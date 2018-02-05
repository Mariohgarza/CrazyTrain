

  
 // 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyDPoo_4vzo_W7_MqD_qLdG9juG_vftDQbw",
    authDomain: "traintime-d17af.firebaseapp.com",
    databaseURL: "https://traintime-d17af.firebaseio.com",
    projectId: "traintime-d17af",
    storageBucket: "traintime-d17af.appspot.com",
    messagingSenderId: "606340293544"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // 2. Button for adding Trains
$('#add-train-btn').on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var frequency =  moment($("#frequency-input").val().trim(), "mm").format("mm");
  var nextArrival = moment ($("#nextArrival-input").val().trim(), "HH:mm").format("hh:mm A");
  var minutesAway =  moment( $ ("#minutesAway-input").val().trim(), "mm").format("mm");


    var time = moment();
    time.add(minutesAway,'m');

   nextArrival = time.format("hh:mm A");


          // Logs everything to console


     // Creates local "temporary" object for holding employee data   
   var newTrains = {
    "name": trainName,
    "destination": destination,
    "frequency": frequency,
    "nextArrival": nextArrival,
    "minutesAway": minutesAway
  };

    // Logs everything to console


  // Uploads employee data to the database
  firebase.database().ref().push(newTrains); 
  

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#nextArrival-input").val("");
  $("#minutesAway-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var nextArrival = childSnapshot.val().nextArrival;
  var minutesAway = childSnapshot.val().minutesAway;

 
 





    var x = moment();
    var y = x.format('hh:mm A');
    var end = moment(nextArrival, "hh:mm A");


    var test = end.diff(x, 'minutes');


   // console.log(x.format('m'));

    //console.log(end.format('m'));

    if(end.isBefore(y)){
      console.log("time is before current");
      console.log(end);
      console.log(y);

      var test = moment(end.add(frequency, 'm')).format('hh:mm A');
      console.log(test);
    }


    //console.log("end before calculation " + end.format('hh:mm A'));
    end.diff(x, 'minutes');
    //console.log("end after calculation " + end.format('m'));
    //console.log("x after calculation " + x.format('m'));

    minutesAway = end.format('m');

    if(minutesAway <= 0 ){

  console.log("minutes expired!");
        var time = moment();

      //console.log("time before calculation");

      time.add(frequency, 'minutes');

      //console.log(time.format('m'));

     nextArrival = time.format("hh:mm A");

     //console.log("new time after calculation: " + nextArrival);

     minutesAway = frequency;
  }


  
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway +  "</td></tr>");
});






