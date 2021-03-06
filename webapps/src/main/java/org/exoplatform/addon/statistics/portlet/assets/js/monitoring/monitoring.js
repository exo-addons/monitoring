$.noConflict();
var myInterval;
require(["SHARED/bts_tab", "SHARED/bts_tooltip"], function($) {
    jQuery(document).ready(function() {
        loadQueriesStatistics();
    });
});

function loadQueriesStatistics() {
    clearInterval(myInterval);
    if (!jQuery.fn.DataTable.isDataTable('#queriesTable')) {
        queriesStatisticsTable = jQuery('#queriesTable').DataTable({

            "bProcessing": false,
            "bServerSide": false,
            "aaSorting": [
                [1, "asc"]
            ],
            dom: 'Bfrtip',
            buttons: [{
                extend: 'csv',
                filename: 'Queries Statistics'
            }, {
                extend: 'excel',
                filename: 'Queries Statistics'
            }, {
                extend: 'print',
                title: 'Queries Statistics'
            }],
            "sAjaxSource": "/rest/private/exo-statistics/queries/",
            "createdRow": function(row, data, dataIndex) {
                if (parseInt(jQuery(row).children(':nth-child(2)').html().substring(0, jQuery(row).children(':nth-child(2)').html().indexOf('%'))) >= 90) {
                    jQuery(row).children(':nth-child(2)').addClass('green');
                } else if (parseInt(jQuery(row).children(':nth-child(2)').html().substring(0, jQuery(row).children(':nth-child(2)').html().indexOf('%'))) < 20) {
                    jQuery(row).children(':nth-child(2)').addClass('red');
                } else jQuery(row).children(':nth-child(2)').addClass('yellow');
            },
            "aoColumns": [{
                    "mData": "query"
                }, {
                    "mData": "Performance"
                }, {
                    "mData": "DBTime"
                }, {
                    "mData": "Invocations"
                }, {
                    "mData": "RowsFetched"
                }

            ],
            "columnDefs": [{
                "width": "64%",
                "targets": 0
            }, {
                "width": "9%",
                "targets": 1
            }, {
                "width": "9%",
                "targets": 2
            }, {
                "width": "9%",
                "targets": 3
            }, {
                "width": "9%",
                "targets": 4,
                render: function(data, type, row) {
                    return '\u200C' + data;
                }
            }]

        });
        myInterval = setInterval(function() {
            queriesStatisticsTable.ajax.reload(null, false); // user paging is not reset on reload
        }, 10000);

    }
}

function loadEntitiesStatistics() {
    clearInterval(myInterval);
    if (!jQuery.fn.DataTable.isDataTable('#entitiesTable')) {
        entitiesStatisticsTable =
            jQuery('#entitiesTable').DataTable({

                "bProcessing": false,
                "bServerSide": false,
                dom: 'Bfrtip',
                buttons: [{
                    extend: 'csv',
                    filename: 'Entities Statistics'
                }, {
                    extend: 'excel',
                    filename: 'Entities Statistics'
                }, {
                    extend: 'print',
                    title: 'Entities Statistics'
                }],
                "sAjaxSource": "/rest/private/exo-statistics/entities/",
                "createdRow": function(row, data, dataIndex) {
                    if (parseInt(jQuery(row).children(':nth-child(2)').html().substring(0, jQuery(row).children(':nth-child(2)').html().indexOf('%'))) >= 90) {
                        jQuery(row).children(':nth-child(2)').addClass('green');
                    }
                },
                "aoColumns": [{
                    "mData": "entity"
                }, {
                    "mData": "EntityPerformance"
                }, {
                    "mData": "EntityAccessCount"
                }, {
                    "mData": "EntityLoadsCount"
                }, {
                    "mData": "EntityFetchesCount"
                }, {
                    "mData": "EntityOptimisticFailureCount"
                }, {
                    "mData": "EntityModificationCount"
                }],
                "columnDefs": [

                    {
                        "width": "50%",
                        "targets": 0
                    }, {
                        "width": "10%",
                        "targets": 1
                    }, {
                        "width": "8%",
                        "targets": 2,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "8%",
                        "targets": 3,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "8%",
                        "targets": 4,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "8%",
                        "targets": 5,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "8%",
                        "targets": 6,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }
                ]
            });

        myInterval = setInterval(function() {
            entitiesStatisticsTable.ajax.reload(null, false); // user paging is not reset on reload
        }, 10000);
    }
}

