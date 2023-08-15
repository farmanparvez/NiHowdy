import * as React from "react";
import { useSelector } from "react-redux";

export const DisplayMapFC = () => {
  const mapRef = React.useRef(null);
  const { priceForMap, center, isZipCodeChange } = useSelector(
    ({ medicine }) => medicine
  );

  var svgMarkupCenter =
    '<svg width="24" height="24" ' +
    'xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    'height="22" /><text x="12" y="18" font-size="12pt" ' +
    'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    'fill="white">H</text></svg>';

  // const iconFunc = (value) => {
  //   var svgMarkup = `<svg  width="64" height="22" xmlns="http://www.w3.org/2000/svg">
  //   <rect stroke="black" fill="#FAD02C" x="1" y="1" width="64" height="22" />
  //   <text x="28" y="18" font-size="12pt" font-family="Arial" font-weight="bold" text-anchor="middle" >$${value}</text>  </svg>`;
  //   return svgMarkup;
  // };

  // function addMarkersToMap(map, priceForMap) {
  //   priceForMap?.map(function (item) {
  //     var icon = new H.map.Icon(iconFunc(item.Price));
  //     const val = new H.map.Marker(
  //       { lat: item.Lat, lng: item.Long },
  //       { icon: icon }
  //     );
  //     return map.addObject(val);
  //   });
  // }

  
  const apikey = "HnQufSRD400g0ltIRZJ-oayoO3l-kg367C-dCJKliaI"

  React.useEffect(() => {
    if (!mapRef.current) return;
    // const platform = new H.service.Platform({
    //   apikey: "HnQufSRD400g0ltIRZJ-oayoO3l-kg367C-dCJKliaI",
    // });
    const H = window.H;
    const platform = new H.service.Platform({ apikey });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      // center: new H.geo.Point(center?.latitude, center?.longitude ),
      center: { lat: center?.latitude || 0, lng: center?.longitude || 0 },
      // center: {lat: 53.439, lng: -2.221},
      zoom: 13,
      pixelRatio: window.devicePixelRatio || 1,
    });
    // var timer;

    // timer = setTimeout(() => {
    var icon = new H.map.Icon(svgMarkupCenter),
      // coords = {
      //   lat: 53.439 || 0,
      //   lng: -2.221|| 0,
      // },
      coords = {
        lat: center?.latitude || 0,
        lng: center?.longitude || 0,
      },
      marker = new H.map.Marker(coords, { icon: icon });
    hMap.addObject(marker);
    hMap.setCenter(coords);

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
    behavior.disable(H.mapevents.Behavior.WHEELZOOM)
    var ui = H.ui.UI.createDefault(hMap, defaultLayers);
    // startClustering(hMap, priceForMap);

    addInfoBubble(hMap, ui);

    function addMarkerToGroup(group, coordinate, html) {
      var marker = new H.map.Marker(coordinate);
      // add custom data to the marker
      marker.setData(html);
      group.addObject(marker);
    }
  
    function addInfoBubble(map, ui) {
      var group = new H.map.Group();
      map.addObject(group);
  
      // add 'tap' event listener, that opens info bubble, to the group
      group.addEventListener('tap', function (evt) {
        // event target is the marker itself, group is a parent event target
        // for all objects that it contains
        var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
          // read custom data
          content: evt.target.getData()
        });
        // bubble = new H.ui.InfoBubble(map.getCenter(), {
        //   content: 'hello'
        // });
        // show info bubble
        ui.addBubble(bubble);
      }, false);
  
      priceForMap?.map(res => addMarkerToGroup(group, { lat: res.Lat, lng: res.Long },
        `<div>$${res.Price}</div><div><img width:"50px" height:"50px" src=${res.PharmacyLogo} alt="" /></div`)
      )
    }
    // addMarkersToMap(hMap, priceForMap);
    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    // }, 200)

    // return () => hMap.dispose()
    // return () => {
    //   hMap.dispose()
    //   clearTimeout(timer)
    // }
    // eslint-disable-next-line
  }, [mapRef, isZipCodeChange, apikey]); // This will run this hook every time this ref is updated

  return (
    <div
      className="map h-[100%] w-[100%]"
      ref={mapRef}
      // style={{ height: "1480px", width: "100%" }}
    />
  );
};


// import * as React from "react";
// import { useSelector } from "react-redux";

// export const DisplayMapFC = () => {
//   const mapRef = React.useRef(null);
//   const { priceForMap, center, isZipCodeChange } = useSelector(
//     ({ medicine }) => medicine
//   );
//   const H = window.H;
//   console.log(priceForMap);
//   console.log(center);

//   var svgMarkupCenter =
//     '<svg width="24" height="24" ' +
//     'xmlns="http://www.w3.org/2000/svg">' +
//     '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
//     'height="22" /><text x="12" y="18" font-size="12pt" ' +
//     'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
//     'fill="white">H</text></svg>';

//   const iconFunc = (value) => {
//     var svgMarkup = `<svg  width="64" height="22" xmlns="http://www.w3.org/2000/svg">
//     <rect stroke="black" fill="#FAD02C" x="1" y="1" width="64" height="22" />
//     <text x="28" y="18" font-size="12pt" font-family="Arial" font-weight="bold" text-anchor="middle" >$${value}</text>  </svg>`;
//     return svgMarkup;
//   };

//   function addMarkersToMap(map, priceForMap) {
//     priceForMap?.map(function (item) {
//       var icon = new H.map.Icon(iconFunc(item.Price));
//       const val = new H.map.Marker(
//         { lat: item.Lat, lng: item.Long },
//         { icon: icon }
//       );
//       return map.addObject(val);
//     });
//   }

//   React.useLayoutEffect(() => {
//     if (!mapRef.current) return;
//     const platform = new H.service.Platform({
//       apikey: "HnQufSRD400g0ltIRZJ-oayoO3l-kg367C-dCJKliaI",
//     });
//     const defaultLayers = platform.createDefaultLayers();
//     const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
//       // center: new H.geo.Point(center?.latitude, center?.longitude ),
//       center: { lat: center?.latitude || 0, lng: center?.longitude || 0 },
//       zoom: 11,
//       pixelRatio: window.devicePixelRatio || 1,
//     });
//     var icon = new H.map.Icon(svgMarkupCenter),
//       coords = {
//         lat: center?.latitude || 0,
//         lng: center?.longitude || 0,
//       },
//       marker = new H.map.Marker(coords, { icon: icon });
//     hMap.addObject(marker);
//     hMap.setCenter(coords);

//     const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));
//     const ui = H.ui.UI.createDefault(hMap, defaultLayers);
//     // startClustering(hMap, priceForMap);

//     addMarkersToMap(hMap, priceForMap);
//     // This will act as a cleanup to run once this hook runs again.
//     // This includes when the component un-mounts
//     return () => hMap.dispose();
//   }, [mapRef, isZipCodeChange]); // This will run this hook every time this ref is updated

//   return (
//     <div
//       className="map"
//       ref={mapRef}
//       style={{ height: "500px", width: "100%" }}
//     />
//   );
// };
