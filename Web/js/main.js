

var month = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var day = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
var time = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"]
//———————————— Update
var city = ["N/A", "Atlanta", "Los Angeles","Chicago","Dallas","Denver","New York","San Francisco","Seattle","Las Vegas","Orlando","Charlotte","Phoenix","Houston","Miami","Boston","Minneapolis","Detroit","Philadelphia","Washington, D.C.","Salt Lake City","San Diego","Tampa","Portland","Honolulu"]
var city_abb = ["N/A", "ATL", "LAX","CHI","DAL","DEN","NYC","SFO","SEA","LAS","ORL","CHA","PHE","HOU","MIA","BOS","MIN","DET","PHI","W.DC","SLC","SDG","TAM","POR","HON"]
var airline_abb = ['9E', 'AA', 'AS', 'B6', 'DL', 'EV', 'F9', 'G4', 'HA', 'MQ', 'NK', 'OH', 'OO', 'UA', 'VX', 'WN', 'YV', 'YX']
var airline = ['Endeavor', 'American', 'Alaska', 'JetBlue', 'Delta', 'ExpressJet', 'Frontier', 'Allegiant', 'Hawaiian', 'Eagle', 'Spirit', 'Blue', 'Skywest', 'United', 'Redwood', 'Southwest', 'Shuttle', 'Midwest']
//———————————— Update
var rawData = null
var curData = null
var curMap = null
var curMonth = 0
var curDay = 0
var curOri = null
var curDest = null
var curT1 = 0
var curT2 = 2400
var curA1 = 0
var curA2 = 2400
//———————————— ZHENGYANG's Variable
var average_delay = 0
var delay_percentage = 0
var best_carriers=null
var worst_carriers=null
var best_trips=null
var worst_trips=null
//———————————— ZHENGYANG's Variable


var usmap = null

var colors = ["#e74c3c", "#2ecc71"]


var mapholder = d3.select('#map')
var map = mapholder.append("g")
            .attr("transform", "translate( -110 , 0 )")
var cityholder = mapholder.append("g")
            .attr("transform", "translate( -110 , 0 )")
var info = d3.select('#info')
                .append("g")

var panel1 = info.append("g")
                .attr("transform", "translate( 10 , 30 )")
panel1.append("text")
        .attr("font-size", "30px")
        .attr("y",0)
        .attr('font','Times New Roman')
        .attr('font-weight','bold')
        .text("Overview")
panel1.append("text")
        .attr("y", 50)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Average Delay")
panel1.append("text")
        .attr("x", 140)
        .attr("y", 50)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Delay Percentage")
panel1.append("text")
        .attr("y", 150)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Routes Performance")
panel1.append("text")
        .attr("y", 370)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text(">Airline Performance")

var panel2 = info.append("g")
                    .attr("transform", "translate( 10 , 20 )")
panel2.append("text")
        .attr("font-size", "12px")
        .attr('fill','black')
        .text("Departure City")
panel2.append("text")
        .attr("class", "oCity")
        .attr("y", 25)
        .attr("x", 0)
        .attr("font-size", "25px")
        .attr("font-weight", "bold")
panel2.append("text")
        .attr("y", 50)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Average Delay")
panel2.append("text")
        .attr("x", 140)
        .attr("y", 50)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Delay Percentage")
panel2.append("text")
        .attr("y", 150)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Departure Routes Performance")
panel2.append("text")
        .attr("y", 370)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text(">Airline Performance")
panel2.attr("opacity", 0)

var panel3 = info.append("g")
                    .attr("transform", "translate( 10 , 20 )")
panel3.append("text")
        .attr("class", "dCity")
        .attr("y", 25)
        .attr("x", 0)
        .attr("font-size", "30px")
        .attr('font-weight','bold')
panel3.append("text")
        .attr("font-size", "12px")
        .attr('fill','black')
        .text("Arrival City")
panel3.append("text")
        .attr("class", "oCity")
        .attr("y", 25)
        .attr("x", 0)
        .attr("font-size", "25px")
        .attr("font-weight", "bold")
panel3.append("text")
        .attr("y", 50)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Average Delay")
panel3.append("text")
        .attr("x", 140)
        .attr("y", 50)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Delay Percentage")
panel3.append("text")
        .attr("y", 150)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Arrival Routes Performance")
panel3.append("text")
        .attr("y", 370)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text(">Airline Performance")
panel3.attr("opacity", 0)

var panel4 = info.append("g")
                .attr("transform", "translate( 10 , 27 )")
panel4.append("text")
        .attr("class", "odCity")
        .attr("font-size", "25px")
        .attr('font-weight','bold')
        .text("Overview - Overview")
panel4.append("text")
        .attr("y", 50)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Average Delay")
panel4.append("text")
        .attr("x", 140)
        .attr("y", 50)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Delay Percentage")
panel4.append("text")
        .attr("y", 150)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Delay Prediction")
panel4.append("text")
        .attr("y", 370)
        .attr("font-size", "15px")
        .attr('fill','black')
        .attr('font-weight','bold')
        .text("> Airline Performance")
panel4.attr("opacity", 0)



var mSelector = d3.select('#month')
                    .on("change",
                        function(d) {
                            curMonth =  month.indexOf(d3.select(this).node().value);
                            updateData()
                        }
                    )

var mOption = mSelector.selectAll("option")
                    .data(month)
                    .enter()
                    .append("option")
                    .text(function(d){
                        return d;});

var dSelector = d3.select('#date')
                    .on("change",
                        function(d) {
                            curDay = day.indexOf(d3.select(this).node().value);
                            updateData();

                        }
                    )

var dOption = dSelector.selectAll("option")
                    .data(day)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;});

var t1Selector = d3.select('#take-off1')
                    .on("change",
                        function(d) {
                            curT1 = time.indexOf(d3.select(this).node().value)*100;
                            updateData();
                        }
                    )


var t1Option = t1Selector.selectAll("option")
                    .data(time)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;});

var t2Selector = d3.select('#take-off2')
                    .on("change",
                        function(d) {
                            curT2 = time.indexOf(d3.select(this).node().value)*100;
                            updateData();
                        }
                    )

var t2Option = t2Selector.selectAll("option")
                    .data(time)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;})
                    .property("selected", true);

var a1Selector = d3.select('#arrival1')
                    .on("change",
                        function(d) {
                            curA1 = time.indexOf(d3.select(this).node().value)*100;
                            updateData();
                        }
                    )

var a1Option = a1Selector.selectAll("option")
                    .data(time)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;});

var a2Selector = d3.select('#arrival2')
                    .on("change",
                        function(d) {
                            curA2 = time.indexOf(d3.select(this).node().value)*100;
                            updateData();
                        }
                    )

var a2Option = a2Selector.selectAll("option")
                    .data(time)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;})
                    .property("selected", true);


var tSelector = d3.select('#departure')
                    .on("change",

                        function(d) {

                            var v = d3.select(this).node().value

                            if (v == "N/A") {
                                origin = null
                            }  else {
                                origin = v
                            }

                            if ( origin == null && target == null ) {

                                panel1.attr("opacity", 1)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 0)

                            } else if ( target == null || origin == target) {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 1)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 0)
                                panel2.select(".oCity").text(origin)

                            } else if ( origin == null) {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 1)
                                panel4.attr("opacity", 0)
                                panel3.select(".dCity").text(target)

                            } else {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 1)
                                panel4.select(".odCity").text(origin + " - " + target)

                            }


                            curOri = origin

                            updateData();

                        }
                    )

var tOption = tSelector.selectAll("option")
                    .data(city)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;});

var aSelector = d3.select('#arrival')
                    .on("change",

                        function(d) {

                            var v = d3.select(this).node().value

                            if (v == "N/A") {
                                target = null
                            }  else {
                                target = v
                            }

                            if ( origin == null && target == null ) {

                                panel1.attr("opacity", 1)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 0)

                            } else if ( target == null || origin == target) {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 1)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 0)
                                panel2.select(".oCity").text(origin)

                            } else if ( origin == null) {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 1)
                                panel4.attr("opacity", 0)
                                panel3.select(".dCity").text(target)

                            } else {

                                panel1.attr("opacity", 0)
                                panel2.attr("opacity", 0)
                                panel3.attr("opacity", 0)
                                panel4.attr("opacity", 1)
                                panel4.select(".odCity").text(origin + " - " + target)

                            }

                            curDest = target

                            updateData();

                        }

                    )

var aOption = aSelector.selectAll("option")
                    .data(city)
                    .enter()
                    .append("option")
                    .text(function(d){ return d;});

var predClick = d3.select('#predButton')
                    .on("click", 
                        function(d) {
                            drawPred();
                        }
                    )




