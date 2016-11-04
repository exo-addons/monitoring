$.noConflict();
require( ["SHARED/bts_tab","SHARED/bts_tooltip"], function ( $ )
{
jQuery(document).ready(function() {
loadQueriesStatistics();
});
} );

function loadQueriesStatistics(){
var queriesStatisticsTable=jQuery('#queriesTable').DataTable( {

    "bProcessing": false,
    "bServerSide": false,
           dom: 'Bfrtip',
                    buttons: [
                      {
                        extend: 'copy'
                      },
                      {
                        extend: 'csv',
                        filename: 'Queries Statistics'
                       },
                      {
                       extend: 'excel',
                       filename: 'Queries Statistics'
                     }
                     ],
    "sAjaxSource": "/rest/private/exo-statistics/queries/",
    "aoColumns": [
                { "mData": "query" },
                { "mData": "Performance" },
                { "mData": "DBTime" },
                { "mData": "Invocations" },
                { "mData": "RowsFetched" }

              ],
    "columnDefs": [
                    { "width": "64%", "targets": 0},
                    { "width": "9%", "targets": 1},
                    { "width": "9%", "targets": 2 },
                    { "width": "9%", "targets": 3 },
                    { "width": "9%", "targets": 4 }
                  ]

                                           });
setInterval( function () {
    queriesStatisticsTable.ajax.reload( null, false ); // user paging is not reset on reload
}, 10000 );
}

function loadEntitiesStatistics(){
 if ( typeof entitiesStatisticsTable != "undefined" ) {
 entitiesStatisticsTable.fnClearTable();
 entitiesStatisticsTable.fnDestroy();
 }
entitiesStatisticsTable=
 jQuery('#entitiesTable').DataTable( {

    "bProcessing": false,
    "bServerSide": false,
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'copy'
      },
      {
        extend: 'csv',
        filename: 'Entities Statistics'
       },
      {
       extend: 'excel',
       filename: 'Entities Statistics'
     }
     ],
    "sAjaxSource": "/rest/private/exo-statistics/entities/",
    "aoColumns": [
                { "mData": "entity" },
                { "mData": "EntityPerformance" },
                { "mData": "EntityAccessCount" },
                { "mData": "EntityLoadsCount" },
                { "mData": "EntityFetchesCount" },
                { "mData": "EntityOptimisticFailureCount" },
                { "mData": "EntityModificationCount" }
              ],
    "columnDefs": [

                        { "width": "50%", "targets": 0 },
                        { "width": "10%", "targets": 1 },
                        { "width": "8%", "targets": 2 },
                        { "width": "8%", "targets": 3 },
                        { "width": "8%", "targets": 4 },
                        { "width": "8%", "targets": 5 },
                        { "width": "8%", "targets": 6 }
                    ]
                                           });

setInterval( function () {
    entitiesStatisticsTable.ajax.reload( null, false ); // user paging is not reset on reload
}, 10000 )
}

function loadCachesStatistics(){
 if ( typeof cachesStatisticsTable != "undefined" ) {
 cachesStatisticsTable.fnClearTable();
 cachesStatisticsTable.fnDestroy();
 }
cachesStatisticsTable=
 jQuery('#cachesTable').DataTable( {
    "bProcessing": false,
    "bServerSide": false,
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'copy'
          },
          {
            extend: 'csv',
            filename: 'Caches Statistics'
           },
          {
           extend: 'excel',
           filename: 'Caches Statistics'
         }
         ],
    "sAjaxSource": "/rest/private/exo-statistics/caches/",
    "aoColumns": [
                    { "mDataProp": "Name" },
                    { "mDataProp": "HitCount" },
                    { "mDataProp": "MissCount" },
                    { "mDataProp": "HitRatio" },
                    { "mDataProp": "MissRatio" },
                    { "mDataProp": "Capacity" },
                    { "mDataProp": "Size" },
                    { "mDataProp": "TimeToLive" }
                  ] ,
    "columnDefs": [

                     { "width": "30%", "targets": 0 },
                     { "width": "10%", "targets": 1 },
                     { "width": "10%", "targets": 2 },
                     { "width": "10%", "targets": 3 ,render: function ( data, type, row ) {
                                                         return row.MissCount+row.HitCount==0? 0.0 + " %" : ((row.HitCount/(row.MissCount+row.HitCount)) * 100).toFixed(0) + " %";
                                                           }},
                     { "width": "10%", "targets": 4,render: function ( data, type, row ) {
                                                          return row.MissCount+row.HitCount==0? 0.0 + " %" : ((row.MissCount/(row.MissCount+row.HitCount)) * 100).toFixed(0) + " %";
                                                           }},
                     { "width": "10%", "targets": 5 },
                     { "width": "10%", "targets": 6 },
                     { "width": "10%", "targets": 7 }

                 ]
                                           });
