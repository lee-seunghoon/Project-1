# Map Calendar 프로젝트



### `2번째 프로젝트 확인 →` https://github.com/lee-seunghoon/Project-2



## 배경

> - 일정 확인 시 장소 위치 확인이 필요할 때, 지도 어플리케이션 추가 실행 필요 (ex. 결혼식, 미팅, 회식, 행사 등)
> - 일정과 장소 지도를 one-click으로 확인할 수 있다면?
> - 지도 기반으로 일정을 저장 할 수 있다면? 
> - 캘린더 기반으로 장소를 확인 수정 가능하다면? 
> - 더 편리한 스케쥴러 구현



## 프로젝트 일정 및 기간

> - 기간 : **`2021.02.02 ~ 2021.02.18`** (약 2주)
> - 일정
>   - **`02.02 ~ 02.03`** : 프로젝트 주제 선정 및 기획
>   - **`02.04 ~ 02.14`** : 개발 및 공유
>   - **`02.15 ~ 02.16`** : 각 기능 연결 및 전체 웹사이트 구성
>   - **`02.17 ~ 02.18`** : 기능 간 호환 테스트 및 버그 수정



## 개발 환경

| **`<협업 Tool>`**                                         | **`<Front-end>`**                                            | **`<Back-end>`**                                  |
| --------------------------------------------------------- | :----------------------------------------------------------- | :------------------------------------------------ |
| - Github<br />- Google spreadsheet<br />- Google diagrams | - Kakao map API<br />- FullCalendar Library<br />- Google Calendar API<br />- Bootstrap<br />- HTML<br />- Javascript<br />- CSS | - Django<br />- sqlite3<br />- JQuery<br />- Ajax |



## 문제점

> - FullCalendar Library 적용 어려움
> - Ajax 활용하여 Front-end 화면에서 입력하는 데이터 가져오기
> - event log 기록을 적재하는 Data Doubling 현상
> - 개별 일정 modal 창 안에 카카오맵 화면 출력



## 해결 방안

> - Googling, Stac-overflow, github issue 참고
> - Ajax get 방식으로 데이터 가져오기 성공
> - Data Doubling 시작되는 tag button에 unbind 함수 적용
> - DOM 이해 및 코드 위치 수정으로 카카오맵 화면 출력 성공



## 배운점

> - 외부 라이브러리 사용 시 공식 문서 (API) 숙지의 중요성
> - CORS 정책
> - Ajax get 방식 data 수/발신 방법
> - Bootstrap Modal 창 구현
> - html 화면 제어 process
> - javascript 웹 화면 로직 처리 process
> - MVT pattern
> - 외부 API 사용 방법 (Google Calendar API, Kakao Map API)
> - Django ORM Database 관리 및 data 처리
> - Django 내장 서버 sqlite3 사용 방법



## 수상

- 총 6개 팀 중 1등

![image-20210313163530315](md-images/image-20210313163530315.png)



## WBS

![image-20210227122218025](md-images/image-20210227122218025.png)





## 스토리 보드

![image-20210227123156937](md-images/image-20210227123156937.png)



## 대표 기능

#### 	1. `Map` 기능

#### 	2. `Calendar` 기능

#### 	3. `Bookmark` 기능

#### 	4. `Sign-in & Sign-up` 기능



## 담당 역할

### **`<Calendar 개발>`**

> ### **1) Google Calendar API `대한민국 공휴일` 연동**
>
> ![image-20210301105039049](md-images/image-20210301105039049.png)
>
> 
> 
>
> ### **2) `일정 추가` 기능**
>
> ![image-20210301105137794](md-images/image-20210301105137794.png)
>
> 
>
> 
>
> ### **3) `지도 검색` 연동 기능**
>
> ![image-20210301105526359](md-images/image-20210301105526359.png)
>
>
> ![image-20210301105801444](md-images/image-20210301105801444.png)
>
>
> ![image-20210301110231574](md-images/image-20210301110231574.png)
>
>
> ![image-20210301110348027](md-images/image-20210301110348027.png)
>
> 
>
> ### **4) 기존 일정 `확인` 및 `수정` 기능**
>
> ![image-20210301111302103](md-images/image-20210301111302103.png)
>
> ![image-20210301112320782](md-images/image-20210301112320782.png)
>
> ![image-20210301112615549](md-images/image-20210301112615549.png)
>
> 
>
> 
>
> ### **5) 카카오 map , 로드뷰 연동 기능**
>
> ![image-20210301110436528](md-images/image-20210301110436528.png)



## 코드 리뷰

