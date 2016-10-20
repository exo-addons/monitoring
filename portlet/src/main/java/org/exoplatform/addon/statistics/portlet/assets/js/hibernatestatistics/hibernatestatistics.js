$.noConflict();
require( ["SHARED/bootstrap", "SHARED/bts_tab"], function ( $ )
{
jQuery(document).ready(function() {
loadQueriesStatistics();
loadEntitiesStatistics();
loadCachesStatistics();
loadCollectionsStatistics();
});
} );

function loadQueriesStatistics(){
var queriesStatisticsTable=
   jQuery('#queriesTable').DataTable( {
    "bProcessing": false,
    "bServerSide": false,
    "sAjaxSource": "/rest/private/cacheservice/queriesstatistics/",
    "aoColumns": [
                { "mData": "query" },
                { "mData": "Cached" },
                { "mData": "Performance" },
                { "mData": "DBTime" },
                { "mData": "RowsFetched" },
                { "mData": "Invocations" }
              ],
    "columnDefs": [
                    { "width": "60%", "targets": 0},
                    { "width": "8%", "targets": 1 },
                    { "width": "8%", "targets": 2 },
                    { "width": "8%", "targets": 3 },
                    { "width": "8%", "targets": 4 },
                    { "width": "8%", "targets": 5 }
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
    "sAjaxSource": "/rest/private/cacheservice/entitiesstatistics/",
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
    "sAjaxSource": "/rest/private/cacheservice/cachestatistics/",
    "aoColumns": [
                    { "mDataProp": "Name" },
                    { "mDataProp": "HitCount" },
                    { "mDataProp": "MissCount" },
                    { "mDataProp": "Capacity" },
                    { "mDataProp": "Size" },
                    { "mDataProp": "TimeToLive" }
                  ] ,
    "columnDefs": [

                     { "width": "60%", "targets": 0 },
                     { "width": "8%", "targets": 1 },
                     { "width": "8%", "targets": 2 },
                     { "width": "8%", "targets": 3 },
                     { "width": "8%", "targets": 4 },
                     { "width": "8%", "targets": 5 }
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
    "sAjaxSource": "/rest/private/cacheservice/collectionsstatistics/",
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