setInterval( function () {
    cachesStatisticsTable.ajax.reload( null, false ); // user paging is not reset on reload
}, 10000 );
}

function loadCollectionsStatistics(){
if ( typeof collectionsStatisticsTable != "undefined" ) {
 collectionsStatisticsTable.fnClearTable();
 collectionsStatisticsTable.fnDestroy();
 }
  collectionsStatisticsTable=
 jQuery('#collectionsTable').DataTable( {

    "bProcessing": false,
    "bServerSide": false,
            dom: 'Bfrtip',
            buttons: [
              {
                extend: 'copy'
              },
              {
                extend: 'csv',
                filename: 'Collections Statistics'
               },
              {
               extend: 'excel',
               filename: 'Collections Statistics'
             }
             ],
    "sAjaxSource": "/rest/private/exo-statistics/collections/",
    "aoColumns": [
                { "mData": "collection" },
                { "mData": "CollectionPerformance" },
                { "mData": "CollectionAccessCount" },
                { "mData": "CollectionLoadsCount" },
                { "mData": "CollectionFetchesCount" },
                { "mData": "CollectionRecreationCount" },
                { "mData": "CollectionModificationCount" }
              ],
    "columnDefs": [

                    { "width": "52%", "targets": 0 },
                    { "width": "8%", "targets": 1 },
                    { "width": "8%", "targets": 2 },
                    { "width": "8%", "targets": 3 },
                    { "width": "8%", "targets": 4 },
                    { "width": "8%", "targets": 5 },
                    { "width": "8%", "targets": 6 }
                ]
                                           });
setInterval( function () {
    collectionsStatisticsTable.ajax.reload( null, false ); // user paging is not reset on reload
}, 10000 );
}

function loadPortletsStatistics(){
if ( typeof applicationsStatisticsTable != "undefined" ) {
 applicationsStatisticsTable.fnClearTable();
 applicationsStatisticsTable.fnDestroy();
 }
 applicationsStatisticsTable=
 jQuery('#applicationsTable').DataTable( {

    "bProcessing": false,
    "bServerSide": false,
             dom: 'Bfrtip',
                buttons: [
                  {
                    extend: 'copy'
                  },
                  {
                    extend: 'csv',
                    filename: 'Portlets Statistics'
                   },
                  {
                   extend: 'excel',
                   filename: 'Portlets Statistics'
                 }
                 ],
    "sAjaxSource": "/rest/statistics/application/all/",
    "aoColumns": [
                    { "mDataProp": "name" },
                    { "mDataProp": "name" },
                    { "mDataProp": "maxTime" },
                    { "mDataProp": "minTime" },
                    { "mDataProp": "averageTime" },
                    { "mDataProp": "execution" }
                  ] ,
    "columnDefs": [

                     { "width": "40%", "targets": 0,render: function ( data, type, row ) {
                                                         return data.substring(0,data.indexOf('/'));
                                                             }},
                     { "width": "12%", "targets": 1,render: function ( data, type, row ) {
                                                         return data.substring(data.indexOf('/')+1);
                                                            }},
                     { "width": "12%", "targets": 2 },
                     { "width": "12%", "targets": 3 },
                     { "width": "12%", "targets": 4,render: function ( data, type, row ) {
                                                        return parseFloat(data).toFixed(0);
                                                     }  },
                     { "width": "12%", "targets": 5 }
                 ]
                                           });
setInterval( function () {
    applicationsStatisticsTable.ajax.reload( null, false ); // user paging is not reset on reload
}, 10000 );
}

function loadTemplatesStatistics(){
if ( typeof templatesStatisticsTable != "undefined" ) {
 templatesStatisticsTable.fnClearTable();
 templatesStatisticsTable.fnDestroy();
 }
  templatesStatisticsTable=
 jQuery('#templatesTable').DataTable( {

    "bProcessing": false,
    "bServerSide": false,
             dom: 'Bfrtip',
                    buttons: [
                      {
                        extend: 'copy'
                      },
                      {
                        extend: 'csv',
                        filename: 'Templates Statistics'
                       },
                      {
                       extend: 'excel',
                       filename: 'Templates Statistics'
                     }
                     ],
    "sAjaxSource": "/rest/statistics/template/all/",
    "aoColumns": [
                    { "mDataProp": "name" },
                    { "mDataProp": "maxTime" },
                    { "mDataProp": "minTime" },
                    { "mDataProp": "averageTime" },
                    { "mDataProp": "execution" }
                  ] ,
    "columnDefs": [

                     { "width": "60%", "targets": 0},
                     { "width": "10%", "targets": 1 },
                     { "width": "10%", "targets": 2 },
                     { "width": "10%", "targets": 3,render: function ( data, type, row ) {
                                                        return parseFloat(data).toFixed(0);
                                                     }  },
                     { "width": "10%", "targets": 4 }
                 ]
                                           });
setInterval( function () {
    templatesStatisticsTable.ajax.reload( null, false ); // user paging is not reset on reload

}, 10000 );
}