function loadCollectionsStatistics() {
    clearInterval(myInterval);
    if (!jQuery.fn.DataTable.isDataTable('#collectionsTable')) {
        collectionsStatisticsTable =
            jQuery('#collectionsTable').DataTable({

                "bProcessing": false,
                "bServerSide": false,
                dom: 'Bfrtip',
                buttons: [{
                    extend: 'csv',
                    filename: 'Collections Statistics'
                }, {
                    extend: 'excel',
                    filename: 'Collections Statistics'
                }, {
                    extend: 'print',
                    title: 'Collections Statistics'
                }],
                "sAjaxSource": "/rest/private/exo-statistics/collections/",
                "createdRow": function(row, data, dataIndex) {
                    if (parseInt(jQuery(row).children(':nth-child(2)').html().substring(0, jQuery(row).children(':nth-child(2)').html().indexOf('%'))) >= 90) {
                        jQuery(row).children(':nth-child(2)').addClass('green');
                    }
                },
                "aoColumns": [{
                    "mData": "collection"
                }, {
                    "mData": "CollectionPerformance"
                }, {
                    "mData": "CollectionAccessCount"
                }, {
                    "mData": "CollectionLoadsCount"
                }, {
                    "mData": "CollectionFetchesCount"
                }, {
                    "mData": "CollectionRecreationCount"
                }, {
                    "mData": "CollectionModificationCount"
                }],
                "columnDefs": [

                    {
                        "width": "52%",
                        "targets": 0
                    }, {
                        "width": "8%",
                        "targets": 1
                    }, {
                        "width": "8%",
                        "targets": 2,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "8%",
                        "targets": 3,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "8%",
                        "targets": 4,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "8%",
                        "targets": 5,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "8%",
                        "targets": 6,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }
                ]
            });


        myInterval = setInterval(function() {
            collectionsStatisticsTable.ajax.reload(null, false); // user paging is not reset on reload
        }, 10000);
    }
}

function loadCachesStatistics() {
    clearInterval(myInterval);
    if (!jQuery.fn.DataTable.isDataTable('#cachesTable')) {
        cachesStatisticsTable =
            jQuery('#cachesTable').DataTable({
                "bProcessing": false,
                "bServerSide": false,
                dom: 'Bfrtip',
                buttons: [{
                    extend: 'csv',
                    filename: 'Caches Statistics'
                }, {
                    extend: 'excel',
                    filename: 'Caches Statistics'
                }, {
                    extend: 'print',
                    title: 'Caches Statistics'
                }],
                "sAjaxSource": "/rest/private/exo-statistics/caches/",
                "createdRow": function(row, data, dataIndex) {
                    if (parseInt(jQuery(row).children(':nth-child(5)').html().substring(0, jQuery(row).children(':nth-child(5)').html().indexOf('%'))) >= 80) {
                        jQuery(row).children(':nth-child(5)').addClass('red');
                    }
                },
                "aoColumns": [{
                    "mDataProp": "Name"
                }, {
                    "mDataProp": "HitCount"
                }, {
                    "mDataProp": "MissCount"
                }, {
                    "mDataProp": "HitRatio"
                }, {
                    "mDataProp": "MissRatio"
                }, {
                    "mDataProp": "Capacity"
                }, {
                    "mDataProp": "Size"
                }, {
                    "mDataProp": "TimeToLive"
                }],
                "columnDefs": [

                    {
                        "width": "30%",
                        "targets": 0
                    }, {
                        "width": "10%",
                        "targets": 1,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "10%",
                        "targets": 2,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "10%",
                        "targets": 3,
                        render: function(data, type, row) {
                            return row.MissCount + row.HitCount == 0 ? 0.0 + " %" : ((row.HitCount / (row.MissCount + row.HitCount)) * 100).toFixed(0) + " %";
                        }
                    }, {
                        "width": "10%",
                        "targets": 4,
                        render: function(data, type, row) {
                            return row.MissCount + row.HitCount == 0 ? 0.0 + " %" : ((row.MissCount / (row.MissCount + row.HitCount)) * 100).toFixed(0) + " %";
                        }
                    }, {
                        "width": "10%",
                        "targets": 5
                    }, {
                        "width": "10%",
                        "targets": 6,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "10%",
                        "targets": 7,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }

                ]
            });

        myInterval = setInterval(function() {
            cachesStatisticsTable.ajax.reload(null, false); // user paging is not reset on reload
        }, 10000);
    }
}



