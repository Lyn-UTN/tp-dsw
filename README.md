# **TP-DSW**

## Grupo Airbng
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
AIRBNG. Sistema que permite a un cliente reservar un garage de una casa, el cual un dueño lo pone en estado disponible. 


### Modelo
![image](https://github.com/user-attachments/assets/a4e3ed2a-601c-450f-b3ec-ef087119dc7b)


-[Link]( https://app.diagrams.net/#G17CmsxCE-w4RppISFeKPXqqaWAXvFu8MM#%7B%22pageId%22%3A%229J7Nt0Pgp8gWcHGT92SS%22%7D) 

## Alcance Funcional 

### Alcance Mínimo
 
Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Tipo Vehiculo<br>2. CRUD Zona<br>3. CRUD Cliente <br>4. CRUD Tipo Reserva(hora, día, mes)|
|CRUD dependiente|1. CRUD Vehiculo {depende de} CRUD Tipo Vehiculo, CRUD Cliente <br>2. CRUD Garage {depende de} CRUD Tipo Vehiculo, CRUD Zona, CRUD Cliente |
|Listado<br>+<br>detalle| 1.Listado de garages filtrado por tipo de vehículo, muestra ubicación, precio y tipo de vehículo permitido. <br> 2.Listado de reservas (para una garage) filtrado por rango de fecha, muestra fecha inicio y fin de reserva, estado y datos del cliente|
|CUU/Epic|1. Reservar garage <br>2. Cancelar/Modificar reserva|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Vehículo <br>2. CRUD Reserva<br>3. CRUD Garage <br>4. CRUD (Pago/factura/feedback)|
|CUU/Epic|1. Realizar pago con MP/Stripe <br>2. Feedback mod(con diccionario)|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados |1.|
|CUU/Epic|1. |
|Otros|1. |