var projection = d3.geoAlbersUsa().scale(850);

var path = d3.geoPath().projection(projection);

var origin = null;

var target = null;


d3.json("data/states-10m.json").then(

    function(us) {


        map.attr("class", "states")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.states).features)
                .enter().append("path")
                .attr("d", path)
                .style("fill",  "lightblue");

        map.append("path")
                .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
                .attr("class", "state-borders")
                .attr("d", path);

        map.append("circle")
            .attr("cx", 10)
            .attr("cy", 10)
            .attr("fill", "red")
            .attr("r", 6)


        var legend = mapholder.append("g")
                        .attr("transform", "translate( 10 , 500 )")

        legend.append("text")
                .text("On-Time Performance")

        legend.append("rect")
                .attr("y", 15)
                .attr("height", 10)
                .attr("width", 30)
                .style("fill", "green")

        legend.append("text")
                .attr("y", 25)
                .attr("x", 40)
                .text("Smooth")

        legend.append("rect")
                .attr("y", 40)
                .attr("height", 10)
                .attr("width", 30)
                .style("fill", "orange")

        legend.append("text")
                .attr("y", 50)
                .attr("x", 40)
                .text("Moderate")

        legend.append("rect")
                .attr("y", 65)
                .attr("height", 10)
                .attr("width", 30)
                .style("fill", "red")

        legend.append("text")
                .attr("y", 75)
                .attr("x", 40)
                .text("Heavy")

        legend.append("text")
                .attr("x", 180)
                .text("Flight Volume")


        legend.append("rect")
                .attr("x", 180)
                .attr("y", 20)
                .attr("height", 1)
                .attr("width", 30)
                .style("fill", "grey")

        legend.append("text")
                .attr("y", 25)
                .attr("x", 220)
                .text("10")

        legend.append("rect")
                .attr("x", 180)
                .attr("y", 40)
                .attr("height", 2)
                .attr("width", 30)
                .style("fill", "grey")

        legend.append("text")
                .attr("y", 47.5)
                .attr("x", 220)
                .text("20")

        legend.append("rect")
                .attr("x", 180)
                .attr("y", 60)
                .attr("height", 5)
                .attr("width", 30)
                .style("fill", "grey")

        legend.append("text")
                .attr("y", 68)
                .attr("x", 220)
                .text("50")

        legend.append("rect")
                .attr("x", 180)
                .attr("y", 80)
                .attr("height", 10)
                .attr("width", 30)
                .style("fill", "grey")

        legend.append("text")
                .attr("y", 90)
                .attr("x", 220)
                .text("100")

        legend.append("text")
                .attr("x", 360)
                .text("Airport Status")

        var pieholder = legend.append("g")
                            .attr("transform", "translate( 420 , 50 )")


        var piedata = {"Delay": 3, "On-Time": 7}

        var piecolor = d3.scaleOrdinal().domain(piedata).range(colors)

        var pie = d3.pie().value( d => d.value)

        var data_ready = pie(d3.entries(piedata))

        var arc = d3.arc().innerRadius(15).outerRadius(30)

        pieholder.selectAll('piechart')
                .data(data_ready)
                .enter()
                .append('path')
                    .attr('d', arc)
                    .attr('fill', d => piecolor(d.data.key))


        pieholder.selectAll('pielabel')
                .data(data_ready)
                .enter()
                .append('text')
                .text( d => d.data.key)
                .attr('transform',
                    function(d){
                        var pos = arc.centroid(d)
                        pos[0] = (pos[0]+1) * 1.7
                        pos[1] = (pos[1]+1) * 1.7
                        return 'translate('+ pos +')'
                    }
                )
                .style("text-anchor",
                    function(d) {

                        var midangle = d.startAngle + (d.endAngle - d.startAngle) /2
                        return (midangle < Math.PI ? 'start' : 'end')
                    }
                )

    }
)




d3.dsv(",","data/delay.csv",function(d){
        return{
          month:  +d.MONTH,
          day:   d.DAY_OF_WEEK,
          carrier: d.OP_UNIQUE_CARRIER,
          ori:   d.ORIGIN_CITY,
          dest:  d.DEST_CITY,
          time: d.DEP_TIME_BLK.split("-"),
          delay: +d.DELAY_SUM,
          total_num: +d.NUM_TOTAL,
          delay_num: +d.NUM_DELAY
        };
        }).then(function(dataset){

            dataset.forEach(
                function(d) {
                    d.dep_time = Number(d.time[0])
                    d.arr_time = Number(d.time[1])
                    return d
                }
            )

            rawData = dataset
            curData = dataset
    })

d3.json("data/city.json").then(
    function(data) {

        usmap = data

    }

)




