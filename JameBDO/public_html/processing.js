function startTimer() {
    console.log("Weight is " + document.getElementById("maxweight").value)

    var netweight = document.getElementById("maxweight").value - document.getElementById("startweight").value

    var material = document.getElementById("materialtype").value

    switch(material) {
        case "timber":
            var itemstoprocess = netweight * 4
            break
        case "plank":
            var itemstoprocess = netweight * 8
            break
        case "ore":
            var itemstoprocess = netweight * 2 / 0.3
            break
        case "zinc":
            var itemstoprocess = netweight * 2 / 0.3
            break
        case "alloy":
            var itemstoprocess = netweight * 4 / 0.3
            break
    }

    if(itemstoprocess > document.getElementById("itemquantity").value)
    {
        itemstoprocess = document.getElementById("itemquantity").value
    }

    var percent = 1.2
    if(document.getElementById("alchstone").checked)
    {
        percent -= 0.14
    }

    if(document.getElementById("couscous").checked)
    {
        percent -= 0.05
    }

    console.log("Processing " + itemstoprocess + " items")

    console.log("Percent " + percent)

    var time = itemstoprocess * percent

    switch(material) {
        case "timber":
            time = time / 50
            break
        case "plank":
            time = time / 100
            break
        case "ore":
            time = time  * 1.5 / 50
            break
        case "zinc":
            time = time / 50
            break
        case "alloy":
            time = time / 50
            break
    }
    
    console.log("Time needed: " + time)

    var convertedtime = 60000 * time

    var startdays = Math.floor(convertedtime / (1000 * 60 * 60 * 24));
    var starthours = Math.floor((convertedtime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var startminutes = Math.floor((convertedtime % (1000 * 60 * 60)) / (1000 * 60));
    var startseconds = Math.floor((convertedtime % (1000 * 60)) / 1000);

    document.getElementById("p1").innerHTML = "Processing " + itemstoprocess + " items will take " + startdays + "d " + starthours + "h "
    + startminutes + "m " + startseconds + "s ";


    var finishTime = new Date().getTime() + convertedtime

    
    var x = setInterval(function() {
        var now = new Date().getTime();

        var distance = finishTime - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("p2").innerHTML = "Time remaining: " + days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("p2").innerHTML = "Finished";

            playAlarm()
          }
    })

}

function playAlarm()
{
    var x = document.getElementById("finishsound")
    x.play()

}