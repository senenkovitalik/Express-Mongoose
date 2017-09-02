$(document).ready(function() {
  $("#submit").on('click', function() {
    const name = $("#name").val();
    const age = $("#age").val();
    const email = $("#email").val();
    let action = 'read';
    $("input[type=radio]").each(function(i, e) {
      if (e.checked) action = e.value;
    });

    switch (action) {
    case "create":
      sendAJAX("POST", `/users/${name}/${age}/${email}`);
      break;
    case "read":
      console.log(name.length);
      if (name.length === 0) {
        window.location.href = "/users";
      } else {
        sendAJAX("GET", `/users/${name}`);
      }
      break;
    case "update":
      sendAJAX("PUT", `/users/${name}/${age}/${email}`);
      break;
    case "delete":
      sendAJAX("DELETE", `/users/${name}/${age}/${email}`);
      break;
    }
  });

  function sendAJAX(method, url) {
    $.ajax({
      method: method,
      url: url
    })
    .done(function(res) {
      $('#response').empty().text(JSON.stringify(res));
    });
  }
});