function loadApplicationsStatistics(){
 var dataPoints = [];
jQuery.getJSON('/rest/private/exo-statistics/applicationdata/', function(data)
				{
jQuery("#displaySocialData ul").html("");
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Activities :'+ '<span>'+data.activitiesCount+'</span>'+'<p/>'+'</li>'+'<hr width=30%>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Spaces :'+ '<span>'+data.spacesCount+'</span>'+'<p/>'+'</li>'+'<hr width=30%>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Identities :'+ '<span>'+data.identitiesCount+'</span>'+'<p/>'+'</li>'+'<hr width=30%>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Connections :'+ '<span>'+data.connectionsCount+'</span>'+'<p/>'+'</li>'+'<hr width=30%>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Wiki Pages :'+ '<span>'+data.pagesCount+'</span>'+'<p/>'+'</li>'+'<hr width=30%>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Wiki Templates :'+ '<span>'+data.templatesCount+'</span>'+'<p/>'+'</li>'+'<hr width=30%>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Wiki Attachements :'+ '<span>'+data.attachmentCount+'</span>'+'<p/>'+'</li>'+'<hr width=30%>' );
  var chart = new CanvasJS.Chart("chartContainer",{
    height:300,
    width: 400,

        title:{
            text:"Applications Statistics",
            fontSize: 15,
            horizontalAlign: "center",

        },
        legend: {
                horizontalAlign: "right",
                verticalAlign: "center",

              },
        data: [{
        type: "pie",
        showInLegend: true,
            dataPoints: [
                  { legendText: "Activities", y: data.activitiesCount },
                  { legendText: "Spaces", y: data.spacesCount },
                  { legendText: "Identities", y: data.identitiesCount },
                  { legendText: "Connections", y: data.connectionsCount },
                  { legendText: "Pages", y: data.pagesCount },
                  { legendText: "Templates", y: data.templatesCount },
                  { legendText: "Attachments", y: data.attachmentCount }
                  ]

        }]
    });
    chart.render();
});
jQuery("#memoryContent").hide();
jQuery("#displaySocialData").show();
jQuery("#chartContainer").show();
}

function loadMemoryStatistics(){
jQuery.getJSON('/rest/private/monitoring/memory/', function(data)
{
 var dataPoints = [];
jQuery.each(data, function(i, liste) {
             jQuery.each(liste, function(key, memory) {

                var free = formatBytes(memory.max - memory.used);
                var used = formatBytes(memory.used);
                var total = formatBytes(memory.max);
                var memoryDiv="#memoryHeapInfos";
                var chartTitle="";
                var chartContainer=""
                jQuery(memoryDiv+key+" ul").html("");
                jQuery(memoryDiv+key+" ul").append('<li>'+'<p>Free :'+ '<span>'+free+'</span>'+'<p/>'+'</li>'+'<hr width=20%>' );
                jQuery(memoryDiv+key+" ul").append('<li>'+'<p>Used :'+ '<span>'+used+'</span>'+'<p/>'+'</li>'+'<hr width=20%>' );
                jQuery(memoryDiv+key+" ul").append('<li>'+'<p>Total :'+ '<span>'+total+'</span>'+'<p/>'+'</li>'+'<hr width=20%>' );
chartContainer=(key==0)? "memoryHeapChart" : "memoryNonHeapChart";
chartTitle=(key==0)? "Memory Heap Usage" : "Memory Non-Heap Usage";
 var memoryHeapChart = new CanvasJS.Chart(chartContainer,{
    height:148,
    width: 280,
  title:{
            text:chartTitle

        },
        legend: {
                horizontalAlign: "right",
                verticalAlign: "center",

              },
        data: [{
        type: "pie",
        showInLegend: true,

            dataPoints: [
                  { legendText: "Free", y: ((1-(memory.used/memory.max)) * 100).toFixed(0) },
                  { legendText: "Used", y: ((memory.used/memory.max) * 100).toFixed(0) }
                  ]

        }]
    });
    memoryHeapChart.render();
});

});
});
jQuery("#displaySocialData").hide();
jQuery("#chartContainer").hide();
jQuery("#memoryContent").show();
setInterval(function(){ loadMemoryStatistics(); }, 10000);
}

function formatBytes(bytes) {
    if(bytes < 1024) return bytes + " Bytes";
    else if(bytes < 1048576) return(bytes / 1024).toFixed(2) + " KB";
    else if(bytes < 1073741824) return(bytes / 1048576).toFixed(2) + " MB";
    else return(bytes / 1073741824).toFixed(2) + " GB";
}

