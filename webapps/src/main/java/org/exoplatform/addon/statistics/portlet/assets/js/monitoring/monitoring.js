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




