//global map variable
var map;
//AMD require statement to all in the classes that we be used from the API.  More info at: https://dojotoolkit.org/documentation/tutorials/1.10/modules/
require([
    "esri/map",
    "esri/InfoTemplate",
    "esri/layers/FeatureLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/Color",
    "dojo/parser",
	"esri/renderers/UniqueValueRenderer",
	"esri/symbols/SimpleLineSymbol",
	"dojo/domReady!"
  ],
  //The following are the class names that you will use when each object is created in the function.  The order of the class names must be in the same order as the require statements.  More info at: https://developers.arcgis.com/javascript/jshelp/intro_firstmap_amd.html#step3
  function(
    Map,
    InfoTemplate,
    FeatureLayer,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleRenderer,
    Color,
    parser,
	UniqueValueRenderer,
	SimpleLineSymbol
  ) {
    // To parse out dijits: https://dojotoolkit.org/reference-guide/1.10/dojo/parser.html
    parser.parse();
    //Create a new map. To see all the map constructors go to: https://developers.arcgis.com/javascript/jsapi/map-amd.html#map1
    map = new Map("mapDiv", {
      //set basemap to topo.  All the ArcGIS basemap options: "streets" , "satellite" , "hybrid", "topo", "gray", "dark-gray", "oceans", "national-geographic", "terrain", "osm", "terrain" and "dark-gray".  
      basemap: "gray",
      //Center the map at a Lat Long coordinate.  To find a lat long, type in "<City Name of your choice> lat long" into a browser search.
      center: [-78.9072, 35.9886],
      //Zoom level to start at, based on the basemap.
      zoom: 10
    });

    //Symbol used to draw farmers market points.  Default style is circle. 
    var pointSymbol = new SimpleMarkerSymbol(); 
    //set circle size to 14 point
    pointSymbol.setSize(20);
    //create outline and set it to green
    pointSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([50, 255, 50]), 1));
    //set circle color to purple
    pointSymbol.setColor(new Color([207, 34, 171]));
	
	var defaultSymbol = new SimpleLineSymbol().setStyle(SimpleLineSymbol.STYLE_NULL);
	
	var renderer = new UniqueValueRenderer(pointSymbol, "text");
	renderer.addValue("flood", new esri.symbol.SimpleLineSymbol().setColor(new Color([255,255,0,0.5])));
	renderer.addValue("earthquake", new esri.symbol.SimpleLineSymbol().setColor(new Color([128,0,128,0.5])));
	renderer.addValue("wildfire", new esri.symbol.SimpleLineSymbol().setColor(new Color([255,0,0,0.5])));
	renderer.addValue("tornado", new esri.symbol.SimpleLineSymbol().setColor(new Color([255,255,0,0.5])));
	renderer.addValue("hurricane", new esri.symbol.SimpleLineSymbol().setColor(new Color([128,0,128,0.5])));
	renderer.addValue("flash flood", new esri.symbol.SimpleLineSymbol().setColor(new Color([255,0,0,0.5])));
	renderer.addValue("tsunami", new esri.symbol.SimpleLineSymbol().setColor(new Color([255,255,0,0.5])));
	renderer.addValue("avalanche", new esri.symbol.SimpleLineSymbol().setColor(new Color([128,0,128,0.5])));	

    //Create the info window using HTML to reference the field values and construct the output
    var infoTemplate = new InfoTemplate("Disaster", "Disaster type: ${text}\n Datetime: ${id} \n");
    //Create a new feature layer. More info at: https://developers.arcgis.com/javascript/jshelp/inside_feature_layers.html
    var featureLayer = new FeatureLayer
      //set the url to the rest endpoint of your data
      ("https://services8.arcgis.com/v9RrsHPyQp0yVjsL/arcgis/rest/services/mygeodata/FeatureServer/0", {
        //See all the constructor options at: https://developers.arcgis.com/javascript/jsapi/featurelayer-amd.html#featurelayer1
        //Requests only the points from the server that are within the current map extent
        mode: FeatureLayer.MODE_ONDEMAND,
        //Returns all the fields in the JSON object coming back from the server.  Limit unwanted fields for better performance
        outFields: ["*"],
        //Sets the infotemplate that was create above.  https://developers.arcgis.com/javascript/jsapi/infotemplate-amd.html
        infoTemplate: infoTemplate
      });
	  

    //Set render property of the feature Layer to a new simple renderer, applying the point symbol created above. https://developers.arcgis.com/javascript/jsapi/simplerenderer-amd.html
    //featureLayer.setRenderer(renderer);
    //add the feature layer to the map
    map.addLayer(featureLayer);
    //Re-size the info window to properly hold the Name field value
    map.infoWindow.resize(250, 75);

  });