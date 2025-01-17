$(function() {

  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendUserToSearchList(user) {
    var html = 
      `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${ user.name }</p>
          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name=${ user.name }>追加</a>
      </div>`
　　 search_list.append(html);
　　 return html;
   }

  function appendUserToMemberList(name, user_id) {
    var html = 
      `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
        <input name='group[user_ids][]' type='hidden' value=${ user_id }>
        <p class='chat-group-user__name'>${ name }</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
　　 member_list.append(html);
  }

  function appendNoUserToSearchList(user) {
    var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${ user }</p>
      </div>`
    search_list.append(html);
  }

  $(function(){
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      if(input!==""){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(user) {
        $("#user-search-result").empty();
          if (user.length !== 0) {
            user.forEach(function(user){
            appendUserToSearchList(user);
            });
          }
          else {
            appendNoUserToSearchList("一致するユーザーはいません");
          }
        })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
     }
    });

    $(function(){
      $(document).on('click', '.user-search-add', function() {
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        appendUserToMemberList(name, user_id);
        $(this).parent().remove();
      });

　    $(document).on("click", '.user-search-remove', function() {
        $(this).parent().remove();
      });
    });
  });
});