- ### <Calendar 화면 구성>

  **`(calendars/templates/calendars/ui-calendars.html)`**

  ```html
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>
      Avangs - Calender
    </title>
  
  {# Basic Theme #}
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
    <link href="/static/assets/css/material-dashboard.css?v=2.1.2" rel="stylesheet" />
  
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.0/moment.min.js"></script>
  
  {# Calendar #}
    <link href='https://unpkg.com/@fullcalendar/core@4.3.1/main.min.css' rel='stylesheet' />
    <link href='https://unpkg.com/@fullcalendar/daygrid@4.3.0/main.min.css' rel='stylesheet' />
    <link href='https://unpkg.com/@fullcalendar/timegrid@4.3.0/main.min.css' rel='stylesheet' />
  
    <script src='https://unpkg.com/@fullcalendar/core@4.3.1/main.min.js'></script>
    <script src='https://unpkg.com/@fullcalendar/interaction@4.3.0/main.min.js'></script>
    <script src='https://unpkg.com/@fullcalendar/daygrid@4.3.0/main.min.js'></script>
    <script src='https://unpkg.com/@fullcalendar/timegrid@4.3.0/main.min.js'></script>
    <script src='https://unpkg.com/@fullcalendar/google-calendar@4.3.0/main.js'></script>
  
    </head>
  
  <body>
    <div class="wrapper ">
      <!-- sidebar 구성 -->  
      {% include 'includes/sidebar.html' %}
      <div class="main-panel">
        <!-- navigation 구성 -->   
        {% include 'includes/navigation.html' %}
          <div class="content">
              <div class="container-fluid">
                  <div class="row" style="max-width:80%;">
                      <div id='calendar' style="max-width:80%;margin:10px auto"></div>
                  </div>
              </div>
          </div>
  
  
  {# New 일정 추가 MODAL 창 #}
          <div id="fullCalModal" class="modal fade">
              <div class="modal-dialog" style="max-width: 50%; width: auto;">
                  <div class="modal-content">
                      <div class="modal-header" >
                          <h4 id="modalTitle" class="modal-title" >일정 추가</h4>
                          
                          <!-- 닫기 버튼 구현 -->
                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">close</span> </button>
                      </div>
                      
                      <div id="modalBody" class="modal-body">
                          
                          <!-- data 전달을 위해 form tag 사용 -->
                          <form action="/calendars/map/" method="post">
                              {% csrf_token %} <!-- form tag 사용 때 보안을 위해 반드시 입력! django가 제공해주는 보안 token -->
                              <div class="form-group">
                                  <label for="eventName">일정 내용</label> <!-- label의 for는 input tag의 id와 연동! --> 
                                  <input class="form-control" type="text" id="eventName" name="eventName" required="required">
                              </div>
                              
                              <div class="form-group form-inline">
                                  <label for="eventStartDate">시작:</label>&nbsp;&nbsp;
                                  
                                  <!-- 기본 달력 아이콘 구현 위해 type='date' -->
                                  <input type="date" class="form-control" style="width: 5cm" id="eventStartDate" name="eventStartDate" >&nbsp;&nbsp;&nbsp;
                                  
                                  <label for="eventEndDate">끝:</label>&nbsp;&nbsp;
                                  <input type="date" class="form-control" style="width: 5cm" id="eventEndDate" name="eventEndDate" >
                              </div>
                              
                              <div class="form-group form-inline">
                                  <div class="input-group">
                                      <label for="eventLocation">장소명: </label>&nbsp;&nbsp;
                                      <input type="text" class="form-control" style="width: 8cm" id="eventLocation" name="eventLocation" required="required">&nbsp;&nbsp;&nbsp;
                                      
                                      <!-- 검색 버튼 클릭시 위 form tag의 action 주소로 data submit -->
                                      <button type="submit" class="btn btn-primary" id="submitSearch">검색</button>
                                  </div>
                              </div>
                          </form>
                          
                          <div class="form-group">
                              <label for="detailAddress">도로명 주소</label>
                              <input class="form-control" type="text" id="detailAddress" name="detailAddress">
                          </div>
                          
                          <div class="modal-footer" >
                              <!-- 일정 bar 색 설정 -->
                              <label for="color_select">색상 :</label>
                              <select class="inputModal mr-auto" name="color" id="color_select">
                                  <option value="red" style="color:#D25565;">빨간색</option>
                                  <option value="purple" style="color:#9775fa;">보라색</option>
                                  <option value="orange" style="color:#ffa94d;">주황색</option>
                                  <option value="royalblue" style="color:#74c0fc;">파란색</option>
                                  <option value="pink" style="color:#f06595;">핑크색</option>
                                  <option value="lightgreen" style="color:#63e6be;">연두색</option>
                                  <option value="green" style="color:#a9e34b;">초록색</option>
                                  <option value="blue" style="color:#4d638c;">남색</option>
                                  <option value="black" style="color:#495057;">검정색</option>
                              </select>
                              
                              <button class="btn btn-default" data-dismiss="modal" aria-hidden="true" id="eventDefault">취소</button>
                              <button type="button" class="btn btn-primary" id="submitSave" >저장</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
  
  
  {# 기존 일정 클릭할 경우 MODAL 창 #}
          <div id="fixModal" class="modal fade">
              <div class="modal-dialog" >
                  <div class="modal-content" >
                      <div class="modal-header" >
                          <h4 id="fixModalTitle" class="modal-title" >일정 확인 및 수정</h4>
                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">close</span> </button>
                      </div>
                      <div id="fixModalBody" class="modal-body">
                          
                          <form action="/calendars/fix_map/" method="post">
                              {% csrf_token %}
                              <input type="text" style="display: none" id="fixEventId" name="fixEventId">
                              <div class="form-group">
                                  <label for="fixEventName">[일정 내용]</label>
                                  <input class="form-control" type="text" id="fixEventName" name="fixEventName">
                              </div>
                              
                              <div class="form-group form-inline">
                                  <div class="input-group date" data-provide="datepicker">
                                      <label for="fixStartDate">시작:</label>&nbsp;&nbsp;
                                      <input type="date" class="form-control" style="width: 5cm" id="fixStartDate" name="fixStartDate">&nbsp;&nbsp;&nbsp;
                                      <label for="fixEndDate">끝:</label>&nbsp;&nbsp;
                                      <input type="date" class="form-control" style="width: 5cm" id="fixEndDate" name="fixEndDate">
                                  </div>
                              </div>
                              
                              <div class="form-group form-inline">
                                  <div class="input-group">
                                      <label for="fixEventLocation">장소명: </label>&nbsp;&nbsp;
                                      <input type="text" class="form-control" style="width: 8cm" id="fixEventLocation" name="fixEventLocation">&nbsp;&nbsp;&nbsp;
                                      <button type="submit" class="btn btn-primary" id="fixSubmitSearch">검색</button>
                                  </div>
                              </div>
                              
                              <div class="form-group">
                                  <label for="fixDetailAddress">[도로명 주소]</label>
                                  <input class="form-control" type="text" id="fixDetailAddress">
                              </div>
                          </form>
                          <div class="form-group form-inline" id="map_view">
                              <div class="input-group">
                                  <div type="text" style="width:225px">[일반지도]</div>&nbsp;&nbsp;&nbsp;
                                  <div type="text" style="width:225px">[로드뷰]</div>
                              </div>
                          </div>
                          
                          <div class="form-group form-inline" id="kakao_map">
                              <div class="input-group">
                                  <!-- 지도 구현 위한 id와 style 설정 -->
                                  <div id="map" style="width:225px;height:225px;"></div>&nbsp;&nbsp;&nbsp;
                                  <div id="roadview" style="width:225px;height:225px;"></div>
                              </div>
                          </div>
                          
                          <div class="modal-footer">
                              <label for="color_select">색상 :</label>
                              <select class="inputModal mr-auto" name="color" id="fix_color_select">
                                  <option value="red" style="color:#D25565;">red</option>
                                  <option value="purple" style="color:#9775fa;">purple</option>
                                  <option value="orange" style="color:#ffa94d;">orange</option>
                                  <option value="royalblue" style="color:#74c0fc;">royalblue</option>
                                  <option value="pink" style="color:#f06595;">pink</option>
                                  <option value="lightgreen" style="color:#63e6be;">lightgreen</option>
                                  <option value="green" style="color:#a9e34b;">green</option>
                                  <option value="blue" style="color:#4d638c;">blue</option>
                                  <option value="black" style="color:#495057;">black</option>
                              </select>
                              <button class="btn btn-default" data-dismiss="modal" aria-hidden="true" id="fixDefault">확인</button>
                              <button type="button" class="btn btn-primary" id="fixSubmitSave">수정</button>
                              <button type="button" class="btn btn-primary" id="fixSubmitDelete">삭제</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {% include 'includes/footer.html' %}
      </div>
    </div>
  </body>
  
  <!-- 카카오맵 api 사용 -->
  <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2d9522bd15c02cead68a2ae145ec6028&libraries=services"></script>
  
  <!-- calendar 구현 위한 js 파일 따로 설정 -->
  <script src="/static/js/calendar.js"></script>
  
  
  </html>
  ```
  
  
  
