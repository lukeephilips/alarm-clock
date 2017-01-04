function weatherMap(latitude, longitude){
  this.latitude = latitude;
  this.longitude = longitude;
  this.map = L.map('map', {
    center: [this.latitude, this.longitude],
    zoom: 9
  });
  this.tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(this.map);
}

exports.mapModule = weatherMap;
