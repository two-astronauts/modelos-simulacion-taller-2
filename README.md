# modelos-simulacion-taller-2

1. Determine el ciclo o periodo de vida de los siguientes generadores congruenciales.
a) xi+1 = (21xi + 15) mod (31), con x0 = 21
b) xi+1 = (13xi + 9) mod (128), con x0 = 7
c) xi+1 = (17xi) mod (31), con x0 = 23
d) xi+1 = (121 + xi) mod (256), con x0 = 17
e) xi+1 = (21xi + 15xi−1) mod (64), con x0 = 21 y xi−1 = 43

2. Determine el ciclo o periodo de vida de los siguientes generadores congruenciales.
a) xi+1 = (137xi + 47) mod 17
b) xi+1 = (191xi + 17) mod 23
c) xi+1 = (237xi + 71) mod 37
d) xi+1 = (117xi + 31) mod 19
e) xi+1 = (157xi + 47) mod 37
f) xi+1 = (321xi + 11) mod 27

3. Programe en el software de su preferencia la serie congruencial
xi+1 = (553 + 121xi) mod 177,
con x0 = 23, y haga lo que se indica.
a) Determine el ciclo o periodo de vida.
b) Realice las pruebas de media, varianza y uniformidad.

4. Realice las pruebas de uniformidad e independencia a los primeros 100 aleatorios de los
siguientes generadores:
a) xi+1 = (1117 · xi + 3057) mod 1679567; semilla 1457
b) xi+1 = (2177 · xi + 2367) mod 1351867; semilla 1117

5. Para cada uno de los generadores del problema anterior tome ahora los datos de 101 al 200
y realice las pruebas de media, varianza.

6. Realice las pruebas de media, varianza y uniformidad a los 50 numeros de la tabla siguiente,
con un nivel de aceptacion de 95%.

0.8797 0.3884 0.6289 0.8750 0.5999 0.8589 0.9996 0.2415 0.3808 0.9606
0.9848 0.3469 0.7977 0.5844 0.8147 0.6431 0.7387 0.5613 0.0318 0.7401
0.4557 0.1592 0.8536 0.8846 0.3410 0.1492 0.8681 0.5291 0.3188 0.5992
0.9170 0.2204 0.5991 0.5461 0.5739 0.3254 0.0856 0.2258 0.4603 0.5027
0.8376 0.6235 0.3681 0.2088 0.1525 0.2006 0.4720 0.4272 0.6360 0.0954

7. Determine, con las pruebas de independencia de corridas arriba y abajo de la media, si los
50 numeros de la tabla son independientes con un nivel de aceptación de 90%.

0.6351 0.0272 0.0227 0.3827 0.0659 0.3683 0.2270 0.7323 0.4088 0.2139
0.4271 0.4855 0.2028 0.1618 0.5336 0.7378 0.3670 0.6637 0.1864 0.6734
0.9498 0.9323 0.0265 0.4696 0.7730 0.9670 0.7500 0.5259 0.5269 0.5406
0.3641 0.0356 0.2181 0.0866 0.6085 0.4468 0.0539 0.9311 0.3128 0.1562
0.8559 0.7280 0.7789 0.1746 0.6637 0.0687 0.5494 0.1504 0.8397 0.2995

8. Utilice la prueba de series para determinar si los 50 numeros de la tabla son independientes
con un nivel de aceptacion de 90%.

0.5858 0.8863 0.8378 0.3203 0.4115 0.2710 0.9238 0.1959 0.9268 0.6702
0.6213 0.4360 0.6279 0.8415 0.5786 0.0543 0.3567 0.1655 0.3880 0.8080
0.1931 0.0843 0.9152 0.6093 0.7587 0.4515 0.3203 0.5139 0.7070 0.9123
0.1242 0.8826 0.9921 0.8523 0.6723 0.8540 0.4722 0.4781 0.2101 0.1680
0.8658 0.4028 0.6136 0.8720 0.1126 0.5857 0.9172 0.8943 0.8095 0.6408

9. Obtenga la media y la varianza de los datos del problema anterior. ¿Son exactamente los
mismos que para una distribucion uniforme entre cero y uno? ¿A que atribuye esta diferencia?
