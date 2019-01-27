$(function () {
    // animazione input box email
    $(".huge_input").focus(function () {
        console.log("got focus");
        if ($(".huge_input").val().length == 0) {
            console.log("0 length");
            $(".huge_input_placeholder").css("animation-name", "input_box_form_anim");
            $(".input_wrapper").css("border", "1px solid #333333");
        }
    });
    $(".huge_input").focusout(function () {
        if ($(".huge_input").val().length > 0) {
            //validare valore
            if (!isValidValue($(".huge_input").val())) {
                //valore non valido
                $(".input_wrapper").css("border", "1px solid #FA7751");
                $(".huge_input_placeholder").css("animation-name", "none");
                $(".huge_input_placeholder").addClass("input_wrapper_bad");
                $(".huge_input_error_arrow").show();
                $(".huge_input_error_description").show();
            } else {
                //valore valido, rimuovo eventuali errori segnalati in precedenza
                removeValueError();
                $(".input_wrapper").css("border", "1px solid #333333");
                $(".huge_input_placeholder").css("animation-name", "none");
                $(".huge_input_placeholder").addClass("input_wrapper_good");
            }
        } else {
            removeValueError();
            $(".huge_input_placeholder").css("animation-name", "input_box_form_anim_revert");
            $(".input_wrapper").css("border", "1px solid #dcdcdc");
        }
    });
});

function removeValueError() {
    $(".huge_input_placeholder").removeClass("input_wrapper_bad");
    $(".huge_input_error_arrow").hide();
    $(".huge_input_error_description").hide();
}

function isValidValue(value) {
    return !(isNaN(value) || value > 360 || value < 0);
}