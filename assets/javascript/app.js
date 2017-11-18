// Initialize Firebase
var config = {
    apiKey: "AIzaSyACiLvntCeSCTxTsyY99IwJFHspTPDZdDA",
    authDomain: "train-scheduler-a47ea.firebaseapp.com",
    databaseURL: "https://train-scheduler-a47ea.firebaseio.com",
    projectId: "train-scheduler-a47ea",
    storageBucket: "",
    messagingSenderId: "424158666860"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#search").on("click", function () {
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    var firstTrain = moment($("#first-train").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var nextArrival = "";
    var minutesAway = "";

    console.log(trainName);
    console.log(trainDestination);
    console.log(frequency);
    console.log(firstTrain);




    // Creates local "temporary" object for holding train data
    // Will push this to firebase
    var newTrain = {
        name: trainName,
        trainDestination: trainDestination,
        firstTrain: firstTrain,
        frequency: frequency,
    }

    // pushing newTrain object to Firebase
    database.ref().push(newTrain);

    // clear text-boxes
    $("#train-ame").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

    // Prevents page from refreshing
    return false;
});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // assign variables to snapshots.
    var Name = childSnapshot.val().name;
    var Destination = childSnapshot.val().trainDestination;
    var TrainTimeInput = childSnapshot.val().firstTrain;
    var Frequency = childSnapshot.val().frequency;


    // maths

    var diffTime = moment().diff(moment.unix(TrainTimeInput), "minutes");
    var timeRemainder = moment().diff(moment.unix(TrainTimeInput), "minutes") % Frequency;
    var minutes = Frequency - timeRemainder;

    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

    // Test for correct times 
    console.log(minutes);
    console.log(nextTrainArrival);
    console.log(moment().format("hh:mm A"));
    console.log(nextTrainArrival);
    console.log(moment().format("X"));

    // Append train info to table on page
    $("#arrivals").append("<tr><td>" + Name + "</td>><td>" + Destination + "</td><td>" + Frequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

});