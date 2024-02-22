async function getAdressByCep() {
  const cep = document.getElementById('cep').value
  console.log(cep)

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()
    console.log(data)

    document.getElementById('logradouro').innerHTML = data.logradouro
    document.getElementById('bairro').innerHTML = data.bairro
    document.getElementById('uf').innerHTML = data.uf
  } catch {
    alert('Vixi! Parece que houve um erro. Por favor, Verifique o CEP inserido.', error)
  }
}

async function getWeather() {
  const latitude = document.getElementById('latitude').value
  const longitude = document.getElementById('longitude'). value
  console.log(latitude)
  console.log(longitude)

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo`)
    const data = await response.json()
    console.log(data)
  
    // document.getElementById('results').innerHTML = data.daily.temperature_2m_max
    document.getElementById('day').innerHTML = ""
    for( let index = 0; index < data.daily.time.length; index ++) {
      const dateString = data.daily.time[index]
      const dateObj = new Date(dateString)
      const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`
      const minTemperature = data.daily.temperature_2m_min[index]
      const maxTemperature = data.daily.temperature_2m_max[index]
      const precipitation = data.daily.precipitation_probability_max[index]
      // document.getElementById('day').innerHTML += `<div>${formattedDate}</div>`;
      const dayElement = document.createElement('div');
      dayElement.classList.add('day-element'); 
      dayElement.innerHTML = `
        <div class="circle">
          <div id="date">${formattedDate}</div>
          <div class="temp">${minTemperature}°C <img src="./assets/down.svg" alt=""></div>
          <div class="temp">${maxTemperature}°C <img src="./assets/up.svg" alt=""></div>
          <div class="temp">${precipitation}% <img src="./assets/rain.svg" alt=""></div>
        </div>
      `;

      document.getElementById('results').appendChild(dayElement);
    }
    // document.getElementById('results').innerHTML = ""
    // for( let index = 0; index < data.daily.temperature_2m_min.length; index ++) {
    //   document.getElementById('results').innerHTML += `<div> <img src="./assets/down.svg" alt="">${data.daily.temperature_2m_min[index]}ºC <img src="./assets/up.svg" alt="">${data.daily.temperature_2m_max[index]}ºC`
    // }
  } catch {
    alert('Vixi! Parece que houve um erro. Por favor, Verifique a latitude e longitude inseridos', error)
  }
}

function clickButton() {
  getAdressByCep()
  getWeather()
}

document.getElementById('button-type').addEventListener('click', clickButton)
const date = new Date()
const day = String(date.getDate()).padStart(2, '0')
const month = String(date.getMonth() + 1).padStart(2, '0')
const year = date.getFullYear()

const formattedDate = `${day}/${month}/${year}`

console.log(formattedDate)