var likeclicked = false;
var sinclicked = false;
var sincom = false;
$( document ).ready(() => {
    $("#like-btn").on("click", () => {
        if(likeclicked) return;
        $.ajax({
          type: "POST",
          url: '/likeplus',
          dataType: "json",
          data: {},
          async: false, //동기처리 (기본이 true)
          success: function (result) {
            console.log(result);
            $("#like-cnt").text(result["like"]);
          },
          error: function (xhr, ajaxOptions, thrownError) {
            console.log("error");
          },
          beforeSend: function( xhr ) {
            likeclicked = true;
          },
          complete: function () {
            likeclicked = false;
          },
        });
    });

    $("#sin-btn").on("click", () => {
        if(sinclicked) return;
        if(sincom) {
            alert("이미 참석 여부를 등록하셨습니다.\n참석해주셔서 감사합니다.")
            return;
        }
        var data1 = $("#data1").val();
        var data2 = $("#data2").val();
        var data3 = $("#data3").val();

        if(data1.length < 1) {
            alert("방문자명을 입력해주세요.");
            return;
        } else if(data2 < 1) {
            alert("최소 방문 인원은 1명입니다.");
            return;
        } else if(data3.length != 11) {
            alert("전화번호를 다시 입력해주세요.");
            return;
        }

        $.ajax({
            type: "POST",
            url: '/sin',
            dataType: "json",
            data: {
                "data1" : data1,
                "data2" : data2,
                "data3" : data3
            },
            async: false, //동기처리 (기본이 true)
            success: function (result) {
                alert("등록 완료되었습니다.\n참석해주셔서 감사합니다. 💕");
                $("#data1").val("");
                $("#data2").val("");
                $("#data3").val("");
                sincom = true;
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("error");
            },
            beforeSend: function( xhr ) {
                sinclicked = true;
            },
            complete: function () {
                sinclicked = false;
            },
          });
    });
});