function updateData() {

    curData = rawData
    if(curDay) {
        curData = curData.filter(d => d.day == curDay)
    }
    if(curMonth) {
        curData = curData.filter(d => d.month == curMonth)
    }
    if(curT2 >= curT1) {
        curData = curData.filter(d => d.dep_time >= curT1 && d.dep_time <= curT2)
    } else {
        curData = curData.filter(d => d.dep_time >= curT2 && d.dep_time <= curT1)
    }
    if(curA2 >= curA1) {
        curData = curData.filter(d => d.arr_time >= curA1 && d.arr_time <= curA2)
    } else {
        curData = curData.filter(d => d.arr_time >= curA2 && d.arr_time <= curA1)
    }
    curMap = curData
    if (curOri != null) {
        curData = curData.filter(d => d.ori == curOri)
    }
    if (curDest != null) {
        curData = curData.filter(d => d.dest == curDest)
    }

    var totalNum = d3.nest()
                        .key(function(d){return d.ori;})
                        .rollup(function(v){ return d3.sum(v, function(d){return d.total_num;});})
                        .entries(curMap);

    var totalDelay = d3.nest()
                        .key(function(d){return d.ori;})
                        .rollup(function(v){ return d3.sum(v, function(d){return d.delay_num;})/d3.sum(v, function(d){return d.total_num;});})
                        .entries(curMap);

    totalDelay.forEach(
        function(d) {
            d.value = {"Delay": d.value, "On-Time": 1 - d.value}
        }
    )


    cityholder.selectAll("g").remove()

    cityholder.selectAll("g")
            .data(usmap.features).enter()
            .append("g")
            .attr("transform",
                function(d) {
                    //console.log(totalDelay.find( function(l) { return l.key == d.properties.name }).value)
                    if (totalDelay.find( function(l) { return l.key == d.properties.name }) != null) {
                        var piedata = totalDelay.find( function(l) { return l.key == d.properties.name }).value
                        var piecolor = d3.scaleOrdinal().domain(piedata).range(colors)
                        var pie = d3.pie().value( d => d.value)
                        var data_ready = pie(d3.entries(piedata)) 

                        var radius = 8

                        if (curMonth == 0) {
                            var radius = radius + (totalNum.find( function(l) { return l.key == d.properties.name }).value)/50000
                        } else {
                            var radius = radius + (totalNum.find( function(l) { return l.key == d.properties.name }).value)/5000
                        }
                        

                        var arc = d3.arc().innerRadius(radius).outerRadius(radius*2)

                        drawpie(d3.select(this), data_ready, arc, piecolor)
                    }
                    return "translate(" + projection(d.geometry.coordinates)[0]  +"," + projection(d.geometry.coordinates)[1] +")"
                }
             )
            .on("mouseover", 

                function(d) {
                    d3.select(".tips").style("opacity", 1)
                    var xs = projection(d.geometry.coordinates)[0] - 70
                    var ys = projection(d.geometry.coordinates)[1] - 32
                    d3.select(".tips").attr("transform", "translate (" + xs +"," + ys +")")
                    d3.select(".cityname").text(d.properties.name)
                    var dt = totalDelay.find( function(l) { return l.key == d.properties.name }).value["Delay"]*100
                    dt = dt.toFixed(2)
                    dt = "Delay: " + dt + "%"
                    d3.select(".timedelay").text(dt)
                }
            )
            .on("mouseout", 
                function(d) {
                    d3.select(".tips").style("opacity", 0)
                }
            )
            .append("text")
            .text(
                function(d) {
                    if (totalDelay.find( function(l) { return l.key == d.properties.name }) != null) {
                        return d.properties.name
                    }
                }
            )
            .style("font-size", "12px")
            .style("fill", "black")
            .style("font-weight", "bold")

        


        if (curOri != null && curDest != null ) {

            var curveLine = d3.line()
                .x(function(d){ return d[0]})
                .y(function(d){ return d[1]})
                .curve(d3.curveMonotoneX);

            var pointA = projection(usmap.features.find( function(d) { return d.properties.name == curOri }).geometry.coordinates)

            var pointB = projection(usmap.features.find( function(d) { return d.properties.name == curDest }).geometry.coordinates)

            var points = [pointA, pointB];

            var pathWeight = d3.nest()
                        .key(function(d){return d.ori;})
                        .rollup(function(v){ return d3.sum(v, function(d){return d.total_num;});})
                        .entries(curData);

            var pathDelay = d3.nest()
                        .key(function(d){return d.ori;})
                        .rollup(function(v){ return d3.sum(v, function(d){return d.delay_num;})/d3.sum(v, function(d){return d.total_num;});})
                        .entries(curData);

            cityholder.append("g").append("path")
                .datum(points)
                .attr("d", curveLine)
                .style("fill", "none")
                .style("stroke", 
                    function(d) {
                        if( pathDelay != []) {
                            if ( pathDelay[0].value > 0.4) {
                                return "red"
                            } 
                            if (pathDelay[0].value > 0.25) {
                                return "yellow"
                            }
                            return "green"
                        }
                        return "red"
                    }
                )
                .style("stroke-width", 
                    function(d) {
                        if( pathWeight != []) {
                            if (curMonth == 0) {
                                return pathWeight[0].value/2000
                            } else {
                                return pathWeight[0].value/100
                            }
                        } else {
                            return 0
                        }
                    }
                )



        } else if ( curOri != null) {



            var pathWeight = d3.nest()
                        .key(function(d){return d.dest;})
                        .rollup(function(v){ return d3.sum(v, function(d){return d.total_num;});})
                        .entries(curData);


            var pathDelay = d3.nest()
                        .key(function(d){return d.dest;})
                        .rollup(function(v){ return d3.sum(v, function(d){return d.delay_num;})/d3.sum(v, function(d){return d.total_num;});})
                        .entries(curData);

            for (var i = 0 ; i < pathWeight.length ; i++ ) {

                var pointA = projection(usmap.features.find( function(d) { return d.properties.name == curOri }).geometry.coordinates)

                var pointB = projection(usmap.features.find( function(d) { return d.properties.name == pathWeight[i].key }).geometry.coordinates)

                var points = [pointA, pointB]

                var curveLine = d3.line()
                                    .x(function(d){ return d[0]})
                                    .y(function(d){ return d[1]})
                                    .curve(d3.curveMonotoneX);

                var pathHolder = cityholder.append("g")

                var paths = pathHolder.append("path")
                .datum(points) 
                .attr("d", curveLine)
                .style("fill", "none")
                .style("stroke", 
                    function(d) {
                        if( pathDelay != []) {
                            if ( pathDelay[i].value > 0.4) {
                                return "red"
                            } 
                            if (pathDelay[i].value > 0.25) {
                                return "yellow"
                            }
                            return "green"
                        }
                        return "red"
                    }
                )
                .style("stroke-width", 
                    function(d) {
                        if( pathWeight != []) {
                            if (curMonth == 0) {
                                return pathWeight[i].value/2000
                            } else {
                                return pathWeight[i].value/100
                            }
                        } else {
                            return 0
                        }
                    }
                )

            }

            

        } else if (curDest != null) {

            var pathWeight = d3.nest()
                        .key(function(d){return d.ori;})
                        .rollup(function(v){ return d3.sum(v, function(d){return d.total_num;});})
                        .entries(curData);

            var pathDelay = d3.nest()
                        .key(function(d){return d.ori;})
                        .rollup(function(v){ return d3.sum(v, function(d){return d.delay_num;})/d3.sum(v, function(d){return d.total_num;});})
                        .entries(curData);

            for (var i = 0 ; i < pathWeight.length ; i++ ) {

                var pointA = projection(usmap.features.find( function(d) { return d.properties.name == pathWeight[i].key }).geometry.coordinates)

                var pointB = projection(usmap.features.find( function(d) { return d.properties.name == curDest }).geometry.coordinates)

                var points = [pointA, pointB]

                var curveLine = d3.line()
                                    .x(function(d){ return d[0]})
                                    .y(function(d){ return d[1]})
                                    .curve(d3.curveMonotoneX);

                var pathHolder = cityholder.append("g")

                var paths = pathHolder.append("path")
                .datum(points) 
                .attr("d", curveLine)
                .style("fill", "none")
                .style("stroke", 
                    function(d) {
                        if( pathDelay != []) {
                            if ( pathDelay[i].value > 0.4) {
                                return "red"
                            } 
                            if (pathDelay[i].value > 0.25) {
                                return "yellow"
                            }
                            return "green"
                        }
                        return "red"
                    }
                )
                .style("stroke-width", 
                    function(d) {
                        if( pathWeight != []) {
                            if (curMonth == 0) {
                                return pathWeight[i].value/2000
                            } else {
                                return pathWeight[i].value/100
                            }
                        } else {
                            return 0
                        }
                    }
                )

            }

            

        }


        var tip = cityholder.append("g")
                .attr("class", "tips")
                .attr("transform", "translate(200, 200)")
                .style("opacity", 0)

        tip.append("rect")
            .attr("height", 32)
            .attr("width", 80)
            .style("fill", "yellow")
            .style("opacity", 0.7)

        tip.append("text")
            .attr("class", "cityname")
            .attr("x", 2)
            .attr("y", 12)
            .text("city:")
            .style("fill", "black")
            .style("font-size", "10px")

        tip.append("text")
            .attr("class", "timedelay")
            .attr("x", 2)
            .attr("y", 27)
            .text("delay:")
            .style("fill", "black")
            .style("font-size", "10px")

    


//———————————————————————————————— YILUN and ZHENGYANG's Code Starts Here.  Please do not make any changes to codes below this line. ————————————————
//———————————————————————————————— YILUN and ZHENGYANG's Code Starts Here.  Please do not make any changes to codes below this line. ————————————————
//———————————————————————————————— YILUN and ZHENGYANG's Code Starts Here.  Please do not make any changes to codes below this line. ————————————————
//———————————————————————————————— ZHENGYANG's Code Starts Here. ————————————————
function general_info_calc(){
    calc_average()
    calc_perc()
    sort_airlines()
    sort_trip()
    //console.log('average_delay=',average_delay,'delay_percentage=',delay_percentage)
}
function calc_average(){
    var sum=0;
    var num_total=0;
    curData.forEach(function(d){
        sum=sum+d.delay;
        num_total=num_total+d.total_num;
    })
    //console.log(curData);
    //console.log(sum);
    if (sum==0){
        average_delay=0
        return 0;};
    var avg = sum/num_total;
    avg = avg.toFixed(1);
    average_delay = avg;
    //console.log(avg);
    return avg;
}
function calc_perc(){
    var num_delay=0;
    var num_total=0;
    curData.forEach(function(d){
        num_delay=num_delay+d.delay_num;
        num_total=num_total+d.total_num;
    })
    //console.log(curData);
    //console.log(sum);
    if (num_delay==0){
        delay_percentage=0;
        return 0;
    };
    var perc = num_delay*100/num_total;
    perc=perc.toFixed(1);
    //console.log(perc);
    delay_percentage = perc;
    return perc;
}
function sort_airlines(){
    let airline_companies= new Map()
    var sum_delay_SA=0;
    var count=0;
    var avg_delay_SA=0;

    curData.forEach(
        function(d){
            if (!airline_companies.has(d.carrier)){
                sum_delay_SA=d.delay;
                count=d.total_num;
                avg_delay_SA=sum_delay_SA/count
                var info=[sum_delay_SA,count,avg_delay_SA]
                airline_companies.set(d.carrier,info)
            }
            else{
                curinfo=airline_companies.get(d.carrier)
                sum_delay_SA=d.delay+curinfo[0];
                count=d.total_num+curinfo[1];
                avg_delay_SA=sum_delay_SA/count
                var info=[sum_delay_SA,count,avg_delay_SA]
                airline_companies.set(d.carrier,info)
            }
        }

    )
    var airline_companies_list_best=[]
    var airline_companies_list_worst=[]

    for (var [key,value] of airline_companies.entries()){
        //console.log(key,value[2])
        key_index=airline_abb.indexOf(key)
        airline_companies_list_best.push([airline[key_index],value[2].toFixed(2)])
        airline_companies_list_worst.push([airline[key_index],value[2].toFixed(2)])
    }

    airline_companies_list_best.sort(function(x,y){
        return x[1]-y[1]
    })
    airline_companies_list_worst.sort(function(x,y){
        return y[1]-x[1]
    })
    if (airline_companies_list_best.length>5){
        airline_companies_list_best=airline_companies_list_best.slice(0,5);
        airline_companies_list_worst=airline_companies_list_worst.slice(0,5);
    }

    best_carriers=airline_companies_list_best

    worst_carriers=airline_companies_list_worst

}
function sort_trip(){
    let airline_trips= new Map()
    var sum_delay_ST=0;
    var count_ST=0;
    var avg_delay_ST=0;
    //console.log(curData)

    curData.forEach(
        function(d){
            ori_abb=city_abb[city.indexOf(d.ori.toString())]
            dest_abb=city_abb[city.indexOf(d.dest.toString())]
            var trip=ori_abb+'->'+dest_abb
            //console.log(trip)
            if (!airline_trips.has(trip)){
                sum_delay_ST=d.delay;
                count_ST=d.total_num;
                avg_delay_ST=sum_delay_ST/count_ST
                var info=[sum_delay_ST,count_ST,avg_delay_ST]
                airline_trips.set(trip,info)
            }
            else{
                curinfo=airline_trips.get(trip)
                sum_delay_ST=d.delay+curinfo[0];
                count_ST=d.total_num+curinfo[1];
                avg_delay_ST=sum_delay_ST/count_ST;
                var info=[sum_delay_ST,count_ST,avg_delay_ST];
                airline_trips.set(trip,info)
            }
        }
    )


    var airline_trips_list_best=[]
    var airline_trips_list_worst=[]

    for (var [key,value] of airline_trips.entries()){
        airline_trips_list_best.push([key,value[2].toFixed(2)])
        airline_trips_list_worst.push([key,value[2].toFixed(2)])
    }

    airline_trips_list_best.sort(function(x,y){
        return x[1]-y[1]
    })
    airline_trips_list_worst.sort(function(x,y){
        return y[1]-x[1]
    })
    if (airline_trips_list_best.length>5){
        airline_trips_list_best=airline_trips_list_best.slice(0,5);
        airline_trips_list_worst=airline_trips_list_worst.slice(0,5);
    }

    best_trips=airline_trips_list_best

    worst_trips=airline_trips_list_worst

}
//———————————————————————————————— ZHENGYANG's Code Ends Here. ————————————————

//———————————————————————————————— YILUN's Code Starts Here. ————————————————
    panel1.selectAll('text').remove();
    panel1.selectAll('rect').remove();
    panel2.selectAll('text').remove();
    panel2.selectAll('rect').remove();
    panel3.selectAll('text').remove();
    panel3.selectAll('rect').remove();
    panel4.selectAll('text').remove();
    panel4.selectAll('rect').remove();

    general_info_calc();

    try{ var worst_airline1 = worst_carriers[0][0];var worst_airline_delaytime1 = worst_carriers[0][1];}
    catch(err){var worst_airline1 = ' '; var worst_airline_delaytime1 = 0;}

    try{ var worst_airline2 = worst_carriers[1][0];var worst_airline_delaytime2 = worst_carriers[1][1];}
    catch(err){var worst_airline2 = ' '; var worst_airline_delaytime2 = 0;}

    try{ var worst_airline3 = worst_carriers[2][0];var worst_airline_delaytime3 = worst_carriers[2][1];}
    catch(err){var worst_airline3 = ' '; var worst_airline_delaytime3 = 0;}

    try{ var worst_airline4 = worst_carriers[3][0];var worst_airline_delaytime4 = worst_carriers[3][1];}
    catch(err){var worst_airline4 = ' '; var worst_airline_delaytime4 = 0;}

    try{ var worst_airline5 = worst_carriers[4][0];var worst_airline_delaytime5 = worst_carriers[4][1];}
    catch(err){var worst_airline5 = ' '; var worst_airline_delaytime5 = 0;}

    try{ var best_airline1 = best_carriers[0][0];var best_airline_delaytime1 = best_carriers[0][1];}
    catch(err){var best_airline1 = ' '; var best_airline_delaytime1 = 0;}

    try{ var best_airline2 = best_carriers[1][0];var best_airline_delaytime2 = best_carriers[1][1];}
    catch(err){var best_airline2 = ' '; var best_airline_delaytime2 = 0;}

    try{ var best_airline3 = best_carriers[2][0];var best_airline_delaytime3 = best_carriers[2][1];}
    catch(err){var best_airline3 = ' '; var best_airline_delaytime3 = 0;}

    try{ var best_airline4 = best_carriers[3][0];var best_airline_delaytime4 = best_carriers[3][1];}
    catch(err){var best_airline4 = ' '; var best_airline_delaytime4 = 0;}

    try{ var best_airline5 = best_carriers[4][0];var best_airline_delaytime5 = best_carriers[4][1];}
    catch(err){var best_airline5 = ' '; var best_airline_delaytime5 = 0;}


    try{ var top_delay_routes1 = worst_trips[0][0];var top_delay_time1 = worst_trips[0][1];}
    catch(err){var top_delay_routes1 = ' '; var top_delay_time1 = 0;}

    try{ var top_delay_routes2 = worst_trips[1][0];var top_delay_time2 = worst_trips[1][1];}
    catch(err){var top_delay_routes2 = ' '; var top_delay_time2 = 0;}

    try{ var top_delay_routes3 = worst_trips[2][0];var top_delay_time3 = worst_trips[2][1];}
    catch(err){var top_delay_routes3 = ' '; var top_delay_time3 = 0;}

    try{ var top_delay_routes4 = worst_trips[3][0];var top_delay_time4 = worst_trips[3][1];}
    catch(err){var top_delay_routes4 = ' '; var top_delay_time4 = 0;}

    try{ var top_delay_routes5 = worst_trips[4][0];var top_delay_time5 = worst_trips[4][1];}
    catch(err){var top_delay_routes5 = ' '; var top_delay_time5 = 0;}

    try{ var least_delay_routes1 = best_trips[0][0];var least_delay_time1 = best_trips[0][1];}
    catch(err){var least_delay_routes1 = ' '; var least_delay_time1 = 0;}

    try{ var least_delay_routes2 = best_trips[1][0];var least_delay_time2 = best_trips[1][1];}
    catch(err){var least_delay_routes2 = ' '; var least_delay_time2 = 0;}

    try{ var least_delay_routes3 = best_trips[2][0];var least_delay_time3 = best_trips[2][1];}
    catch(err){var least_delay_routes3 = ' '; var least_delay_time3 = 0;}

    try{ var least_delay_routes4 = best_trips[3][0];var least_delay_time4 = best_trips[3][1];}
    catch(err){var least_delay_routes4 = ' '; var least_delay_time4 = 0;}

    try{ var least_delay_routes5 = best_trips[4][0];var least_delay_time5 = best_trips[4][1];}
    catch(err){var least_delay_routes5 = ' '; var least_delay_time5 = 0;}

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////     panel1     //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
    var width = 250
    var xScale1 = d3.scaleLinear()
                   .domain([0,250])
                   .range([0,width-50])
    var xScale2 = d3.scaleLinear()
                   .domain([0,250])
                   .range([0,width-50])

    panel1.append("text")
            .attr("font-size", "30px")
            .attr("y",0)
            .attr('font','Times New Roman')
            .attr('font-weight','bold')
            .text("Overview")
    panel1.append("text")
            .attr("y", 50)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Average Delay")
    panel1.append("text")
            .attr("x", 140)
            .attr("y", 50)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Delay Percentage")
    panel1.append("text")
            .attr("y", 150)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Routes Performance")
    panel1.append("text")
            .attr("y", 370)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text(">Airline Performance")

    //var average_dddelay = average_delay
    panel1.append("text")
            .attr("x",10)
            .attr("y", 105)
            .attr("font-size", "30px")
            .attr('font-weight','bold')
            .text(average_delay.toString() + "Min")

    //var delay_pppercentage = delay_percentage
    panel1.append("text")
            .attr("x",180)
            .attr("y", 105)
            .attr("font-size", "30px")
            .attr('font-weight','bold')
            .text(delay_percentage.toString() + "%")


    var top_delay_route_y = 175
    panel1.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y)
            .attr("font-size", "12px")
            .text(top_delay_routes1)
    panel1.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15)
            .attr("font-size", "12px")
            .text(top_delay_routes2)
    panel1.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*2)
            .attr("font-size", "12px")
            .text(top_delay_routes3)
    panel1.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*3)
            .attr("font-size", "12px")
            .text(top_delay_routes4)
    panel1.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*4)
            .attr("font-size", "12px")
            .text(top_delay_routes5)

    panel1.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 15*6 - 20)
            .attr("font-size", "12px")
            .attr('fill',"#8c0d26")
            .text("Most Delayed Routes (min)")
    panel1.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 15*6+5)
            .attr("font-size", "12px")
            .attr('fill',"#004d00")
            .text("Least Delayed Routes (min)")

    panel1.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*6+20)
            .attr("font-size", "12px")
            .text(least_delay_routes1)
    panel1.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*7+20)
            .attr("font-size", "12px")
            .text(least_delay_routes2)
    panel1.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*8+20)
            .attr("font-size", "12px")
            .text(least_delay_routes3)
    panel1.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*9+20)
            .attr("font-size", "12px")
            .text(least_delay_routes4)
    panel1.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*10+20)
            .attr("font-size", "12px")
            .text(least_delay_routes5)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 160)
            .attr("height", 180)
            .attr("width", 1.5)
            .style("fill", "grey")


    panel1.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time1))
            .style("fill", "#8c0d26")
    panel1.append("text")
            .attr("x",xScale1(top_delay_time1) + 75)
            .attr("y", top_delay_route_y)
            .attr("font-size", "12px")
            .text(top_delay_time1)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time2))
            .style("fill", "#bb1133")
    panel1.append("text")
            .attr("x",xScale1(top_delay_time2) + 75)
            .attr("y", top_delay_route_y+15)
            .attr("font-size", "12px")
            .text(top_delay_time2)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15*2)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time3))
            .style("fill", "#dc143c")
    panel1.append("text")
            .attr("x",xScale1(top_delay_time3) + 75)
            .attr("y", top_delay_route_y+30)
            .attr("font-size", "12px")
            .text(top_delay_time3)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15*3)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time4))
            .style("fill", "#eb2d53")
    panel1.append("text")
            .attr("x",xScale1(top_delay_time4) + 75)
            .attr("y", top_delay_route_y+45)
            .attr("font-size", "12px")
            .text(top_delay_time4)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15*4)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time5))
            .style("fill", "#f05c79")
    panel1.append("text")
            .attr("x",xScale1(top_delay_time5) + 75)
            .attr("y", top_delay_route_y+60)
            .attr("font-size", "12px")
            .text(top_delay_time5)

    panel1.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*4+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time1))
            .style("fill", "#004d00")
    panel1.append("text")
            .attr("x",xScale2(least_delay_time1) + 75)
            .attr("y", top_delay_route_y+89+20)
            .attr("font-size", "12px")
            .text(least_delay_time1)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*5+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time2))
            .style("fill", "#006600")
    panel1.append("text")
            .attr("x",xScale2(least_delay_time2) + 75)
            .attr("y", top_delay_route_y+89+15+20)
            .attr("font-size", "12px")
            .text(least_delay_time2)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*6+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time3))
            .style("fill", "#008000")
    panel1.append("text")
            .attr("x",xScale2(least_delay_time3) + 75)
            .attr("y", top_delay_route_y+89+15*2+20)
            .attr("font-size", "12px")
            .text(least_delay_time3)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*7+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time4))
            .style("fill", "#009900")
    panel1.append("text")
            .attr("x",xScale2(least_delay_time4) + 75)
            .attr("y", top_delay_route_y+89+15*3+20)
            .attr("font-size", "12px")
            .text(least_delay_time4)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*8+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time5))
            .style("fill", "#00b300")
    panel1.append("text")
            .attr("x",xScale2(least_delay_time5) + 75)
            .attr("y", top_delay_route_y+89+15*4+20)
            .attr("font-size", "12px")
            .text(least_delay_time5)

    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 380)
            .attr("height", 185)
            .attr("width", 1.5)
            .style("fill", "grey")

    panel1.append("text")
            .attr("x",0)
            .attr("y", 395)
            .attr("font-size", "12px")
            .text(worst_airline1)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 385)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime1))
            .style("fill", "#8c0d26")
    panel1.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime1))
            .attr("y", 395)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime1)
    panel1.append("text")
            .attr("x",0)
            .attr("y", 395+15)
            .attr("font-size", "12px")
            .text(worst_airline2)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 385+15)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime2))
            .style("fill", "#bb1133")
    panel1.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime2))
            .attr("y", 395+15)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime2)
    panel1.append("text")
            .attr("x",0)
            .attr("y", 395+15*2)
            .attr("font-size", "12px")
            .text(worst_airline3)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 385+15*2)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime3))
            .style("fill", "#dc143c")
    panel1.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime3))
            .attr("y", 395+15*2)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime3)
    panel1.append("text")
            .attr("x",0)
            .attr("y", 395+15*3)
            .attr("font-size", "12px")
            .text(worst_airline4)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 385+15*3)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime4))
            .style("fill", "#eb2d53")
    panel1.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime4))
            .attr("y", 395+15*3)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime4)
    panel1.append("text")
            .attr("x",0)
            .attr("y", 395+15*4)
            .attr("font-size", "12px")
            .text(worst_airline5)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 385+15*4)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime5))
            .style("fill", "#f05c79")
    panel1.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime5))
            .attr("y", 395+15*4)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime5)

    panel1.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 290)
            .attr("font-size", "12px")
            .attr('fill',"#8c0d26")
            .text("Most Delayed Airlines (min)")
    panel1.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 313)
            .attr("font-size", "12px")
            .attr('fill',"#004d00")
            .text("Least Delayed Airlines (min)")

    panel1.append("text")
            .attr("x",0)
            .attr("y", 440+15*4)
            .attr("font-size", "12px")
            .text(best_airline1)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*4)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime1))
            .style("fill", "#004d00")
    panel1.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime1))
            .attr("y", 440+15*4)
            .attr("font-size", "12px")
            .text(best_airline_delaytime1)
    panel1.append("text")
            .attr("x",0)
            .attr("y", 440+15*5)
            .attr("font-size", "12px")
            .text(best_airline2)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*5)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime2))
            .style("fill", "#006600")
    panel1.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime2))
            .attr("y", 440+15*5)
            .attr("font-size", "12px")
            .text(best_airline_delaytime2)
    panel1.append("text")
            .attr("x",0)
            .attr("y", 440+15*6)
            .attr("font-size", "12px")
            .text(best_airline3)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*6)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime3))
            .style("fill", "#008000")
    panel1.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime3))
            .attr("y", 440+15*6)
            .attr("font-size", "12px")
            .text(best_airline_delaytime3)
    panel1.append("text")
            .attr("x",0)
            .attr("y", 440+15*7)
            .attr("font-size", "12px")
            .text(best_airline4)
    panel1.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime4))
            .attr("y", 440+15*7)
            .attr("font-size", "12px")
            .text(best_airline_delaytime4)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*7)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime4))
            .style("fill", "#009900")
    panel1.append("text")
            .attr("x",0)
            .attr("y", 440+15*8)
            .attr("font-size", "12px")
            .text(best_airline5)
    panel1.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*8)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime5))
            .style("fill", "#00b300")
    panel1.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime5))
            .attr("y", 440+15*8)
            .attr("font-size", "12px")
            .text(best_airline_delaytime5)

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////     panel 2     /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

    panel2.append("text")
            .attr("font-size", "12px")
            .attr('fill','black')
            .text("Departure City")
    panel2.append("text")
            .attr("class", "oCity")
            .attr("y", 25)
            .attr("x", 0)
            .attr("font-size", "25px")
            .attr("font-weight", "bold")
            .text(curOri)
    panel2.append("text")
            .attr("y", 50)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Average Delay")
    panel2.append("text")
            .attr("x", 140)
            .attr("y", 50)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Delay Percentage")
    panel2.append("text")
            .attr("y", 150)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Departure Routes Performance")
    panel2.append("text")
            .attr("y", 370)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text(">Airline Performance")

    //var average_delay = 25.4
    panel2.append("text")
            .attr("x",10)
            .attr("y", 105)
            .attr("font-size", "30px")
            .attr('font-weight','bold')
            .text(average_delay.toString() + "Min")

    //var delay_percentage = 23.1
    panel2.append("text")
            .attr("x",180)
            .attr("y", 105)
            .attr("font-size", "30px")
            .attr('font-weight','bold')
            .text(delay_percentage.toString() + "%")

    var top_delay_route_y = 175
    panel2.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y)
            .attr("font-size", "12px")
            .text(top_delay_routes1)
    panel2.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15)
            .attr("font-size", "12px")
            .text(top_delay_routes2)
    panel2.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*2)
            .attr("font-size", "12px")
            .text(top_delay_routes3)
    panel2.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*3)
            .attr("font-size", "12px")
            .text(top_delay_routes4)
    panel2.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*4)
            .attr("font-size", "12px")
            .text(top_delay_routes5)

    panel2.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 15*6 - 20)
            .attr("font-size", "12px")
            .attr('fill',"#8c0d26")
            .text("Most Delayed Routes (min)")
    panel2.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 15*6+5)
            .attr("font-size", "12px")
            .attr('fill',"#004d00")
            .text("Least Delayed Routes (min)")

    panel2.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*6+20)
            .attr("font-size", "12px")
            .text(least_delay_routes1)
    panel2.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*7+20)
            .attr("font-size", "12px")
            .text(least_delay_routes2)
    panel2.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*8+20)
            .attr("font-size", "12px")
            .text(least_delay_routes3)
    panel2.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*9+20)
            .attr("font-size", "12px")
            .text(least_delay_routes4)
    panel2.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*10+20)
            .attr("font-size", "12px")
            .text(least_delay_routes5)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 160)
            .attr("height", 180)
            .attr("width", 1.5)
            .style("fill", "grey")

    panel2.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time1))
            .style("fill", "#8c0d26")
    panel2.append("text")
            .attr("x",xScale1(top_delay_time1) + 75)
            .attr("y", top_delay_route_y)
            .attr("font-size", "12px")
            .text(top_delay_time1)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time2))
            .style("fill", "#bb1133")
    panel2.append("text")
            .attr("x",xScale1(top_delay_time2) + 75)
            .attr("y", top_delay_route_y+15)
            .attr("font-size", "12px")
            .text(top_delay_time2)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15*2)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time3))
            .style("fill", "#dc143c")
    panel2.append("text")
            .attr("x",xScale1(top_delay_time3) + 75)
            .attr("y", top_delay_route_y+30)
            .attr("font-size", "12px")
            .text(top_delay_time3)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15*3)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time4))
            .style("fill", "#eb2d53")
    panel2.append("text")
            .attr("x",xScale1(top_delay_time4) + 75)
            .attr("y", top_delay_route_y+45)
            .attr("font-size", "12px")
            .text(top_delay_time4)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15*4)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time5))
            .style("fill", "#f05c79")
    panel2.append("text")
            .attr("x",xScale1(top_delay_time5) + 75)
            .attr("y", top_delay_route_y+60)
            .attr("font-size", "12px")
            .text(top_delay_time5)

    panel2.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*4+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time1))
            .style("fill", "#004d00")
    panel2.append("text")
            .attr("x",xScale2(least_delay_time1) + 75)
            .attr("y", top_delay_route_y+89+20)
            .attr("font-size", "12px")
            .text(least_delay_time1)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*5+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time2))
            .style("fill", "#006600")
    panel2.append("text")
            .attr("x",xScale2(least_delay_time2) + 75)
            .attr("y", top_delay_route_y+89+15+20)
            .attr("font-size", "12px")
            .text(least_delay_time2)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*6+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time3))
            .style("fill", "#008000")
    panel2.append("text")
            .attr("x",xScale2(least_delay_time3) + 75)
            .attr("y", top_delay_route_y+89+15*2+20)
            .attr("font-size", "12px")
            .text(least_delay_time3)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*7+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time4))
            .style("fill", "#009900")
    panel2.append("text")
            .attr("x",xScale2(least_delay_time4) + 75)
            .attr("y", top_delay_route_y+89+15*3+20)
            .attr("font-size", "12px")
            .text(least_delay_time4)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*8+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time5))
            .style("fill", "#00b300")
    panel2.append("text")
            .attr("x",xScale2(least_delay_time5) + 75)
            .attr("y", top_delay_route_y+89+15*4+20)
            .attr("font-size", "12px")
            .text(least_delay_time5)




    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 380)
            .attr("height", 185)
            .attr("width", 1.5)
            .style("fill", "grey")

    panel2.append("text")
            .attr("x",0)
            .attr("y", 395)
            .attr("font-size", "12px")
            .text(worst_airline1)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 385)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime1))
            .style("fill", "#8c0d26")
    panel2.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime1))
            .attr("y", 395)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime1)
    panel2.append("text")
            .attr("x",0)
            .attr("y", 395+15)
            .attr("font-size", "12px")
            .text(worst_airline2)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 385+15)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime2))
            .style("fill", "#bb1133")
    panel2.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime2))
            .attr("y", 395+15)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime2)
    panel2.append("text")
            .attr("x",0)
            .attr("y", 395+15*2)
            .attr("font-size", "12px")
            .text(worst_airline3)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 385+15*2)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime3))
            .style("fill", "#dc143c")
    panel2.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime3))
            .attr("y", 395+15*2)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime3)
    panel2.append("text")
            .attr("x",0)
            .attr("y", 395+15*3)
            .attr("font-size", "12px")
            .text(worst_airline4)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 385+15*3)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime4))
            .style("fill", "#eb2d53")
    panel2.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime4))
            .attr("y", 395+15*3)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime4)
    panel2.append("text")
            .attr("x",0)
            .attr("y", 395+15*4)
            .attr("font-size", "12px")
            .text(worst_airline5)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 385+15*4)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime5))
            .style("fill", "#f05c79")
    panel2.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime5))
            .attr("y", 395+15*4)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime5)

    panel2.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 290)
            .attr("font-size", "12px")
            .attr('fill',"#8c0d26")
            .text("Most Delayed Airlines (min)")
    panel2.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 313)
            .attr("font-size", "12px")
            .attr('fill',"#004d00")
            .text("Least Delayed Airlines (min)")

    panel2.append("text")
            .attr("x",0)
            .attr("y", 440+15*4)
            .attr("font-size", "12px")
            .text(best_airline1)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*4)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime1))
            .style("fill", "#004d00")
    panel2.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime1))
            .attr("y", 440+15*4)
            .attr("font-size", "12px")
            .text(best_airline_delaytime1)
    panel2.append("text")
            .attr("x",0)
            .attr("y", 440+15*5)
            .attr("font-size", "12px")
            .text(best_airline2)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*5)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime2))
            .style("fill", "#006600")
    panel2.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime2))
            .attr("y", 440+15*5)
            .attr("font-size", "12px")
            .text(best_airline_delaytime2)
    panel2.append("text")
            .attr("x",0)
            .attr("y", 440+15*6)
            .attr("font-size", "12px")
            .text(best_airline3)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*6)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime3))
            .style("fill", "#008000")
    panel2.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime3))
            .attr("y", 440+15*6)
            .attr("font-size", "12px")
            .text(best_airline_delaytime3)
    panel2.append("text")
            .attr("x",0)
            .attr("y", 440+15*7)
            .attr("font-size", "12px")
            .text(best_airline4)
    panel2.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime4))
            .attr("y", 440+15*7)
            .attr("font-size", "12px")
            .text(best_airline_delaytime4)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*7)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime4))
            .style("fill", "#009900")
    panel2.append("text")
            .attr("x",0)
            .attr("y", 440+15*8)
            .attr("font-size", "12px")
            .text(best_airline5)
    panel2.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*8)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime5))
            .style("fill", "#00b300")
    panel2.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime5))
            .attr("y", 440+15*8)
            .attr("font-size", "12px")
            .text(best_airline_delaytime5)

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////     panel 3     /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
    panel3.append("text")
            .attr("class", "dCity")
            .attr("y", 25)
            .attr("x", 0)
            .attr("font-size", "30px")
            .attr('font-weight','bold')
            .text(curDest)

    panel3.append("text")
            .attr("font-size", "12px")
            .attr('fill','black')
            .text("Arrival City")

    panel3.append("text")
            .attr("y", 50)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Average Delay")

    panel3.append("text")
            .attr("x", 140)
            .attr("y", 50)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Delay Percentage")

    panel3.append("text")
            .attr("y", 150)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Arrival Routes Performance")

    panel3.append("text")
            .attr("y", 370)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text(">Airline Performance")

    //var average_delay = 23
    panel3.append("text")
            .attr("x",10)
            .attr("y", 105)
            .attr("font-size", "30px")
            .attr('font-weight','bold')
            .text(average_delay.toString() + 'Min')

    //var delay_percentage = 45
    panel3.append("text")
            .attr("x",180)
            .attr("y", 105)
            .attr("font-size", "30px")
            .attr('font-weight','bold')
            .text(delay_percentage.toString() + '%')

    var top_delay_route_y = 175
    panel3.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y)
            .attr("font-size", "12px")
            .text(top_delay_routes1)
    panel3.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15)
            .attr("font-size", "12px")
            .text(top_delay_routes2)
    panel3.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*2)
            .attr("font-size", "12px")
            .text(top_delay_routes3)
    panel3.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*3)
            .attr("font-size", "12px")
            .text(top_delay_routes4)
    panel3.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*4)
            .attr("font-size", "12px")
            .text(top_delay_routes5)

    panel3.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 15*6 - 20)
            .attr("font-size", "12px")
            .attr('fill',"#8c0d26")
            .text("Most Delayed Routes (min)")
    panel3.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 15*6+5)
            .attr("font-size", "12px")
            .attr('fill',"#004d00")
            .text("Least Delayed Routes (min)")

    panel3.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*6+20)
            .attr("font-size", "12px")
            .text(least_delay_routes1)
    panel3.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*7+20)
            .attr("font-size", "12px")
            .text(least_delay_routes2)
    panel3.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*8+20)
            .attr("font-size", "12px")
            .text(least_delay_routes3)
    panel3.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*9+20)
            .attr("font-size", "12px")
            .text(least_delay_routes4)
    panel3.append("text")
            .attr("x",0)
            .attr("y", top_delay_route_y + 15*10+20)
            .attr("font-size", "12px")
            .text(least_delay_routes5)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 160)
            .attr("height", 180)
            .attr("width", 1.5)
            .style("fill", "grey")

    panel3.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time1))
            .style("fill", "#8c0d26")
    panel3.append("text")
            .attr("x",xScale1(top_delay_time1) + 75)
            .attr("y", top_delay_route_y)
            .attr("font-size", "12px")
            .text(top_delay_time1)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time2))
            .style("fill", "#bb1133")
    panel3.append("text")
            .attr("x",xScale1(top_delay_time2) + 75)
            .attr("y", top_delay_route_y+15)
            .attr("font-size", "12px")
            .text(top_delay_time2)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15*2)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time3))
            .style("fill", "#dc143c")
    panel3.append("text")
            .attr("x",xScale1(top_delay_time3) + 75)
            .attr("y", top_delay_route_y+30)
            .attr("font-size", "12px")
            .text(top_delay_time3)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15*3)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time4))
            .style("fill", "#eb2d53")
    panel3.append("text")
            .attr("x",xScale1(top_delay_time4) + 75)
            .attr("y", top_delay_route_y+45)
            .attr("font-size", "12px")
            .text(top_delay_time4)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y-10+15*4)
            .attr("height", 10)
            .attr("width", xScale1(top_delay_time5))
            .style("fill", "#f05c79")
    panel3.append("text")
            .attr("x",xScale1(top_delay_time5) + 75)
            .attr("y", top_delay_route_y+60)
            .attr("font-size", "12px")
            .text(top_delay_time5)

    panel3.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*4+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time1))
            .style("fill", "#004d00")
    panel3.append("text")
            .attr("x",xScale2(least_delay_time1) + 75)
            .attr("y", top_delay_route_y+89+20)
            .attr("font-size", "12px")
            .text(least_delay_time1)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*5+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time2))
            .style("fill", "#006600")
    panel3.append("text")
            .attr("x",xScale2(least_delay_time2) + 75)
            .attr("y", top_delay_route_y+89+15+20)
            .attr("font-size", "12px")
            .text(least_delay_time2)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*6+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time3))
            .style("fill", "#008000")
    panel3.append("text")
            .attr("x",xScale2(least_delay_time3) + 75)
            .attr("y", top_delay_route_y+89+15*2+20)
            .attr("font-size", "12px")
            .text(least_delay_time3)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*7+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time4))
            .style("fill", "#009900")
    panel3.append("text")
            .attr("x",xScale2(least_delay_time4) + 75)
            .attr("y", top_delay_route_y+89+15*3+20)
            .attr("font-size", "12px")
            .text(least_delay_time4)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", top_delay_route_y+20+15*8+20)
            .attr("height", 10)
            .attr("width", xScale2(least_delay_time5))
            .style("fill", "#00b300")
    panel3.append("text")
            .attr("x",xScale2(least_delay_time5) + 75)
            .attr("y", top_delay_route_y+89+15*4+20)
            .attr("font-size", "12px")
            .text(least_delay_time5)

    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 380)
            .attr("height", 185)
            .attr("width", 1.5)
            .style("fill", "grey")

    panel3.append("text")
            .attr("x",0)
            .attr("y", 395)
            .attr("font-size", "12px")
            .text(worst_airline1)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 385)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime1))
            .style("fill", "#8c0d26")
    panel3.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime1))
            .attr("y", 395)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime1)
    panel3.append("text")
            .attr("x",0)
            .attr("y", 395+15)
            .attr("font-size", "12px")
            .text(worst_airline2)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 385+15)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime2))
            .style("fill", "#bb1133")
    panel3.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime2))
            .attr("y", 395+15)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime2)
    panel3.append("text")
            .attr("x",0)
            .attr("y", 395+15*2)
            .attr("font-size", "12px")
            .text(worst_airline3)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 385+15*2)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime3))
            .style("fill", "#dc143c")
    panel3.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime3))
            .attr("y", 395+15*2)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime3)
    panel3.append("text")
            .attr("x",0)
            .attr("y", 395+15*3)
            .attr("font-size", "12px")
            .text(worst_airline4)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 385+15*3)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime4))
            .style("fill", "#eb2d53")
    panel3.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime4))
            .attr("y", 395+15*3)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime4)
    panel3.append("text")
            .attr("x",0)
            .attr("y", 395+15*4)
            .attr("font-size", "12px")
            .text(worst_airline5)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 385+15*4)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime5))
            .style("fill", "#f05c79")
    panel3.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime5))
            .attr("y", 395+15*4)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime5)

    panel3.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 290)
            .attr("font-size", "12px")
            .attr('fill',"#8c0d26")
            .text("Most Delayed Airlines (min)")
    panel3.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 313)
            .attr("font-size", "12px")
            .attr('fill',"#004d00")
            .text("Least Delayed Airlines (min)")

    panel3.append("text")
            .attr("x",0)
            .attr("y", 440+15*4)
            .attr("font-size", "12px")
            .text(best_airline1)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*4)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime1))
            .style("fill", "#004d00")
    panel3.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime1))
            .attr("y", 440+15*4)
            .attr("font-size", "12px")
            .text(best_airline_delaytime1)
    panel3.append("text")
            .attr("x",0)
            .attr("y", 440+15*5)
            .attr("font-size", "12px")
            .text(best_airline2)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*5)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime2))
            .style("fill", "#006600")
    panel3.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime2))
            .attr("y", 440+15*5)
            .attr("font-size", "12px")
            .text(best_airline_delaytime2)
    panel3.append("text")
            .attr("x",0)
            .attr("y", 440+15*6)
            .attr("font-size", "12px")
            .text(best_airline3)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*6)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime3))
            .style("fill", "#008000")
    panel3.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime3))
            .attr("y", 440+15*6)
            .attr("font-size", "12px")
            .text(best_airline_delaytime3)
    panel3.append("text")
            .attr("x",0)
            .attr("y", 440+15*7)
            .attr("font-size", "12px")
            .text(best_airline4)
    panel3.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime4))
            .attr("y", 440+15*7)
            .attr("font-size", "12px")
            .text(best_airline_delaytime4)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*7)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime4))
            .style("fill", "#009900")
    panel3.append("text")
            .attr("x",0)
            .attr("y", 440+15*8)
            .attr("font-size", "12px")
            .text(best_airline5)
    panel3.append("rect")
            .attr("x", 70)
            .attr("y", 430+15*8)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime5))
            .style("fill", "#00b300")
    panel3.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime5))
            .attr("y", 440+15*8)
            .attr("font-size", "12px")
            .text(best_airline_delaytime5)

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////     panel 4     /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
    panel4.append("text")
            .attr("class", "odCity")
            .attr("font-size", "25px")
            .attr('font-weight','bold')
            .text(curOri + '-' + curDest)
    panel4.append("text")
            .attr("y", 50)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Average Delay")
    panel4.append("text")
            .attr("x", 140)
            .attr("y", 50)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Delay Percentage")
    //panel4.append("text")
            //.attr("y", 150)
            //.attr("font-size", "15px")
            //.attr('fill','black')
            //.attr('font-weight','bold')
            //.text("> Delay Prediction")
    panel4.append("text")
            .attr("y", 160)
            .attr("font-size", "15px")
            .attr('fill','black')
            .attr('font-weight','bold')
            .text("> Airline Performance")

    //var average_delay = 23.6
    panel4.append("text")
            .attr("x",10)
            .attr("y", 105)
            .attr("font-size", "30px")
            .attr('font-weight','bold')
            .text(average_delay.toString() + "Min")

    //var delay_percentage = 31.4
    panel4.append("text")
            .attr("x",180)
            .attr("y", 105)
            .attr("font-size", "30px")
            .attr('font-weight','bold')
            .text(delay_percentage.toString() + "%")
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 180)
            .attr("height", 185)
            .attr("width", 1.5)
            .style("fill", "grey")

    panel4.append("text")
            .attr("x",0)
            .attr("y", 195)
            .attr("font-size", "12px")
            .text(worst_airline1)
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 185)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime1))
            .style("fill", "#8c0d26")
    panel4.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime1))
            .attr("y", 195)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime1)
    panel4.append("text")
            .attr("x",0)
            .attr("y", 195+15)
            .attr("font-size", "12px")
            .text(worst_airline2)
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 185+15)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime2))
            .style("fill", "#bb1133")
    panel4.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime2))
            .attr("y", 195+15)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime2)
    panel4.append("text")
            .attr("x",0)
            .attr("y", 195+15*2)
            .attr("font-size", "12px")
            .text(worst_airline3)
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 185+15*2)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime3))
            .style("fill", "#dc143c")
    panel4.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime3))
            .attr("y", 195+15*2)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime3)
    panel4.append("text")
            .attr("x",0)
            .attr("y", 195+15*3)
            .attr("font-size", "12px")
            .text(worst_airline4)
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 185+15*3)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime4))
            .style("fill", "#eb2d53")
    panel4.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime4))
            .attr("y", 195+15*3)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime4)
    panel4.append("text")
            .attr("x",0)
            .attr("y", 195+15*4)
            .attr("font-size", "12px")
            .text(worst_airline5)
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 185+15*4)
            .attr("height", 10)
            .attr("width", xScale1(worst_airline_delaytime5))
            .style("fill", "#f05c79")
    panel4.append("text")
            .attr("x",75 + xScale1(worst_airline_delaytime5))
            .attr("y", 195+15*4)
            .attr("font-size", "12px")
            .text(worst_airline_delaytime5)

    panel4.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 90)
            .attr("font-size", "12px")
            .attr('fill',"#8c0d26")
            .text("Most Delayed Airlines (min)")
    panel4.append("text")
            .attr("x",73)
            .attr("y", top_delay_route_y + 113)
            .attr("font-size", "12px")
            .attr('fill',"#004d00")
            .text("Least Delayed Airlines (min)")

    panel4.append("text")
            .attr("x",0)
            .attr("y", 240+15*4)
            .attr("font-size", "12px")
            .text(best_airline1)
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 230+15*4)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime1))
            .style("fill", "#004d00")
    panel4.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime1))
            .attr("y", 240+15*4)
            .attr("font-size", "12px")
            .text(best_airline_delaytime1)
    panel4.append("text")
            .attr("x",0)
            .attr("y", 240+15*5)
            .attr("font-size", "12px")
            .text(best_airline2)
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 230+15*5)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime2))
            .style("fill", "#006600")
    panel4.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime2))
            .attr("y", 240+15*5)
            .attr("font-size", "12px")
            .text(best_airline_delaytime2)
    panel4.append("text")
            .attr("x",0)
            .attr("y", 240+15*6)
            .attr("font-size", "12px")
            .text(best_airline3)
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 230+15*6)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime3))
            .style("fill", "#008000")
    panel4.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime3))
            .attr("y", 240+15*6)
            .attr("font-size", "12px")
            .text(best_airline_delaytime3)
    panel4.append("text")
            .attr("x",0)
            .attr("y", 240+15*7)
            .attr("font-size", "12px")
            .text(best_airline4)
    panel4.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime4))
            .attr("y", 240+15*7)
            .attr("font-size", "12px")
            .text(best_airline_delaytime4)
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 230+15*7)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime4))
            .style("fill", "#009900")
    panel4.append("text")
            .attr("x",0)
            .attr("y", 240+15*8)
            .attr("font-size", "12px")
            .text(best_airline5)
    panel4.append("rect")
            .attr("x", 70)
            .attr("y", 230+15*8)
            .attr("height", 10)
            .attr("width", xScale2(best_airline_delaytime5))
            .style("fill", "#00b300")
    panel4.append("text")
            .attr("x",75 + xScale2(best_airline_delaytime5))
            .attr("y", 240+15*8)
            .attr("font-size", "12px")
            .text(best_airline_delaytime5)