- ### <Calendar 로직 process>

  **`(static/js/calendar.js)`**

  ```javascript
  function loadCalendar() {
      // html의 tag id를 가져와서 document 만들기
      var calendarEl = document.getElementById('calendar');
      // Calendar 객체 만들기
      var calendar = new FullCalendar.Calendar(calendarEl, {
          
          // 기본 환경설정
          locale: 'ko',
          editable: true,
          selectable: true,
          eventTextColor: 'white',
  		
          // fullcalendar 안에서 사용 할 plugin
          plugins: ['interaction', 'dayGrid', 'googleCalendar'],
  		
          // 구글캘린더 연동 위한 ApiKey
          googleCalendarApiKey: 'AIzaSyAbD4zXWKrX4Qx6lRAdGhbT6jTNMh8c5HA',
          
          // firstDay = 0 이면 일요일부터 시작, 1이면 월요일부터 시작
          firstDay: 0,
  
          // Calendar 화면 header 구성
          header: {
              left: 'prev, next ',
              center: 'title',
              right: 'today',
          },
  
  		// 일정 이벤트 설정 (기존 아이디로 저장돼 있는 일정 data 있다면 불러와서 envent 구성)
          events: function(info, successCallback, failureCallback) {
              
              // ajax get 방식으로 data 가져오기
              $.ajax({
                  url: '/calendars/load',
                  type: 'get',
                  dataType: 'json',
                  contentType: "application/json",
                  
                  // ajax 방식으로 data를 잘 가져 오면 함수 실행
                  // result = json 형식의 data
                  success: function (result) {
                      load_events = []
  					
                      // jQuery로 each method 실행
                      $.each(result, function (index, element) {
                          load_events.push({
                              title: element.title,
                              start: element.start,
                              end: element.end,
                              location: element.location,
                              address: element.address,
                              borderColor: element.color,
                              backgroundColor: element.color,
                              id: element.id
                          });
                      })
  					// return을 successCallback으로 구현
                      successCallback(load_events);
                  },
                  error: function (result, status, error) {
                      alert("error:" + error)
                  }
              });
          },
  
          // 구글 캘린더api로 공휴일 구현
          eventSources: [
              {
                  googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
                  className: '대한민국 휴일',
                  color: 'red',
                  allDay: false,
                  startEditable: false,
                  durationEditable: false
              },
          ],
  		
          // 일정 바 클릭 했을 때 실행 함수
          eventClick: function (event) {
  			
              // 구글 api 연동 일정 클릭 시, 구글 캘린더로 사이트 이동하기 때문에, 이벤트 실행 막기
              if (event.el.origin === "https://www.google.com") {
                  event.jsEvent.preventDefault();
              }
              
              // 그 외 일정에 적용
              else {
                  $('#fixEventId').val(event.event.id);
                  $('#fixEventName').val(event.event.title);
                  $('#fixStartDate').val(moment(event.event.start).format('YYYY-MM-DD'));
                  // substract ==> days 기준으로 1 감소 == 1일 감소
                  $('#fixEndDate').val(moment(event.event.end).subtract(1, 'days').format('YYYY-MM-DD'));
                  $('#fixEventLocation').val(event.event.extendedProps.location);
                  $('#fixDetailAddress').val(event.event.extendedProps.address);
                  $('#fix_color_select').val(event.event.backgroundColor)
                  
                  let fixDetailAddress = $('#fixDetailAddress').val()
  
                  if (!fixDetailAddress){
                      $('#fixDetailAddress').val('')
                  }
  
                  $('#fixModal').modal('show');
  
                  // 수정 버튼
                  // unbind를 해주는 이유는 event log 기록이 적재하는 data doubling 현상 발생
                  $('#fixSubmitSave').unbind()
                  $('#fixSubmitSave').on('click', function () {
                      let end_val = $('#fixEndDate').val()
                      let e_title = $('#fixEventName').val()
                      let e_start = $('#fixStartDate').val()
                      
                      // formatDate ==> date 형식으로 변경
                      let end_date = formatDate(end_val)
                      let e_end = end_date
                      
                      let e_location = $('#fixEventLocation').val()
                      let e_address = $('#fixDetailAddress').val()
                      let e_color = $('#fix_color_select').val()
                      let e_id = event.event.id
  					
                      // 일정명, 시작날짜, 끝날짜 값이 모두 있을 때만 data 수정 작업 진행
                      if (e_title && e_start && e_end ) {
                          $.ajax({
                          url: '/calendars/fix/',
                          type: 'GET',
                          dataType: 'json',
                          contentType: "application/json",
                          data: {
                              e_title: e_title,
                              e_start: e_start,
                              e_end: e_end,
                              e_location: e_location,
                              e_address: e_address,
                              e_id: e_id,
                              e_color: e_color
                          },
                          success: function (result, successCallback, failureCallback) {
  
                              alert('정상적으로 수정되었습니다.')
                              event.event.setProp('title', result.title);
                              event.event.setProp('backgroundColor', result.color);
                              event.event.setProp('borderColor', result.color);
                              event.event.setExtendedProp('location', result.location);
                              event.event.setExtendedProp('address', result.address);
                              event.event.setExtendedProp('description', result.description);
                              event.event.setDates(result.start, result.end, {allDay: true});
  
                          },
                          error: function(result,status,error) {
                            alert("error:"+error)
                          }
                        })
  
                      $('#fixModal').modal('hide');
                      }
                      else {
                          alert('일정내용과 날짜는 필수 입력값입니다.')
                      }
                  });
  
                  // 삭제
                  $('#fixSubmitDelete').unbind();
                  $('#fixSubmitDelete').on('click', function () {
  
                      if (confirm('정말로 일정을 삭제 하시겠습니까?')) {
                          let e_id = event.event.id
  
                          $.ajax({
                              url: '/calendars/delete/',
                              type: 'GET',
                              dataType: 'json',
                              contentType: "application/json",
                              data: {
                                  e_id: e_id
                              },
                              success: function (result, successCallback, failureCallback) {
                                  event.event.remove()
                                  alert('정상적으로 삭제 되었습니다.')
                              },
  
                              error: function (result, status, error) {
                                  alert("error:" + error)
                              }
                          })
  
                          $('#fixModal').modal('hide');
                          }
                      });
  
                  }
          },
  
          // 비어있는 날짜칸 선택하거나 드래그 할 경우 event 발생
          select: function (info) {
  
              if (confirm('새로운 일정을 추가하시겠습니까?')) {
  
                  let start_date = moment(info.start).format('YYYY-MM-DD')
                  let end_date = moment(info.end).subtract(1, 'days').format('YYYY-MM-DD')
                  $('#eventStartDate').val(start_date)
                  $('#eventEndDate').val(end_date)
                  $('#fullCalModal').modal('show');
  
                  $('#submitSave').unbind()
                  $('#submitSave').on('click', function () {
                      alert('일정을 저장하시겠습니다.')
  
                      let e_title = $('#eventName').val()
                      let e_start = $('#eventStartDate').val()
                      
                      let e_end_date = $('#eventEndDate').val()
                      let e_end = formatDate(e_end_date)
  
                      let e_location = $('#eventLocation').val()
                      let e_address = $('#detailAddress').val()
                      let e_color = $('#color_select').val()
  
                      if (e_title && e_start && e_end_date ) {
                          $.ajax({
                          url: '/calendars/save/',
                          type: 'GET',
                          dataType: 'json',
                          contentType: "application/json",
                          data: {
                              e_title: e_title,
                              e_start: e_start,
                              e_end: e_end,
                              e_location: e_location,
                              e_address: e_address,
                              e_color: e_color
                          },
                          success: function (result, successCallback, failureCallback) {
  
                              calendar.addEvent({
                                  title: result.title,
                                  start: result.start,
                                  end: result.end,
                                  location: result.location,
                                  address: result.address,
                                  borderColor: result.color,
                                  backgroundColor: result.color,
                                  id: result.id
                              });
                          },
                          error: function(result,status,error) {
                            alert("code:"+result.status+"\n"+"message:"+result.responseText+"\n"+"error:"+error)
                          }
                        })
                          $('#fullCalModal').modal('hide');
  						
                          // 값을 지우지 않으면, 새로운 일정 선택할 경우 기존 data 그대로 남아있음
                          $('#eventName').val('')
                          $('#eventStartDate').val('')
                          $('#eventLocation').val('')
                          $('#eventEndDate').val('')
                          $('#detailAddress').val('')
                          $('#color_select').val('')
                      }
                      else {
                          alert('일정내용과 날짜는 필수 입력값입니다.')
                      }
  
                      });
  				
                  // 일정 추가 시 내용을 입력하고 확인을 누를 경우 적었던 값이 지워지도록 설정
                  $('#eventDefault').unbind();
                  $('#eventDefault').on('click', function () {
                      $('#eventName').val('')
                      $('#eventStartDate').val('')
                      $('#eventLocation').val('')
                      $('#eventEndDate').val('')
                      $('#detailAddress').val('')
                      $('#color_select').val('')
                  })
              }
          },
  
          // 일정 리사이즈 시 날짜 수정
          eventResize: function (info) {
  
              if(confirm('일정 날짜를 수정하시겠습니까?')){
                  let e_end = moment(info.event.end).format('YYYY-MM-DD')
                  $.ajax({
                          url: '/calendars/resize/',
                          type: 'GET',
                          dataType: 'json',
                          contentType: "application/json",
                          data: {
                              e_end: e_end,
                              e_id: info.event.id
                          },
                          success: function (result, successCallback, failureCallback) {
                              
                              alert('정상적으로 날짜가 수정되었습니다.')
  
                          },
                          error: function(result,status,error) {
                            alert("code:"+result.status+"\n"+"message:"+result.responseText+"\n"+"error:"+error)            
                          }
                        })
              }
          },
  
          // 일정 드래그앤드롭 시 데이터 수정
          eventDrop: function(info){
              
              if(confirm('일정 날짜를 수정하시겠습니까?')){
                  let e_start = moment(info.event.start).format('YYYY-MM-DD')
                  let e_end = moment(info.event.end).format('YYYY-MM-DD')
  
                  $.ajax({
                          url: '/calendars/drop/',
                          type: 'GET',
                          dataType: 'json',
                          contentType: "application/json",
                          data: {
                              e_start: e_start,
                              e_end: e_end,
                              e_id: info.event.id
                          },
                          success: function (result, successCallback, failureCallback) {
                            
                              alert('정상적으로 날짜가 수정되었습니다.')
  
                          },
                          error: function(result,status,error) {
                            alert("code:"+result.status+"\n"+"message:"+result.responseText+"\n"+"error:"+error)
                          }
                        })
              }
          }
  
      });
      	// 위 calendar 객체 render == 화면 출력
          calendar.render();
  };
  
  // Date날짜 YYYY-MM-DD 형식으로 변환 함수
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
  
  
  
  // 여기서부터 캘린더 & 지도 실행
  if (document.readyState !== 'complete') {
  
      document.addEventListener('DOMContentLoaded', loadCalendar);
  
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div
          mapOption = {
              center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
              level: 3 // 지도의 확대 레벨
          };
  
      // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
      var map = new kakao.maps.Map(mapContainer, mapOption);
  	
      // fixModal 창이 다 띄어진 후 실행 함수
      $('#fixModal').on('shown.bs.modal', function (e) {
  
          // 주소-좌표 변환 객체를 생성합니다
          var geocoder = new kakao.maps.services.Geocoder();
  		
          // 도로명 주소
          let address = $('#fixDetailAddress').val()
  		
          // 도로명 주소로 지도 검색
          geocoder.addressSearch(address, function (result, status) {
              
              // 정상적으로 검색이 완료됐으면
              if (status === kakao.maps.services.Status.OK) {
  
                  var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
  
                  // 결과값으로 받은 위치를 마커로 표시합니다
                  var marker = new kakao.maps.Marker({
                      map: map,
                      position: coords
                  });
  
                  // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                  map.setCenter(coords);
                  map.relayout(); // ==> 지도 center값 위치 이동하면 relayout으로 지도 화면 재정렬 필요
  
                  var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
                  var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
                  var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
  
                  var position = new kakao.maps.LatLng(result[0].y, result[0].x);
  
                  // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
                  roadviewClient.getNearestPanoId(position, 50, function (panoId) {
                      roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
                  });
              }
              else {
                  // 장소 저장이 안 돼 있는 일정에서는 지도와 로드뷰 tag 제거
                  $('#map_view').remove()
                  $('#kakao_map').remove()
              }
          });
      });
      $('#fixModal').on('shown.bs.modal', function (e) {
          map.relayout()
    });
      
      // 장소가 없는 경우 지도와 로드뷰 tap이 제거되는데, rerender 하지 않으면, 
      // 장소와 도로명 주소가 있는 경우에 지도와 로드뷰를 불러 올 수 있어도 tag가 제거된 게 유지 되어서 modal 창 닫을 때마다 rerender
      $('#fixModal').on('hidden.bs.modal', function (e) {
          location.href = "http://127.0.0.1:8000/calendars"
      })
  }
  else {
      loadCalendar();
  }
  
  ```



