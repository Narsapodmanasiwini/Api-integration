async function getWeather() {

  const city = document.getElementById("city").value;

  const result = document.getElementById("weatherResult");

  const loading = document.getElementById("loading");

  if(city === "") {
    result.innerHTML = "Please enter city name";
    return;
  }

  loading.innerHTML = "Loading...";

  result.innerHTML = "";

  try {

    const response = await fetch(
      `https://wttr.in/${city}?format=j1`
    );

    if(!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    loading.innerHTML = "";

    result.innerHTML = `
      <h2>${city}</h2>

      <p>
        Temperature:
        ${data.current_condition[0].temp_C} °C
      </p>

      <p>
        Weather:
        ${data.current_condition[0].weatherDesc[0].value}
      </p>

      <p>
        Humidity:
        ${data.current_condition[0].humidity}%
      </p>
    `;

  } catch(error) {

    loading.innerHTML = "";

    result.innerHTML =
      "Error fetching weather data";

  }
}