//———————————————————————————————— YILUN's Code Ends Here. ————————————————

//———————————————————————————————— YILUN and ZHENGYANG's Code Ends Here.  Please do not make any changes to codes above this line. ————————————————


}
d3.dsv(",","data/predict.csv",function(d){
        return{
          month:  +d.MONTH,
          day:   +d.DAY_OF_WEEK,
          carrier: d.OP_UNIQUE_CARRIER,
          flight: d.OP_CARRIER_FL_NUM,
          ori:   d.ORIGIN_CITY,
          dest:  d.DEST_CITY,
          time: d.DEP_TIME_BLK.split("-"),
          pred: +d.PREDICTED_DELAY,
          csr_dep: d.CRS_DEP_TIME,
          csr_arr: d.CRS_ARR_TIME
        };
        }).then(function(dataset){
            
            dataset.forEach(
                function(d) {
                    d.dep_time = Number(d.time[0])
                    d.arr_time = Number(d.time[1])
                    d.airplane = d.carrier + d.flight
                    return d
                }
            )

            rawPred = dataset
            currPred = dataset

    })

function drawPred() {
    var svg = d3.select("#chart"),
        margin = {top: 35, left: 60, bottom: 0, right: 0},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    /*svg.append("g")
        .attr("transform", "translate(-20, 0)")*/

    var y = d3.scaleBand()
        .range([margin.top, height - margin.bottom])
        .padding(0.1)

    var x = d3.scaleLinear()
        .rangeRound([margin.left, width - margin.right])

    var xAxis = svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .attr("class", "x-axis")

    var yAxis = svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .attr("class", "y-axis")

    updatePred()

    currPred.sort((a, b) => d3.ascending(Number(a.pred), Number(b.pred)))

    // choose top 5 predict airport
    currPred = currPred.slice(0, 10);

    x.domain([0, 1]).nice();
    y.domain(currPred.map(d => d.airplane));

    svg.selectAll(".y-axis")
        .transition().duration(750)
        .call(d3.axisLeft(y))
        .style("font-size","12px")

    svg.selectAll(".x-axis")
        .transition().duration(750)
        .call(d3.axisBottom(x))
        .style("font-size","12px")


    var bars = svg.selectAll(".barChart")
        .data(currPred);


    bars.enter()
        .append("rect")
        .attr("class", "barChart")
        .attr("x", margin.left)
        .attr("y", function(d){
            return y(d.airplane);
        })
        .attr("height", y.bandwidth())
        .attr("width", function(d){
            return x(d.pred);
        })
        .style("fill", "white")
        .transition().duration(750)

    bars.attr("x", margin.left)
        .attr("y", function(d){
            return y(d.airplane);
        })
        .attr("height", y.bandwidth())
        .attr("width", function(d){
            return x(d.pred);
        })
        .transition().duration(750)

    // add airplane dep and arr text
    bars.append("text")
        .attr("class", "label")
        .attr("y", y.bandwidth() / 2)
        //.attr("dx", 100) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .text(function(d){
            //console.log(d.pred * 100 +"%")
            //return (d.pred * 100 +"%");
            return (d.csr_dep + " - " + d.csr_arr);
        })
        .attr("x", function(d){
            return x(d.pred);
        })

    bars.exit().remove();

}