- ### URL Conf

  `(Web_avangs/urls.py)`

  ```python
  from django.contrib import admin
  from django.urls import path, include
  from . import views
  
  
  urlpatterns = [
      path('', views.home, name='home'), # ==> 기본 url 주소일 경우 'Web_avangs/view.py' ==> home 메서드 사용
      path('admin/', admin.site.urls),   # ==> 관리자 페이지 설정
      path('users/', include('users.urls')), # ==> users application url conf 따로 관리
      path('bookmarks/', include('bookmarks.urls')),
      path('calendars/', include('calendars.urls')), # ==> calendar application url conf 따로 관리 ('calendars/urls.py' 에서!)
      path('maps/', include('maps.urls')),
      path('main/', views.main, name='main'),
  ]
  ```


  `(calendars/urls.py)`

  ```python
  from django.urls import path
  from . import views
  
  app_name = 'calendars'  # calendar application의 url 관리를 대표하는 이름!
  
  urlpatterns = [
      path('', views.calendar, name='calendar'), # ==>'' == 'http://localhost:8000/calendars' url을 의미함.
      path('save/', views.save, name='save'), 
      # ==> 'http://localhost:8000/calendars/save/' ==> url 호출할 때, views.py에서 save 함수 실행
      
      path('load/', views.load, name='load'),
      path('fix/', views.fix, name='fix'),
      path('delete/', views.delete, name='delete'),
      path('map/', views.map, name='map'),
      path('resize/', views.resize, name='resize'),
      path('drop/', views.drop, name='drop'),
      path('fix_map/', views.fix_map, name='fix_map')
  ]
  ```

  `(calendars/views.py)`

  ```python
  from django.shortcuts import render
  from django.http import HttpResponse
  from calendars.models import Calendar
  import json
  
  
  # Calendar 메인화면 출력
  def calendar(request):
      return render(request, 'calendars/ui-calendars.html', {'page_title': 'CALENDAR'})
  
  
  # Calendar 일정 이벤트 저장
  def save(request):
  	
      # save 함수는 ajax 객체를 request로 받는다.
      
      event_title = request.GET['e_title']  # ajax를 GET방식으로 사용해서 GET을 사용!
      event_start = request.GET['e_start']
      event_end = request.GET['e_end']
      event_location = request.GET['e_location']
      event_address = request.GET['e_address']
      event_color = request.GET['e_color']
      u_id = request.session['loginObj']['u_name']
  	
      # Database에 새로운 데이터 생성
      Calendar.objects.create(username=u_id,
                              title=event_title,
                              start=event_start,
                              end=event_end,
                              location=event_location,
                              address=event_address,
                              color=event_color
                              )
  	
      # 가장 최근 data란 위에서 저장한 data를 의미함
      recent_data = Calendar.objects.filter(username=u_id).order_by('-id')
  	
      # 이 context는 js에서 ajax방식으로 요청한 결과를 보내주는 내용!
      context = {'username': u_id,
                 'title': event_title,
                 'start': event_start,
                 'end': event_end,
                 'location': event_location,
                 'address': event_address,
                 'color': event_color,
                 'id': recent_data[0].id
                 }
  
      return HttpResponse(json.dumps(context), content_type='application/json')
  
  
  # Calendar 일정 이벤트 로드
  def load(request):
      u_id = request.session['loginObj']['u_name']
      calendar_list = Calendar.objects.filter(username=u_id)
  
      context = []
      for i in calendar_list:
          list = {'id': i.id,
                  'title': i.title,
                  'start': i.start,
                  'end': i.end,
                  'location': i.location,
                  'address': i.address,
                  'color': i.color
                  }
          context.append(list)
  
      return HttpResponse(json.dumps(context), content_type='application/json')
  
  
  # Calendar 일정 이벤트 수정
  def fix(request):
      u_id = request.session['loginObj']['u_name']
      event_title = request.GET['e_title']
      event_start = request.GET['e_start']
      event_end = request.GET['e_end']
      event_location = request.GET['e_location']
      event_address = request.GET['e_address']
      event_color = request.GET['e_color']
      event_id = request.GET['e_id']
  
      event = Calendar.objects.get(id=event_id)
  
      event.title = event_title
      event.start = event_start
      event.end = event_end
      event.location = event_location
      event.address = event_address
      event.color = event_color
  
      event.save()
  
      context = {'username': u_id,
                 'title': event_title,
                 'start': event_start,
                 'end': event_end,
                 'location': event_location,
                 'address': event_address,
                 'color': event_color
                 }
  
      return HttpResponse(json.dumps(context), content_type='application/json')
  
  
  # Calendar 일정 이벤트 삭제
  def delete(request):
      u_id = request.session['loginObj']['u_name']
  
      event_id = request.GET['e_id']
  
      Calendar.objects.get(id=event_id).delete()
  
      context = {'username': u_id,
                 }
  
      return HttpResponse(json.dumps(context), content_type='application/json')
  
  
  # 지도화면 이동 로직
  def map(request):
      location = request.POST['eventLocation']
      schedule = request.POST['eventName']
      start = request.POST['eventStartDate']
      end = request.POST['eventEndDate']
  
      context = {
          'location': location,
          'schedule': schedule,
          'start': start,
          'end': end
      }
      return  render(request, 'maps/ui-maps.html', context)
  
  
  # Calendar 일정 바(bar) 사이즈 조절 시, 데이터베이스 날짜 수정
  def resize(request):
      event_end = request.GET['e_end']
      event_id = request.GET['e_id']
  
      event = Calendar.objects.get(id=event_id)
      event.end = event_end
  
      event.save()
  
      context = {
                 'end': event_end
                 }
  
      return HttpResponse(json.dumps(context), content_type='application/json')
  
  
  # Calendar 일정 바(bar) 이동 시, 데이터베이스 날짜 수정
  def drop(request):
      event_start = request.GET['e_start']
      event_end = request.GET['e_end']
      event_id = request.GET['e_id']
  
      event = Calendar.objects.get(id=event_id)
      event.start = event_start
      event.end = event_end
  
      event.save()
  
      context = {
          'start': event_start,
          'end': event_end
      }
      return HttpResponse(json.dumps(context), content_type='application/json')
  
  
  # Calendar 일정 상세 내용에서 장소 검색 수정
  def fix_map(request):
      location = request.POST['fixEventLocation']
      schedule = request.POST['fixEventName']
      start = request.POST['fixStartDate']
      end = request.POST['fixEndDate']
      eventId = request.POST['fixEventId']
  
      context = {
          'location': location,
          'schedule': schedule,
          'start': start,
          'end': end,
          'id': eventId
      }
      return  render(request, 'maps/ui-maps.html', context)
  ```

  



