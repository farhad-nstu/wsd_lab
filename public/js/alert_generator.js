let i = 0;
//bootstrap customized toaster generator default for message
function generate_alert(alert_type, alert_message) {
    if (screen.width > 300 && screen.width <= 900) {
        $('#message_container').css({
            "position": "fixed",
            "bottom": 0,
            "color": "white",
            "width": "350px",
            "z-index": 1,
        });
    } else {
        $('#message_container').css({
            "position": "fixed",
            "top": 75,
            "right": 10,
            "color": "white",
            "width": "350px",
            "z-index": 1
        });
    }

    i += 1;
    let toast_alert_message = `
        <div class="toast bg-${alert_type} tt-${i}" role="alert" data-autohide="false" aria-live="assertive" aria-atomic="true">
            <div class="toast-body">
                ${alert_message}
                <button type="button" class="ml-2 mb-1 close" onclick="closeTaostMessage(${i})" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    `;
    $("#message_container").prepend(toast_alert_message).find('.toast').children(':first').hide().slideDown(100);
    // $("#message_container").prepend(toast_alert_message).find('.toast').children(':first').hide().fadeIn(400);
    $('.toast').toast('show');
    $('.toast').slice(5).fadeOut(300);
}

function closeTaostMessage(id) {
    $(`.tt-${id}`).hide("fast");
}

function empty_alert_container() {
    $('#message_container').empty();
}