function updatePred() {
    currPred = rawPred
    if(curDay) {
        currPred = currPred.filter(d => d.day == curDay)
    }
    if(curMonth) {
        currPred = currPred.filter(d => d.month == curMonth)
    }

    if(curT2 >= curT1) {
        currPred = currPred.filter(d => d.dep_time >= curT1 && d.dep_time <= curT2)
    } else {
        currPred = currPred.filter(d => d.dep_time >= curT2 && d.dep_time <= curT1)
    }

    if(curA2 >= curA1) {
        currPred = currPred.filter(d => d.arr_time >= curA1 && d.arr_time <= curA2)
    } else {
        currPred = currPred.filter(d => d.arr_time >= curA2 && d.arr_time <= curA1)
    }

    if (curOri != null) {
        currPred = currPred.filter(d => d.ori == curOri)
    }

    if (curDest != null) {
        currPred = currPred.filter(d => d.dest == curDest)
    }
}

function removeBarchart() {
    d3.select("#barchart").remove();
}

function drawpie(holder, data_ready, arc, piecolor) {

            holder.selectAll(".piechart")
                .data(data_ready)
                    .enter()
                    .append('path')
                        .attr("class", "piechart")
                        .attr('d', arc)
                        .attr('fill', d => piecolor(d.data.key))

}