(function ($) {
 
    $.fn.customRadio = function() {
        return this.each(function(){
        	var $radio = $(this),
                $toggle = $radio.find('.toggle');

            if($radio.attr('data-value') && $radio.attr('data-group')){
                $radio.prepend('<input type="radio" class="value" value="' + $radio.attr('data-value') + '" name="' + $radio.attr('data-group') + '">');
            }
            else{
                $radio.prepend('<input type="radio" class="value">');
            }
             

        	if($radio.attr('data-checked')){
        			
        	}
            else{

            }
        	
        	/*  ------------ Events ------------- */

        	/* Click en el botón de seleccionar radio*/
        	$radio.on('click',function(e){
        	   selectOption($radio);
            });
        });




        /* Seleccionar opción */
        function selectOption($radio){
            $('[data-group="' + $radio.attr("data-group") + '"]').removeClass('checked');
            $radio.addClass('checked');
            $radio.find('.value').prop('checked',true);
        }

    };
 
}( jQuery ));