

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

var trainName = "";
var trainDestination = "";
var frequency = "";
var monthlyRate = "";

$("#search").on("click", function () {
    trainName = $("#train-name").val();
    trainDestination = $("#destination").val();
    frequency = $("#frequency").val();
    monthlyRate = $("#monthlyRate").val();

    console.log(trainName);
    console.log(trainDestination);
    console.log(frequency);
    console.log(monthlyRate);

    // Code for handling the push
    database.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        startDate: moment(startDate).format("X"),
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        // Handle the errors
    }, function (errObject) {
        if (errObject) {
            alert(errObject)
        }

    }); // end push
}); // end click

database.ref().orderByChild("dateAdded").on("child_added", function (snapshot) {
    makeRowInTable(snapshot.val());

});

function makeRowInTable(obj) {

    var tr = $('<tr>');

    var name = $('<td class="name">');
    name.text(obj.trainName);
    var destination = $('<td class="role">');
    role.text(obj.trainDestination);
    var startDateNode = $('<td class="startDate">');
    startDateNode.text(
        moment
        .unix(obj.startDate) // <= does take a string
        .format('MM-DD-YYYY')
    );
    var monthsWorked = $('<td class="monthsWorked">');
    var months = moment
        .unix(obj.startDate)
        .diff(moment(), "months") *
        -1;
    monthsWorked.text(months);
    var monthlyRateNode = $('<td class="monthlyRate">');
    monthlyRateNode.text(obj.monthlyRate);
    // months worked times monthly rate
    var totalBilled = $('<td class="totalBilled">');
    totalBilled.text(months * obj.monthlyRate);

    tr.append(trainName);
    tr.append(trainDestination);
    tr.append(frequency);
    tr.append(monthsWorked);
    tr.append(monthlyRateNode);
    tr.append(totalBilled);

    $('#arrivals').append(tr);


}