# Nearest-Color
Find the nearest color to an inputted color from a set using CIE's ΔE* Color Difference Formula
https://bumler.github.io/Nearest-Color/

# WIP 
This project is still under active developement. 
What's done
- Converting an input color from RGB to XYZ to CIELAB (the color space it must be in for the ΔE* calculation).
- Implementation of the ΔE* formula (CIEDE2000).
- Calculating the nearest color using that formula and a default set.
- Very rough front end to act as PoC.

To Do
- Unit testing on all formula and conversion functions.
- Major improvements to the front end (stylistic, ease of use, sanitizing inputs, etc).
- Allow users to different avenues to input color (pick from a picture or a color wheel).

# What is ΔE*
One method of determining the difference between colors is calculating the euclidian distance between their RGB coordinates. This does the not take into account that some colors are more noticable to the human eye than others. ΔE* is a formula for describing difference between colors created by the International Commission on Illumination (CIE). It uses the CIELAB color space (more below) to better model how the human eye tracks differences between colors. CIEDE2000 is the most current iteration of this formula and compsates for lightness, chroma and hue.

To see the formula and learn more go to:
https://en.wikipedia.org/wiki/Color_difference#CIELAB_%CE%94E*

# What is CIELAB
CIELAB abbreviated to LAB is the color space needed for the ΔE* formula. LAB is the 3 coordinates of color measurement. L*A*B* are an alternative way of describing a color in a three dimensional space. L* is the lightness of a color [0 - 100] a* is the position between green and red/magenta (negative values meaning green positive being red [-128 - 128]) b* is the position between blue and yellow (negative being blue positive being yellow). The asterisks are part of the name and used to distinguish from a different representation. Since both RBB and CIELAB can be represented in 3d space the difference of color can represented by the euclidean distance between any two points.
