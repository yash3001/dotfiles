#!/bin/bash

# To kill the script if it was already running
#script_name=${BASH_SOURCE[0]}
#for pid in $(pidof -x $script_name); do
#    if [ $pid != $$ ]; then
#        kill -9 $pid
#    fi
#done

# Main script
#NUM=1
#
#while [ 1 ]
#do
#    TEST=$(acpi | grep "Charging")
#    if [[ (${TEST} == "")  ]]
#    then
#        BATTERY=$(acpi | grep ..% -o)
#        if [[ (${BATTERY} == '39%' || ${BATTERY} == '40%' || ${BATTERY} == '41%') ]] 
#        then
#            if [[ ${NUM} == 1 ]]
#            then
#                twmnc -t "Warning" -c "Low battery, please connect the charger"
#            fi
#            NUM=0
#        else
#            NUM=1
#        fi
#    fi
#    sleep 60
#done

#Modified file for crontab

TEST=$(acpi | grep "Charging")
if [[ (${TEST} == "")  ]]
then
    BATTERY=$(acpi | grep ..% -o)
    if [[ (${BATTERY} == '44%' || ${BATTERY} == '45%' || ${BATTERY} == '46%') ]] 
    then
        /usr/local/bin/twmnc -t "Warning" -c "Low battery, please connect the charger" -d 10000 --pos tl --bg "#00ccff" --fg "#000000" --fn "mononoki"
    fi
fi
