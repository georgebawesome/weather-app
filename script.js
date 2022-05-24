window.addEventListener('load', () => {
  let long;
  let lat;
  let locationTimezone = document.querySelector('.location-timezone');
  let tempratureDiscription = document.querySelector('.temprature-description');
  let tempratureDegree = document.querySelector('.temprature-degree');
  let tempratureSection = document.querySelector('.temprature');
  let tempratureSpan = document.querySelector('.temp-span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      let proxy = 'https://cros-anywhere.herokuapp.com/';
      let api = `${proxy}https://api.darksky.net/forecast/24dfbe35483e5954d6da5665c468a40f/${lat},${long}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temperature, summary, icon } = data.currently;
          //set dom elements from the api
          tempratureDegree.textContent = temperature;
          tempratureDiscription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //formula for celcius
          let celcius = ((temperature - 32) * 5) / 9;
          setIcons(icon, document.querySelector('.icon'));

          //change farenheit to celcius
          tempratureSection.addEventListener('click', () => {
            if (tempratureSpan.textContent === 'F') {
              tempratureSpan.textContent = 'C';
              tempratureDegree.textContent = Math.floor(celcius);
            } else {
              tempratureSpan.textContent = 'F';
              tempratureDegree.textContent = temperature;
            }
          });
        });
    });
  }
  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
