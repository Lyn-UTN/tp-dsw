# **TP-DSW**

## Grupo Memby
### Integrantes
- 52583 -Gabriele, Fausto.
- 52896 -Dimarco, Ignacio.
- 52771 -Yaccuzzi, Lucas Elvio.
- 52895 -Salguero, Manuel Hernan.


### Repositorios(archivos)
- [frontend](https://github.com/Lyn-UTN/TP-DSW/tree/main/backend) 
- [backend](https://github.com/Lyn-UTN/TP-DSW/tree/main/frontend) 
- [pull-request](https://github.com/Lyn-UTN/TP-DSW/pulls)

## Tema
 Memby, sistema que permite a los dueños de cocheras registrarlas y ponerlas en alquiler, mientras que los conductores pueden buscar, reservar y pagar por su uso de forma sencilla desde la web&celular, sin dar vueltas y eligiendo el mejor precio, lugar y comodidad.


### Modelo
![image](https://github.com/user-attachments/assets/fe755499-28f2-461e-acaa-81b7b67f153c)

-[Link](https://app.diagrams.net/#G17CmsxCE-w4RppISFeKPXqqaWAXvFu8MM#%7B%22pageId%22%3A%22cmFTz9YPNpSMTq0lVuGJ%22%7D)

## Alcance Funcional 

### Alcance Mínimo
 
Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Tipo Vehiculo<br>2. CRUD Zona<br>3. CRUD Usuario/Dueño <br>4.  Tipo Reserva|
|CRUD dependiente|1. CRUD Vehiculo {depende de} CRUD Tipo Vehiculo, CRUD Usuario <br>2. CRUD Cochera {depende de} CRUD Tipo Vehiculo, CRUD Zona, CRUD Usuario |
|Listado<br>+<br>detalle| 1.Listado de cocheras filtrado por tipo de vehículo, muestra ubicación, precio y tipo de vehículo permitido. <br> 2.Listado de reservas (para una cochera) filtrado por rango de fecha, muestra fecha inicio y fin de reserva, estado y datos del cliente|
|CUU/Epic|1. Reservar cochera <br>2. Cancelar/Modificar reserva|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Cliente <br>2. CRUD Vehículo <br>3. CRUD Tipo de vehículo <br>4. CRUD Reserva<br>5. CRUD Tipo de reserva. (hora, día, mes) <br>6. CRUD Cochera(garage) <br>7. CRUD (Pago/factura/feedback)|
|CUU/Epic|1. Realizar pago con MP/Stripe <br>2. Feedback mod(con diccionario)|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados |1.|
|CUU/Epic|1. |
|Otros|1. |
