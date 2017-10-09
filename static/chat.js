/**
 * Created by Administrator on 2017/10/8.
 */
$(function(){
    if(!window.MozWebSocket && !window.WebSocket){
        alert('你的浏览器不支持websocket')
    }

    socket = new WebSocket('ws://127.0.0.1:8000/websocket');
    socket.onmessage = function(event){
        $('#lines').val($('#lines').val()+'\n'+event.data)
    };
    socket.onopen = function(event){
        $('#lines').val('你已进入聊天室。。。')
    };
    socket.onclose = function(event){
        $('#lines').val('聊天室已关闭。。。')
    };
    $('input[name="send"]').on('keydown',function(e){
        if(e.keyCode==13){
            if(socket.readyState == WebSocket.OPEN){
                socket.send($('#name').val()+':'+$(this).val());
            }
        }
    })
})