(function ($) {

 
    $.fn.customSelect = function() {
        return this.each(function(){
            var $select = $(this),
                $toggle = $select.find('.cfs-toggle'),
                $options = $select.find('.cfs-options > ul > li');

            if($select.find('input.value').length === 0){
                if($select.attr('data-name')){
                    $select.prepend('<input type="text" class="value" name="' + $select.attr('data-name') + '">');
                }
                else{
                    $select.prepend('<input type="text" class="value">');
                }
            }
             

            if($select.attr('data-selected') && $($options[$select.attr('data-selected') - 1]).length > 0){
                var $selectedItem = $($options[$select.attr('data-selected') - 1]);
                if($selectedItem.attr('data-value') && $selectedItem.attr('data-value') !== ''){
                    selectOption($select,$selectedItem.attr('data-value'),$selectedItem.html());
                }
                else{
                    setPlaceholder($select);
                }   
            }
            else{
                setPlaceholder($select);
            }
            

            /*  ------------ Events ------------- */

            /* Click en el botón de abrir select*/
            $toggle.on('click',function(e){
                addClickAnimation(e);
                toggleSelect($select);
            });

            $options.on('click',function(){
                if($(this).attr('data-value') && $(this).attr('data-value') !== ''){
                    selectOption($select,$(this).attr('data-value'),$(this).html());
                }
                else{
                    setPlaceholder($select);
                }
                $select.trigger('option.change');
                closeSelect($select);
            });


            /* Click en cualquier punto del documento para comprobar si tiene que cerrar los selects o no*/
            $(document).on('click',function(ev){
                if(!hasSelectParent($(ev.target))){
                    closeAllSelects();
                }
            });
        });

        function setPlaceholder($select){
            if($select.attr('data-placeholder') && $select.attr('data-placeholder') !== ''){
                $select.find('.selected').html($select.attr('data-placeholder'));
                $select.find('.value').val('');
            }
            else{
                $select.find('.selected').html('Choose an option');
                $select.find('.value').val('');
            }
            $select.find('.selected').addClass('placeholder');
        }


        /* Seleccionar opción */
        function selectOption($select,value,text){
            /* Selección visual*/
            $select.find('.selected').html(text);
            /* Selección lógica*/
            $select.find('.value').val(value);
            $select.find('.selected').removeClass('placeholder');
        }

        /* Abrir/Cerrar select */
        function toggleSelect($node){
            var $options = $node.find('.cfs-options');
            if(!$node.hasClass('open')){
                $options.css({'height': $options.find('ul').height() });
                $node.addClass('open'); 
            }
            else{
                $options.css({'height': 0 });
                $node.removeClass('open');  
            }
        }

        /* Cerrar todos los selects del DOM*/
        function closeAllSelects(){
            $('.cf-select').find('.cfs-options').css({'height': 0 });
            $('.cf-select').removeClass('open');    
        }

        /* Cerrar select concreto*/
        function closeSelect($node){
            $node.find('.cfs-options').css({'height': 0 });
            $('.cf-select').removeClass('open');
        }

        /* Comprobar si un nodo tiene un select por encima*/
        function hasSelectParent($node){
            if($node.closest('.cf-select').length > 0){
                return true;
            }
            return false;
        }

        function addClickAnimation(e){
            $target = $(e.currentTarget);
            var $animSpan = $('<span class="wave"><span>');
            $animSpan.appendTo($target);
            $animSpan.css({
                left : e.pageX - $target.offset().left - ($animSpan.width() / 2),
                top : e.pageY - $target.offset().top - ($animSpan.height() / 2)});
            setTimeout(function(){
                $animSpan.remove();
            },100);
        }
    };
 
}( jQuery ));