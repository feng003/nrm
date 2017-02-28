> flexbox 布局学习

1. 弹性容器的属性

        flex-direction,flex-wrap,flex-flow,justify-content,align-items,align-content ;
        
        Flex-direction 属性控制弹性项目沿着主轴排列的方向。
        flex-direction:row || column || row-reverse || column-reverse;
        
        Flex-wrap 控制弹性项目过多时，是否需要换行
        flex-wrap: wrap || no-wrap || wrap-reverse;
        
        flex-flow  flex-direction 和 Flex-wrap的简写属性，同时带有这两个属性的值。
        flex-flow: row wrap; /*方向为 "row" 并且项目换行。*/
        
        justify-content 定义弹性项目如何在主轴上对齐
        justify-content: flex-start || flex-end || center || space-between || space-around
        
        align-items 定义弹性项目如何在侧轴方向对齐
        align-items: flex-start || flex-end || center || stretch || baseline
        
2. 弹性项目的属性

        Order || Flex-grow || Flex-shrink || Flex-basis




[参考文档](http://www.zcfy.cc/article/understanding-flexbox-everything-you-need-to-know-freecodecamp-2471.html?utm_source=tuicool&utm_medium=referral)