$.noConflict();
require( ["SHARED/bootstrap", "SHARED/bts_tab"], function ( $ )
{
jQuery(document).ready(function() {
loadQueriesStatistics();
loadEntitiesStatistics();
loadCachesStatistics();
loadCollectionsStatistics();
loadApplicationsStatistics();
loadDataStorage();
});
} );

function loadQueriesStatistics(){
var queriesStatisticsTable=
   jQuery('#queriesTable').DataTable( {
    "bProcessing": false,
    "bServerSide": false,
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
                    { "width": "9%", "targets": 1 },
                    { "width": "9%", "targets": 2 },
                    { "width": "9%", "targets": 3 },
                    { "width": "9%", "targets": 4 }
                  ]

                                           });
setInterval( function () {
    queriesStatisticsTable.ajax.reload( null, false ); // user paging is not reset on reload
}, 6000 );
}

function loadEntitiesStatistics(){
var entitiesStatisticsTable=
 jQuery('#entitiesTable').DataTable( {
    "bProcessing": false,
    "bServerSide": false,
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
}, 6000 )
}

function loadCachesStatistics(){
var cachesStatisticsTable=
 jQuery('#cachesTable').DataTable( {
    "bProcessing": false,
    "bServerSide": false,
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
}, 6000 );
}

function loadCollectionsStatistics(){
var collectionsStatisticsTable=
 jQuery('#collectionsTable').DataTable( {
    "bProcessing": false,
    "bServerSide": false,
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
}, 6000 );
}

function loadApplicationsStatistics(){
var applicationsStatisticsTable=
 jQuery('#applicationsTable').DataTable( {
    "bProcessing": false,
    "bServerSide": false,
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

                     { "width": "50%", "targets": 0,render: function ( data, type, row ) {
                                                         return data.substring(0,data.indexOf('/'));
                                                             }},
                     { "width": "10%", "targets": 1,render: function ( data, type, row ) {
                                                         return data.substring(data.indexOf('/')+1);
                                                            }},
                     { "width": "10%", "targets": 2 },
                     { "width": "10%", "targets": 3 },
                     { "width": "10%", "targets": 4,render: function ( data, type, row ) {
                                                        return parseFloat(data).toFixed(0);
                                                     }  },
                     { "width": "10%", "targets": 5 }
                 ]
                                           });
setInterval( function () {
    applicationsStatisticsTable.ajax.reload( null, false ); // user paging is not reset on reload
}, 6000 );
}

function loadTemplatesStatistics(){
var templatesStatisticsTable=
 jQuery('#templatesTable').DataTable( {
    "bProcessing": false,
    "bServerSide": false,
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
}, 6000 );
}

jQuery(function () {
   jQuery('#statisticsContainer').highcharts({
        title: {
            text: 'Real Time Queries Performance',
            x: -20 //center
        },

        xAxis: {
                 type: 'datetime',
                       labels: {
                           formatter: function() {
                               return Highcharts.dateFormat('%a %d %b', this.value);
                           }
                       }
           },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: []
    });
});
function loadDataStorage(){
jQuery.getJSON('/rest/private/exo-statistics/applicationdata', function(data)
				{
jQuery("#displaySocialData ul").html("");
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Activities :'+ '<span>'+data.activitiesCount+'</span>'+'<p/>'+'</li>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Spaces :'+ '<span>'+data.spacesCount+'</span>'+'<p/>'+'</li>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Identities :'+ '<span>'+data.identitiesCount+'</span>'+'<p/>'+'</li>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Connections :'+ '<span>'+data.connectionsCount+'</span>'+'<p/>'+'</li>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Wiki Pages :'+ '<span>'+data.pagesCount+'</span>'+'<p/>'+'</li>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Wiki Templates :'+ '<span>'+data.templatesCount+'</span>'+'<p/>'+'</li>' );
jQuery("#displaySocialData ul").append('<li>'+'<p class="font16">Number of Wiki Attachements :'+ '<span>'+data.attachmentCount+'</span>'+'<p/>'+'</li>' );


					});
}



