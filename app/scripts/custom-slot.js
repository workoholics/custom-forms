(function ($) {
 
    $.fn.customSlot = function() {
        return this.each(function(){
        	var $slot = $(this),
                $ctrlAdd = $slot.find('.ctrl.add'),
                $ctrlSubs = $slot.find('.ctrl.subs'),
                $vFrame = $slot.find('.visible-frame'),
                $slotUl = $vFrame.find('ul');
                $inputValue = $('<input class="value" type="text"/>');

            $slot.selectedNumber = 0;
            $slot.selectedIndex = 0;
            $slot.min = 0;
            $slot.max = 10;

            if(initSlot()){
                addListener();
                subsListener();
            }
            
        	/*  ------------ Event listeners ------------- */
            function addListener(){
                $ctrlAdd.on('click',function(){
                    if($slot.selectedNumber < $slot.max){
                        $slot.selectedNumber++;
                        $slot.selectedIndex++;
                        setSlotPosition();
                    }
                });
            }

            function subsListener(){
                $ctrlSubs.on('click',function(){
                    if($slot.selectedNumber > $slot.min){
                        $slot.selectedNumber--;
                        $slot.selectedIndex--;
                        setSlotPosition();
                    }
                });
            }

            /* Set slot position */
            function setSlotPosition(){
                $inputValue.val($slot.selectedNumber);
                $slotUl.css({left:-($slot.selectedIndex * $vFrame.width())});
            }


            /* Inicializar ruleta*/
            function initSlot(){
                /* Set min and max values */
                if(typeof $slot.attr('data-min') !== 'undefined' && typeof $slot.attr('data-max') !== 'undefined'){
                    if((parseInt($slot.attr('data-min')) || parseInt($slot.attr('data-min')) === 0) && (parseInt($slot.attr('data-max')) || parseInt($slot.attr('data-max')) === 0)){
                        $slot.min = parseInt($slot.attr('data-min'));
                        $slot.max = parseInt($slot.attr('data-max'));

                    }
                    else{
                        console.log('Los data attributes no son correctos');
                        return false;
                    }
                }
                
                var index = 0;
                for(var i = $slot.min; i <= $slot.max ; i++){
                    $slotUl.append('<li data-index="' + index + '">' + i + '</li>');
                    index++;
                }

                /* Establecer el nombre real del input*/
                if(typeof $slot.attr('data-name') !== 'undefined'){
                    $inputValue.attr('name',$slot.attr('data-name'));
                }

                /* Establecer valor por defecto de la ruleta*/
                if(typeof $slot.attr('data-value') !== 'undefined'){
                    var value = $slot.attr('data-value');
                    if(parseInt(value) >= $slot.min && parseInt(value) <= $slot.max){
                        $inputValue.attr('value',value);
                        $slot.selectedNumber = parseInt(value);
                        if($slot.min < 0){
                            $slot.selectedIndex = Math.abs($slot.min) + $slot.selectedNumber;
                        }
                        else{
                            $slot.selectedIndex = $slot.selectedNumber - $slot.min;
                        }
                        
                    }
                    else{
                        console.log('Valor del data-value incorrecto');
                        return false;
                    }
                }
                else{
                    selectedNumber = $slot.min;
                    selectedIndex = 0;
                }
                setSlotPosition();
                $inputValue.prependTo($slot);
                return true;
            }

        });
    };


}( jQuery ));