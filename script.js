$(document).ready(function () {
    $(".uk-alert-danger").hide();
    // $(".weatherData").hide();
    // Using Firebase to store the cities 
    const firebaseConfig = {
        // The api key will be removed for deployment
        
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();

    //API key for OpenWeatherMap.org; will be removed for deployment
    const apiKey = "";

    //When the app opens, the last entry to the database will appear in the weather section
    function openApp() {
        database.ref()
            .orderByChild("dateAdded")
            .limitToLast(1)
            .once("child_added", function (snapshot) {
                const lastEntry = snapshot.val().cities;
                getWeather(lastEntry);
            });
    };
    openApp();

    // Saves the cities searched to Firebase
    function writeCityData(data) {
        let postData = {
            cities: data
        }
        let newPostKey = database.ref().child('cities').push().key;
        let updateCities = {};
        updateCities[newPostKey] = postData;
        return database.ref().update(updateCities);
    }

    // Get the cities that are saved in Firebase and render them as buttons
    function readCityData() {
        database.ref().on("child_added", function (snapshot) {
            const value = snapshot.val();
            const btnValue = value.cities;
            const btn = $(`<button type="submit" class="uk-button uk-button-secondary cityBtn" value="${btnValue}">`);
            btn.text(btnValue);
            $(".btnList").append(btn);
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    };

    //Function to call to the OpenWeatherMap API
    function getWeather(input) {
        const date = new Date(Date.now());
        const recordedDate = date.toLocaleDateString();
        //Retrieve current weather for selected city
        $.get(`http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=imperial`, function (data) {
            // console.log(data)
            const icon = data.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            $("#name").html(data.name);
            $("#icon").attr("src", iconURL);
            $("#date").html(recordedDate);
            $("#desc").html(data.weather[0].description)
            $("#temp").html(Math.round(data.main.temp) + "&#8457;")
            $("#humid").html(data.main.humidity + "&#37;")
            $("#wind").html(data.wind.speed)
            $(".weatherData").show();
        });

        //Retrieve 5 day forecast for selected city, dynamically render them to individual cards
        $.get(`http://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKey}&units=imperial`, function (data) {
            // console.log(data)
            $(".fiveDay").html("<h3 class='uk-card-title'>Five Day Forecast</h3>").append("<div class='uk-grid cards'></div>");
            for (var i = 0; i < 5; i++) {
                const nextDays = new Date(date.setDate(date.getDate() + 1) + i);
                const fiveDay = nextDays.toLocaleDateString();
                const icon = data.list[i].weather[0].icon;
                const iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
                const card = $("<div class='uk-width-1-5'>");
                const cardClass = $("<div class='uk-card uk-card-primary uk-card-body'>");
                const cardTitle = $("<h4 class='uk-card-title'>");
                const iconDisplay = $("<img id='iconDisplay' src=" + iconURL + ">");
                const tempDisplay = $("<p id='tempDisplay'>");
                const humidDisplay = $("<p id='humidDisplay'>");
                cardTitle.html(fiveDay);
                tempDisplay.html("Temperature: " + Math.round(data.list[i].main.temp) + "&#8457;");
                humidDisplay.html("Humidity: " + data.list[i].main.humidity + "&#37;");
                cardTitle.append(iconDisplay)
                cardClass.append(cardTitle)
                cardClass.append(tempDisplay)
                cardClass.append(humidDisplay)
                card.append(cardClass)
                $(".cards").append(card)
            }
        });
    }

    // Add functionality to dynamically rendere city buttons to also access OpenWeatherMap API
    $(document).on("click", ".cityBtn", function () {
        const cityBtn = $(this).val();
        getWeather(cityBtn);
    });

    //Handle submitting the city entered into the form, submit it to Open Weather Map API for weather information
    $("#submitCity").on("click", () => {
        const city = $("#inputCity").val();
        if (city === "") {
            return $(".uk-alert-danger").show();
        } else {
            getWeather(city);
            $("form").trigger("reset");
        }
        writeCityData(city);
    });
    readCityData();
});