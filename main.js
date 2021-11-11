let weather = { //object that stores data for api
    "apiKey": "6256788d7442bb4effe2dc00f4946a9f",
    fetchWeather: function (city)
    {
        //fetching the data from api and catching errors
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey
           ).then(this.handleErrors)
            .then(response => response.json()) //gets and reads the city weather data(response)
            .then(data => this.displayWeather(data)) //displays the weather data
            .catch(error => {
                if(error == "Error: 400") //bad request
                {
                    document.querySelector("body").style = "url('https://i.pinimg.com/originals/2e/10/3f/2e103f880231d5843df5ef3f7d948fd2.jpg')";
                    if(document.querySelector(".search-bar").innerText == "")
                    {
                        document.querySelector(".weather").classList.remove("loading");
                        document.querySelector(".weather").classList.add("err");
                    }
                }

                if(error == "Error: 404") //handling city not found error
                {
                    document.querySelector("body").style = "url('https://i.pinimg.com/originals/2e/10/3f/2e103f880231d5843df5ef3f7d948fd2.jpg')";
                    document.querySelector(".weather").classList.remove("loading"); //deletes all weather stats
                    document.querySelector(".weather").classList.add("err2"); //displays a specific error
                    document.getElementById("search-bar").value = "";
                }
            });
    },

    handleErrors: function (response)
    {
        if(!response.ok)
        {
            throw Error(response.status); //displays the correct error message
        }

        return response;
    },

    displayWeather: function (data) //getting objects from api and storing them as variables
    {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/w/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " Km/h";

        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "/')"; //displaying the image of the city you type in
    },
    
    search: function() //function that fetches all of the data above when you input a city
    {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() { //button click search
    weather.search();
    if(document.querySelector(".search-bar").innerText == "")
    {
        removeElements();
    }
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) { //search on Enter key press
    if(event.key === "Enter")
    {
        weather.search();
        if(document.querySelector(".search-bar").innerText == "")
        {
            removeElements();
        }
    }
});

function removeElements() //removing everything after empty field search or invalid city name search
{
    document.querySelector(".weather").classList.add("loading");
    document.querySelector(".weather").classList.remove("err");
    document.querySelector(".weather").classList.remove("err2");
    document.querySelector(".city").innerText = "";
    document.querySelector(".icon").src = "";
    document.querySelector(".description").innerText = "";
    document.querySelector(".temp").innerText = "";
    document.querySelector(".humidity").innerText = "";
    document.querySelector(".wind").innerText = "";
}