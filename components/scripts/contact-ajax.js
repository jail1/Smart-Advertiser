/**
 * Ajax Contact Form
 * http://smart-advertiser.com
 *
 * Copyright 2015, Ionut Cristian
 *
 */

$(document).ready(function() {

    $("#submit").click(function() { 

        var proceed = true,
            email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            output = '';

        $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function(){
            $(this).css('border-color',''); 
            if(!$.trim($(this).val())){
                $(this).css('border-color','red');
                proceed = false;
            }
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); 
                proceed = false;            
            }   
        });

        if(proceed) {
            post_data = {
                'user_name'     : $('input[name=name]').val(), 
                'user_email'    : $('input[name=email]').val(), 
                'phone'         : $('input[name=phone]').val(), 
                'msg'           : $('textarea[name=comments]').val()
            };

            $.post('http://www.smart-advertiser.com/ionut/contact_me.php', post_data, function(response){  

                if(response.type == 'error'){    
                    output = '<div class="error">' + response.text + '</div>';
                } else {
                    output = '<div class="success">' + response.text + '</div>';
                    $("#contact_form  input[required=true], #contact_form textarea[required=true]").val(''); 
                    $("#contact_form").css({'display' : 'none'}); 
                }

                $("#result").show().html(output);
            }, 'json');
        }

    });
    
    $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() { 
        $(this).css('border-color',''); 
        $("#result").hide();
    });

});