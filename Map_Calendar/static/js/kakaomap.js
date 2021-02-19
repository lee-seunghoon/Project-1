function call_cal(){
    let title = $('#title').text()
    let address1 = $('#address1').text()
    let address2 = $('#address2').text()
    let call = $('#call').text()
    let date1 = $('#date1').val()
    let date2 = $('#date2').val()
    let end_date = formatDate(date2)
    let content = $('#content').val()
    let position_y = markerPosition_y
    let position_x = markerPosition_x
    let id = $('#eventId').val()


    $.ajax({
        url : '/maps/mapsProcess',  // 호출할 서버쪽 프로그램의 URL, Query String 제외
        type : 'GET',        // 서버쪽 프로그램에 대한 request 방식
        dataType : 'json',   // 서버쪽 프로그램에서 response되는 데이터 형식(json)
        contentType: "application/json",
        data : {
            title : title,
            address1 : address1,
            address2 : address2,
            call : call,
            date1 : date1,
            date2 : end_date,
            content : content,
            position_y : position_y,
            position_x : position_x,
            id: id
        },                   // 서버쪽 프로그램을 호출하기 위해 주어야 하는 data , 알아서 data를 GET방식의
                             // Query String 형식으로 만들어 준다!!
        success : function(result) {
            location.href = "http://127.0.0.1:8000/calendars"

        },
        error : function() {
            alert("뭔가 이상해요!!")
        }

    })

}


function modal123(){
   // alert("modal입니다!!")

    const modal = document.querySelector(".modal");
    const closeButton = modal.querySelector("#close");
//동작함수

    modal.classList.remove("hidden");

    const closeModal = () => {
        modal.classList.add("hidden");
    }

    closeButton.addEventListener("click", closeModal);
//-->

}

function call_book(){
    let title = $('#title').text()
    let category = $('#category').val()
    let category_chart = $('#category_chart').val()
    let address1 = $('#address1').text()
    let call = $('#call').text()

    if (category == '') {
        $.ajax({
            url: '/maps/booksProcess',  // 호출할 서버쪽 프로그램의 URL, Query String 제외
            type: 'GET',        // 서버쪽 프로그램에 대한 request 방식
            dataType: 'json',   // 서버쪽 프로그램에서 response되는 데이터 형식(json)
            contentType: "application/json",
            data: {
                category: category_chart,
                address1: address1,
                title: title,
                call: call,
            },                   // 서버쪽 프로그램을 호출하기 위해 주어야 하는 data , 알아서 data를 GET방식의
                                 // Query String 형식으로 만들어 준다!!
            success: function (result) {
                location.href = "http://127.0.0.1:8000/bookmarks"
            },
            error: function () {
                alert("뭔가 이상해요!!")
            }

        })
    }

    else {
        $.ajax({
            url: '/maps/booksProcess',  // 호출할 서버쪽 프로그램의 URL, Query String 제외
            type: 'GET',        // 서버쪽 프로그램에 대한 request 방식
            dataType: 'json',   // 서버쪽 프로그램에서 response되는 데이터 형식(json)
            contentType: "application/json",
            data: {
                category: category,
                address1: address1,
                title: title,
                call: call,
            },                   // 서버쪽 프로그램을 호출하기 위해 주어야 하는 data , 알아서 data를 GET방식의
                                 // Query String 형식으로 만들어 준다!!
            success: function (result) {
                location.href = "http://127.0.0.1:8000/bookmarks"
            },
            error: function () {
                alert("뭔가 이상해요!!")
            }

        })
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + 1),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-'); }