// Déclaration des constantes 
const localisation = document.querySelector('#city');
const temperatureAct = document.querySelector('#temperature');
const description_display = document.querySelector('#description');
const MinMax = document.querySelector("#MinMax");

const Jour_1 = document.querySelector('#card1 h5');
const Jour_2 = document.querySelector('#card2 h5');
const Jour_3 = document.querySelector('#card3 h5');
const Jour_4 = document.querySelector('#card4 h5');
const Jour_5 = document.querySelector('#card5 h5');
const Jour = [Jour_1, Jour_2, Jour_3, Jour_4, Jour_5];

const Temp1 = document.querySelector('#card1 figcaption');
const Temp2 = document.querySelector('#card2 figcaption');
const Temp3 = document.querySelector('#card3 figcaption');
const Temp4 = document.querySelector('#card4 figcaption');
const Temp5 = document.querySelector('#card5 figcaption');
const Temp = [Temp1, Temp2, Temp3, Temp4, Temp5];

const Icon1 = document.querySelector('#card1 img');
const Icon2 = document.querySelector('#card2 img');
const Icon3 = document.querySelector('#card3 img');
const Icon4 = document.querySelector('#card4 img');
const Icon5 = document.querySelector('#card5 img');
const Icon = [Icon1, Icon2, Icon3, Icon4, Icon5]


window.addEventListener('load', () => {
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            var longitude = position.coords.longitude;
            var latitude = position.coords.latitude;
            
            fetch("https://api-adresse.data.gouv.fr/reverse/?lon=" + longitude + "&lat=" + latitude)
                .then(reponse => {
                console.log(reponse);
                return reponse.json();
            })
            .then(data => {
                console.log(data);
                const{city} = data.features[0].properties;
                localisation.innerHTML = city;
            });

            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude minutely&appid=3c689dc9b03bc591c65844b3386a2a5d&lang=fr&units=metric")
            .then(reponse => {
                console.log(reponse);
                return reponse.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.current;
                var {description, icon} = data.current.weather[0];
                const {min, max} = data.daily[0].temp;
                MinMax.textContent = "Max. " + Math.round(max) + "° " + "Min. " + Math.round(min) + "°";
                description_display.textContent = description;
                temperatureAct.textContent = Math.round(temp) + "°";
                
                
                var MinMaxJour = [];
                for (let i=1; i<6; i++) {
                    const{min, max} = data.daily[i].temp;
                    const{icon} = data.daily[i].weather[0]
                    let value = Math.round(max) + "° - " + Math.round(min) + "°";
                    Temp[i-1].textContent = value; 
                    Icon[i-1].setAttribute("src", IconCheck(icon));
                }
               
                
            })
           
        }), function(){
     console.log("accès refusé")   
    } 
    }
        
    
    
    
    
    
    
function SetJour() {
    Date_jour = new Date();
    var Num_jour = Date_jour.getDay();

    const jour_semaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    for (let i = 0; i < 5; i++) {
        if (Num_jour == 6) {
            Num_jour = 0;
        } else {
            Num_jour += 1
        }
        var jour_display = jour_semaine[Num_jour];
        Jour[i].textContent = jour_display;

    }

    
}
    
SetJour();


    
       
       
    
      });