function loadPortletsStatistics() {
    clearInterval(myInterval);
    if (!jQuery.fn.DataTable.isDataTable('#applicationsTable')) {
        applicationsStatisticsTable =
            jQuery('#applicationsTable').DataTable({

                "bProcessing": false,
                "bServerSide": false,
                "aaSorting": [
                    [4, "desc"]
                ],
                dom: 'Bfrtip',
                buttons: [{
                    extend: 'csv',
                    filename: 'Portlets Statistics'
                }, {
                    extend: 'excel',
                    filename: 'Portlets Statistics'
                }, {
                    extend: 'print',
                    title: 'Portlets Statistics'
                }],
                "sAjaxSource": "/rest/statistics/application/all/",
                "createdRow": function(row, data, dataIndex) {
                    if (jQuery(row).children(':nth-child(5)').html() >= 1000 && jQuery(row).children(':nth-child(5)').html() < 5000) {
                        jQuery(row).children(':nth-child(5)').addClass('yellow');
                    } else if (jQuery(row).children(':nth-child(5)').html() >= 5000) {
                        jQuery(row).children(':nth-child(5)').addClass('red');
                    }
                },
                "aoColumns": [{
                    "mDataProp": "name"
                }, {
                    "mDataProp": "name"
                }, {
                    "mDataProp": "maxTime"
                }, {
                    "mDataProp": "minTime"
                }, {
                    "mDataProp": "averageTime"
                }, {
                    "mDataProp": "execution"
                }],
                "columnDefs": [

                    {
                        "width": "40%",
                        "targets": 0,
                        render: function(data, type, row) {
                            return data.substring(0, data.indexOf('/'));
                        }
                    }, {
                        "width": "12%",
                        "targets": 1,
                        render: function(data, type, row) {
                            return data.substring(data.indexOf('/') + 1);
                        }
                    }, {
                        "width": "12%",
                        "targets": 2
                    }, {
                        "width": "12%",
                        "targets": 3,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "12%",
                        "targets": 4,
                        render: function(data, type, row) {
                            return parseFloat(row.averageTime).toFixed(0);
                        }
                    }, {
                        "width": "12%",
                        "targets": 5
                    }
                ]
            });


        myInterval = setInterval(function() {
            applicationsStatisticsTable.ajax.reload(null, false); // user paging is not reset on reload
        }, 10000);

    }
}

function loadTemplatesStatistics() {
    clearInterval(myInterval);
    if (!jQuery.fn.DataTable.isDataTable('#templatesTable')) {
        templatesStatisticsTable =
            jQuery('#templatesTable').DataTable({

                "bProcessing": false,
                "bServerSide": false,
                dom: 'Bfrtip',
                buttons: [{
                    extend: 'csv',
                    filename: 'Templates Statistics'
                }, {
                    extend: 'excel',
                    filename: 'Templates Statistics'
                }, {
                    extend: 'print',
                    title: 'Templates Statistics'
                }],
                "sAjaxSource": "/rest/statistics/template/all/",
                "createdRow": function(row, data, dataIndex) {
                    if (jQuery(row).children(':nth-child(4)').html() >= 1000 && jQuery(row).children(':nth-child(4)').html() < 5000) {
                        jQuery(row).children(':nth-child(4)').addClass('yellow');
                    } else if (jQuery(row).children(':nth-child(4)').html() >= 5000) {
                        jQuery(row).children(':nth-child(4)').addClass('red');
                    }
                },
                "aoColumns": [{
                    "mDataProp": "name"
                }, {
                    "mDataProp": "maxTime"
                }, {
                    "mDataProp": "minTime"
                }, {
                    "mDataProp": "averageTime"
                }, {
                    "mDataProp": "execution"
                }],
                "columnDefs": [

                    {
                        "width": "60%",
                        "targets": 0,
                        render: function(data, type, row) {
                            return data.substring(data.lastIndexOf('/') + 1);
                        }
                    }, {
                        "width": "10%",
                        "targets": 1
                    }, {
                        "width": "10%",
                        "targets": 2,
                        render: function(data, type, row) {
                            return '\u200C' + data;
                        }
                    }, {
                        "width": "10%",
                        "targets": 3,
                        render: function(data, type, row) {
                            return parseFloat(data).toFixed(0);
                        }
                    }, {
                        "width": "10%",
                        "targets": 4
                    }
                ]
            });


        myInterval = setInterval(function() {
            templatesStatisticsTable.ajax.reload(null, false); // user paging is not reset on reload
        }, 10000);
    }
}

