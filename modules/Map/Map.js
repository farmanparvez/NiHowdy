"use-client"
import { useEffect, useRef } from 'react';
// import H from '@here/maps-api-for-javascript';

const Index = () => {

    const mapRef = useRef(null);
    // const { priceForMap, center, isZipCodeChange } = useSelector(
    //     ({ medicine }) => medicine
    // );


    // function addMarkerToGroup(group, coordinate, html) {
    //     var marker = new H.map.Marker(coordinate);
    //     // add custom data to the marker
    //     marker.setData(html);
    //     group.addObject(marker);
    // }

    // function addInfoBubble(map, ui) {
    //     var group = new H.map.Group();
    //     map.addObject(group);

    //     // add 'tap' event listener, that opens info bubble, to the group
    //     group.addEventListener('tap', function (evt) {
    //         // event target is the marker itself, group is a parent event target
    //         // for all objects that it contains
    //         var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
    //             // read custom data
    //             content: evt.target.getData()
    //         });
    //         // bubble = new H.ui.InfoBubble(map.getCenter(), {
    //         //   content: 'hello'
    //         // });
    //         // show info bubble
    //         ui.addBubble(bubble);
    //     }, false);

    //     priceForMap?.map(res => addMarkerToGroup(group, { lat: res.Lat, lng: res.Long },
    //         `<div>$${res.Price}</div><div><img width:"50px" height:"50px" src=${res.PharmacyLogo} alt="" /></div`)
    //     )
    // }

    // var svgMarkupCenter =
    //     '<svg width="24" height="24" ' +
    //     'xmlns="http://www.w3.org/2000/svg">' +
    //     '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    //     'height="22" /><text x="12" y="18" font-size="12pt" ' +
    //     'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    //     'fill="white">H</text></svg>';


    const apikey = "HnQufSRD400g0ltIRZJ-oayoO3l-kg367C-dCJKliaI"

    var svgMarkupCenter =
        '<svg width="24" height="24" ' +
        'xmlns="http://www.w3.org/2000/svg">' +
        '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
        'height="22" /><text x="12" y="18" font-size="12pt" ' +
        'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
        'fill="white">H</text></svg>';

    useEffect(() => {

        if (!mapRef.current) return;
        const H = window.H;
        const platform = new H.service.Platform({ apikey });
        const defaultLayers = platform.createDefaultLayers();
        const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
            // center: new H.geo.Point(center?.latitude, center?.longitude ),
            //   center: { lat: center?.latitude || 0, lng: center?.longitude || 0 },
            center: { lat: 53.430, lng: -2.961 },
            zoom: 13,
            pixelRatio: window.devicePixelRatio || 1,
        });
        // var timer;

        // timer = setTimeout(() => {
        var icon = new H.map.Icon(svgMarkupCenter),
            coords = {
                lat: 53.430 || 0,
                lng: -2.961 || 0,
            },
            //   coords = {
            //     lat: center?.latitude || 0,
            //     lng: center?.longitude || 0,
            //   },
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
            const priceForMap = [{ Lat: 53.441, Long: -2.961, Price: 324 }, { Lat: 53.435, Long: -2.961, Price: 324 }]

            priceForMap?.map(res => addMarkerToGroup(group, { lat: res.Lat, lng: res.Long },
                `<div>$${res.Price}</div><div></div`)
            )
        }
    },
        // Dependencies array
        [apikey]
    );


    return <div
        style={{ height: "100vh", width: "100%" }}
        ref={mapRef}
    // style={{ height: "1480px", width: "100%" }}
    />
}

export default Index