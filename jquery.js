$(document).ready(function() {
    $(function() {
         $("#spinnerMin").spinner({
            min: 0,
            max: 8,
            spin: function(event, ui) {
                $(this).change();
            }
        });
    });

    $(function() {
        $("#spinnerMax").spinner({
            min: 0,
            max: 8,
            spin: function(event, ui) {
                $(this).change();
            }
        });
    });

    $(function() {
        $("#propertyType").selectmenu();
    });

    $(function() {
        $("#time").selectmenu();
    });

    $(function() {
        $("#Search").button();
    });

    $( function() {
        $( "#tabs" ).tabs();
    });

    $(function() {
        $(".viewFavourites").button();
    });

    $(function() {
        $(".clearFavourites").button();
    });
    
    $(function() {
        $(".addToFavourites").button();
    });

    $(function() {
        $(".removeFromFavourites").button();
    });

    $(function() {
        $("#slider-range").slider({
            range:true,
            min: 100000,
            max: 700000,
            values: [ 75, 300 ],
            slide: function( event, ui ){
                $("#price").val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
            }
        });
        
        $("#price").val(" £" + $(" #slider-range").slider( "values", 0 ) + " - £" + $("#slider-range").slider( "values", 1 ) );
    });

    /*search*/
    $(function() {
        $( "#Search" ).on("click", function(){
            
            var propType = $("#propertyType").val();
            var minBed =  $("#spinnerMin").val();
            var maxBed =  $("#spinnerMax").val();
            var date =  $("#time").val()
            var minPrice = $("#slider-range").slider("option", "values")[0];
            var maxPrice = $("#slider-range").slider("option", "values")[1];
            
            var output="<div>";
            for (var i in data.properties) {
                if (( propType == data.properties[i].type) || (propType=="Any"))
                if (( data.properties[i].bedrooms >= minBed && data.properties[i].bedrooms <= maxBed ))
                if (( date == data.properties[i].added.month) || (date=="Anytime"))
                if (( data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice ))
                {
                    {
                        {
                            {
                                output+="<h3>" + "Price: £" + data.properties[i].price +"</h3>" 
                                + "<img src=" + data.properties[i].picture + ">" 
                                + "<p>" + data.properties[i].description + "</p>" 
                                + "<button><a href='" + data.properties[i].url + "'>Check this page</a></button>"
                                +"<br><br><br>";
                            } 
                        } 
                    } 
                } 
            }
                    output+="</div>";
                    document.getElementById( "Placeholder" ).innerHTML = output;
            });
    });


        $(function() {
            $( ".addToFavourites" ).on("click", function(){
                
                try {
                    $(this).attr('disabled', true);
                    
                    var propIdToAdd = $(this).closest("p").attr("id");
                    
                    var myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
                    
                    if(myFavouriteProp == null) {
                        myFavouriteProp = [];
                    }
                    
                    if(myFavouriteProp != null) {
                        for ( var j = 0; j < myFavouriteProp.length; j++) {
                            
                            if ( propIdToAdd == myFavouriteProp[j]) {
                                
                                alert("This property is already in your favourite list"); 
                                myFavouriteProp = [];
                            }
                        }
                    }
                    
                    myFavouriteProp.push(propIdToAdd);
                    
                    localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
                    
                }
                
                catch (e) {
                    if (e==QUOTA_EXCEEDED_ERR) {
                        console.log("Error: Local storage limit exceeds");
                    }
                    
                    else {
                        console.log("ERROR: Saving to local storge.");
                    }
                }
            });
        });
        
        
        
        $(function() {  
            $( ".removeFromFavourites" ).on("click", function(){
                    
                
                    $(this).attr('disabled', true);
                    
                    var propIdToRemove = $(this).closest("p").attr("id");
                    
                     myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
                    
                    
                    if(myFavouriteProp != null) {
                        for ( var j = 0; j < myFavouriteProp.length; j++) {
                            
                            if ( propIdToRemove == myFavouriteProp[j]) {
                                
                                alert("This Property has been successfully removed");
                                
                                delete myFavouriteProp[j];
                                
                                localStorage.setItem("favProp", JSON.stringify(myFavouriteProp));
                                
                                myFavouriteProp[j] = [];
                            }
                        }
                    }
                    
                    if(myFavouriteProp == null) {
                        alert("You have no favourite items");
                    }
                });
            });
            
            
        $(function() {
            $( ".viewFavourites" ).on("click", function(){
                                
                myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
                
                var output = "<div>";
                
                if (myFavouriteProp != null) {
                    
                    for (var i = 0; i < data.properties.length; i++) {
                        for (j = 0; j < myFavouriteProp.length; j++) {
                            
                            if (data.properties[i].id == myFavouriteProp[j]) {
                                
                                output+="<h5>" + data.properties[i].bedrooms 
                                + " Bedroom" + " " + data.properties[i].type + "</h5>" 
                                + "<img src=" + data.properties[i].picture + ">" 
                                +"<h5>" + "Price: £" + data.properties[i].price +"</h5>"
                                +"<button><a href=' " +data.properties[i].url 
                                + "'>Visit page</a></button>"
                                +"<br><br><br>";
                            }
                        }
                    }
                }
                output+="</div>";
                
                document.getElementById( "Placeholder2" ).innerHTML = output;
            
            });
        });


        $(function() {
            $( ".clearFavourites" ).on("click", function(){
                
                $("#Placeholder2").remove();
                
                myFavouriteProp=JSON.parse(localStorage.getItem("favProp"));
                
                localStorage.clear();
                
            });
            
        });


        //drag and drop
        $( function() {
 
            // There's the property and the favorite
            var $properties = $( "#properties" ),
              $favorite = $( "#favorite" );
         
            // Let the property items be draggable
            $( "li", $properties ).draggable({
              cancel: "a.ui-icon", // clicking an icon won't initiate dragging
              revert: "invalid", // when not dropped, the item will revert back to its initial position
              containment: "document",
              helper: "clone",
              cursor: "move"
            });
         
            // Let the favorite be droppable, accepting the property items
            $favorite.droppable({
              accept: "#properties > li",
              classes: {
                "ui-droppable-active": "ui-state-highlight"
              },
              drop: function( event, ui ) {
                addProperty( ui.draggable );
              }
            });
         
            // properties should be droppable as well, accepting items from the favorite
            $properties.droppable({
              accept: "#favorite li",
              classes: {
                "ui-droppable-active": "custom-state-active"
              },
              drop: function( event, ui ) {
                deleteProperty( ui.draggable );
              }
            });
         
            // Resort favorite function
            var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this Resort' class='ui-icon ui-icon-trash'>Recycle Resort</a>";
            function addProperty( $item ) {
              $item.fadeOut(function() {
                var $list = $( "ul", $favorite ).length ?
                  $( "ul", $favorite ) :
                  $( "<ul class='properties ui-helper-reset'/>" ).appendTo( $favorite );
         
                $item.find( "a.ui-icon-heart" ).remove();
                $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
                  $item
                    .animate({ width: "88px" })
                    .find( "img" )
                      .animate({ height: "36px" });
                });
              });
            }  
           
         
           
            // Resort recycle function
            var favorite_icon = "<a href='link/to/favorite/script/when/we/have/js/off' title='Delete this Resort' class='ui-icon ui-icon-heart'>Delete Resort</a>";
            function deleteProperty( $item ) {
              $item.fadeOut(function() {
                $item.find( "a.ui-icon-trash" ).remove()
                  .end()
                  .css( "width", "30%")
                  .append( favorite_icon )
                  .find( "img" ).css( "height", "150px" )
                  .end()
                  .appendTo( $properties ).fadeIn();
              });
            }
         
            // Resort preview function, demonstrating the ui.dialog used as a modal window
            function viewProperty( $link ) {
                $("#link1").attr("href", urlToOpen);
                $("#link1")[0].click();
            }
         
            // Resolve the icons behavior with event delegation
            $( "ul.properties > li" ).on( "click", function( event ) {
              var $item = $( this ),
                $target = $( event.target );
         
              if ( $target.is( "a.ui-icon-heart" ) ) {
                addProperty( $item );
              } else if ( $target.is( "a.ui-icon-info" ) ) {
                viewProperty( $target );
              } else if ( $target.is( "a.ui-icon-trash" ) ) {
                deleteProperty( $item );
              }
         
              return false;
            });
          });

})