function loadApplicationsStatistics() {
    clearInterval(myInterval);
    var dataPoints = [];
    jQuery.getJSON('/rest/private/exo-statistics/applicationdata/', function(data)

        {
            jQuery("#applicationDataInfo ul").html("");
            jQuery("#applicationDataInfo ul").append('<li>' + '<p class="font16">Number of Activities : ' + '<span>' + data.activitiesCount + '</span>' + '<p/>' + '</li>' + '<hr width=30%>');
            jQuery("#applicationDataInfo ul").append('<li>' + '<p class="font16">Number of Spaces : ' + '<span>' + data.spacesCount + '</span>' + '<p/>' + '</li>' + '<hr width=30%>');
            jQuery("#applicationDataInfo ul").append('<li>' + '<p class="font16">Number of Identities : ' + '<span>' + data.identitiesCount + '</span>' + '<p/>' + '</li>' + '<hr width=30%>');
            jQuery("#applicationDataInfo ul").append('<li>' + '<p class="font16">Number of Connections : ' + '<span>' + data.connectionsCount + '</span>' + '<p/>' + '</li>' + '<hr width=30%>');
            jQuery("#applicationDataInfo ul").append('<li>' + '<p class="font16">Number of Wiki Pages : ' + '<span>' + data.pagesCount + '</span>' + '<p/>' + '</li>' + '<hr width=30%>');
            jQuery("#applicationDataInfo ul").append('<li>' + '<p class="font16">Number of Wiki Templates : ' + '<span>' + data.templatesCount + '</span>' + '<p/>' + '</li>' + '<hr width=30%>');
            jQuery("#applicationDataInfo ul").append('<li>' + '<p class="font16">Number of Wiki Attachements : ' + '<span>' + data.attachmentCount + '</span>' + '<p/>' + '</li>' + '<hr width=30%>');
            var chart = new CanvasJS.Chart("applicationContainer", {
                height: 300,
                width: 400,
                backgroundColor: "#FAFAFA",
                title: {
                    text: "Applications Statistics",
                    fontSize: 12,
                    horizontalAlign: "center",
                    fontFamily: "Helvetica"

                },
                legend: {
                    horizontalAlign: "right",
                    verticalAlign: "center",
                    fontSize: 12,
                    fontFamily: "Helvetica"
                },
                data: [{
                    type: "pie",
                    showInLegend: true,
                    dataPoints: [{
                        legendText: "Activities",
                        y: data.activitiesCount
                    }, {
                        legendText: "Spaces",
                        y: data.spacesCount
                    }, {
                        legendText: "Identities",
                        y: data.identitiesCount
                    }, {
                        legendText: "Connections",
                        y: data.connectionsCount
                    }, {
                        legendText: "Pages",
                        y: data.pagesCount
                    }, {
                        legendText: "Templates",
                        y: data.templatesCount
                    }, {
                        legendText: "Attachments",
                        y: data.attachmentCount
                    }]

                }]
            });
            chart.render();
        });
    jQuery("#memoryContent").hide();
    jQuery("#applicationContent").show();
}

function loadMemoryStatistics() {
    clearInterval(myInterval);
    jQuery.getJSON('/rest/private/monitoring/memory/', function(data) {
        var dataPoints = [];
        jQuery.each(data, function(i, liste) {
            jQuery.each(liste, function(key, memory) {

                var free = formatBytes(memory.max - memory.used);
                var used = formatBytes(memory.used);
                var total = formatBytes(memory.max);
                var memoryDiv = "#memoryHeapInfos";
                var chartTitle = "";
                var chartContainer = ""
                jQuery(memoryDiv + key + " ul").html("");
                jQuery(memoryDiv + key + " ul").append('<li>' + '<p>Free : ' + '<span>' + free + '</span>' + '<p/>' + '</li>' + '<hr width=20%>');
                jQuery(memoryDiv + key + " ul").append('<li>' + '<p>Used : ' + '<span>' + used + '</span>' + '<p/>' + '</li>' + '<hr width=20%>');
                jQuery(memoryDiv + key + " ul").append('<li>' + '<p>Total : ' + '<span>' + total + '</span>' + '<p/>' + '</li>' + '<hr width=20%>');
                chartContainer = (key == 0) ? "memoryHeapChart" : "memoryNonHeapChart";
                chartTitle = (key == 0) ? "Memory Heap Usage" : "Memory Non-Heap Usage";
                var memoryHeapChart = new CanvasJS.Chart(chartContainer, {

                    height: 220,
                    width: 380,
                    backgroundColor: "#FAFAFA",

                    legend: {
                        horizontalAlign: "right",
                        verticalAlign: "center",
                        fontSize: 12,
                        fontFamily: "Helvetica"

                    },
                    data: [{
                        type: "pie",
                        showInLegend: true,
                        indexLabelWrap: false,  // change to true
                        indexLabel: "{y}%",
                        dataPoints: [{
                            legendText: "Free",
                            y: ((1 - (memory.used / memory.max)) * 100).toFixed(0)
                        }, {
                            legendText: "Used",
                            y: ((memory.used / memory.max) * 100).toFixed(0)
                        }]

                    }]
                });
                memoryHeapChart.render();
            });

        });
    });
    jQuery("#applicationContent").hide();
    jQuery("#memoryContent").show();
    myInterval = setInterval(function() {
        loadMemoryStatistics();
    }, 10000);
}

function formatBytes(bytes) {
    var K = 1024;
    var M = 1024 * K;
    var G = 1024 * M;
    if (bytes < K) {
      return bytes + " Bytes";
    } else if (bytes < M) {
      return round2decimals(bytes / K) + " KB" ;
    } else if (bytes < G) {
      return round2decimals(bytes / M) + " MB" ;
    } else {
      return round2decimals(bytes / G) + " GB";
    }
  }
function round2decimals (number) {
  return Math.round(number * 100) / 100;
}