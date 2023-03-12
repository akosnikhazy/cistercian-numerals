"use strict"
function drawCistercianNumber(num,canvasId){
    
    let c = document.getElementById(canvasId);
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();

    // the Cistercian system only capable of 1-9999, but I added 0 and negative numbers to -9999 because why not?
    // want it here to clear the canvas on error too.
    if(num > 9999 || num < -9999 || num == '' || num == undefined || num == null ) return false;
    
    ctx.lineWidth = 1.5;

    // the middle line is always present, might as well draw the line here
    ctx.moveTo(50, 10);
    ctx.lineTo(50, 90);
    

    /* 
    * all the steps for all the lines
    * the first level array represents the local value [0] being ones and [3] being thousands
    * the second level array represents the value of that local value, for example [1][2] is 300
    * the third level array represents coordinates on the canvas. [0] is always a moveTo value the 1-3 are lineTo values
    * so the number[1][2][1] says "we are drawing the local value 300 now, after we moved to 50,10 we draw a line to 30,30"
    */
    let numbers  = 
    [
        [ /* ones */
                    [[50,10],[70,10]],
                    [[50,30],[70,30]],
                    [[50,10],[70,30]],
                    [[50,30],[70,10]],
                    [[50,10],[70,10],[50,30]],
                    [[70,10],[70,30]],
                    [[50,10],[70,10],[70,30]],
                    [[50,30],[70,30],[70,10]],
                    [[50,10],[70,10],[70,30],[50,30]]
                    
        ],[ /* tens */
                    [[50,10],[30,10]],
                    [[50,30],[30,30]],
                    [[50,10],[30,30]],
                    [[50,30],[30,10]],
                    [[50,10],[30,10],[50,30]],
                    [[30,10],[30,30]],
                    [[50,10],[30,10],[30,30]],
                    [[50,30],[30,30],[30,10]],
                    [[50,10],[30,10],[30,30],[50,30]]
                    
        ],[ /* hundreds  */
                    [[50,90],[70,90]],
                    [[50,70],[70,70]],
                    [[50,90],[70,70]],
                    [[50,70],[70,90]],
                    [[50,90],[70,90],[50,70]],
                    [[70,90],[70,70]],
                    [[50,90],[70,90],[70,70]],
                    [[50,70],[70,70],[70,90]],
                    [[50,90],[70,90],[70,70],[50,70]]

        ],[ /* thousands */
                    [[50,90],[30,90]],
                    [[50,70],[30,70]],
                    [[50,90],[30,70]],
                    [[50,70],[30,90]],
                    [[50,90],[30,90],[50,70]],
                    [[30,90],[30,70]],
                    [[50,90],[30,90],[30,70]],
                    [[50,70],[30,70],[30,90]],
                    [[50,90],[30,90],[30,70],[50,70]]
        ]   
    ];

    let stringNum = num.toString();
    let digit = 0;

    if(num<0)
    { // if the number is negative we get rid of the "-"
        stringNum = stringNum.substring(1);
        
        // also draw the marking of being negative
        ctx.moveTo(30,50);
        ctx.lineTo(70,50);
    } 

    stringNum = stringNum.padStart(4,"0");

    // this is where the magic happens
    // just looping the input char by char and spreading the coordinates in moveTo and lineTo
    for(let i = 3; i >= 0; i--)
    {
        digit = parseInt(stringNum.charAt(3-i));

        if(digit === 0) continue; // they didn't mark zero
        
        ctx.moveTo(...numbers[i][digit-1][0]);

        for(let j=1; j < numbers[i][digit-1].length; j++)
        {
            ctx.lineTo(...numbers[i][digit-1][j]);
        }
        
    }
    
    ctx.stroke();
    return true;
}