---



- ### <Django 환경 설정>

  `(Web_avangs/settings.py)`

  ```python
  # 수정한 부분만 표기합니다.
  
  ALLOWED_HOSTS = ['localhost', '127.0.0.1']
  
  # 사용할 어플리케이션 추가
  INSTALLED_APPS = [
      'django.contrib.admin',
      'django.contrib.auth',
      'django.contrib.contenttypes',
      'django.contrib.sessions',
      'django.contrib.messages',
      'django.contrib.staticfiles',
      'users.apps.UsersConfig',
      'maps.apps.MapsConfig',
      'calendars.apps.CalendarsConfig',
      'bookmarks.apps.BookmarksConfig',
      'bootstrap4'
  ]
  
  # 현재 프로젝트의 root url 설정
  ROOT_URLCONF = 'Web_avangs.urls'
  
  # 현재 프로젝트의 탬플릿 설정을 통해, 전체 html 적용 설정
  TEMPLATES = [
      {
          'BACKEND': 'django.template.backends.django.DjangoTemplates',
          'DIRS': [os.path.join(BASE_DIR, 'templates')],
          'APP_DIRS': True,
          'OPTIONS': {
              'context_processors': [
                  'django.template.context_processors.debug',
                  'django.template.context_processors.request',
                  'django.contrib.auth.context_processors.auth',
                  'django.contrib.messages.context_processors.messages',
              ],
          },
      },
  ]
  
  # Django가 제공해주는 sqlite3 database 사용
  DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.sqlite3',
          'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
      }
  }
  
  # 한국 시간대로 변동
  TIME_ZONE = 'Asia/Seoul'
  
  
  # static 폴더 지정
  STATIC_URL = '/static/'
  STATICFILES_DIRS = [
      os.path.join(BASE_DIR, 'static')
  ]
  ```



- ### <calendar application model 설정> - data 구성

  `(calendars/models.py)`

  ```python
  from django.db import models
  
  
  class Calendar(models.Model):
      username = models.CharField(max_length=200)
      title = models.CharField(max_length=200)
      start = models.CharField(max_length=50)
      end = models.CharField(max_length=50)
      location = models.CharField(max_length=200)
      address = models.CharField(max_length=200)
      color = models.CharField(max_length=50)
  
      def __str__(self):
          return self.title
  ```

  

- ### <admin 등록 & sqlite3 db 파일 생성>

  `(calendars/admin.py)`

  ```python
  from django.contrib import admin
  from calendars.models import Calendar
  
  admin.site.register(Calendar)
  ```

 

`(Terminal)`

  ```Treminal
  # db 변동 내역 저장
  (base) C:\Users\USER\Desktop\github\Project_1\Map_Calendar> python manage.py makemigrations
  
  # db 구성
  (base) C:\Users\USER\Desktop\github\Project_1\Map_Calendar> python manage.py migrate
  ```
