import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

declare var mapboxgl: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit,AfterViewInit{


  @Input() cords!: string;
 @ViewChild('map') mapContainer!: any; 

  constructor() { }
  map!: any;

  ngOnInit() {
    console.log(this.cords)
  }
  ngAfterViewInit(): void {

    const latLng = this.cords.split(',');
    const latitude = Number(latLng[0]);
    const longitude = Number(latLng[1]);
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiamVwb2xhbmNvczE0IiwiYSI6ImNsdTBveHd2cjBkZmEya2s0NW1vcjYxeGQifQ.UJDnqn2vk-_SRfpnV1DvRQ';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v11',
      center: [longitude, latitude],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: this.mapContainer.nativeElement,
      antialias: true
    });

    map.on('style.load', () => {
      map.resize();
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer: any) => layer['type'] === 'symbol' && layer['layout']['text-field']
      ).id;
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });

    new mapboxgl.Marker({ offset: [-20, -20] })
      .setLngLat([longitude, latitude])
      .addTo(map);
    this.map = map;
  }


}
