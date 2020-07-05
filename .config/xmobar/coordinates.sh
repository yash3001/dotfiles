#!/bin/bash

xdotool getmouselocation | grep "x:[0-9]* y:[0-9]*" -o
