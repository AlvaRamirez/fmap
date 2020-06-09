let markersAll = [];

window.initMap = () =>{
  // The location of Uluru
  const maimo = {lat: -34.610490, lng: -58.440860};
  // The map, centered at Uluru
  const map = new google.maps.Map(
      document.getElementById('map'), 
      {
        zoom: 10,

        center: maimo,
        
        styles: styles,
        
        streetViewControl: false,
        
        fullscreenControl: false,
        
        mapTypeControlOptions: {
        
        mapTypeIds: []
        
        },
        
        zoomControlOptions: {
        
        position: google.maps.ControlPosition.LEFT_CENTER
        
        }
      });
      fetchMarkers(map)


    const handleFilterBarata = document.querySelector('.baratas');
    const handleFilterChetas = document.querySelector('.chetas');
    const handleFilterVeganas = document.querySelector('.veganas');
    const handleFilterSinTacc = document.querySelector('.sinTacc');

    //Eventos de click de los filtros
    handleFilterBarata.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('Baratas')
    })
    handleFilterChetas.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('Chetas')
    })
    handleFilterVeganas.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('Vegana')
    })
    handleFilterSinTacc.addEventListener('click', (e) => {
        e.preventDefault();
        addMarkerFiltered('Sin Tacc')
    })

    //Agrego los markers filtrados según filtro (markerType)
    const addMarkerFiltered = (markerType) => {      
        markersAll.forEach((marker) => {
            marker.setMap(null); //Quita todos los markers del mapa
        })
        const markerFiltered = markersAll.filter((markerItem) => markerItem.customInfo === markerType)
        markerFiltered.forEach((marker) => {
            marker.setMap(map);
        })
    }
}  


const fetchMarkers = async (map) => {

    try {
    
   // const response = await fetch('assets/markers.json');
    const response = await fetch('https://bmap.now.sh/heladerias');
    
    const json = await response.json();
    
    json.forEach(marker => {
        addMarker(map,marker);
});
    //var marker = new google.maps.Marker({position:{ lat:marker.lat,lng:marker.lng}, map: map });
    
    //marker.setMap(map);
    
    
    
    } catch (error) {
    
    console.log(error);
     }
    
    }

    const addMarker = (map, marker) => {
        const {lat,lng,name, description,type, web, img} = marker;
        const conetentString= `
      
        <div class="animated bounceIn">
        <h2>${name}</h2>
        <h3>${type}</h3>
        <img class="imgHe" src="${img}"> 
        <p>${description}</p> 
        <a href="${web}"  target="_blank" class="web">Contacto</a>
        </div>
        `;

        

        const indoWindow= new google.maps.InfoWindow({
            content: conetentString
        });

        const icons={
            'Baratas': 'assets/img/baratas.png',
            'Chetas': 'assets/img/chetas.png',
            'Vegana': 'assets/img/veganas.png',
            'Sin Tacc' : 'assets/img/sinTacc.png'
        }
        const markerItem = new google.maps.Marker(
            {
                position: { lat: parseFloat(lat), lng: parseFloat(lng) },
                icon: icons[type],
                map: map,
                customInfo: type
            }
        );
        markerItem.setMap(map);
        //Agrego evento de click en el marker, abre infowindow
      markerItem.addListener ('click', function () {
            indoWindow.open(map, markerItem);
        });
        //Agrego mi nuevo marker (objeto marker, no json marker, a mi array para filtros)
        markersAll.push(markerItem);
    }


