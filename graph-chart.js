$(function () {

  var areaChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Due Amount',
        backgroundColor: 'rgba(245,105,84,0.9)',
        borderColor: 'rgba(245,105,84,0.8)',
        pointRadius: false,
        pointColor: '#3b8bba',
        pointStrokeColor: 'rgba(60,141,188,1)',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(60,141,188,1)',
        data: [28, 48, 40, 19, 86, 27, 90]
      },
      {
        label: 'Receiveable Amount',
        backgroundColor: 'rgba(0,166,90,0.9)',
        borderColor: 'rgba(0,166,90,0.8)',
        pointRadius: false,
        pointColor: 'rgba(210, 214, 222, 1)',
        pointStrokeColor: '#c1c7d1',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      },
    ]
  }

  //-------------
  //- BAR CHART -
  //-------------
  var barChartCanvas = $('#barChart').get(0).getContext('2d')
  var barChartData = jQuery.extend(true, {}, areaChartData)
  var temp0 = areaChartData.datasets[0]
  var temp1 = areaChartData.datasets[1]
  barChartData.datasets[0] = temp1
  barChartData.datasets[1] = temp0

  var barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    datasetFill: false
  }

  var barChart = new Chart(barChartCanvas, {
    type: 'bar',
    data: barChartData,
    options: barChartOptions
  })


  var database = firebase.database();
  var ref_saq = database.ref("Test/User/");
  ref_saq.on("value", function (snapshot) {
    var total_orders = 0;
    var total_scheduled = 0;
    var total_scheduled_active = 0;
    var total_scheduled_inactive = 0;
    var total_onetime = 0;

    snapshot.forEach(function (childSnapshot) {
      users = snapshot.numChildren();
      childSnapshot.forEach(function (grandChild) {
        grandChild.forEach(function (Child) {
          total_orders = total_orders + 1;
          if (Child.child('orderType').val() === 'Schedule') {
            total_scheduled = total_scheduled + 1;
            if (Child.child('status').val() === 'Resumed') {
              total_scheduled_active = total_scheduled_active + 1;
            } else {
              total_scheduled_inactive = total_scheduled_inactive + 1;
            }
          } else {
            total_onetime = total_onetime + 1;
          }
        });
      });
    });

    var dataSAQ = {
      // labels: ['Total Sites', 'SARs Submitted'],
      datasets: [
        {
          label: 'Total ' + total_orders,
          backgroundColor: 'rgba(204,51,60,1)',
          borderColor: 'rgba(204,51,60,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 80,
          data: [total_orders]
        },
        {
          label: 'Scheduled ' + total_scheduled,
          backgroundColor: 'rgba(25,108,197,1)',
          borderColor: 'rgba(25,108,197,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 80,
          data: [total_scheduled]
        },
        {
          label: 'Scheduled Active ' + total_scheduled_active,
          backgroundColor: 'rgba(25,175,106,1)',
          borderColor: 'rgba(25,175,106,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 80,
          data: [total_scheduled_active]
        },
        {
          label: 'Scheduled Inactive ' + total_scheduled_inactive,
          backgroundColor: 'rgba(255,197,7,1)',
          borderColor: 'rgba(255,197,7,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 80,
          data: [total_scheduled_inactive]
        },
        {
          label: 'One-Time ' + total_onetime,
          backgroundColor: 'rgba(246,120,101,0.9)',
          borderColor: 'rgba(246,120,101,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 80,
          data: [total_onetime]
        },
      ]
    }

    //-------------
    //- SAQ CHART -
    //-------------
    var barchartSAQ = $('#barChart-SAQ').get(0).getContext('2d')
    var barchartSAQData = jQuery.extend(true, {}, dataSAQ)
    var temp0 = dataSAQ.datasets[0]
    var temp1 = dataSAQ.datasets[1]
    var temp2 = dataSAQ.datasets[2]
    var temp3 = dataSAQ.datasets[3]
    var temp4 = dataSAQ.datasets[4]
    barchartSAQData.datasets[0] = temp0
    barchartSAQData.datasets[1] = temp1
    barchartSAQData.datasets[2] = temp2
    barchartSAQData.datasets[3] = temp3
    barchartSAQData.datasets[4] = temp4

    var barchartSAQOptions = {
      responsive: true,
      maintainAspectRatio: false,
      datasetFill: false,
      legend: {
        labels: {
          boxWidth: 20
        }
      }
    }

    var barChart_SAQ = new Chart(barchartSAQ, {
      type: 'bar',
      data: barchartSAQData,
      options: barchartSAQOptions
    })

  });





  var ref_cw = database.ref("CW/");
  ref_cw.on("value", function (snapshot) {
    var totalCW = 0;
    var CW_completed = 0;
    var total_RFI = 0;
    var total_ATP = 0;
    var total_FAC = 0;
    snapshot.forEach(function (childSnapshot) {
      totalCW = totalCW + 1;
      if (childSnapshot.child('status').val().includes("Completed")) {
        CW_completed = CW_completed + 1;
      }

      if (childSnapshot.child('RFI').val().substring(0, 1).match(/^[0-9]+$/)) {
        total_RFI = total_RFI + 1;
      }

      if (childSnapshot.child('ATP').val().substring(0, 1).match(/^[0-9]+$/)) {
        total_ATP = total_ATP + 1;
      }

      if (childSnapshot.child('FAC').val().substring(0, 1).match(/^[0-9]+$/)) {
        total_FAC = total_FAC + 1;
      }

    });


    var dataCW = {
      //labels: ['Total Sites', 'CW Completed', 'CW In-progress', 'RFI', 'ATP', 'FAC'],
      datasets: [
        {
          label: 'Sites ' + totalCW,
          backgroundColor: 'rgba(204,51,60,1)',
          borderColor: 'rgba(204,51,60,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 40,
          data: [totalCW]
        },
        {
          label: 'Completed ' + CW_completed,
          backgroundColor: 'rgba(0,98,204,0.9)',
          borderColor: 'rgba(0,98,204,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 40,
          data: [CW_completed]
        },
        {
          label: 'In-progress ' + (totalCW - CW_completed),
          backgroundColor: 'rgba(25,175,106,1)',
          borderColor: 'rgba(25,175,106,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 40,
          data: [totalCW - CW_completed]
        },
        {
          label: 'RFI ' + total_RFI,
          backgroundColor: 'rgba(255,197,7,1)',
          borderColor: 'rgba(255,197,7,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 40,
          data: [total_RFI]
        },
        {
          label: 'ATP ' + total_ATP,
          backgroundColor: 'rgba(246,120,101,0.9)',
          borderColor: 'rgba(246,120,101,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 40,
          data: [total_ATP]
        },
        {
          label: 'FAC ' + total_FAC,
          backgroundColor: 'rgba(64,64,64,0.9)',
          borderColor: 'rgba(64,64,64,0.8)',
          pointRadius: false,
          pointColor: '#3b8bba',
          pointStrokeColor: 'rgba(60,141,188,1)',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(60,141,188,1)',
          minBarLength: 10,
          maxBarThickness: 40,
          data: [total_FAC]
        },
      ]
    }

    //-------------
    //- CW CHART -
    //-------------
    var barchartCW = $('#barChart-CW').get(0).getContext('2d')
    var barchartCWData = jQuery.extend(true, {}, dataCW)
    var temp0 = dataCW.datasets[0]
    var temp1 = dataCW.datasets[1]
    var temp2 = dataCW.datasets[2]
    var temp3 = dataCW.datasets[3]
    var temp4 = dataCW.datasets[4]
    var temp5 = dataCW.datasets[5]
    barchartCWData.datasets[0] = temp0
    barchartCWData.datasets[1] = temp1
    barchartCWData.datasets[2] = temp2
    barchartCWData.datasets[3] = temp3
    barchartCWData.datasets[4] = temp4
    barchartCWData.datasets[5] = temp5

    var barchartCWOptions = {
      responsive: true,
      maintainAspectRatio: false,
      datasetFill: false,
      legend: {
        labels: {
          boxWidth: 20
        }
      }
    }

    var barChart_CW = new Chart(barchartCW, {
      type: 'bar',
      data: barchartCWData,
      options: barchartCWOptions
    })
  });
})